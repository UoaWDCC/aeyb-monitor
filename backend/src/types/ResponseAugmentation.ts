import { response } from 'express';

// Response Utilities using 'Module augmentation'
// More info at: https://www.digitalocean.com/community/tutorials/typescript-module-augmentation
// and https://joeflateau.net/posts/extending-express-request-response-objects-in-typescript

declare module 'express-serve-static-core' {
    export interface Response {
        invalid(message: string): void;
    }
}

response.invalid = (message) => {};
