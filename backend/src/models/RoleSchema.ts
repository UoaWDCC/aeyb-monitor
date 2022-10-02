import mongoose from 'mongoose';
import RoleModel from '../shared/Types/models/RoleModel';
import { applyToJsonOptions } from './Utils';

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
    permissions: [String],
});

applyToJsonOptions(roleSchema);

const Role = mongoose.model('Role', roleSchema);

export default Role;
