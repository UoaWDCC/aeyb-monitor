import MeetingDTO from '../dtos/MeetingDTO';
import { PaginatedResponse } from './utils';

export type GetAllMeetingsData = PaginatedResponse<{ meetings: MeetingDTO[] }>;

export interface GetMeetingData {
    meeting: MeetingDTO;
}

export interface AddMeetingData {
    /** The newly added meeting. */
    meeting: MeetingDTO;
}

export interface UpdateMeetingData {
    /** The updated meeting. */
    meeting: MeetingDTO;
}
