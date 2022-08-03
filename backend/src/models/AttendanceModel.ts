import { Schema } from 'mongoose';
import { UserModel } from './UserModel';
import { RoleModel } from './RoleModel';

export interface Attendance {
    attendedUsers: UserModel[];
    absentUsers: Map<string, string>;
    invited: [UserModel[], RoleModel[]];
}

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
            users: [{ type: String, ref: 'User' }],
            roles: {
                type: [{ type: String, ref: 'Role' }],
                required: [true, 'You must specify the roles invited'],
            },
        },
    },
    { _id: false },
);
