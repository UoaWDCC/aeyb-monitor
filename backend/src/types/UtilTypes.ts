import { Response } from 'express';
import { Document, Types } from 'mongoose';
import { UserPopulatedDocument } from '../models/UserModel';
import AEYBResponse from '@shared/responses/utils';

export type DocumentModel<T, IdType = Types.ObjectId> = T & Omit<Document<IdType>, 'id'>;

export interface TypedRequest<BodyType = unknown, ParamsType = unknown, QueryType = unknown> extends Express.Request {
    body: BodyType & { requester: UserPopulatedDocument };
    params: ParamsType;
    query: QueryType;
}

export interface TypedRequestParams<Type> extends TypedRequest<unknown, Type> {}

export interface TypedRequestQuery<Type> extends TypedRequest<unknown, unknown, Type> {}

export type TypedResponse<T> = Response<AEYBResponse<T>>;
