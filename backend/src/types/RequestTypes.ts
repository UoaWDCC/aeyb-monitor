import MeetingDTO from '../shared/Types/dtos/MeetingDTO';

export interface MeetingRequest extends Omit<MeetingDTO, 'time' | '_id' | 'attendance'> {
    time: string;
}
