import { Router } from 'express';
import { getUsers } from '../controllers/UserController';

const UserRouter = Router();

UserRouter.get('/', getUsers);
// Add routes

export default UserRouter;
