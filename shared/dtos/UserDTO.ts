import RoleDTO from './RoleDTO';

export default interface UserDTO {
    id: string;
    name: string;
    profileUrl?: string;

    /** The roles this user has */
    roles: RoleDTO[];
}

/**
 * The roles field in the UserModel only contains the ids of the roles the user has.
 */
export type UnpopulatedUserDTO = Omit<UserDTO, 'roles'> & { roles: string[] };