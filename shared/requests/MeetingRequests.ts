import MeetingDTO from '../dtos/MeetingDTO';
import AttendanceDTO from '../dtos/AttendanceDTO';
import LocationDTO from '../dtos/LocationDTO';
import RoleDTO from '../dtos/RoleDTO';

// export type AddMeetingRequest = Omit<MeetingDTO, 'id' | 'creator' | 'location'> & { location: Omit<LocationDTO, 'id'> };
export type AddMeetingRequest = Omit<MeetingDTO, 'attendance' | 'id' | 'creator' | 'location'> & {
    location: Omit<LocationDTO, 'id'>;
    roles: RoleDTO[];
};

export type UpdateMeetingRequest = Partial<Omit<MeetingDTO, 'id' | 'creator'>>;

export type UpdateAttendanceRequest = Omit<AttendanceDTO, 'user'>;

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
