import { Router } from 'express';
import { devLoginUser, getUsers, loginUser } from '../controllers/UserController';

const UserRouter = Router();

UserRouter.post('/devlogin', devLoginUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/', getUsers);
// Add routes

export default UserRouter;
