import { Schema, model, Types, Document, Model } from 'mongoose';
import UserModel, { PopulatedUser } from '../shared/Types/models/UserModel';
import { applyToJsonOptions } from './Utils';

export interface UserDocument extends Omit<UserModel, 'roles'>, Omit<Document<string>, 'id'> {
    roles: Types.ObjectId[];
    asPopulated(): Promise<UserPopulatedDocument>;
}

export interface UserPopulatedDocument extends PopulatedUser, Omit<Document<string>, 'id'> {}

export interface TypedUserModel extends Model<UserDocument> {
    findByIdWithRoles(id: string): Promise<UserPopulatedDocument>;
}

// The user id will be their google id, rather than a generated ObjectId
const userSchema = new Schema<UserDocument, TypedUserModel>({
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

userSchema.methods.asPopulated = async function (this: UserDocument) {
    if (this.populated('roles')) {
        return this;
    }
    return await this.populate('roles');
};

userSchema.statics.findByIdWithRoles = async function (this: Model<UserDocument>, id: string) {
    return await this.findById(id).populate('roles');
};

const User = model<UserDocument, TypedUserModel>('User', userSchema);

export default User;
