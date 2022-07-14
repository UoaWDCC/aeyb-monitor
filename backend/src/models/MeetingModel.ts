import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface MeetingModel {
    _id: string;
    name: string;
    creator: string;
    time: Date;
    invited: Map<string, string[]>;
    where: string;
    attendance: string;
    description: string;
}

const meetingSchema = new mongoose.Schema<MeetingModel>({
    _id: {
        type: String,
        required: [true, "You must specify a meeting's id"],
    },
    name: {
        type: String,
        required: [true, "You must specify the meeting's name"],
        trim: true,
    },
    creator: {
        type: String,
        required: [true, "You must specify the creator's id"],
    },
    time: {
        type: Date,
        required: [true, 'You must specify when the event starts'],
    },
    invited: {
        type: Map,
        of: [String],
        required: [true, "You must specify the invited users' id"],
    },
    where: {
        type: String,
        required: [true, 'You must specify the where the meeting was held'],
    },
    attendance: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must specify the attendance reference'],
    },
    description: {
        type: String,
    },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
