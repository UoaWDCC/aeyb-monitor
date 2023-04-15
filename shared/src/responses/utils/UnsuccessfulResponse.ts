/**
 * This can be due to:
 *
 * 1. Invalid request (400)
 * 2. Unauthorized request (401)
 * 3. Resource wasn't found (404)
 */
export interface ErrorResponse {
    status: 'error';
    message: string;
}

/**
 * The JWT token you're currently using to authenticate your requests has expired.
 * You should prompt the user to relogin to receive a new one.
 */
export interface UnauthorizedResponse {
    status: 'tokenExpired';
    message: string;

    /** The time value in ms. */
    expiredAt: number;
}

export type UnsuccessfulResponse = ErrorResponse | UnauthorizedResponse;
