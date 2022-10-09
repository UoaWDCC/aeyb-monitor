import { response } from 'express';
import { SuccessfulResponse } from '../shared/Types/responses/utils/SuccessfulResponse';
import { TokenExpiredError } from 'jsonwebtoken';

/**
 * Response Utilities using 'Module augmentation'. The types need to match for module augmentation to work
 * which is why I've had to use `any`, along with specify the unused `Locals` and `StatusCode` types.
 *
 * @see https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
 * @see https://joeflateau.net/posts/extending-express-request-response-objects-in-typescript
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'express-serve-static-core' {
    export interface Response<
        ResBody = any,
        Locals extends Record<string, any> = Record<string, any>,
        StatusCode extends number = number,
    > {
        error(status: number, message: string): void;
        invalid(message: string): void;
        unauthorized(message: string): void;
        tokenExpired(error: TokenExpiredError): void;
        notFound(message: string): void;
        success(status: number, data: ResBody extends SuccessfulResponse<infer T> ? T : ResBody): void;
        ok(data: ResBody extends SuccessfulResponse<infer T> ? T : ResBody): void;
        created(data: ResBody extends SuccessfulResponse<infer T> ? T : ResBody): void;
    }
}

// For some reason 'this' is undefined if I try and use an arrow functions.
response.error = function (status, message) {
    this.status(status).json({
        status: 'error',
        message,
    });
};

response.invalid = function (message) {
    return this.error(400, message);
};

response.unauthorized = function (message) {
    this.error(401, message);
};

response.tokenExpired = function (error) {
    this.status(401).json({
        status: 'tokenExpired',
        messsage: error.message,
        expiredAt: error.expiredAt,
    });
};

response.notFound = function (message) {
    return this.error(404, message);
};

response.success = function (status, data) {
    this.status(status).json({
        status: 'success',
        data,
    });
};

response.ok = function (data) {
    this.success(200, data);
};

response.created = function (data) {
    this.success(201, data);
};
