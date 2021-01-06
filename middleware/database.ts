import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
const path = require("path")

const client: MongoClient = new MongoClient(String(process.env.ATLAS_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function database(req: any, res: any, next: () => any) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db("kodesnaps");
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;