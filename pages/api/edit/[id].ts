import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
const ObjectId = require("mongodb").ObjectId;

const app: any = nextConnect();

app.use(middleware)

app.post(async (req: any, res: any) => {
    const {
        query: { id },
    } = req

    const body = req.body
    const doc = await req.db.collection("user").findOneAndUpdate(

        { _id: new ObjectId(id) },
        {
            $set: {
                username: body.username,
                language: body.language,
                code: body.code,
                edit_pass: body.edit_pass
            }

        }

    )
    res.json(doc)
})

export default app;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}