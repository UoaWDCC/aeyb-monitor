import Role from '../models/RoleModel';

export const createDefaultRoles = async () => {
    const roleCount = await Role.countDocuments();

    if (roleCount !== 0) {
        return;
    }

    const defaultRole = new Role({
        name: 'Default',
        color: '#262b6c',
        permissions: ['VIEW_MEETINGS'],
    });
    const adminRole = new Role({
        name: 'Admin',
        color: '#262b6c',
        permissions: ['VIEW_MEETINGS', 'VIEW_USERS', 'VIEW_ROLES', 'MANAGE_MEETINGS', 'MANAGE_ROLES', 'MANAGE_USERS'],
    });

    await defaultRole.save();
    await adminRole.save();
};
