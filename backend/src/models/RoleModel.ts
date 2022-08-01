import mongoose from 'mongoose';
import { PermissionObj } from '../types/Perm';
import config from '../types/Config';

export interface RoleModel {
    _id: mongoose.Types.ObjectId;
    name: string;
    color: string;
    group: mongoose.Schema.Types.ObjectId;
    permissions: [PermissionObj];
}

const roleSchema = new mongoose.Schema<RoleModel>({
    name: {
        type: String,
        required: [true, 'You must specify the role name'],
        unique: true,
        trim: true,
        maxLength: [32, 'The length of the role name cannot be greater than 32'],
    },
    color: {
        type: String,
        validate: {
            validator: function (s: string) {
                return /^#[0-9A-F]{6}$/i.test(s);
            },
        },
        default: '#ffffff',
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        default: config.defaultGroupId,
    },

    permissions: {
        type: [],
    },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
