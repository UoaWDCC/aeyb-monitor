import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'You must specify the role name'],
        unique: true,
        trim: true,
        maxLength: 32,
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
