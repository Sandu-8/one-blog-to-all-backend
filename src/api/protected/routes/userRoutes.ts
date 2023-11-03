import { Router } from 'express';
import UserController from "../controllers/userController";

const userRoutes: Router = Router();

userRoutes.get('/subscriptions/:userId', UserController.getUserSubscriptions);
userRoutes.post('/subscribe', UserController.createSubscription);
userRoutes.post('/unsubscribe/:subscriptionId', UserController.deleteSubscription);
userRoutes.delete('/delete/:userId', UserController.deleteUser);
userRoutes.put('/restore/:id', UserController.restoreUser);

export default userRoutes;
