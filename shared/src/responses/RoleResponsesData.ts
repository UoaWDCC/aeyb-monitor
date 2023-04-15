import RoleDTO from '../dtos/RoleDTO';

export interface GetAllRolesData {
    /** The number of roles returned. */
    results: number;
    roles: RoleDTO[];
}

export interface GetRoleData {
    /** The number of users with the role. */
    userCount: number;
    role: RoleDTO;
}

export interface AddRoleData {
    /** The newly created role. */
    role: RoleDTO;
}

export interface DeleteRoleData {
    /** The number of users who had the role removed from them. */
    modifiedUserCount: number;
}

export interface UpdateRoleData {
    /** The updated role. */
    role: RoleDTO;
}
