import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { FilterCallback, PaginationOptions, ThenCallback } from '../types/PaginationTypes';
import { PaginationParam } from '../types/RequestParams';
import { Doc } from '../types/UtilTypes';

export default class PaginationHandler<T> {
    private readonly model: Model<T>;
    private readonly defaultOptions: Required<PaginationOptions>;
    private filterCallback: FilterCallback<T> | null = null;
    private thenCallback: ThenCallback<T> | null = null;

    constructor(model: Model<T>, defaultOptions: Required<PaginationOptions> = { limit: 30, page: 0 }) {
        this.model = model;
        this.defaultOptions = defaultOptions;
    }

    public filter(fn: FilterCallback<T>): this {
        this.filterCallback = fn;
        return this;
    }

    public then(fn: ThenCallback<T>): this {
        this.thenCallback = fn;
        return this;
    }

    private handlePagination(req: Request<PaginationParam>, res: Response): Required<PaginationOptions> | null {
        let limit = this.defaultOptions.limit;
        let page = this.defaultOptions.page;

        if (req.params.limit) {
            const parsedLimit = parseInt(req.params.limit);
            if (isNaN(parsedLimit)) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be an integer (Got ${req.params.limit})`,
                });
                return null;
            }
            if (parsedLimit <= 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the results parameter to be greater than 0 (Got ${req.params.limit})`,
                });
                return null;
            }
            limit = parsedLimit;
        }

        if (req.params.page) {
            const parsedPage = parseInt(req.params.page);
            if (isNaN(parsedPage)) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the page parameter to be an integer (Got ${req.params.page})`,
                });
                return null;
            }
            if (parsedPage < 0) {
                res.status(400).json({
                    status: 'error',
                    message: `Expected the page parameter to be positive (Got ${req.params.page})`,
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
        options: Required<PaginationOptions>,
    ) {
        const dataName = this.model.modelName.toLowerCase() + 's';

        res.status(200).json({
            status: 'success',
            hasNext,
            hasPrev,
            totalPages,
            page: options.page,
            limit: options.limit,
            data: {
                [dataName]: results,
            },
        });
    }

    public async handle(req: Request<PaginationParam>, res: Response) {
        const options = this.handlePagination(req, res);
        if (!options) return;

        let query = this.model.find<Doc<T>>();
        if (this.filterCallback) {
            query = this.filterCallback(query);
        }

        const documentCount = await query.countDocuments();
        if (documentCount === 0) {
            this.createResponse(res, [], false, false, 0, options);
            return;
        }

        const totalPages = Math.floor(documentCount / options.limit);
        if (options.page > totalPages) {
            res.status(400).json({
                status: 'error',
                message: `The page parameter ${options.page} is out of bounds. (Max page is ${totalPages})`,
            });
            return;
        }

        query = this.model.find<Doc<T>>();
        if (this.filterCallback) {
            query = this.filterCallback(query);
        }

        let results = await query.limit(options.limit).skip(options.page * options.limit);

        if (this.thenCallback) results = this.thenCallback(results, options);

        const hasNext = options.page < totalPages;
        const hasPrev = options.page !== 0;

        this.createResponse(res, results, hasNext, hasPrev, totalPages, options);
    }
}
