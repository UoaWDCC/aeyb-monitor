import asyncHandler from 'express-async-handler';
import User, { UserDocument, UserPopulatedDocument } from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { TypedRequestParams, TypedResponse } from '../types/UtilTypes';
import { UserIdParam } from '@shared/params';
import { TypedRequest } from '../types/UtilTypes';
import Role from '../models/RoleModel';
import GooglePayload from '../types/GooglePayload';
import {
    DevLoginRequest,
    GiveRolesRequest,
    LoginRequest,
    RemoveRolesRequest,
    UpdateUserRequest,
} from '@shared/requests/UserRequests';
import {
    GetAllUsersData,
    GetSelfData,
    GetUserData,
    GiveRolesData,
    LoginData,
    RemoveRolesData,
    UpdateUserData,
} from '@shared/responses/UserResponsesData';
import { Permission } from '@shared/utils/Permission';
import { Request } from 'express';
import { createNewUser } from '../services/UserService';

const client = new OAuth2Client(process.env.CLIENT_ID);

/**
 * @desc    An endpoint that is only accessible during development for getting a JWT token for the specified user id.
 * @route   POST api/users/devlogin
 */
const devLoginUser = asyncHandler(async (req: Request<DevLoginRequest>, res: TypedResponse<LoginData>) => {
    const userId = req.body.id;

    let user = await User.findById(userId);
    if (!user) {
        user = await User.create({ _id: userId, name: req.body.name, profileUrl: req.body.profileUrl });
    }

    const populatedUser = await user.asPopulated();

    res.ok({
        token: generateJWT(user.id),
        user: populatedUser,
        permissions: [...(await getPermissions(populatedUser))], // Apparently it doesn't like sets
    });
});

/**
 * @desc    Login and gain an access token
 * @route   POST api/users/login
 */
const loginUser = asyncHandler(async (req: Request<LoginRequest>, res: TypedResponse<LoginData>) => {
    const credential = req.body.credential;

    if (typeof credential !== 'string') {
        return res.invalid(`The credential must be a string (got ${typeof credential})`);
    }

    try {
        const payload = await validateIdToken(credential, res);
        if (!payload) return; // The error json will already have been set in validateIdToken

        let user = await User.findById(payload.userId);
        if (!user) {
            user = await createNewUser(payload);
        } else if (user.name !== payload.name || user.profileUrl !== payload.profileUrl) {
            // If the profile picture or name doesn't match, it must have been updated so we need to update our internal record
            const tempUser = await User.findByIdAndUpdate(
                payload.userId,
                { name: payload.name, profileUrl: payload.profileUrl },
                {
                    new: true,
                    runValidators: true,
                },
            );
            if (!tempUser) {
                return res.invalid('There was an issue trying to update your user name and profile internally');
            }
            user = tempUser;
        }

        const populatedUser = await user.asPopulated();

        // The returned token can then be used to authenticate additional requests
        res.ok({
            token: generateJWT(user.id),
            user: populatedUser,
            permissions: [...(await getPermissions(populatedUser))],
        });
    } catch (error) {
        return res.invalid('Something went wrong while validating id token');
    }
});

// Reference: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
async function validateIdToken(credential: string, res: TypedResponse<LoginData>): Promise<GooglePayload | void> {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload?.sub;
    const name = payload?.name;
    const profileUrl = payload?.picture;

    if (!(userId && name && profileUrl)) {
        return res.invalid('The id token provided was malformed');
    }

    const domain = payload.hd;
    // Make sure users logging in have the correct email domain and this only happens in prod
    if (process.env.NODE_ENV === 'production' && domain !== process.env.GOOGLE_DOMAIN) {
        return res.unauthorized('Invalid google domain');
    }

    return { userId, name, profileUrl };
}

function generateJWT(userId: string): string {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

/**
 * @desc    Get information about the currently logged in user
 * @route   GET /api/users/@me
 */
const getSelf = asyncHandler(async (req: TypedRequest, res: TypedResponse<GetSelfData>) => {
    const self = req.body.requester;

    res.ok({ self, permissions: [...(await getPermissions(self))] });
});

/**
 * @desc 	Get all the users
 * @route 	GET /api/users
 */
const getAllUsers = asyncHandler(async (req: TypedRequest, res: TypedResponse<GetAllUsersData>) => {
    const promises = (await User.find()).map((user) => user.asPopulated());
    const users = await Promise.all(promises);

    res.ok({
        results: users.length,
        users,
    });
});

/**
 * @desc 	Get a specific user
 * @route 	GET /api/users/:userId
 */
const getUser = asyncHandler(async (req: TypedRequestParams<UserIdParam>, res: TypedResponse<GetUserData>) => {
    const user = await User.findByIdWithRoles(req.params.userId);
    if (!user) {
        return res.notFound(`There is no user with the id ${req.params.userId}`);
    }

    res.ok({ user, permissions: [...(await getPermissions(user))] });
});

/**
 * @desc    Edit a specific User
 * @route   PATCH /api/users/:userId
 */
const updateUser = asyncHandler(
    async (req: TypedRequest<UpdateUserRequest, UserIdParam>, res: TypedResponse<UpdateUserData>) => {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.notFound(`User with ID, ${req.params.userId} doesn't exist`);
        }

        res.ok({ user: await user.asPopulated() });
    },
);

function isPopulatedUser(user: UserDocument | UserPopulatedDocument): user is UserPopulatedDocument {
    return user.populated('roles');
}

async function getPermissions(user: UserPopulatedDocument): Promise<Set<Permission>> {
    return new Set(user.roles.flatMap((role) => role.permissions));
}

/**
 * @desc 	Gives user roles specified in request body
 * @route 	POST /api/users/:userId/roles
 */
const giveRoles = asyncHandler(
    async (req: TypedRequest<GiveRolesRequest, UserIdParam>, res: TypedResponse<GiveRolesData>) => {
        //Check roles is provided as an array
        if (!Array.isArray(req.body.roleIds)) {
            return res.invalid('The roles must be an array');
        }

        // Check atleast one role specified
        if (req.body.roleIds.length === 0) {
            return res.invalid('You must specify atleast one role');
        }

        // Check if all roles exist
        const roles = await Role.find({
            _id: { $in: req.body.roleIds },
        });

        if (roles.length != req.body.roleIds.length) {
            return res.invalid('One or more of the specified roles do not exist');
        }

        // Update user roles ensuring no duplicates
        const user = await User.findByIdAndUpdateRoles(
            req.params.userId,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { $addToSet: { roles: { $each: req.body.roleIds } } },
            { new: true },
        );

        if (!user) {
            return res.notFound(`There is no user with the id ${req.params.userId}`);
        }

        res.ok({
            user,
            addedRoles: roles,
        });
    },
);

/**
 * @desc 	Removes roles specified in request body from a user
 * @route 	DELETE /api/users/:userId/roles
 */
const removeRoles = asyncHandler(
    async (req: TypedRequest<RemoveRolesRequest, UserIdParam>, res: TypedResponse<RemoveRolesData>) => {
        //Check roles is provided as an array
        if (!Array.isArray(req.body.roleIds)) {
            return res.invalid('The roles must be an array');
        }

        // Check atleast one role specified
        if (req.body.roleIds.length === 0) {
            return res.invalid('You must specify atleast one role');
        }

        const roles = await Role.find({
            _id: { $in: req.body.roleIds },
            name: { $nin: ['Admin', 'Default'] },
        });

        if (roles.length != req.body.roleIds.length) {
            return res.invalid('One or more of the specified roles do not exist or cannot be removed');
        }

        const user = await User.findByIdAndUpdateRoles(
            req.params.userId,
            { $pullAll: { roles: req.body.roleIds } },
            { new: true },
        );

        if (!user) {
            return res.notFound(`There is no user with the id ${req.params.userId}`);
        }

        res.ok({
            user,
            removedRoles: roles,
        });
    },
);

export {
    devLoginUser,
    loginUser,
    getAllUsers,
    updateUser,
    getPermissions,
    isPopulatedUser,
    getUser,
    getSelf,
    giveRoles,
    removeRoles,
};
