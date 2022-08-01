import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import config from '../types/Config';
import jwt from 'jsonwebtoken';
import { TypedRequestParams } from '../types/UtilTypes';
import User from '../models/UserModel';
import { AuthenticatedRequest } from '../types/RequestTypes';
import Permission from '../types/Perm';
import Role from '../models/RoleModel';
import { GroupIdParam, RoleIdParam, UserIdParam } from '../types/RequestParams';
import { getPermissions } from '../controllers/UserController';

type AuthenticationFunction = (req: Request<unknown>, res: Response, next: NextFunction) => void;

export default function protect(permission?: Permission): AuthenticationFunction {
    return asyncHandler(async (req: Request<unknown>, res: Response, next: NextFunction) => {
        // The token will be in the format Bearer <token>
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            res.status(401).json({
                status: 'error',
                message: 'You must specify a bearer token to access this endpoint',
            });
            return;
        }
        try {
            const token = req.headers.authorization.split(' ')[1];

            // Verify token:
            const decoded = jwt.verify(token, config.jwtSecret);
            const user = await User.findById(decoded.sub ?? '');
            if (!user) {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalid bearer token',
                });
                return;
            }

            // Don't bother fetching the user permissions if they just need to be logged in
            if (permission !== undefined) {
                // Get the users permissions
                const userPermissions = await getPermissions(user);

                // Filter the list to just show any instances of the needed permission
                let passedPermissions = [...userPermissions];
                passedPermissions = passedPermissions.filter((p) => p.permission == permission);

                // If there are no instances, user does not have permissions
                if (passedPermissions.length == 0) {
                    res.status(401).json({
                        status: 'error',
                        message: `You require the ${permission} permission to access this endpoint`,
                    });
                    return;
                }

                // If reach needs to be checked
                if (req.params) {
                    const request = req as Request<TypedRequestParams<unknown>>;

                    if ('groupId' in request.params) {
                        // Check the group is in the sender's group list
                        const request = req as Request<GroupIdParam>;

                        // If not impacting the default group
                        if (request.params.groupId != config.defaultGroupId) {
                            // Filter the permissions to get an array of permissions that have the correct group reach
                            const passedReach = passedPermissions.filter(
                                (p) =>
                                    p.reach.toString() == request.params.groupId ||
                                    p.reach.toString() == config.globalGroupId,
                            );

                            // If there are none, error
                            if (passedReach.length == 0) {
                                res.status(401).json({
                                    status: 'error',
                                    message: `You require more reach to access this endpoint. You cannot interact with that group`,
                                });
                                return;
                            }
                        }
                    }

                    if ('roleId' in request.params) {
                        // Check the role's group is in the senders group list
                        const request = req as Request<RoleIdParam>;

                        // Get the role so we can find the roles group
                        const role = await Role.findById(request.params.roleId);
                        if (!role) {
                            res.status(401).json({
                                status: 'error',
                                message: 'Something went wrong while authenticating the request',
                            });
                            return;
                        }
                        const groupId = role.group;

                        // Filter the permissions to get an array of permissions that have the correct group reach
                        const passedReach = passedPermissions.filter(
                            (p) =>
                                p.reach.toString() == groupId.toString() || p.reach.toString() == config.globalGroupId,
                        );

                        // If there are none error
                        if (passedReach.length == 0) {
                            res.status(401).json({
                                status: 'error',
                                message: `You require more reach to access this endpoint. You cannot interact with that role's group`,
                            });
                            return;
                        }
                    }

                    // Unsure if there is a case where userID is needed to be checked as a param....
                }
            }

            // Make the user accessible as a param of the request.
            (req.params as AuthenticatedRequest).user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                status: 'error',
                message: 'Something went wrong while authenticating the request',
            });
        }
    });
}
