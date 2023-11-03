import sequelizeConnection from "./config";
import createAssociationsBetweenTables from "./associations/createAssociationsBetweenTables";
import UserIdentity from "./models/userIdentity";

const dbInit = async () => {
    createAssociationsBetweenTables();

    return await sequelizeConnection.sync({
        alter: true,
    });
}
export default dbInit;
