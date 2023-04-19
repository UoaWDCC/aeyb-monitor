import Role from '../models/RoleModel';
import User from '../models/UserModel';
import GooglePayload from '../types/GooglePayload';

export const createNewUser = async ({ userId, name, profileUrl }: GooglePayload) => {
    const userCount = await User.countDocuments();
    let roles;
    if (userCount === 0) {
        roles = await Role.find({ name: 'Admin' });
    } else {
        roles = await Role.find({ name: 'Default' });
    }
    return await User.create({
        _id: userId,
        name,
        profileUrl: profileUrl,
        roles,
    });
};
