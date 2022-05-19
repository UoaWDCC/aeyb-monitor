import { Schema, model, Types } from 'mongoose';
import { RoleModel } from './Role';

// TODO: Replaces roles type with RoleModel[]
export interface UserModel {
    _id: string;
    name: string;
    roles: RoleModel[];
}

// The user id will be their google id, rather than a generated ObjectId
const userSchema = new Schema<UserModel>({
    _id: {
        type: String,
        required: [true, "You must specify a user's id"],
    },
    name: {
        type: String,
        required: [true, "You must specify the user's name"],
        trim: true,
    },
    roles: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
        default: [],
    },
});

const User = model('User', userSchema);

export default User;
