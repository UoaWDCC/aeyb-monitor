import { Schema, model, Types, Document, Model, LeanDocument } from 'mongoose';
import UserDTO, { UnpopulatedUserDTO } from '../shared/Types/dtos/UserDTO';
import { applyToJsonOptions } from './Utils';

export interface UserDocument extends Omit<UnpopulatedUserDTO, 'roles'>, Omit<Document<string>, 'id'> {
    roles: Types.ObjectId[];
    asPopulated(): Promise<UserPopulatedDocument>;
    asDTO(): UserDTO;
}

export interface UserPopulatedDocument extends UserDTO, Omit<Document<string>, 'id'> {}

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
