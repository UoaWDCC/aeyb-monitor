import AttendanceDTO from '../dtos/AttendanceDTO';
import LocationDTO from '../dtos/LocationDTO';
import MeetingDTO from '../dtos/MeetingDTO';
import UserDTO from '../dtos/UserDTO';

// export type AddMeetingRequest = Omit<MeetingDTO, 'id' | 'creator' | 'location'> & { location: Omit<LocationDTO, 'id'> };
export type AddMeetingRequest = Omit<MeetingDTO, 'attendance' | 'id' | 'creator' | 'location'> & {
    location: Omit<LocationDTO, 'id'>;
    users: UserDTO[];
};

export type UpdateMeetingRequest = Partial<Omit<MeetingDTO, 'id' | 'creator'>> & {
    users: UserDTO[];
};

export type UpdateAttendanceRequest = Omit<AttendanceDTO, 'user'>;

export type UpdateAttendancesRequest = { attendance: AttendanceDTO[] };

export type UpdateFeedbackRequest = Omit<AttendanceDTO, 'user' | 'didAttend'>;

export type UpdateAbsenceRequest = Partial<Omit<AttendanceDTO, 'feedback' | 'rating' | 'didAttend'>>;

export type AddFeedBackRequest = Partial<Omit<AttendanceDTO, 'canAttend' | 'reason' | 'didAttend'>>;

export type EndMeetingRequest = {
    finishTime: number;
};

export type DeleteAttendanceReq = Omit<
    MeetingDTO,
    'type' | 'creator' | 'name' | 'startTime' | 'finishTime' | 'location' | 'attendance' | 'description'
>;
