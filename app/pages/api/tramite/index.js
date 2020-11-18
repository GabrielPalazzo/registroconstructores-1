import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { name },
    method
  } = req

  apiHandler(res, method, {
    POST: (response) => {
      models.Tramite.create({name}, (error, tramite) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(tramite);
          connection.close();
        }
      })
    }
  });
})
