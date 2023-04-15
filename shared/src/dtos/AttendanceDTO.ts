import UserDTO from './UserDTO';

export interface InvitedDTO {
    /**
     * The ids of the specific users invited. This is primarily for when you
     * want a meeting with an individual user and not everyone with a particular
     * role.
     */
    userIds: string[];

    /** The ids of the roles invited. */
    roleIds: string[];
}

export default interface AttendanceDTO {
    /** A list of the users who attended the meeting. */
    attendedUsers: UserDTO[];

    /** A mapping of the absent user's ids to the reason for their absence. */
    absentUsers: Map<string, string>;

    /** The roles and users invited to attend. */
    invited: InvitedDTO;
}