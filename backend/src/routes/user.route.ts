import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userrouter = Router();

userrouter.post('/register', userController.register);
userrouter.post('/login', userController.login);

//userrouter.post('/users', userController.logout);

export default userrouter;