import config from '../config'
import axios from 'axios'
import https from 'https'
import { MongoClient } from 'mongodb';
import { MigrateService, Parser } from '../services/migrates.services'

(async () => {


  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })

 
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect()
  const db = client.db(config.registro.dataBase)


  let waitTill 


  const listaCertificados = await db.collection('certificados').find({}).toArray()
  const service = new MigrateService(process.env.CONTRATAR_KEY)
  await service.dbUpd()

  listaCertificados.forEach(c => {
    waitTill = new Date(new Date().getTime() + 1 * 200)
    service.migrarProveedoresCerficado(c.Id)
    while (waitTill > new Date(new Date().getTime())) { }
    console.log(`Certificado migrado: ${c.Id}`)
  })

  process.exit()

  /*
  for (let  i=9000;i <= 17800; i++){
    try {
      waitTill = new Date(new Date().getTime() + 1 * 300)
      const result = await axios.get(`${config.contratar.host}/API/Proveedores/ObtenerDatosConstancia?id=${i}&fecha=${moment().format('ddd D MMM YYYY')}`, {
        httpsAgent: httpsAgent,
        headers: {
          "Cookie": config.contratar.key
        }
      })

      if (result.data) {
        await db.collection('certificados').save({
          _id: codigoProveedor,
          ...result.data
        })
        console.log(`Certificado Migrado. Proveedor ${codigoProveedor}`)
      }
      
     
      while (waitTill > new Date(new Date().getTime())) { }

    } catch (err) {
      console.log(err)
    }
  }*/
  



})()