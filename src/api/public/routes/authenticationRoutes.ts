import { Router } from 'express';
import AuthenticationController from "../controllers/authenticationController";

const authenticationRoutes = Router();

authenticationRoutes.post('/register',  AuthenticationController.register);
authenticationRoutes.post('/login',   AuthenticationController.login);

export default authenticationRoutes;
