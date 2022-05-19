import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ValidationError from '../types/ValidationError';

type CastErrorValueType = mongoose.Error.CastError & { valueType?: string };
type MongooseError = mongoose.Error.ValidationError | mongoose.Error.CastError;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ErrorHandler(err: Error | MongooseError, req: Request, res: Response, next: NextFunction) {
    // Check if the error was thrown due to invalid inputs for a model
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
            status: 'errors',
            message: 'There was something wrong with your request',
            errors: getValidationErrors(err),
        });
        return;
    }
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({
            status: 'error',
            message: getCastErrorMessage(err),
        });
        return;
    }

    const status = res.statusCode ?? 501;
    res.status(status).json({
        status: 'error',
        message: err.message,
    });
}

function getValidationErrors(error: mongoose.Error.ValidationError): ValidationError[] {
    return Object.values(error.errors).map((err) => {
        const message = err instanceof mongoose.Error.CastError ? getCastErrorMessage(err) : err.message;
        return {
            field: err.path,
            message: message,
        };
    });
}

function getCastErrorMessage(error: mongoose.Error.CastError): string {
    return `Expected ${error.path} to be a ${error.kind} (Got ${(error as CastErrorValueType).valueType ?? 'unknown'})`;
}

export default ErrorHandler;
