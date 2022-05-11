import { NextFunction, Request, Response } from 'express';

function ErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const status = res.statusCode ?? 501;

    // TODO: Add handling for Mongoose verification errors

    res.status(status).json({ error: err.message });
}

export default ErrorHandler;
