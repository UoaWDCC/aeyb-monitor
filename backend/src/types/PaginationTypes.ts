import { Doc, QueryType } from './UtilTypes';

export interface PaginationOptions {
    limit?: number;
    page?: number;
}

export type FilterCallback<T> = (query: QueryType<T>) => QueryType<T>;

export type ThenCallback<T> = (results: Doc<T>[], options: Required<PaginationOptions>) => Doc<T>[];
