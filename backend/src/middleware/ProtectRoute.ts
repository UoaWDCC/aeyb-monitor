import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Permission from '../types/Perm';

type ExpressFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;

export default function protect(permission: Permission): ExpressFunction {
    return asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // Permissions is currently hardcoded in because it depends on code in another branch.
            // The authT should link to a user in the database.
            // This should then be used to get their permissions through their roles replacing the hardcode
            const permissions = [Permission.VIEW_ROLES, Permission.ADD_ROLES];

            if (permissions.indexOf(permission) == -1) {
                res.status(401).json({
                    message: 'Insufficent Permissions',
                });
                return;
            }
            next();
        },
    );
}
