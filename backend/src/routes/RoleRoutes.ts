import { Router } from 'express';
import protect from '../middleware/ProtectRoute';
import Permission from '../types/Perm';

import {
    getAllRoles,
    getRole,
    deleteRole,
    addRole,
    updateRole,
} from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/')
    .get(protect(Permission.VIEW_ROLES), getAllRoles)
    .post(protect(Permission.ADD_ROLES), addRole);
RoleRouter.route('/:id')
    .get(protect(Permission.VIEW_ROLES), getRole)
    .delete(protect(Permission.DELETE_ROLES), deleteRole)
    .patch(protect(Permission.UPDATE_ROLES), updateRole);

export default RoleRouter;
