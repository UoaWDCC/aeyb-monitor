import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import server from '..';

type ExpressFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;

const client = new OAuth2Client(server.config.clientID);

// Reference: https://developers.google.com/identity/sign-in/web/backend-auth

export default function auth(permissions: string[]): ExpressFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) {
            res.status(404).json({
                message: 'You must specify an id token to access this endpoint',
            });
            return;
        }

        const ticket = await client.verifyIdToken({
            idToken: req.headers.authorization,
            audience: server.config.clientID,
        });

        const payload = ticket.getPayload();
        const userId = payload?.sub;
        if (!userId) {
            res.status(404).json({
                message: 'The id token provided was malformed',
            });
            return;
        }

        const domain = payload.hd;
        // When not in development, make sure users logging in have the correct email domain
        if (
            server.config.nodeEnv !== 'development' &&
            domain !== server.config.googleDomain
        ) {
            res.status(404).json({
                message: 'Invalid google domain',
            });
        }

        next();
    };
}
