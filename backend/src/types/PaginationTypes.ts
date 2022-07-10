import { Response } from 'express';
import { Doc, TypedQuery, TypedRequestQuery } from './UtilTypes';

export interface PaginationOptions {
    limit?: number;
    page?: number;
}

export type PreCallback<T, TQuery> = (
    query: TypedQuery<T>,
    req: TypedRequestQuery<TQuery>,
    res: Response,
) => TypedQuery<T> | undefined;

export type PostCallback<T> = (results: Doc<T>[], options: Required<PaginationOptions>) => Doc<T>[];
