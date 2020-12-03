import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: NextApiResponse) => {
  console.log('ingreso a la funcion')
  const tramites = await req.db
    .collection('tramites')
    .find({'creatorId.iat': req.user.iat}
    )
    .toArray();
  res.send({ tramites });
});


export default handler