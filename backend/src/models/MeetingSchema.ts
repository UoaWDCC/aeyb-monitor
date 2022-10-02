import mongoose from 'mongoose';
import MeetingModel from '../shared/Types/models/MeetingModel';
import { AttendanceSchema } from './AttendanceSchema';
import { applyToJsonOptions } from './Utils';

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
        required: [true, 'You must specify the attendance'],
    },
    description: {
        type: String,
    },
});

applyToJsonOptions(meetingSchema);

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
