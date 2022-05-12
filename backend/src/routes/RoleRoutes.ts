import { Router } from 'express';
import {
    getAllRoles,
    getRole,
    deleteRole,
    addRole,
    updateRole,
} from '../controllers/RoleController';

const RoleRouter = Router();

RoleRouter.route('/').get(getAllRoles).post(addRole);
RoleRouter.route('/:id').get(getRole).delete(deleteRole).patch(updateRole);

export default RoleRouter;
