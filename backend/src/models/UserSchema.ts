import { Schema, model } from 'mongoose';
import UserModel from '../shared/Types/models/UserModel';
import { applyToJsonOptions } from './Utils';

// The user id will be their google id, rather than a generated ObjectId
const userSchema = new Schema<UserModel & { _id: string }>({
    _id: String,
    name: {
        type: String,
        required: [true, "You must specify the user's name"],
        trim: true,
    },
    profileUrl: String,
    roles: {
        type: [{ type: String, ref: 'Role' }],
        default: [],
    },
});

applyToJsonOptions(userSchema);

const User = model('User', userSchema);

export default User;
