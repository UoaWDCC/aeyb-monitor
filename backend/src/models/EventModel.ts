import mongoose, { model, Schema } from 'mongoose';
import { UserModel } from './UserModel';

export interface EventModel {
    _id: mongoose.Types.ObjectId;
    name: string;
    creator: UserModel;
    time: Date;
    location: string;
    description?: string;
}

const eventSchema = new Schema<EventModel>({
    name: {
        type: String,
        required: [true, 'You must specify the name of the event'],
        trim: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
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
    description: String,
});

const Event = model('event', eventSchema);

export default Event;
