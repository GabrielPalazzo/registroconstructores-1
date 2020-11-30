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
  // const { tramite } = req.body;

  //TODO: if (_id is not null) ..... update


  if (!req.body) return res.status(400).send('You must write something');

  if(req.body._id) {
    // get by id
    const tramite = await req.db
    .collection('tramites')
    .findById(req.body._id);
    
    
    //update
  }

  const newTramite = {
    _id: nanoid(),
    ...req.body,
    createdAt: new Date(),
    creatorId: req.user,
  };

  await req.db.collection('tramites').insertOne(newTramite);
  return res.send(newTramite);
});

export default handler;
