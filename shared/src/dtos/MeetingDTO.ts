import AttendanceDTO from './AttendanceDTO';
import { UnpopulatedUserDTO } from './UserDTO';

export enum MeetingType {
    Meeting = 'meeting',
    Event = 'event',
}

export default interface MeetingDTO {
    id: string;
    type: MeetingType;
    creator: UnpopulatedUserDTO;
    name: string;

    /** The time value in ms when this meeting is scheduled for. */
    time: number;
    location: string;
    attendance: AttendanceDTO;

    /** The optional description for this meeting. */
    description?: string;
}