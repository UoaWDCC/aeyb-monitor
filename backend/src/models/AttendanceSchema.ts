import { Schema } from 'mongoose';
import AttendanceModel from '../shared/Types/models/AttendanceModel';

export const AttendanceSchema = new Schema<AttendanceModel>(
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
