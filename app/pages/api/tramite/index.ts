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
  console.dir(req.body);
  const { tramite } = req.body;

  if (!tramite) return res.status(400).send('You must write something');

  const newTramite = {
    _id: nanoid(),
    tramite,
    createdAt: new Date(),
    creatorId: req.user,
  };

  await req.db.collection('tramites').insertOne(newTramite);
  return res.send(newTramite);
});

export default handler;
