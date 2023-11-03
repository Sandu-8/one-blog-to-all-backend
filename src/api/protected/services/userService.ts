import sequelizeConnection from "../../../db/config";
import User from "../../../db/models/user";
import Subscription from "../../../db/models/subscription";
import Post from "../../../db/models/post";
import Channel from "../../../db/models/channel";

const UserService = {
    softDeleteUser: async (id: number) => {
        const t = await sequelizeConnection.transaction();

        try {

            await User.destroy({
                where: {
                    id: id,
                },
                transaction: t,
            });

            await Subscription.destroy({
                where: {
                    userId: id,
                },
                transaction: t,
            });
            const channelsIds = await Channel.findAll({
                where: {
                    creatorId: id,
                },
                attributes: ['id'],
            });

            const ids = channelsIds.map((channel) => channel.id);

            await Channel.destroy({
                where: {
                    creatorId: id,
                },
                transaction: t,
            });
//did not teste with posts also must delete comments
            await Post.destroy({
                where: {
                    id: ids,
                },
                transaction: t,
            })

            await t.commit();

            return true;

        } catch (error) {
            await t.rollback();
            return false;
        }
    },
};

export default UserService;
