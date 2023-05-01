import { model, Schema } from 'mongoose';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import { DocumentModel } from '../types/UtilTypes';
import { AttendanceSchema } from './AttendanceModel';
import { UserDocument } from './UserModel';
import { applyToJsonOptions } from './Utils';

export interface MeetingDocument extends DocumentModel<Omit<MeetingDTO, 'creator'>> {
    creator: string;
    asPopulated(): Promise<MeetingPopulatedDocument>;
}

export interface MeetingPopulatedDocument extends DocumentModel<MeetingDTO> {}

const meetingSchema = new Schema<MeetingDocument>({
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
        type: Number,
        required: [true, 'You must specify when the event starts in ms'],
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'You must specify the where the meeting was held'],
    },
    attendance: [AttendanceSchema],
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['meeting', 'event'],
        required: [true, 'You must specify the type of event'],
    },
});

applyToJsonOptions(meetingSchema);

meetingSchema.methods.asPopulated = async function (this: UserDocument) {
    if (this.populated('creator')) {
        return this;
    }
    return await this.populate('creator');
};

const Meeting = model('Meeting', meetingSchema);

export default Meeting;
