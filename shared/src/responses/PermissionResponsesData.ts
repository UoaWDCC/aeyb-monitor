import Permission from '../utils/Permission';

export interface GetAllPermissionsData {
    /** A list of all the possible permissions a user can have. */
    permissions: Permission[];
}
