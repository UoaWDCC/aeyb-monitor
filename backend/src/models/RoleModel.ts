import mongoose from 'mongoose';
import { PermissionObj } from '../types/Perm';
import config from '../types/Config';

export interface RoleModel {
    _id: mongoose.Types.ObjectId;
    name: string;
    rank: number;
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
    rank: {
        type: Number,
        max: [99999999999998, 'No role can be ranked more than the admin role'],
        unique: true,
        required: [true, 'You must provide a role rank'],
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
