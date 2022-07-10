import { FilterQuery } from 'mongoose';
import { Doc, TypedRequestQuery } from './UtilTypes';

export interface PaginationOptions {
    limit?: number;
    page?: number;
}

export type FilterCallback<T, TQuery> = (req: TypedRequestQuery<TQuery>) => FilterQuery<T>;

export type ThenCallback<T> = (results: Doc<T>[], options: Required<PaginationOptions>) => Doc<T>[];
