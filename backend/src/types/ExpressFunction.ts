import { NextFunction, Request, Response } from 'express';
type ExpressFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;

export default ExpressFunction;
