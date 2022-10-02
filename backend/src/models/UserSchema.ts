import { Schema, model, Types } from 'mongoose';
import UserModel from '../shared/Types/models/UserModel';
import { DBModel } from '../types/UtilTypes';
import { applyToJsonOptions } from './Utils';

export type UserDBModel = DBModel<Omit<UserModel, 'roles'>, string> & { roles: Types.ObjectId[] };

// The user id will be their google id, rather than a generated ObjectId
const userSchema = new Schema<UserDBModel>({
    _id: String,
    name: {
        type: String,
        required: [true, "You must specify the user's name"],
        trim: true,
    },
    profileUrl: String,
    roles: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
        default: [],
    },
});

applyToJsonOptions(userSchema);

const User = model('User', userSchema);

export default User;
