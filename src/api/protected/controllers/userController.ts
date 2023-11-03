import {Request, Response} from "express";
import Subscription from "../../../db/models/subscription";
import Channel from "../../../db/models/channel";
import NewSubscriptionInterface from "../../../utils/interfaces/newSubscriptionInterface";
import User from "../../../db/models/user";
import newSubscriptionValidator from "../../../utils/validators/newSubscriptionValidator";
import {ValidationError} from "yup";
import userService from "../services/userService";
import user from "../../../db/models/user";

const UserController = {
    getUserSubscriptions: async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId) || 0;

        const subscriptions: Subscription[] = await Subscription.findAll(
            {
                where: {userId: userId},
                include: Channel,
            }
        );

        res.status(200);
        return res.send({
            user: subscriptions,
            success: true,
        });
    },
    createSubscription: async (req: Request, res: Response) => {
        const subscriptionData: NewSubscriptionInterface = req.body.subscription || {};
        const subscriptionExists = await Subscription.findOne({
            where: {
                userId: subscriptionData.userId,
                channelId: subscriptionData.channelId,
            }
        });

        if (subscriptionExists) {
            res.status(409);

            return res.send({
                error: 'Subscription already exists',
                success: false,
            });
        }

        const channelExists: Channel | null = await Channel.findOne({
            where: {
                id: subscriptionData.channelId,
            }
        });

        const userExists: User | null = await User.findOne({
            where: {
                id: subscriptionData.userId,
            }
        });

        if (!channelExists) {
            res.status(409);

            return res.send({
                message: 'channelId does not exists!',
                success: false,
            });
        }
        if (!userExists) {
            res.status(409);

            return res.send({
                message: 'userId does not exists!',
                success: false,
            });
        }

        newSubscriptionValidator.validate(subscriptionData, {abortEarly: false}).then(async () => {
            const newSubscription: Subscription = await Subscription.create({
                ...subscriptionData,
            });

            if (!newSubscription) {
                res.status(500);

                return res.send({
                    error: 'Server error, subscription was not created!',
                    success: false,
                });
            }

            res.status(200);
            return res.send({
                message: 'Subscription created successfully',
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
            return res.send(registerErrors);
        });
    },
    deleteSubscription: async (req: Request, res: Response) => {
        const subscriptionId: number = parseInt(req.params.subscriptionId) || 0;

        if (!subscriptionId) {
            res.status(400);

            return res.send({
                message: 'subscriptionId is required',
                success: false,
            });
        }

        const subscription: Subscription | null = await Subscription.findByPk(subscriptionId);

        if (!subscription) {
            res.status(404)

            return res.send({
                message: 'Subscription does not exists',
                success: false,
            });
        }

        const deletedSubscriptionCount = await Subscription.destroy({
            where: {
                id: subscriptionId,
            }
        });

        if (deletedSubscriptionCount  === 0) {
            res.status(500);

            return res.send({
                error: 'Server error, subscription was not deleted!',
                success: false,
            });
        }

        res.status(200);
        return res.send({
            message: 'Subscription deleted successfully',
            success: true,
        });
    },
    deleteUser: async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId) || 0;

        if (!userId) {
            res.status(400);

            return res.send({
                message: 'userId is required',
                success: false,
            });
        }

        const isUserDeleted =  await userService.softDeleteUser(userId);

        if (!isUserDeleted) {
            res.status(500);

            return res.send({
                message: 'Server error, user was not deleted!',
                success: false,
            });
        }

        res.status(200);

        return res.send({
            message: 'User deleted successfully',
            success: true,
        });
    },
    restoreUser: async (req: Request, res: Response) => {
        await User.restore({
            where: {
                id: req.params.id,
            },
        });

        return res.send({
            message: "User restored successfully",
            success: true,
        });
    },
}

export default UserController;
