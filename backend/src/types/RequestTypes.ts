import { UserModel } from '../models/UserModel';
import { Doc } from './UtilTypes';

export interface LoginRequest {
    credential: string;
}

export interface DevLoginRequest {
    id: string;
    name?: string;
    profileUrl?: string;
}

export interface AuthenticatedRequest {
    user: Doc<UserModel>;
}
