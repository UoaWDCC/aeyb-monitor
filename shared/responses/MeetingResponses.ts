import AttendanceDTO from '@shared/dtos/AttendanceDTO';
import MeetingDTO from '../dtos/MeetingDTO';
import { PaginatedResponse } from './utils';

export type GetAllMeetingsData = PaginatedResponse<{ meetings: MeetingDTO[] }>;

export interface GetMeetingData {
    meeting: MeetingDTO;
}

export interface GetAttendanceData {
    attendance: AttendanceDTO[];
}

export interface GetAttendanceDataForUser {
    attendance: AttendanceDTO;
}

export interface GetFeedbackData {
    attendance: Omit<AttendanceDTO, 'user' | 'didAttend'>;
}

export interface AddMeetingData {
    /** The newly added meeting. */
    meeting: MeetingDTO;
}

export interface UpdateMeetingData {
    /** The updated meeting. */
    meeting: MeetingDTO;
}
