import { Query } from 'mongoose';
import InvalidError from '../errors/InvalidError';
import PaginationConfig from '../types/PaginationConfig';
import { PaginationQuery } from '../shared/Types/queries/utils';
import { PaginatedResponse } from '../shared/Types/responses/utils';
import { PaginationOptions } from '../shared/Types/utils/Pagination';

export default class PaginationHandler {
    public static createOptions(config?: Partial<PaginationConfig>): PaginationConfig {
        if (!config) config = {};

        const maxLimit = config.maxLimit ?? Number.MAX_SAFE_INTEGER;
        const minLimit = config.minLimit ?? 1;
        if (maxLimit < minLimit) throw new Error('The max limit cannot be less than the min limit');

        if (config.defaultLimit && (config.defaultLimit < minLimit || config.defaultLimit > maxLimit))
            throw new Error(`The default limit is not within the specified bounds of ${minLimit} to ${maxLimit}`);

        // Make sure the defaultLimit is within the bounds of the minLimit and maxLimit
        const defaultLimit = config.defaultLimit ?? Math.min(Math.max(30, minLimit), maxLimit);

        return {
            maxLimit: maxLimit,
            defaultLimit: defaultLimit,
            minLimit: minLimit,
            defaultPage: config.defaultPage ?? 0,
        };
    }

    public static async paginate<TRes, TDoc>(
        query: Query<TRes[], TDoc>,
        queryOptions: PaginationQuery,
        config: PaginationConfig,
    ): Promise<{ response: PaginatedResponse<unknown>; data: TRes[] }> {
        const options = PaginationHandler.handlePagination(queryOptions, config);

        // You can only execute each query once so we need to make a copy of it so we can reuse it again later
        const documentCount = await query.clone().countDocuments();
        if (documentCount === 0) {
            return { response: PaginationHandler.createResponse(false, false, 0, 0, 0, options), data: [] };
        }

        const totalPages = Math.ceil(documentCount / options.limit);
        if (options.page >= totalPages) {
            throw new InvalidError(
                `The page parameter ${options.page} is out of bounds. (Max page is ${totalPages - 1})`,
            );
        }

        const results = await query.limit(options.limit).skip(options.page * options.limit);

        const hasNext = options.page < totalPages - 1;
        const hasPrev = options.page !== 0;
        return {
            response: PaginationHandler.createResponse(
                hasNext,
                hasPrev,
                totalPages,
                documentCount,
                results.length,
                options,
            ),
            data: results,
        };
    }

    private static handlePagination(queryOptions: PaginationQuery, config: PaginationConfig): PaginationOptions {
        let limit = config.defaultLimit;
        let page = config.defaultPage;

        if (queryOptions.limit) {
            const parsedLimit = parseInt(queryOptions.limit);
            if (isNaN(parsedLimit)) {
                throw new InvalidError(`Expected the limit parameter to be an integer (Got ${queryOptions.limit})`);
            }
            if (parsedLimit < config.minLimit) {
                throw new InvalidError(
                    `Expected the limit parameter to be greater than or equal to ${config.minLimit} (Got ${parsedLimit})`,
                );
            }
            if (parsedLimit > config.maxLimit) {
                throw new InvalidError(
                    `Expected the limit parameter to be less than or equal to ${config.maxLimit} (Got ${parsedLimit})`,
                );
            }
            limit = parsedLimit;
        }

        if (queryOptions.page) {
            const parsedPage = Number.parseInt(queryOptions.page);
            if (isNaN(parsedPage)) {
                throw new InvalidError(`Expected the page parameter to be an integer (Got ${queryOptions.page})`);
            }
            if (parsedPage < 0) {
                throw new InvalidError(`Expected the page parameter to be positive (Got ${queryOptions.page})`);
            }
            page = parsedPage;
        }

        return { limit, page };
    }

    private static createResponse(
        hasNext: boolean,
        hasPrev: boolean,
        totalPages: number,
        totalResults: number,
        results: number,
        options: PaginationOptions,
    ): PaginatedResponse<unknown> {
        return {
            hasNext,
            hasPrev,
            totalPages,
            page: options.page,
            limit: options.limit,
            results,
            totalResults,
        };
    }
}
