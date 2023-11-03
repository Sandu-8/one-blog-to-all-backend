import {Request, Response, Router} from "express";
import setDefaultHeader from "../utils/helper_functions/setDefaultHeader";
import publicRoutes from "./public/publicRoutes";
import AuthorizationService from "./protected/services/authorizationService";
import AuthorizationController from "./protected/controllers/authorizationController";
import protectedRoutes from "./protected/protectedRoutes";

const routes = Router();

routes.use(setDefaultHeader);
routes.use('/public', publicRoutes);
routes.use('/protected', AuthorizationController.verifyAccess, protectedRoutes);
routes.use('*', (req: Request, res: Response) => {
    res.status(404).send({
        message: 'Not Found from express',
    })
});

export default routes;
