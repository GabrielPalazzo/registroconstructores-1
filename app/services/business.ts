import axios from 'axios'

export const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token')  : null 
}

export const saveTramiteService = (tramite: TramiteAlta) : Promise<TramiteAlta> => {
  return axios.post('/api/tramite',tramite,{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }})

  // return new Promise((accept, reject) => accept(tramite))
} 