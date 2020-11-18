import mongoMiddleware from '../../lib/api/mongo-middleware';
import apiHandler from '../../lib/api/api-handler';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    method
  } = req

  apiHandler(res, method, {
    GET: async (response) => {
      console.log('inicio tramites')
      await models.Tramite.find({}, (error, tramite) => {
        if (error) {
          console.log('Error tramites')
          connection.close();
          response.status(500).json({ error });
        } else {
          console.log('Ok tramites')
          response.status(200).json(tramite);
          connection.close();
        }
        console.log('Fin tramites')
      })
    }
  });
})
