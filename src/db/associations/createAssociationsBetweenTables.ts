import UserIdentity from "../models/userIdentity";
import User from "../models/user";
import Channel from "../models/channel";
import Subscription from "../models/subscription";
import Post from "../models/post";
import Comment from "../models/comment";
import BlackListTokens from "../models/blackListTokens";

const createAssociationsBetweenTables = () => {
    // User and UserIdentity
    UserIdentity.hasMany(User, {
        foreignKey: 'userIdentityId',
        onDelete: 'CASCADE',
    });
    User.belongsTo(UserIdentity, {
        foreignKey: 'userIdentityId',
        onDelete: 'CASCADE',
    });
    // User and Channel
    // the Super Many-to-Many relationship -> From Sequelize documentation
    User.belongsToMany(Channel, {
        through: Subscription,
        uniqueKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Channel.belongsToMany(User, {
        through: Subscription,
        uniqueKey: 'id',
        foreignKey: 'channelId',
        onDelete: 'CASCADE',
    });
    User.hasMany(Subscription, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
    });
    Subscription.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Channel.hasMany(Subscription, {
            foreignKey: 'channelId',
            onDelete: 'CASCADE',
    });
    Subscription.belongsTo(Channel, {
            foreignKey: 'channelId',
            onDelete: 'CASCADE',
    });
    //Channel and Post
    Channel.hasMany(Post, {
        foreignKey: 'channelId',
        onDelete: 'CASCADE'
    });
    Post.belongsTo(Channel, {
        foreignKey: 'channelId',
        onDelete: 'CASCADE',
    });
    // User and Post
    User.belongsToMany(Post, {
        through: {
            model: Comment,
            unique: false
        },
        constraints: false,
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Post.belongsToMany(User, {
        through: {
            model: Comment,
            unique: false
        },
        constraints: false,
        foreignKey: 'postId',
        onDelete: 'CASCADE',
    });
    User.hasMany(Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Comment.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Post.hasMany(Comment, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
    });
    Comment.belongsTo(Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
    });
    // User and Channel .
    User.hasOne(Channel, {
        foreignKey: 'creatorId',
        onDelete: 'CASCADE',
    });
    Channel.belongsTo(User, {
        foreignKey: 'creatorId',
        onDelete: 'CASCADE',
    });
    // User and BlackListTokens
    User.hasMany(BlackListTokens, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });
    BlackListTokens.belongsTo(User, {
       foreignKey: "userId",
       onDelete: 'CASCADE',
    });
};

export default createAssociationsBetweenTables;
