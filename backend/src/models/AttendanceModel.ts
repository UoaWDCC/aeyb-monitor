import { Schema } from 'mongoose';
import { UserModel } from './UserModel';
import { RoleModel } from './RoleModel';

interface Invited {
    users: UserModel[];
    roles: RoleModel[];
}

export interface Attendance {
    attendedUsers: UserModel[];
    absentUsers: Map<string, string>;
    invited: Invited;
}

const InvitedSchema = new Schema(
    {
        users: [{ type: String, ref: 'User' }],
        roles: {
            type: [{ type: String, ref: 'Role' }],
            required: [true, 'You must specify the roles invited'],
        },
    },
    { _id: false },
);

export const AttendanceSchema = new Schema(
    {
        attendedUsers: {
            type: [{ type: String, ref: 'User' }],
        },
        absentUsers: {
            type: Map,
            of: String,
        },
        invited: {
            type: InvitedSchema,
            required: [true, 'You must state who is invited'],
        },
    },
    { _id: false },
);
