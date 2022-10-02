import { response } from 'express';

// Response Utilities using 'Module augmentation'
// More info at: https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
// and https://joeflateau.net/posts/extending-express-request-response-objects-in-typescript

declare module 'express-serve-static-core' {
    export interface Response {
        error(status: number, message: string): void;
        invalid(message: string): void;
        unauthorized(message: string): void;
        notFound(message: string): void;
        success<T>(status: number, data: T): void;
        ok<T>(data: T): void;
        created<T>(data: T): void;
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
