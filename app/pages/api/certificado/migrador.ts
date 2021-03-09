import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'
import axios from 'axios'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: NextApiResponse) => {
  if (req.user.Role.filter(r => 'JEFE REGISTRO').length === 0)
    res.status(401).send('Forbidden')


  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })


  const db = await req.db

  console.log(req.headers.authorizationkey)

  let waitTill = null
  for (let i = 8000; i <= 17000; i++) {
    try {
      waitTill = new Date(new Date().getTime() + 1 * 300)
      const result = await axios.get(`${process.env.URL_CONTRATAR}/API/Proveedores/ObtenerDatosConstancia?id=${i}&fecha=Sun%20Mar%2007%202021`, {
        httpsAgent: httpsAgent,
        headers: {
          "Cookie": req.headers.authorizationkey
        }
      })

      if (result.data && result.data.EstadoProveedor ==='Inscripto' ) {
        console.log(result.data.EstadoProveedor)
        db.collection('certificados')
          .save({
            '_id': i,
            ...result.data
          });

        console.log(`ID migrado : ${i}`)
      }else {
        console.log(`ID sin migrar: ${i}`)
      }


      while (waitTill > new Date(new Date().getTime())) { }

    } catch (err) {
      console.log(err)
    }
  }

  res.send('Done')



});


export default handler