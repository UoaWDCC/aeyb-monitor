import { UserModel } from '../models/UserModel';

export interface LoginRequest {
    credential: string;
}

export interface AuthenticatedRequest {
    user: UserModel;
}
