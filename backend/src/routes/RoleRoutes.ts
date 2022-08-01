import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

import { getAllRoles, getRole, deleteRole, addRole, updateRole } from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/').get(protect(Permission.VIEW_ROLES), getAllRoles).post(protect(Permission.ADMINISTRATOR), addRole);
RoleRouter.route('/:roleId')
    .get(protect(Permission.VIEW_ROLES), getRole)
    .delete(protect(Permission.ADMINISTRATOR), deleteRole)
    .patch(protect(Permission.ADMINISTRATOR), updateRole);

export default RoleRouter;
