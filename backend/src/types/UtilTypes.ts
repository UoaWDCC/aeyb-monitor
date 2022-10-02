import { Response } from 'express';
import mongoose, { Query } from 'mongoose';
import UserModel from '../shared/Types/models/UserModel';
import AEYBResponse from '../shared/Types/responses/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Doc<ModelType, IdType = mongoose.Types.ObjectId> = mongoose.Document<IdType, any, ModelType> &
    ModelType & {
        _id: IdType;
    };

export type TypedQuery<T> = Query<Doc<T>[], Doc<T>>;

export interface TypedRequest<BodyType, ParamsType, QueryType = unknown> extends Express.Request {
    body: BodyType & { requester: Doc<UserModel, string> };
    params: ParamsType;
    query: QueryType;
}

export interface TypedRequestBody<Type> extends TypedRequest<Type, unknown> {}

export interface TypedRequestParams<Type> extends TypedRequest<unknown, Type> {}

export interface TypedRequestQuery<Type> extends TypedRequest<unknown, unknown, Type> {}

export interface AuthenticatedRequest extends TypedRequest<unknown, unknown> {}

export type TypedResponse<T> = Response<AEYBResponse<T>>;
