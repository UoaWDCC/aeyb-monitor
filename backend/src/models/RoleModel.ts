import mongoose from 'mongoose';
import RoleDTO from '@shared/dtos/RoleDTO';
import { DocumentModel } from '../types/UtilTypes';
import { applyToJsonOptions } from './Utils';

export interface RoleDocument extends DocumentModel<RoleDTO> {}

const roleSchema = new mongoose.Schema<RoleDocument>({
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
            enum: [
                'VIEW_ROLES',
                'MANAGE_ROLES',
                'VIEW_USERS',
                'MANAGE_USERS',
                'VIEW_MEETINGS',
                'MANAGE_MEETINGS',
                'VIEW_LOCATIONS',
                'MANAGE_LOCATIONS',
            ],
        },
    ],
});

applyToJsonOptions(roleSchema);

const Role = mongoose.model('Role', roleSchema);

export default Role;
