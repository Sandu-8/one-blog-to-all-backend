import UserIdentity from "../../db/models/userIdentity";

const insertIdentities = async () => {
    await UserIdentity.create({
        name: 'admin',
    });
    await UserIdentity.create({
        name: 'user',
    });
};

export default insertIdentities;
