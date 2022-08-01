import { Types } from 'mongoose';

enum Permission {
    VIEW_ROLES = 'VIEW_ROLES',
    DELETE_ROLES = 'DELETE_ROLES',
    UPDATE_ROLES = 'UPDATE_ROLES',
    ADD_ROLES = 'ADD_ROLES',

    VIEW_USERS = 'VIEW_ROLES',
    UPDATE_USERS = 'UPDATE_USERS',

    GIVE_ROLE = 'GIVE_ROLE',
    REMOVE_ROLE = 'REMOVE_ROLE',

    VIEW_GROUPS = 'VIEW_GROUPS',
    DELETE_GROUP = 'DELETE_GROUP',
    UPDATE_GROUP = 'UPDATE_GROUP',
    ADD_GROUP = 'ADD_GROUP',
}

export interface PermissionObj {
    permission: Permission;
    reach: Types.ObjectId;
}
export default Permission;
