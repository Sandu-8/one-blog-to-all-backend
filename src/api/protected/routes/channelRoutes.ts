import { Router } from 'express';
import ChannelController from "../controllers/channelController";

const channelRoutes: Router = Router();

channelRoutes.post('/create', ChannelController.createChannel);
channelRoutes.put('/update/:channelId', ChannelController.updateChannel);
channelRoutes.delete('/delete/:channelId', ChannelController.deleteChannel);
channelRoutes.get('/allChannels', ChannelController.getAllChannels);
channelRoutes.get('/get/:channelId', ChannelController.getChannel);

export default channelRoutes;
