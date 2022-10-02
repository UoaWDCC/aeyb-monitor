import mongoose from 'mongoose';
import { UserModel } from './UserModel';
import { AttendanceSchema, Attendance } from './AttendanceModel';

enum EventType {
    Meeting = 'meeting',
    Event = 'event',
}

export interface MeetingModel {
    _id: mongoose.Types.ObjectId;
    name: string;
    creator: UserModel;
    time: Date;
    location: string;
    attendance: Attendance;
    description?: string;
    type: EventType;
}

const meetingSchema = new mongoose.Schema<MeetingModel>({
    name: {
        type: String,
        required: [true, "You must specify the meeting's name"],
        trim: true,
    },
    creator: {
        type: String,
        ref: 'User',
        required: [true, "You must specify the creator's id"],
    },
    time: {
        type: Date,
        required: [true, 'You must specify when the event starts'],
    },
    location: {
        type: String,
        required: [true, 'You must specify the where the meeting was held'],
    },
    attendance: {
        type: AttendanceSchema,
        ref: 'Attendance',
        required: [true, 'You must specify the attendance'],
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: EventType,
        required: [true, 'You must specify the type of event'],
    },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
