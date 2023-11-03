import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import User from "./user";
import Post from "./post";


class Comment extends Model {
    declare public id: number;
    declare public userId: number;
    declare public postId: number;
    declare public comment: string;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;
}

Comment.init({
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
        },
        onDelete: "CASCADE"
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        },
        onDelete: "CASCADE"
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'comments',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default Comment;
