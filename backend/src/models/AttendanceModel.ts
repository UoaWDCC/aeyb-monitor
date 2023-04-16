import { Schema } from 'mongoose';
import AttendanceDTO from '@shared/dtos/AttendanceDTO';

export const AttendanceSchema = new Schema<AttendanceDTO>(
    {
        attendedUsers: {
            type: [{ type: String, ref: 'User' }],
        },
        absentUsers: {
            type: Map,
            of: String,
        },
        invited: {
            type: {
                userIds: [String],
                roleIds: [String],
            },
            required: [true, 'You must state who is invited'],
        },
    },
    { _id: false },
);
