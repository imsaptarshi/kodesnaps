import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const app: any = nextConnect();

app.use(middleware)


app.get(async (req: any, res: any) => {
  const collection: any[] = [];
  await req.db.collection("user").find().forEach((doc: any) => {
    collection.push(doc)
  });
  res.json(collection)
})

app.post(async (req: any, res: any) => {
  const body = req.body
  const resp = await req.db.collection("user").insertOne({
    username: body.username,
    language_label: body.language_label,
    language: body.language,
    theme_label: body.theme_label,
    theme: body.theme,
    code: body.code,
    edit_pass: body.edit_pass
  })
  res.send(resp)
})

export default app;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}