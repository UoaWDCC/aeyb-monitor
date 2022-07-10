import { Response } from 'express';
import { Doc, QueryType, TypedRequestQuery } from './UtilTypes';

export interface PaginationOptions {
    limit?: number;
    page?: number;
}

export type PreCallback<T, TQuery> = (
    query: QueryType<T>,
    req: TypedRequestQuery<TQuery>,
    res: Response,
) => QueryType<T> | undefined;

export type PostCallback<T> = (results: Doc<T>[], options: Required<PaginationOptions>) => Doc<T>[];
