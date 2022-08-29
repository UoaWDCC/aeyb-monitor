import { response } from 'express';

type DataType = Record<string, unknown> & { data?: Record<string, unknown> };

// Response Utilities using 'Module augmentation'
// More info at: https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
// and https://joeflateau.net/posts/extending-express-request-response-objects-in-typescript

declare module 'express-serve-static-core' {
    export interface Response {
        error(status: number, message: string): void;
        invalid(message: string): void;
        unauthorized(message: string): void;
        notFound(message: string): void;
        success(status: number, data: DataType): void;
        ok(data: DataType): void;
        created(data: DataType): void;
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
    this.status(401).json({
        status: 'unauthorized',
        message,
    });
};

response.notFound = function (message) {
    return this.error(404, message);
};

response.success = function (status, data) {
    const responseData = data['data'] ? data : { data };
    this.status(status).json({
        status: 'success',
        ...responseData,
    });
};

response.ok = function (data) {
    this.success(200, data);
};

response.created = function (data) {
    this.success(201, data);
};
