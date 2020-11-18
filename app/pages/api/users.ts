import mongoMiddleware from '../../lib/api/mongo-middleware';
import apiHandler from '../../lib/api/api-handler';

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    method
  } = req

  apiHandler(res, method, {
    GET: (response) => {
      console.log('Inicio el get')
      models.User.find({}, (error, user) => {
        if (error) {
          console.log('Error en la busqueda')
          connection.close();
          response.status(500).json({ error });
        } else {
          console.log('Con exito')
          response.status(200).json(user);
          connection.close();
        }
      })
    }
  });
})
