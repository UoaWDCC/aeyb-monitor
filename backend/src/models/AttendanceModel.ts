import { Schema } from 'mongoose';
import AttendanceDTO from '@shared/dtos/AttendanceDTO';

export const AttendanceSchema = new Schema<AttendanceDTO>(
    {
        // attendedUsers: {
        //     type: [{ type: String, ref: 'User' }],
        // },
        // absentUsers: {
        //     type: Map,
        //     of: String,
        // },
        // invited: {
        //     type: {
        //         userIds: [String],
        //         roleIds: [String],
        //     },
        //     required: [true, 'You must state who is invited'],
        // },
        user: {
            type: String,
            ref: 'User',
            required: [true, 'You must state the user who attended'],
        },
        didAttend: {
            type: Boolean,
            default: false,
        },
        notes: String,
        feedbackRating: {
            type: Number,
            min: 1,
            max: 5,
        },
        feedbackDescription: String,
    },
    { _id: false },
);
