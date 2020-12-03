import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';
import middleware from '../../../middlewares/middleware';
import { NextApiResponse } from 'next';
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";

const handler = nextConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.use(middleware);

handler.post(async (req: any, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (name: string, file: File) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/upload/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(res.status(500).send('Aborted'))  
      })
      .on("end", () => {
        resolve(res.status(200).send('done'));
      });

    await form.parse(req)

    });
});
