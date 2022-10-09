export interface PaginationOptions {
    limit: number;
    page: number;
}

export interface PaginationConfig {
    /**
     * The maximum allowed limit for how many results to return.
     *
     * @default Number.MAX_SAFE_INTEGER
     */
    maxLimit: number;

    /**
     * The default limit for how many results to return if none if specified.
     *
     * @default 30 - Automatically bounded by the minLimit and maxLimit
     */
    defaultLimit: number;

    /**
     * The minimum allowed limit for how many results to return.
     *
     * @default 1
     */
    minLimit: number;

    /**
     * The default page that should be used if none if specified in the query.
     *
     * @default 0
     */
    defaultPage: number;
}
