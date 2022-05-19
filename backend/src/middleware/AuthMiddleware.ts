import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import config from '../types/Config';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { AuthenticatedRequest } from '../types/RequestTypes';
import Permission from '../types/Perm';
import { getPermissions } from '../controllers/PermissionController';

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
            if (permission) {
                // Check that the user has the required permission
                const userPermissions = await getPermissions(user);
                if (userPermissions.indexOf(permission) !== -1) {
                    res.status(401).json({
                        status: 'error',
                        message: 'You do not have all the required permissions to access this endpoint',
                    });
                    return;
                }
            }

            // Make the user accessible as a param of the request.
            (req.params as AuthenticatedRequest).user = user;

            next();
        } catch (error) {
            res.status(401).json({
                status: 'error',
                message: 'Something went wrong while authenticating the request',
            });
        }
    });
}
