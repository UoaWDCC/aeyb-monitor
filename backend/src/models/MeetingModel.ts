import mongoose from 'mongoose';
import MeetingDTO, { MeetingType } from '../shared/Types/dtos/MeetingDTO';
import { AttendanceSchema } from './AttendanceModel';
import { applyToJsonOptions } from './Utils';

const meetingSchema = new mongoose.Schema<MeetingDTO>({
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
    type: {
        type: String,
        enum: MeetingType,
        required: [true, 'You must specify the type of event'],
    },
});

applyToJsonOptions(meetingSchema);

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
