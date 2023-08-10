export const UserPermissions = ['VIEW_USERS', 'MANAGE_USERS'] as const;
export const MeetingPermissions = ['VIEW_MEETINGS', 'MANAGE_MEETINGS'] as const;
export const RolePermissions = ['VIEW_ROLES', 'MANAGE_ROLES'] as const;
export const LocationPermissions = ['VIEW_LOCATIONS', 'MANAGE_LOCATIONS'] as const;

export type Permission =
    | typeof UserPermissions[number]
    | typeof MeetingPermissions[number]
    | typeof RolePermissions[number]
    | typeof LocationPermissions[number];
