import { Router } from 'express';
import channelRoutes from "./routes/channelRoutes";
import userRoutes from "./routes/userRoutes";
import authenticationRoutes from "../public/routes/authenticationRoutes";
import postRoutes from "./routes/postRoutes";
import authenticationController from "../public/controllers/authenticationController";

const protectedRoutes: Router = Router();

protectedRoutes.use('/channel', channelRoutes);
protectedRoutes.use('/user', userRoutes);
protectedRoutes.use('/post', postRoutes);
protectedRoutes.post('/logout/:userId', authenticationController.logout);

export default protectedRoutes;
