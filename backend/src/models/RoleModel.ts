import mongoose from 'mongoose';
import RoleDTO from '../shared/Types/dtos/RoleDTO';
import Permission from '../shared/Types/utils/Permission';
import { applyToJsonOptions } from './Utils';

const roleSchema = new mongoose.Schema<RoleDTO>({
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
    permissions: [
        {
            type: String,
            enum: Permission,
        },
    ],
});

applyToJsonOptions(roleSchema);

const Role = mongoose.model('Role', roleSchema);

export default Role;
