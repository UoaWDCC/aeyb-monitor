import UserDTO from '../dtos/UserDTO';

/**
 * This is an endpoint that's available during development and should **only be used
 * for testing in Postman**.
 *
 * If a user with the specified id doesn't exist, then a new user will be created.
 */
export interface DevLoginRequest {
    /** The id of the user you're logging in as. */
    id: string;

    /** If a user is being created using this name. In this case, the name is required. */
    name?: string;

    /** If a user is being created using this optional profile picture url. */
    profileUrl?: string;
}

export interface LoginRequest {
    /** The id token you receive when you login with google. */
    credential: string;
}

export type UpdateUserRequest = Partial<Omit<UserDTO, 'id'>>;

export interface GiveRolesRequest {
    /**
     * The ids of the roles to give the user. There are several constraints that apply to this request:
     * 1. There must be at least 1 role id
     * 2. The role ids must be valid
     *
     * If any of these requirements aren't met, you'll receive an {@link UnsuccessfulResponse}.
     */
    roleIds: string[];
}

export interface RemoveRolesRequest {
    /**
     * The ids of the roles to remove from the user. There are several constraints that apply to this request:
     * 1. There must be at least 1 role id
     * 2. The role ids must be valid
     *
     * If any of these requirements aren't met, you'll receive an {@link UnsuccessfulResponse}.
     */
    roleIds: string[];
}
