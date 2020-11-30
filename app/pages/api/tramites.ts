import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: NextApiResponse) => {
  console.log('ingreso a la funcion')
  // Pagination: Fetch posts from before the input date or fetch from newest
  //const creatorId = req.query.by;
  console.dir(req.user);
  const tramites = await req.db
    .collection('tramites')
    .find({
      }
    )
    .toArray();
  res.send({ tramites });
});


export default handler