import { Router } from 'express';
import { devLoginUser, getAllUsers, loginUser, updateUser } from '../controllers/UserController';
import protect from '../middleware/AuthMiddleware';
import config from '../types/Config';
import Permission from '../types/Perm';

const UserRouter = Router();

// Only make this route available in development
if (config.nodeEnv === 'development') {
    UserRouter.post('/devlogin', devLoginUser);
}

UserRouter.post('/login', loginUser);

UserRouter.route('/').get(protect(Permission.VIEW_USERS), getAllUsers);
UserRouter.route('/:id').patch(protect(Permission.UPDATE_USERS), updateUser);

export default UserRouter;
