import { Router } from 'express';
import {
  signup,
  logout,
  login,
  checkAuth,
} from '../controller/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.get('/check', checkAuth);

export default authRoute;
