// export const UserPermissions = [
//     'VIEW_USERS',
//     'MANAGE_USERS',
//     'VIEW_MEETINGS',
//     'MANAGE_MEETINGS',
//     'VIEW_ROLES',
//     'MANAGE_ROLES',
// ] as const;

export const UserPermissions = ['VIEW_USERS', 'MANAGE_USERS'] as const;
export const MeetingPermissions = ['VIEW_MEETINGS', 'MANAGE_MEETINGS'] as const;
export const RolePermissions = ['VIEW_ROLES', 'MANAGE_ROLES'] as const;

export type Permission =
    | typeof UserPermissions[number]
    | typeof MeetingPermissions[number]
    | typeof RolePermissions[number];
