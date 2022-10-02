import { Router } from 'express';
import {
    devLoginUser,
    getAllUsers,
    loginUser,
    updateUser,
    getUser,
    giveRoles,
    removeRoles,
    getSelf,
} from '../controllers/UserController';
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
UserRouter.route('/@me').get(protect(), getSelf);
UserRouter.route('/:userId')
    .get(protect(Permission.VIEW_USERS), getUser)
    .patch(protect(Permission.UPDATE_USERS), updateUser);

UserRouter.route('/:userId/roles/')
    .post(protect(Permission.GIVE_ROLE), giveRoles)
    .delete(protect(Permission.REMOVE_ROLE), removeRoles);

export default UserRouter;
