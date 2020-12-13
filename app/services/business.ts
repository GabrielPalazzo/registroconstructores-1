import axios from 'axios'
import * as jwt from "jsonwebtoken"

export const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token')  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNlYmEgQnJvbWJlcmciLCJpYXQiOjE1MTYyMzkwMjJ9.vM1mo49C9FazAkIbDe2UnUXQY7Qfkm3IC4eDpVFLviM' 
}

export const saveTramiteService = (tramite: TramiteAlta) : Promise<TramiteAlta> => {
  return axios.post('/api/tramite',tramite,{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }}).then((createdTramite) => {
    return createdTramite.data
  })

  // return new Promise((accept, reject) => accept(tramite))
} 

export const getTramites = () :  Promise<Array<TramiteAlta>> =>{
  return axios.get('/api/tramites',{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }}).then((tramites) => {
    return tramites.data['tramites'] as any
  })
}

export const getTramiteByCUIT = (cuit: string) : Promise<TramiteAlta> => {
  return axios.get(`/api/tramite?cuit=${cuit}`,{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }}).then((t) => {
    return t.data['tramites'] as TramiteAlta
  })
} 

export const getEmptyTramiteAlta = () : TramiteAlta=> {
  return  {
    apoderados:[],
    certificadoFiscal:null,
    cuit:'',
    email:'',
    id:'',
    ieric:'',
    nroLegajo: '',
    personeria:'',
    propietario: null,
    razonSocial:'',
    status: 'BORRADOR',
    tipoEmpresa: null,
    vtoIeric: ''
  }
}

export const getColorStatus = (tramite: TramiteAlta) => {
  if (!tramite) return 'gray'
  
  switch(tramite.status){
    case 'BORRADOR':
      return 'red'
    case 'VERIFICADO':
      return 'green'
    case 'A VERIFICAR':
      return 'orange'
    default:
      return 'gray'
  }
}

export const getStatusObsParsed = (tramite: TramiteAlta) : string => {
  return tramite && tramite.statusObs ? tramite.statusObs.map( e => e.obs).join(', ') : 'No tiene observaciones'
} 

export const getUsuario  = () => {
  let user : Usuario = null 
  const token = localStorage.getItem('token')

  if (token) {
    jwt.verify(token,process.env.SESSION_SECRET as string,(err, decode) => {
      if (err) return null
      user = decode as Usuario
    })
  }
  

  return {
    userData: () => user,
    isConstructor: () => user &&  user.Role.filter(r => r ==='CONSTRUCTOR')
  }
}

