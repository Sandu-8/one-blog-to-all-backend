import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Channel from "./channel";


class Post extends Model {
    declare public id: number;
    declare public title: string;
    declare public image: string;
    declare public content: string;
    declare public channelId: number;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'posts',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default Post;
