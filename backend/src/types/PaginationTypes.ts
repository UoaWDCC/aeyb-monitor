import { FilterQuery, Query } from 'mongoose';
import { Doc, QueryType, TypedRequestQuery } from './UtilTypes';

export interface PaginationOptions {
    limit?: number;
    page?: number;
}

export type PreCallback<T, TQuery> = (query: QueryType<T>, req: TypedRequestQuery<TQuery>) => QueryType<T>;

export type PostCallback<T> = (results: Doc<T>[], options: Required<PaginationOptions>) => Doc<T>[];
