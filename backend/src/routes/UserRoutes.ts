import { Router } from 'express';
import { devLoginUser, getUsers, loginUser } from '../controllers/UserController';
import config from '../types/Config';

const UserRouter = Router();

// Only make this route available in development
if (config.nodeEnv === 'development') {
    UserRouter.post('/devlogin', devLoginUser);
}

UserRouter.post('/login', loginUser);
UserRouter.get('/', getUsers);
// Add routes

export default UserRouter;
