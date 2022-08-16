import { MeetingModel } from '../models/MeetingModel';

export interface LoginRequest {
    credential: string;
}

export interface DevLoginRequest {
    id: string;
    name?: string;
    profileUrl?: string;
}

export interface MeetingRequest extends Omit<MeetingModel, 'time' | '_id' | 'attendance'> {
    time: string;
}
