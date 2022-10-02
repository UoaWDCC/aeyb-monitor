import mongoose, { model, Schema } from 'mongoose';
import { UserModel } from './UserModel';
import { Attendance, AttendanceSchema } from './AttendanceModel';

enum EventType {
    Meeting = 'meeting',
    Event = 'event',
}

export interface EventModel {
    _id: mongoose.Types.ObjectId;
    name: string;
    creator: UserModel;
    time: Date;
    location: string;
    attendance: Attendance;
    description?: string;
    type: EventType;
}

const eventSchema = new Schema<EventModel>({
    name: {
        type: String,
        required: [true, 'You must specify the name of the event'],
        trim: true,
    },
    creator: {
        type: String,
        ref: 'User',
        required: [true, 'You must specify the user who created the event'],
    },
    time: {
        type: Date,
        required: [true, 'You must specify when the event starts'],
    },
    location: {
        type: String,
        required: [true, 'You must specify where the event takes place'],
        trim: true,
    },
    attendance: {
        type: AttendanceSchema,
        ref: 'Attendance',
        required: [true, 'You must specify the attendance'],
    },
    description: String,
    type: {
        type: String,
        enum: EventType,
        required: [true, 'You must specify the type of event'],
    },
});

const Event = model('Event', eventSchema);

export default Event;
