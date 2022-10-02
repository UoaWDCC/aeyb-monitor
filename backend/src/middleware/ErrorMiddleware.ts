import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ValidationError from '../types/ValidationError';

type CastErrorValueType = mongoose.Error.CastError & { valueType?: string };
type MongooseError = mongoose.Error.ValidationError | mongoose.Error.CastError;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ErrorHandler(error: Error | MongooseError, req: Request, res: Response, next: NextFunction) {
    // Check if the error was thrown due to invalid inputs for a model
    if (error instanceof mongoose.Error.ValidationError) {
        return res.invalid(getValidationErrorMessage(error));
    }
    if (error instanceof mongoose.Error.CastError) {
        return res.invalid(getCastErrorMessage(error));
    }

    const status = res.statusCode ?? 501;
    res.error(status, error.message);
}

function getValidationErrorMessage(error: mongoose.Error.ValidationError): string {
    const errors = Object.values(error.errors);
    if (errors.length !== 0) {
        const error = errors[0];
        return error instanceof mongoose.Error.CastError ? getCastErrorMessage(error) : error.message;
    }
    return "Something wen't wrong with your request";
}

function getCastErrorMessage(error: mongoose.Error.CastError): string {
    return `Expected ${error.path} to be a ${error.kind} (Got ${(error as CastErrorValueType).valueType ?? 'unknown'})`;
}

export default ErrorHandler;
