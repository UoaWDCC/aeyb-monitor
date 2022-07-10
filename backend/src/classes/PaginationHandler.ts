import { Response } from 'express';
import { FilterQuery, Model } from 'mongoose';
import { FilterCallback, PaginationOptions, ThenCallback } from '../types/PaginationTypes';
import { PaginationQuery } from '../types/QueryTypes';
import { Doc, TypedRequestQuery } from '../types/UtilTypes';

export default class PaginationHandler<T, TQuery extends PaginationQuery = PaginationQuery> {
    private readonly model: Model<T>;
    private readonly dataName: string;
    private readonly defaultOptions: Required<PaginationOptions>;
    private filterCallback: FilterCallback<T, TQuery> | null = null;
    private thenCallback: ThenCallback<T> | null = null;

    constructor(model: Model<T>, defaultOptions: PaginationOptions = {}) {
        this.model = model;
        this.dataName = model.modelName.toLowerCase() + 's';
        this.defaultOptions = {
            limit: defaultOptions.limit ?? 30,
            page: defaultOptions.page ?? 0,
        };

        // When the handle function is used as a parameter, 'this' becomes undefined. Binding the value of 'this' to this instance
        // prevents that from occuring. See: https://www.w3schools.com/js/js_function_bind.asp
        this.handle = this.handle.bind(this);
    }

    public filter(fn: FilterCallback<T, TQuery>): this {
        this.filterCallback = fn;
        return this;
    }

    public then(fn: ThenCallback<T>): this {
        this.thenCallback = fn;
        return this;
    }

    private handlePagination(req: TypedRequestQuery<TQuery>, res: Response): Required<PaginationOptions> | null {
        let limit = this.defaultOptions.limit;
        let page = this.defaultOptions.page;

        if (req.query.limit) {
            const parsedLimit = parseInt(req.query.limit);
            if (isNaN(parsedLimit)) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be an integer (Got ${req.query.limit})`,
                });
                return null;
            }
            if (parsedLimit <= 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be greater than 0 (Got ${req.query.limit})`,
                });
                return null;
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
                return null;
            }
            if (parsedPage < 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the page parameter to be positive (Got ${req.query.page})`,
                });
                return null;
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

        const filter: FilterQuery<T> = this.filterCallback ? this.filterCallback(req) : {};

        const documentCount = await this.model.countDocuments(filter);

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
            .find<Doc<T>>(filter)
            .limit(options.limit)
            .skip(options.page * options.limit);

        if (this.thenCallback) results = this.thenCallback(results, options);

        const hasNext = options.page < totalPages - 1;
        const hasPrev = options.page !== 0;

        this.createResponse(res, results, hasNext, hasPrev, totalPages, documentCount, options);
    }
}
