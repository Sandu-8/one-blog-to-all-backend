import sequelizeConnection from "./config";
import createAssociationsBetweenTables from "./associations/createAssociationsBetweenTables";

const dbInit = async () => {
    createAssociationsBetweenTables();
    return await sequelizeConnection.sync({
        // alter: true,
    });
}
export default dbInit;
