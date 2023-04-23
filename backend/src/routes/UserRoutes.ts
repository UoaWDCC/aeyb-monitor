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

const UserRouter = Router();

// Only make this route available in development
if (process.env.NODE_ENV === 'development') {
    UserRouter.post('/devlogin', devLoginUser);
}

UserRouter.post('/login', loginUser);

UserRouter.route('/').get(protect('VIEW_USERS'), getAllUsers);
UserRouter.route('/@me').get(protect(), getSelf);
UserRouter.route('/:userId').get(protect('VIEW_USERS'), getUser).patch(protect('MANAGE_USERS'), updateUser);

UserRouter.route('/:userId/roles/')
    .post(protect('MANAGE_ROLES'), giveRoles)
    .delete(protect('MANAGE_ROLES'), removeRoles);

export default UserRouter;
