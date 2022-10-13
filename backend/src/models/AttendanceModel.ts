import mongoose from 'mongoose';

export interface AttendanceModel {
    canAttend: boolean;
    didAttend?: boolean;
    meetingRating?: number;
    feedback?: string;
    reason?: string;
}

const AttendanceSchema = new mongoose.Schema<AttendanceModel>(
    {
        canAttend: {
            type: 'boolean',
            required: [true, 'You must specify your attendance'],
            default: null,
        },
        didAttend: {
            type: 'boolean',
        },
        meetingRating: {
            type: 'number',
        },
        feedback: {
            type: 'string',
        },
        reason: {
            type: 'string',
        },
    },
    { _id: false },
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
