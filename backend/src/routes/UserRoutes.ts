import { Router } from 'express';
import { devLoginUser, getUsers, loginUser } from '../controllers/UserController';
import auth from '../middleware/AuthMiddleware';
import config from '../types/Config';

const UserRouter = Router();

// Only make this route available in development
if (config.nodeEnv === 'development') {
    UserRouter.post('/devlogin', devLoginUser);
}

UserRouter.post('/login', loginUser);
UserRouter.get('/', auth(), getUsers);
// Add routes

export default UserRouter;
