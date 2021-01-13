import axios from 'axios'
import * as jwt from "jsonwebtoken"
import Tramite from '../data/models/Tramite'
import _ from 'lodash'
import { customAlphabet } from 'nanoid'

export const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token')  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNlYmEgQnJvbWJlcmciLCJpYXQiOjE1MTYyMzkwMjJ9.vM1mo49C9FazAkIbDe2UnUXQY7Qfkm3IC4eDpVFLviM' 
}

export const setToken = (token) => {
  localStorage.setItem('token',token)
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

export const getTramitesParaVerificar = () :  Promise<Array<TramiteAlta>> =>{
  return axios.get('/api/tramite/getTramitesParaVerificar',{
    headers: {
      Authorization: 'Bearer ' + getToken()
  }}).then((tramites) => {
    return tramites.data['tramites'] as any
  })
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
  }).catch(err => {
    return null
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
    emailInstitucional: '',
    razonSocial:'',
    nombreTitular:'',
    apellidoTitular:'',
    esCasadoTitular: false,
    nombreConyuge: '',
    apellidoConyuge:'',
    tipoDocumentoConyuge: '',
    documentoConyugue:'',
    status: 'BORRADOR',
    categoria:'PRE INSCRIPTO',
    tipoEmpresa: [],
    vtoIeric: '',
    registroPublicoDeComercio: '',
    igj:'',
    domicilioLegal:'',
    domicilioReal:'',
    rubroConstruccion: {
      lugar:'',
      fecha:'',
      datos:''
    },
    autoridadesSociedad:[],
    sistemaCalidad: [],
    ejercicios:[],
    ddjjObras:[],
    fechaInscripcionMatriculaComerciante:'',
    aplicaDecretoDoscientosDos: false,
    datosDecretoDoscientosDos:[],
    matriculaComerciante:{
      datos:'',
      fecha:''
    },
    altaAFIP:{
      datos:'',
      fecha:''
    },
    ultimaModificacionMatriculaOActividadesAFIP:{
      datos:'',
      fecha:''
    },
    poseeIERIC: true,
    datosSocietarios:{
      cooperativa: {
        inscriptionINAES:{
          datos:'',
          fecha:''
        },
        modificacionINAES:{ 
          datos:'',
          fecha:''
        },
        ultimaModifcacionINAES:{
          datos:'',
          fecha:''
        },
      },
      sociedadAnonima: {
        inscripcion: {
          datos:'',
          fecha:''
        },
        modificacion: {
          datos:'',
          fecha: ''
        },
        ultimaModificacion: {
          datos: '',
          fecha:''
        }
      },
      ute: {
        inscripcionUTE:{
          datos:'',
          fecha:''
        },
        modificacionUTE:{
          fecha:'',
          datos:''
        }
      },
      fechaInscripcion:'',
      fechaVencimiento:'',
    }
    
  }
}

export const getColorStatus = (tramite: TramiteAlta) => {
  if (!tramite) return 'gray'
  
  switch(tramite.status){
    case 'BORRADOR':
      return 'gray'
    case 'VERIFICADO':
      return 'green'
    case 'OBSERVADO':
      return 'red'
    default:
      return 'blue'
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
    isConstructor: () => user &&  user.Role.filter(r => r ==='CONSTRUCTOR').length>0,
    isBackOffice: () => user && user.Role.filter(r => r ==='CONTROLADOR' || r ==='SUPERVISOR').length >0,
    isControlador: () => user && user.Role.filter(r => r ==='CONTROLADOR').length >0,
    isSupervisor: () => user && user.Role.filter(r =>  r ==='SUPERVISOR').length >0,
    isAprobador: () => user && user.Role.filter(r =>  r ==='APROBADOR').length >0
  }
}

export const isInReview = (tramite:TramiteAlta) => {

  if (!tramite.revisiones || !tramite.asignadoA)
    return false
  
  return tramite.revisiones.filter( r => r.status ==='ABIERTA').length > 0
    && 
      tramite.asignadoA.iat === getUsuario().userData().iat
}

export const getReviewAbierta = (tramite: TramiteAlta) : RevisionTramite => {
  if (!tramite) return null

  return tramite.revisiones ? _.last(tramite.revisiones.filter( r => r.status ==='ABIERTA')) : null
}

export const closeSession =() => {
  localStorage.clear()
}

export const isConstructora = (tramite: TramiteAlta) : boolean => {
  if (!tramite.tipoEmpresa) return false
  return tramite.tipoEmpresa.filter(te => te === 'CONSTRUCTORA').length === 1
}

export const requiereBalance = (tramite: TramiteAlta) : boolean => {
  if (tramite.personeria==='UTE') return false 
  return true
} 

export const requiereObras = (tramite:TramiteAlta) : boolean => {
  if (tramite.personeria==='UTE') return false 
  return true
}

export const isPersonaFisica = (tramite: TramiteAlta) : boolean=> {
  return tramite.personeria ==='PF'
}

export const isTramiteEditable = (tramite: TramiteAlta) : boolean => {
  return (tramite  && tramite.status ==='BORRADOR') || (tramite && !tramite.cuit) || (!tramite)
} 

export const sendTramite = async (tramite: TramiteAlta) : Promise<TramiteAlta>=> {
  
  if (tramite.status ==='BORRADOR'){
    tramite.status="PENDIENTE DE REVISION"
    return  saveTramiteService(tramite)
  }
    

  if (tramite.status==='PENDIENTE DE REVISION' && getUsuario().isBackOffice()){
    tramite.status='A SUPERVISAR'
    tramite.asignadoA=null
    return  saveTramiteService(tramite)
  }

  if (tramite.status ==='OBSERVADO' && getUsuario().isConstructor()){
    tramite.status='SUBSANADO'
    tramite.asignadoA=null
    return  saveTramiteService(tramite)
  }

  if ((tramite.status==='SUBSANADO')&&(getUsuario().isControlador())){
    tramite.status='A SUPERVISAR'
    tramite.asignadoA=null
    return  saveTramiteService(tramite)
  }

  if (tramite.status ==='A SUPERVISAR' && getUsuario().isSupervisor()){
    if (getReviewAbierta(tramite).reviews.filter(r => !r.isOk).length > 0){
      tramite.status='OBSERVADO'
    } else {
      tramite.status='PENDIENTE DE APROBACION'
      //tramite.revisiones=[]
    }
    tramite.asignadoA=null
    return  saveTramiteService(tramite)
  }

  if (tramite.status ==='PENDIENTE DE APROBACION'){
    if (getReviewAbierta(tramite).reviews.filter(r => !r.isOk).length > 0){
      tramite.status='OBSERVADO'
      tramite.asignadoA=null
    } else {
      tramite.categoria='INSCRIPTO'
      tramite.status='VERIFICADO'
      //tramite.revisiones=[]
    }
    return  saveTramiteService(tramite)
  }
    
  
}

export const getObservacionesTecnicoRaw = (revisionTramite:RevisionTramite) : string => {
  return revisionTramite ? revisionTramite.reviews.filter(r => !r.isOk).map( r => r.review ).join(', ') : ''
}

export const allowGuardar = (tramite:TramiteAlta) => {
  if (['BORRADOR','OBSERVADO'].includes(tramite.status) && getUsuario().isConstructor())
    return true

  if (getUsuario().isControlador() && ['PENDIENTE DE REVISION','SUBSANADO'].includes(tramite.status) )
    return true

  if (getUsuario().isSupervisor() && ['PENDIENTE DE REVISION','SUBSANADO','A SUPERVISAR'].includes(tramite.status) )
    return true

  if (getUsuario().isAprobador() && ['PENDIENTE DE REVISION','SUBSANADO','A SUPERVISAR','A APROBAR'].includes(tramite.status) )
    return true


  
  return false
}

export const getCodigoObra = () => {
  const nanoid = customAlphabet('1234567890abcdef', 10)
  return nanoid().toUpperCase()
}