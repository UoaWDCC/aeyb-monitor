import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import server from '..';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { getUserPermissions } from '../controllers/UserController';
import { AuthenticatedRequest } from '../types/RequestTypes';

type AuthenticationFunction = (
    req: Request<AuthenticatedRequest>,
    res: Response,
    next: NextFunction,
) => void;

export default function auth(permissions: string[]): AuthenticationFunction {
    return asyncHandler(
        async (
            req: Request<AuthenticatedRequest>,
            res: Response,
            next: NextFunction,
        ) => {
            // The token will be in the format Bearer <token>
            if (
                !req.headers.authorization ||
                !req.headers.authorization.startsWith('Bearer')
            ) {
                res.status(404).json({
                    message:
                        'You must specify a bearer token to access this endpoint',
                });
                return;
            }
            try {
                const token = req.headers.authorization.split(' ')[1];

                // Verify token:
                const decoded = jwt.verify(token, server.config.jwtSecret);
                const user = await User.findById(decoded.sub ?? '');
                if (!user) {
                    res.status(404).json({ message: 'Invalid bearer token' });
                    return;
                }

                // Check that the user has all the required permissions:
                const userPermissions = await getUserPermissions(user);
                if (
                    !permissions.every((permission) =>
                        userPermissions.has(permission),
                    )
                ) {
                    res.status(404).json({
                        message:
                            'You do not have all the required permissions to access this endpoint',
                    });
                }
                // Make the user accessible as a param of the request.
                req.params.user = user;
                next();
            } catch (error) {
                res.status(404).json({
                    message:
                        'Something went wrong while authenticating the request',
                });
            }
        },
    );
}
