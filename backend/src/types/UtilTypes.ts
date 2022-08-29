import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Doc<T> = mongoose.Document<unknown, any, T> &
    T & {
        _id: string;
    };

export interface TypedRequest<bodyType, paramsType> extends Express.Request {
    body: bodyType;
    params: paramsType;
}

export interface TypedRequestBody<Type> extends Express.Request {
    body: Type;
}

export interface TypedRequestParams<Type> extends Express.Request {
    params: Type;
}
