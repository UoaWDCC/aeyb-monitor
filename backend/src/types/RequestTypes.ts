import { EventModel } from '../models/EventModel';

export interface LoginRequest {
    credential: string;
}

export interface DevLoginRequest {
    id: string;
    name?: string;
    profileUrl?: string;
}

export interface MeetingRequest extends Omit<EventModel, 'time' | '_id' | 'attendance'> {
    time: string;
}
