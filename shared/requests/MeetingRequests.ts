import MeetingDTO from '../dtos/MeetingDTO';
import AttendanceDTO from '../dtos/AttendanceDTO';
import LocationDTO from '../dtos/LocationDTO';

export type AddMeetingRequest = Omit<MeetingDTO, 'id' | 'creator' | 'location'> & { location: Omit<LocationDTO, 'id'> };

export type UpdateMeetingRequest = Partial<Omit<MeetingDTO, 'id' | 'creator'>>;

export type UpdateAttendanceRequest = AttendanceDTO;

export type UpdateAbsenceRequest = Partial<Omit<AttendanceDTO, 'feedback' | 'rating' | 'didAttend'>>;

export type AddFeedBackRequest = Partial<Omit<AttendanceDTO, 'canAttend' | 'reason' | 'didAttend'>>;
