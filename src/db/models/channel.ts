import {DataTypes, ForeignKey, Model} from 'sequelize';
import sequelizeConnection from '../config';
import User from "./user";



class Channel extends Model {
    declare public id: number;
    declare public image: string;
    declare public name: string;
    declare public link: string;
    declare public description: string;
    declare public creatorId: ForeignKey<User['id']>;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;
}

Channel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: User,
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
    tableName: 'channels',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default Channel;
