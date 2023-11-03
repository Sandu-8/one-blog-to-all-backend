import sequelizeConnection from '../config';
import {DataTypes, ForeignKey, Model} from "sequelize";
import User from "./user";

class BlackListTokens extends Model {
    declare public id: number;
    declare public userId: ForeignKey<User['id']>;
    declare public token: string;
}

BlackListTokens.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'black_list_tokens',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
});

export default BlackListTokens;
