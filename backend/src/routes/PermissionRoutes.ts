import { Router } from 'express';

import { getAllPermissions } from '../controllers/PermissionController';

const RoleRouter = Router();

RoleRouter.route('/').get(getAllPermissions);

export default RoleRouter;
