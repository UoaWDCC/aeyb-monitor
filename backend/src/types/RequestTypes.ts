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

export interface MeetingRequest {
    name: string;
    time: string;
    invited: {
        userId: string[];
        roleName: string[];
    };
    where: string;
    attended: string[];
    absent: Map<String, String>;
    description?: string;
}
