import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
type ExpressFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;

export default function auth(permissions: string[]): ExpressFunction {
    return asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.headers.authorization) {
                res.status(404).json({
                    message:
                        'You must specify an id token to access this endpoint',
                });
                return;
            }

            next();
        },
    );
}
