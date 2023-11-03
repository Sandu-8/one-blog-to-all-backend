import { configDotenv } from "dotenv";
configDotenv();
import express from 'express';
import bodyParser from "body-parser";
import routes from "./api/routes";
import dbInit from "./db/init";
import insertIdentities from "./utils/helper_functions/insertIdentities";

const app = express();
const port = process.env.PORT || 4001;

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use('/', routes);

app.listen({ port }, async () => {
    await dbInit();
    await insertIdentities();
    return console.log(`Express is listening at http://localhost:${port}`);
});
