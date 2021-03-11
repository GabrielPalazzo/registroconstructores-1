import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  if ((!req.user) || (!req.user.cuit)) {
    return res.status(401).send('unauthenticated');
  }

  const tramite : TramiteAlta = await req.db
    .collection('tramites')
    .findOne({"_id": id
      }
    );




  if (tramite.creatorId.cuit === req.user.cuit){
    await req.db.collection('tramites').deleteOne({"_id": id})
    res.send('Done')
  }else {
    res.status(403).send('No tienes permisos para eliminar este trámite')
  }
  

});

export default handler