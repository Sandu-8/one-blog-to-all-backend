import {
    DataTypes, DestroyOptions,
    ForeignKey,
    HasMany,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin, InstanceDestroyOptions,
    Model,
    Optional
} from 'sequelize';
import sequelizeConnection from '../config';
import UserIdentity from "./userIdentity";
import Channel from "./channel";
import {HookReturn, Hooks} from "sequelize/types/hooks";


class User extends Model {
    declare public id: number;
    declare public name: string;
    declare public lastname: string;
    declare public username: string;
    declare public email: string;
    declare public password: string;
    declare public userIdentityId: ForeignKey<UserIdentity['id']>;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;

    declare getChannels: HasManyGetAssociationsMixin<Channel>; // Note the null assertions!
    declare addChannel: HasManyAddAssociationMixin<Channel, number>;
    declare addChannels: HasManyAddAssociationsMixin<Channel, number>;
    declare setChannels: HasManySetAssociationsMixin<Channel, number>;
    declare removeChannel: HasManyRemoveAssociationMixin<Channel, number>;
    declare removeChannels: HasManyRemoveAssociationsMixin<Channel, number>;
    declare hasChannel: HasManyHasAssociationMixin<Channel, number>;
    declare hasChannels: HasManyHasAssociationsMixin<Channel, number>;
    declare countChannels: HasManyCountAssociationsMixin;
    declare createChannel: HasManyCreateAssociationMixin<Channel, 'userId'>;
}

User.init({
    id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userIdentityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserIdentity,
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
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default User;
