import RoleDTO from '../dtos/RoleDTO';
import UserDTO from '../dtos/UserDTO';
import Permission from '../utils/Permission';

export interface LoginData extends GetUserData {
    /** The JWT token that can be used to authenticate future requests. */
    token: string;
}

export type GetSelfData = {
    /** The currently logged in user. */
    self: UserDTO;

    /** A list of the unique permissions the logged in user has. */
    permissions: Permission[];
};

export interface GetAllUsersData {
    /** The number of users returned. */
    results: number;
    users: UserDTO[];
}

export interface GetUserData {
    /** A list of the unique permissions the logged in user has. */
    permissions: Permission[];
    user: UserDTO;
}

export interface UpdateUserData {
    /** The updated user. */
    user: UserDTO;
}

export interface GiveRolesData {
    /** The updated user. */
    user: UserDTO;

    /** A list of the roles that the user didn't have and so were added to the user. */
    addedRoles: RoleDTO[];
}

export interface RemoveRolesData {
    /** The updated user. */
    user: UserDTO;

    /** A list of the roles that the user had and so were removed from the user. */
    removedRoles: RoleDTO[];
}
