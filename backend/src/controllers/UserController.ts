import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuthenticatedRequest, DevLoginRequest, LoginRequest } from '../types/RequestTypes';
import User, { UserModel } from '../models/UserModel';
import jwt from 'jsonwebtoken';
import config from '../types/Config';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.clientID);

/**
 * @desc    An endpoint that is only accessible during development for getting a JWT token for the specified user id.
 * @route   POST api/users/devlogin
 */
const devLoginUser = asyncHandler(async (req: Request<undefined, undefined, DevLoginRequest>, res: Response) => {
    const userId = req.body.id;

    let user = await User.findById(userId);
    if (!user) {
        user = await User.create({ _id: userId, name: req.body.name });
    }

    res.status(200).json({
        status: 'success',
        token: generateJWT(user.id),
        data: {
            id: user._id,
            name: user.name,
            permissions: await getUserPermissions(user),
        },
    });
});

/**
 * @desc    Login and gain an access token
 * @route   POST api/users/login
 */
const loginUser = asyncHandler(async (req: Request<undefined, undefined, LoginRequest>, res: Response) => {
    const credential = req.body.credential;

    if (typeof credential !== 'string') {
        res.status(400).json({
            status: 'error',
            message: `The credential must be a string (got ${typeof credential})`,
        });
        return;
    }

    try {
        const userId = await validateIdToken(credential, res);
        if (!userId) return;

        let user = await User.findById(userId);
        // TODO: Determine if name can be extracted from id token
        if (!user) {
            user = await User.create({ _id: userId, name: 'TODO' });
        }

        // The returned token can then be used to authenticate additional requests
        res.status(200).json({
            status: 'success',
            token: generateJWT(user.id),
            data: {
                id: user.id,
                name: user.name,
                permissions: await getUserPermissions(user),
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong while validating id token',
        });
    }
});

// Reference: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token

async function validateIdToken(credential: string, res: Response): Promise<string | undefined> {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: config.clientID,
    });

    const payload = ticket.getPayload();
    const userId = payload?.sub;
    if (!userId) {
        res.status(400).json({
            status: 'error',
            message: 'The id token provided was malformed',
        });
        return;
    }

    const domain = payload.hd;
    // When not in development, make sure users logging in have the correct email domain
    if (config.nodeEnv !== 'development' && domain !== config.googleDomain) {
        res.status(404).json({
            status: 'error',
            message: 'Invalid google domain',
        });
    }
    return userId;
}

function generateJWT(userId: string): string {
    return jwt.sign({ sub: userId }, config.jwtSecret, {
        expiresIn: '30d',
    });
}

// TODO: Fetch users permissions from database
// Maybe also move this to the permissions controller?
async function getUserPermissions(user: UserModel): Promise<string[]> {
    return [];
}

/**
 * @desc 	Get all the users
 * @route 	GET /api/users/
 */
const getUsers = asyncHandler(async (req: Request<AuthenticatedRequest>, res: Response) => {
    // Fetch users

    console.log(`User id: ${req.params.user}`);

    res.status(200).json({
        status: 'success',
        message: 'Nice work, you just made a GET request!',
    });
});

export { devLoginUser, loginUser, getUsers, getUserPermissions };
