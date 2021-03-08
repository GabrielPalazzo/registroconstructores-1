import config from '../config'
import axios from 'axios'
import https from 'https'
import { MongoClient } from 'mongodb';

(async () => {


  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })

  axios.defaults.options = httpsAgent
 
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect()
  const db = client.db(config.registro.dataBase)


  let waitTill = 0
  for (let  i=12200;i <= 12250; i++){
    try {
      waitTill = new Date(new Date().getTime() + 1 * 300)
      const result = await axios.get(`${config.contratar.host}/API/Proveedores/ObtenerDatosConstancia?id=${i}&fecha=Sun%20Mar%2007%202021`, {
        httpsAgent: httpsAgent,
        headers: {
          "Cookie": config.contratar.key
        }
      })

      if (result.data){
        db.collection('certificados').insertOne({
          _id: i,
          ...result.data
        })
        console.log(`ID migrated : ${i}`)
      }
      
     
      while (waitTill > new Date(new Date().getTime())) { }

    } catch (err) {
      console.log(err)
    }
  }
  



})()