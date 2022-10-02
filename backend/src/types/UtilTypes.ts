import { Response } from 'express';
import mongoose, { Query } from 'mongoose';
import { UserPopulatedDocument } from '../models/UserSchema';
import AEYBResponse from '../shared/Types/responses/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Doc<ModelType, IdType = mongoose.Types.ObjectId> = mongoose.Document<IdType, any, ModelType> &
    ModelType & {
        _id: IdType;
    };

export type DBModel<T, IdType = mongoose.Types.ObjectId> = T & { _id: IdType };

export type TypedQuery<T> = Query<Doc<T>[], Doc<T>>;

export interface TypedRequest<BodyType = unknown, ParamsType = unknown, QueryType = unknown> extends Express.Request {
    body: BodyType & { requester: UserPopulatedDocument };
    params: ParamsType;
    query: QueryType;
}

export interface TypedRequestParams<Type> extends TypedRequest<unknown, Type> {}

export interface TypedRequestQuery<Type> extends TypedRequest<unknown, unknown, Type> {}

export type TypedResponse<T> = Response<AEYBResponse<T>>;
