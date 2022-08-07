import { response } from 'express';

// Response Utilities using 'Module augmentation'
// More info at: https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
// and https://joeflateau.net/posts/extending-express-request-response-objects-in-typescript

declare module 'express-serve-static-core' {
    export interface Response {
        invalid(message: string): void;
        unauthorized(message: string): void;
        ok<T>(data: T): void;
    }
}

// For some reason 'this' is undefined if I try and use an arrow functions.
response.invalid = function (message) {
    this.status(400).json({
        status: 'error',
        message,
    });
};

response.unauthorized = function (message) {
    this.status(404).json({
        status: 'unauthorized',
        message,
    });
};

response.ok = function (data) {
    this.status(200).json({
        status: 'success',
        data,
    });
};
