import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';
import middleware from '../../../middlewares/middleware';
import { NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: any, res: NextApiResponse) => {
  /*
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }
  */

  const { content } = req.body;

  if (!content) return res.status(400).send('You must write something');

  const document = {
    _id: nanoid(),
    content,
    uri: , 
    createdAt: new Date(),
    creatorId: req.document._id,
  };

  await req.db.collection('users').insertOne(document);
  return res.send(document);
});

export default handler;

import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs'

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
},

export default async (req, res) => {

  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  // read file from the temporary path
  const contents = await fs.readFile(data?.files?.nameOfTheInput.path, {
    encoding: 'utf8',
  })

  // contents is a string with the content of uploaded file, so you can read it or store
}