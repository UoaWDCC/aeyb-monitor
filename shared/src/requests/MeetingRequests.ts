import MeetingDTO from '../dtos/MeetingDTO';
import AttendanceDTO from '../dtos/AttendanceDTO';

export type AddMeetingRequest = Omit<MeetingDTO, 'id' | 'creator'>;

export type UpdateMeetingRequest = Partial<Omit<MeetingDTO, 'id' | 'creator'>>;

export type UpdateAbsenceRequest = Partial<Omit<AttendanceDTO, 'feedback' | 'rating' | 'didAttend'>>;

export type AddFeedBackRequest = Partial<Omit<AttendanceDTO, 'canAttend' | 'reason' | 'didAttend'>>;

export type UpdateAttendanceRequest = Partial<Omit<AttendanceDTO, 'feedback' | 'rating' | 'canAttend' | 'reason'>>;
