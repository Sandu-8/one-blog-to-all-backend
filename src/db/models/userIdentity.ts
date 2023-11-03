import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

class UserIdentity extends Model {
    declare public id: number;
    declare public name: string;
    declare public createdAt: Date;
    declare public updatedAt: Date;
    declare public deletedAt: Date;
}

UserIdentity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'user_identity',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default UserIdentity;
