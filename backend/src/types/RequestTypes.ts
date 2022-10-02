import MeetingModel from '../shared/Types/models/MeetingModel';

export interface MeetingRequest extends Omit<MeetingModel, 'time' | '_id' | 'attendance'> {
    time: string;
}
