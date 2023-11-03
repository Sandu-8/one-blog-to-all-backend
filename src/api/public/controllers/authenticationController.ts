import {Request, Response} from "express";
import AuthenticationService from "../services/authenticationService";
import User from "../../../db/models/user";
import {
    UserAttributesInterface,
    UserCreationAttributesInterface,
    UserLoginAttributesInterface
} from "../../../utils/interfaces/user";
import userCreationValidator from "../../../utils/validators/userCreationValidator";
import {ValidationError} from "yup";
import loginValidator from "../../../utils/validators/loginValidator";
import BlackListTokens from "../../../db/models/blackListTokens";


const AuthenticationController = {
    register: (req: Request, res: Response) => {
        const userData: UserCreationAttributesInterface = req.body.user || {};

        userCreationValidator.validate(userData, {abortEarly: false}).then(async () => {
            const user: UserAttributesInterface | null = await User.findOne({where: {email: userData.email}});

            if (user) {
                res.status(409);

                return res.send({
                    error: 'User already exists',
                    success: false,
                });
            }

            const isUserCreated = await AuthenticationService.createUser(userData);

            if (!isUserCreated) {
                res.status(500);

                return res.send({
                    error: 'Server error!',
                    success: false,
                });
            }

            res.status(200);

            return res.send({
                message: 'User created successfully',
                success: true,
            });
        }).catch((validationErrors) => {
            const registerErrors: Record<string, string> = {};

            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    registerErrors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send({
                registerErrors: registerErrors,
                success: false,
            });
        });
    },
    login: (req: Request, res: Response) => {
        const credentials: UserLoginAttributesInterface = req.body.credentials || {};

        loginValidator.validate(credentials, {abortEarly: false}).then(async () => {
            const user: UserAttributesInterface | null = await User.findOne({where: {email: credentials.email}});

            if (!user) {
                res.status(404)
                return res.send({
                    error: 'You don`t have an account yet!',
                });
            }

            const accessToken = await AuthenticationService.login(credentials, user);

            if (!accessToken) {
                res.status(500)
                return res.send({
                    error: 'Email or password is incorrect!',
                });
            }

            res.status(200);

            return res.send({
                message: 'User logged in successfully',
                accessToken: accessToken,
                userId: user.id,
            });
        }).catch((validationErrors) => {

            const registerErrors: Record<string, string> = {};

            validationErrors.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    registerErrors[error.path] = error.message;
                }
            });

            res.status(400);
            return res.send(registerErrors);
        });
    },
    logout: async (req: Request, res: Response)=> {
        try {
        const userId = req.params.userId;
        const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404);

            return res.send({
                message: 'User not found!',
                success: false,
            });
        }

        await BlackListTokens.create({
            userId: userId,
            token: accessToken,
        });

        res.status(200);

        return res.send({
            message: 'User logged out successfully!',
            success: true,
        });
            } catch {
            res.status(500);

            return res.send({
                message: 'Server error, cant logout!',
                success: false,
            });
        }
    }
};

export default AuthenticationController;
