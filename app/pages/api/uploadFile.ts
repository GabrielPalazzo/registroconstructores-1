
//Subir el archivo a ipfs y 
export default (req, res) => {
    const tp:TramiteAlta = null;
    res.statusCode = 200
    res.json({ code: '123' })
  }
  

/* Token a recibir:
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9tYnJlIjoiTGVvbmFyZG8iLCJhcGVsbGlkbyI6ImxlZW5lbiIsImVtYWlsIjoibGVvbmFyZG9sZWVuZW5AZ21haWwuY29tIiwiY3VpdCI6IjIwMjU4NzgzMjA1Iiwicm9sIjoiQ09OU1RSVUNUT1IifQ.Hh8iB4LD-D1F51t23UrnlR0b1LWQJlruReKFUA0Y2CQ
{
  "sub": "1234567890",
  "nombre": "Leonardo",
  "apellido": "leenen",
  "email": "leonardoleenen@gmail.com",
  "cuit": "20258783205",
  "rol": "CONSTRUCTOR" 
}
*/