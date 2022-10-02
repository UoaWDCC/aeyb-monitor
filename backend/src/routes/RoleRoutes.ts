import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

import { getAllRoles, getRole, deleteRole, addRole, updateRole } from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/').get(protect(Permission.VIEW_ROLES), getAllRoles).post(protect(Permission.ADD_ROLES), addRole);
RoleRouter.route('/:roleId').get(protect(), getRole).delete(protect(), deleteRole).patch(protect(), updateRole);

export default RoleRouter;
