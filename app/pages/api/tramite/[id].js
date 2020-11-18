import mongoMiddleware from '../../../lib/api/mongo-middleware';
import apiHandler from '../../../lib/api/api-handler';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id, name },
    method,
  } = req

  apiHandler(res, method, {
    GET: (response) => {
      models.Tramite.findById(id, (error, tramite) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(tramite);
          connection.close();
        }
      })
    },
    POST: (response) => {
      models.Tramite.findOneAndUpdate(id, {name}, {}).exec((error, tramite) => {
        if (error) {
          connection.close()
          response.status(500).json({ error })
        } else {
          response.status(200).json(tramite)
          connection.close()
        }
      })
    }
  });
})

