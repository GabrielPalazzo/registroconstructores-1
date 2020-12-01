import axios from 'axios'

export const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token')  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNlYmEgQnJvbWJlcmciLCJpYXQiOjE1MTYyMzkwMjJ9.vM1mo49C9FazAkIbDe2UnUXQY7Qfkm3IC4eDpVFLviM' 
}

export const saveTramiteService = (tramite: TramiteAlta) : Promise<TramiteAlta> => {
  console.dir(tramite)
  return axios.post('/api/tramite',tramite,{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }}).then((createdTramite) => {
    return createdTramite.data
  })

  // return new Promise((accept, reject) => accept(tramite))
} 