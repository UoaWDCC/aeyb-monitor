import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';
import { getAllRoles, getRole, deleteRole, addRole, updateRole } from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/').get(protect('VIEW_ROLES'), getAllRoles).post(protect('MANAGE_ROLES'), addRole);
RoleRouter.route('/:roleId')
    .get(protect('VIEW_ROLES'), getRole)
    .delete(protect('MANAGE_ROLES'), deleteRole)
    .patch(protect('MANAGE_ROLES'), updateRole);

export default RoleRouter;
