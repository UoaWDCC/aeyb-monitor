import { Router } from 'express';
import { devLoginUser, getUsers, loginUser } from '../controllers/UserController';
import protect from '../middleware/AuthMiddleware';
import config from '../types/Config';

const UserRouter = Router();

// Only make this route available in development
if (config.nodeEnv === 'development') {
    UserRouter.post('/devlogin', devLoginUser);
}

UserRouter.post('/login', loginUser);
UserRouter.get('/', protect(), getUsers);
// Add routes

export default UserRouter;
