import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

import { getAllGroups } from '../controllers/GroupController';

const GroupRouter = Router();

GroupRouter.route('/').get(protect(Permission.VIEW_GROUPS), getAllGroups);

export default GroupRouter;
