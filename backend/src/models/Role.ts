import mongoose from 'mongoose';

export interface Role {
    _id: mongoose.Types.ObjectId;
    name: string;
    color: string;
    permissions: string[];
}

const roleSchema = new mongoose.Schema<Role>({
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

const Role = mongoose.model('Role', roleSchema);

export default Role;
