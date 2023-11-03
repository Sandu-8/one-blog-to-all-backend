import {ChannelCreationInterface} from "../../../utils/interfaces/channelCreationInterface";
import {Request, Response} from "express";
import {channelCreateValidator} from "../../../utils/validators/channelCreateValidator";
import User from "../../../db/models/user";
import Channel from "../../../db/models/channel";
import {ValidationError} from "yup";
import {ChannelUpdateInterface} from "../../../utils/interfaces/channelUpdateInterface";
import channelUpdateValidator from "../../../utils/validators/channelUpdateValidator";
import Post from "../../../db/models/post";

const ChannelController = {
    createChannel: async (req: Request, res: Response) => {
        const channelData: ChannelCreationInterface = req.body.channel || {};

        const channelExists: Channel | null = await Channel.findOne(
            {where: {name: channelData.name},}
        );

        if (channelExists) {
            res.status(409);

            return res.send({
                error: 'Channel already exists',
                success: false,
            });
        }

        channelCreateValidator.validate(channelData, {abortEarly: false}).then(async () => {
            const user: User | null = await User.findByPk(channelData.creatorId);

            if (!user) {
                res.status(404);

                return res.send({
                    error: 'User not found',
                    success: false,
                });
            }

            const channel: Channel = await Channel.create({
                ...channelData,
            });

            if (!channel) {
                res.status(500);

                return res.send({
                    error: 'Server error, channel was not created!',
                    success: false,
                });
            }

            res.status(200);
            return res.send({
                message: 'Channel created successfully',
                channel: channel,
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
    updateChannel: async (req: Request, res: Response) => {
        const channelData: ChannelUpdateInterface = req.body.channel || {};
        const channelId: number = parseInt(req.params.channelId) || 0;
//check name exists and say name already used
        const channelExists: Channel | null = await Channel.findOne(
            {where: {id: channelId},}
        );

        if (!channelExists) {
            res.status(409);

            return res.send({
                error: 'Channel does not exists',
                success: false,
            });
        }

        if (!channelId) {
            res.status(400);

            return res.send({
                error: 'ChannelId is required',
                success: false,
            });
        }

        channelUpdateValidator.validate(channelData, {abortEarly: false}).then(async () => {
            const affectedRows: [affectedCount: number] = await Channel.update({
                ...channelData,
            }, {where: {id: channelId}});
            if (!affectedRows[0]) {
                res.status(500);

                return res.send({
                    error: 'Server error, channel was not created!',
                    success: false,
                });
            }

            res.status(200)
            return res.send({
                message: 'Channel updated successfully',
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
    getChannel: async (req: Request, res: Response) => {
        const channelId: number = parseInt(req.params.channelId) || 0;

        if (!channelId) {
            res.status(400);

            return res.send({
                error: 'ChannelId is required',
                success: false,
            });
        }

        const channel = await Channel.findByPk(channelId, {
            include: Post,
        });

        if (!channel) {
            res.status(404);

            return res.send({
                message: "Channel not found",
                success: false,
            });
        }

        res.status(200);

        return res.send({
            channel: channel,
            success: true,
        });
    },
    deleteChannel: async (req: Request, res: Response) => {
        const channelId: number = parseInt(req.params.channelId) || 0;

        const channelExists: Channel | null = await Channel.findOne(
            {where: {id: channelId},}
        );

        if (!channelExists) {
            res.status(409);

            return res.send({
                error: 'Channel does not exists',
                success: false,
            });
        }

        if (!channelId) {
            res.status(400);

            return res.send({
                error: 'ChannelId is required',
                success: false,
            });
        }

        const isChannelDeleted = await Channel.destroy({
           where: { id: channelId },
        });

        if (!isChannelDeleted) {
            res.status(500);

            return res.send({
                error: 'Server error, channel was not deleted!',
                success: false,
            });
        }

        res.status(200);
        return res.send({
            message: 'Channel deleted successfully',
            success: true,
        });

    },
    getAllChannels: async (req: Request, res: Response) => {
        const channels: Channel[] = await Channel.findAll();

        res.status(200);
        return res.send({
            channels: channels,
            success: true,
        });
    },
};

export default ChannelController;
