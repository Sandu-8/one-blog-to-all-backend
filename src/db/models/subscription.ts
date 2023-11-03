import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import User from "./user";
import Channel from "./channel";

class Subscription extends Model {
    declare public id: number;
    declare public userId: number;
    declare public channelId: number;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;
}

Subscription.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    channelId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Channel,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'subscriptions',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default Subscription;
