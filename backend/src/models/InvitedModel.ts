import mongoose from 'mongoose';
import { UserModel } from './UserModel';
import { RoleModel } from './RoleModel';

export interface InvitedModel {
    _id: mongoose.Types.ObjectId;
    users: UserModel[];
    roles: RoleModel[];
}

const invitedSchema = new mongoose.Schema<InvitedModel>({
    users: {
        type: [{type: String, ref: 'User'}],
    },
    roles: {
        type: [{type: String, ref: 'Role'}],
        required: [
            true,
            "You must specify the roles' of those who are invited",
        ],
    },
});

const Invited = mongoose.model('Invited', invitedSchema);

export default Invited;
