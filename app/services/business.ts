import axios from 'axios'

export const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token')  : null 
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