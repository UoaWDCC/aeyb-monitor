import { Response } from 'express';
import { Model } from 'mongoose';
import { PreCallback, PaginationOptions, PostCallback } from '../types/PaginationTypes';
import { PaginationQuery } from '../types/QueryTypes';
import { Doc, TypedRequestQuery } from '../types/UtilTypes';

/**
 * The `PaginationHandler` manages the number of results (`limit` query) and the page (`page` query) automatically. It's possible
 * to run functions before the pagination using the pre-callbacks to modify the query being paginated. This is particularly
 * useful if you want to filter results by some condition before paginating the results.
 *
 * Examples:
 *
 * - Default pagination handler:
 * ```ts
 * const getAllEvents = asyncHandler(new PaginationHandler(Event).handle);
 * ```
 *
 * - Customing default number of results:
 * ```ts
 * const getAllEvents = asyncHandler(new PaginationHandler(Event, { limit: 10 }).handle);
 * ```
 *
 * - Using pre-callbacks to sort events by ascending order:
 * ```ts
 * const getAllEvents = asyncHandler(new PaginationHandler(Event).pre((query) => query.sort({ time: 'ascending' })).handle);
 * ```
 * @see PaginationHandler.pre
 */
export default class PaginationHandler<T, TQuery extends PaginationQuery = PaginationQuery> {
    private readonly model: Model<T>;
    private readonly dataName: string;
    private readonly defaultOptions: Required<PaginationOptions>;

    private preCallbacks: PreCallback<T, TQuery>[] = [];
    private postCallbacks: PostCallback<T>[] = [];

    /**
     * Constructs a `PaginationHandler` for the specified model. Unless you override them, the default pagination options
     * are: `limit=30` and `page=0`
     *
     * @param model The mongoose model that will be paginated
     * @param defaultOptions The default pagination options that should be used if the query parameters aren't specified.
     */
    constructor(model: Model<T>, defaultOptions: PaginationOptions = {}) {
        this.model = model;

        // The name of the field that should be used when the results are returned in the response
        this.dataName = model.modelName.toLowerCase() + 's';

        this.defaultOptions = {
            limit: defaultOptions.limit ?? 30,
            page: defaultOptions.page ?? 0,
        };

        // When the handle function is used as a parameter, 'this' becomes undefined. Binding the value of 'this' to this
        // instance prevents that from occuring. See: https://www.w3schools.com/js/js_function_bind.asp
        this.handle = this.handle.bind(this);
    }

    /**
     * Adds another pre-callback to the list. Pre-callbacks are run in order before the pagination begins and allow for you to
     * modify the query to add filtering or sorting. Pre-callbacks can take up to 3 parameters:
     * ```ts
     * function (query: TypedQuery<EventModel>, req: TypedRequestQuery<PaginationQuery>, res: Response);
     * ```
     * If your pre-callback needs to cancel the pagination, for example if an invalid request is found, then you can `return`
     *  nothing. Do note, this means responding to the request becomes your responsibility:
     * ```ts
     * const getAllEvents = asyncHandler(
     *      new PaginationHandler(Event).pre((query, req, res) => {
     *          res.status(400).json({ status: 'error', message: 'Nothing is being accepted today >:)' });
     *      }).handle,
     * );
     * ```
     *
     * If your endpoint has custom query parameters (E.g: for filtering), you'll need to specify the type when creating the
     * `PaginationHandler`. **Note:** This type must extend `PaginationQuery`.
     * ```ts
     * interface FilterQuery extends PaginationQuery {
     *      name?: string;
     * }
     *
     * const getAllEvents = asyncHandler(
     *      new PaginationHandler<EventModel, FilterQuery>(Event).pre((query, req) => handleFilters(query, req)).handle,
     * );
     * ```
     *
     * Alternatively, if you're not using an arrow function, the types can be excluded from `PaginationHandler`:
     * ```ts
     * interface FilterQuery extends PaginationQuery {
     *      name?: string;
     * }
     *
     * function handleFilters(query: TypedQuery<EventModel>, req: TypedRequestQuery<FilterQuery>): TypedQuery<EventModel> {
     *      // Handle the filtering...
     *      return query;
     * }
     *
     * const getAllEvents = asyncHandler(new PaginationHandler(Event).pre(handleFilters).handle);
     * ```
     *
     * @param fn The pre-callback to add
     * @returns Itself for chaining
     */
    public pre(fn: PreCallback<T, TQuery>): this {
        this.preCallbacks.push(fn);
        return this;
    }

    public post(fn: PostCallback<T>): this {
        this.postCallbacks.push(fn);
        return this;
    }

    /**
     * Parses the `limit` and `page` to use for pagination and ensures that they are valid. If no `limit` or `page` was
     * specified in the query then their default values are used.
     *
     * @param req The request
     * @param res The response
     * @returns Either the parsed `PaginationOptions` or nothing if the request was invalid
     */
    private handlePagination(req: TypedRequestQuery<TQuery>, res: Response): Required<PaginationOptions> | void {
        let limit = this.defaultOptions.limit;
        let page = this.defaultOptions.page;

        if (req.query.limit) {
            const parsedLimit = parseInt(req.query.limit);
            if (isNaN(parsedLimit)) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be an integer (Got ${req.query.limit})`,
                });
                return;
            }
            if (parsedLimit <= 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be greater than 0 (Got ${req.query.limit})`,
                });
                return;
            }
            limit = parsedLimit;
        }

        if (req.query.page) {
            const parsedPage = parseInt(req.query.page);
            if (isNaN(parsedPage)) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the page parameter to be an integer (Got ${req.query.page})`,
                });
                return;
            }
            if (parsedPage < 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the page parameter to be positive (Got ${req.query.page})`,
                });
                return;
            }
            page = parsedPage;
        }

        return { limit, page };
    }

    private createResponse(
        res: Response,
        results: Doc<T>[],
        hasNext: boolean,
        hasPrev: boolean,
        totalPages: number,
        totalResults: number,
        options: Required<PaginationOptions>,
    ) {
        res.status(200).json({
            status: 'success',
            hasNext,
            hasPrev,
            totalPages,
            page: options.page,
            limit: options.limit,
            results: results.length,
            totalResults,
            data: {
                [this.dataName]: results,
            },
        });
    }

    public async handle(req: TypedRequestQuery<TQuery>, res: Response) {
        const options = this.handlePagination(req, res);
        if (!options) return;

        let query = this.model.find<Doc<T>>();
        for (let i = 0; i < this.preCallbacks.length; i++) {
            const callback = this.preCallbacks[i];
            const tempQuery = callback(query, req, res);
            if (tempQuery) query = tempQuery;
            else return;
        }

        const documentCount = await query.countDocuments();
        if (documentCount === 0) {
            this.createResponse(res, [], false, false, 0, 0, options);
            return;
        }

        const totalPages = Math.ceil(documentCount / options.limit);
        if (options.page >= totalPages) {
            res.status(400).json({
                status: 'error',
                message: `The page parameter ${options.page} is out of bounds. (Max page is ${totalPages - 1})`,
            });
            return;
        }

        let results = await this.model
            .find<Doc<T>>()
            .merge(query)
            .limit(options.limit)
            .skip(options.page * options.limit);
        this.postCallbacks.forEach((callback) => {
            results = callback(results, options);
        });

        const hasNext = options.page < totalPages - 1;
        const hasPrev = options.page !== 0;

        this.createResponse(res, results, hasNext, hasPrev, totalPages, documentCount, options);
    }
}
