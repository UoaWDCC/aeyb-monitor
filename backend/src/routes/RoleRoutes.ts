import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';
import Permission from '../shared/Types/utils/Permission';
import { getAllRoles, getRole, deleteRole, addRole, updateRole } from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/').get(protect(Permission.VIEW_ROLES), getAllRoles).post(protect(), addRole);
RoleRouter.route('/:roleId')
    .get(protect(Permission.VIEW_ROLES), getRole)
    .delete(protect(Permission.DELETE_ROLES), deleteRole)
    .patch(protect(Permission.UPDATE_ROLES), updateRole);

export default RoleRouter;
