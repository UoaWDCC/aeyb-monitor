export interface RoleIdParam {
    roleId: string;
}

export interface UserIdParam {
    userId: string;
}

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
