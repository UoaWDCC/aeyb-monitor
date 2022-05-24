import { UserModel } from '../models/UserModel';

export interface LoginRequest {
    credential: string;
}

export interface DevLoginRequest {
    id: string;
    name?: string;
    profileUrl?: string;
}

export interface AuthenticatedRequest {
    user: UserModel;
}
