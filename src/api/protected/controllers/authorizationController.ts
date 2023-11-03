import {NextFunction, Request, Response} from "express";
import AuthorizationService from "../services/authorizationService";


const AuthorizationController = {
    verifyAccess: async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!accessToken) {
            res.status(401);
            return res.send({
                message: "Token was not provided.",
            });
        }

        const isAccessTokenValid: boolean = await AuthorizationService.checkResourceAccess(accessToken);

        if (!isAccessTokenValid) {
            res.status(401);

            return res.send({
                message: "You don`t have access to this resource.",
                isAuthorized: false,
            });
        }

        next();
    },
};

export default AuthorizationController;
