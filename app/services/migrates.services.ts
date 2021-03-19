import axios from 'axios'
import https from 'https'
import { MongoClient } from 'mongodb';
import { nanoid } from 'nanoid';
import config from '../config'
import { getEmptyTramiteAlta } from './business';


class ConnectionManager {
  public CONTRATAR_URL
  public CONTRATAR_KEY
  public client

  public httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })

  constructor(key) {
    this.CONTRATAR_KEY = key
    this.CONTRATAR_URL = process.env.URL_CONTRATAR
    this.client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   
  }

  async dbUpd() {
    await this.client.connect()
  }

  async dbDown(){
    await this.client.close()
  }

  async doPreflight() {
    try {
      const result = await axios.get(`${process.env.URL_CONTRATAR}/API/Proveedores/ObtenerDatosConstancia?id=11444fecha=Sun%20Mar%2007%202021`, {
        httpsAgent: this.httpsAgent,
        headers: {
          "Cookie": this.CONTRATAR_KEY
        }
      })
      return {
        success: true,

      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        error
      }
    }
  }


}
export class MigrateService  extends ConnectionManager{

  
  
  async migrarProveedoresPreInscripcion(codigoProveedor: string) {
    
    const db = this.client.db(config.registro.dataBase)

    return axios.get(`${process.env.URL_CONTRATAR}/API/Proveedores/Get?id=${codigoProveedor}`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(async result => {
      if (result.data) {
        await db.collection('oldDatosPreInscripcion').save({
            _id: codigoProveedor,
            ...result.data
        })
        

        console.log('PreInscripcion Migrada')
    }
    })
  }

  async migrarProveedoresInfoBasica(codigoProveedor: string) {

    const db = this.client.db(config.registro.dataBase)

    
    return axios.get(`${process.env.URL_CONTRATAR}/API/InformacionBasicaProveedor/GetByFilter?id=null&idProveedor=${codigoProveedor}`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(async result => {
      if (result.data) {
        await db.collection('oldDatosInfoBasica').save({
            _id: codigoProveedor,
            ...result.data.Data
        })

        console.log('InfoBasica Migrada')
    }
    })
  }

  async migrarProveedoresBalances(codigoProveedor: string) {

    const db = this.client.db(config.registro.dataBase)

     
    return axios.get(`${process.env.URL_CONTRATAR}/API/DDJJBalances/Search/?idProveedor=${codigoProveedor}`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(async result => {
      if (result.data) {
        await db.collection('oldBalances').save({
            _id: codigoProveedor,
            ...result.data.Data
        }) 
      console.log('Balances Migrados')
    }
    })
  }

  async getDatosParticularesObra(codigoProveedor: string, idRegistro: string) {

    const result = await axios.get(`${process.env.URL_CONTRATAR}/API/ObraProveedor/GetByFilter?id=${idRegistro}&idProveedor=${codigoProveedor}&estadoObra=undefined`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(r => r.data.Data)

    return result
  }

  async migrarProveedoresDatosObra(codigoProveedor: string) {

    const db = this.client.db(config.registro.dataBase)

     
    return axios.get(`${process.env.URL_CONTRATAR}/API/ObraProveedor/GetSmall?id=null&idProveedor=${codigoProveedor}&estadoObra=undefined`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(async result => {
      if (result.data) {

        const parseObras = async (obras) => {
          let waitTill = null
          
          const result = []
          if (!obras)
            obras=[]
          console.log(`Parseando ${obras.length} Obras`)
          let contador = 1
          for (let obra of obras){
            waitTill = new Date(new Date().getTime() + 1 * 150)
            obra.detalle = await  this.getDatosParticularesObra(codigoProveedor,obra.id)
            while (waitTill > new Date(new Date().getTime())) { }
            result.push(obra)
            console.log(`Obra ${contador} `)
            contador +=1
          }
          return result
        } 

        
        await db.collection('oldObras').save({
            _id: codigoProveedor,
            obras:await parseObras(result.data.Data) 
        }) 


        console.log('Obras Migradas')
    }
    })
  }

  async migrarProveedoresCerficado(codigoProveedor: string) {

    const db = this.client.db(config.registro.dataBase)

     
    return axios.get(`${process.env.URL_CONTRATAR}/API/Proveedores/ObtenerDatosConstancia?id=${codigoProveedor}&fecha=Thu%20Mar%2018%202021`, {
      httpsAgent: this.httpsAgent,
      headers: {
        "Cookie": this.CONTRATAR_KEY
      }
    }).then(async result => {
      if (result.data) {
        await db.collection('certificados').save({
            _id: codigoProveedor,
            ...result.data
        }) 
      console.log('Certificado Migrado')
    }
    })
  }

}


export class Parser extends ConnectionManager{
  private  tramite: TramiteAlta
  private preInscripcion 
  private datosBasicos
  private ejercicios

  getTramite(){
    return this.tramite
  }

  async init(cuit: string){
    this.tramite = getEmptyTramiteAlta()
    this.tramite.cuit = cuit
    await this.dbUpd()
    const db = await this.client.db(config.registro.dataBase)
    this.preInscripcion = await db.collection('oldDatosPreInscripcion').findOne({
      "InformacionEmpresa.NumeroCuit":cuit
    })

    
    this.datosBasicos = (await db.collection('oldDatosInfoBasica').findOne({
      "_id":this.preInscripcion._id
    }))['0']

    this.ejercicios = await db.collection('oldBalances').findOne({
      "_id":this.preInscripcion._id
    })

    this.ejercicios = Object.keys(this.ejercicios)
      .filter(k => k!=='_id')
        .map(e => this.ejercicios[e])

    
  }

  parseApoderados(){
    const mapToApoderados = (e) : Apoderado => {
      
      return {
        nombre: e.DatosPersona.Nombre,
        apellido: e.DatosPersona.Apellido,
        email: e.DatosPersona.Email,
        nroDocumento: e.DatosPersona.NumeroDocumento,
        tipoDocumento:'DNI',
        cuit: e.DatosPersona.NumeroCuit.replaceAll("-",""),
        esAdministrador: e.DatosPersona.EsAdministradorLegitimado,
        tipoApoderado: '',
        fotosDNI: [],
        imagenesDni: [],
        actaAutoridades: []
      }
    }

   
    return this.preInscripcion.PersonasLegales.map(mapToApoderados)
    
  }


  getCreatorFromApoderados() {
    const user : Apoderado= this.parseApoderados()
      .filter( (e: Apoderado)=> e.esAdministrador)[0]

    return {
      cuit:user.cuit,
      GivenName:user.nombre,
      Surname: user.apellido,
      Email:'',
      sub: user.cuit,
      Role:["CONSTRUCTOR"],
      iss: "",
      iat: "0",
      aud: ""
    }
  }

  parseEjercicios() {
    const mapEjercicio = (e) : Ejercicio => {
      return {
        fechaInicio: e.FechaInicioEjercicio,
        fechaCierre: e.FechaCierreEjercicio,
        activoCorriente: e.ActivoCorriente,
        activoNoCorriente: e.ActivoNoCorriente,
        pasivoCorriente: e.PasivoCorriente,
        pasivoNoCorriente: e.PasivoNoCorriente,
        ventasEjercicio: e.IngresosNetos,
        capitalSuscripto: e.CapitalSocial,
        archivos: []
      }
    }
    this.tramite.ejerciciosAprobados = this.ejercicios.map(mapEjercicio)
  }

  parseInformacionBasica(){
    this.tramite.cuit = this.preInscripcion.InformacionEmpresa.NumeroCuit
    this.tramite.status = "VERIFICADO"
    this.tramite.categoria= "INSCRIPTO"
    this.tramite.personeria = getCodigoTipoPersoneria(this.preInscripcion.InformacionEmpresa.tipoProveedor)
    this.tramite.tipoEmpresa  = this.preInscripcion.InformacionEmpresa.TiposEmpresa.map(t =>getCodigoTipoEmpresa(t) )
    this.tramite.razonSocial = this.preInscripcion.InformacionEmpresa.RazonSocial
    this.tramite.nroLegajo  = this.preInscripcion.InformacionEmpresa.NumeroRegistroConstructores
    this.tramite.apoderados = this.parseApoderados()
    
    this.tramite.domicilioLegal = `${this.datosBasicos.DomicilioDC.NombreCalle} ${this.datosBasicos.DomicilioDC.Altura}, ${this.datosBasicos.DomicilioDC.Localidad.Descripcion} ${this.datosBasicos.DomicilioDC.Localidad.Departamento.Provincia.Descripcion}  ${this.datosBasicos.DomicilioDC.Localidad.Departamento.Provincia.Pais.Descripcion}`
    this.tramite.domicilioReal =`${this.datosBasicos.DomicilioEspecialDC.NombreCalle} ${this.datosBasicos.DomicilioEspecialDC.Altura}, ${this.datosBasicos.DomicilioEspecialDC.Localidad.Descripcion} ${this.datosBasicos.DomicilioEspecialDC.Localidad.Departamento.Provincia.Descripcion}  ${this.datosBasicos.DomicilioEspecialDC.Localidad.Departamento.Provincia.Pais.Descripcion}`
    
    this.tramite.createdAt = new Date()
    
  }

  async save() {
    const newTramite = {
      _id: nanoid(),
      ...this.tramite,
      createdAt: new Date(),
      creatorId: this.getCreatorFromApoderados(),
    };
  
    const db = await this.client.db(config.registro.dataBase)
    await db.collection('tramites').insertOne(newTramite);
  }

}

const getCodigoTipoEmpresa = (id) => {
  switch(id){
    default: 
      return 'CONSTRUCTORA'
  }
}

const getCodigoTipoPersoneria = (id) =>{
  return [{
    "Descripcion": "Persona fisica",
    "Value": 1,
    "codigo": 'PF'
  }, {
    "Descripcion": "Sociedad de hecho",
    "Value": 2,
    "codigo":'SH'
  }, {
    "Descripcion": "Cooperativa",
    "Value": 3,
    "codigo":'Cooperativa'
  }, {
    "Descripcion": "Union transitoria de empresas",
    "Value": 4,
    "codigo": 'UTE'
  }, {
    "Descripcion": "Talleres protegidos",
    "Value": 5,
    "codigo":'TP'
  }, {
    "Descripcion": "Sociedad anonima",
    "Value": 6,
    "codigo":'SA'
  }, {
    "Descripcion": "Sociedad de responsabilidad limitada",
    "Value": 7,
    "codigo":'SRL'
  }, {
    "Descripcion": "Otras formas societarias",
    "Value": 8,
    "codigo": 'OFS'
  }, {
    "Descripcion": "Persona fisica - Extranjero no residente",
    "Value": 9,
    'codigo': 'PFE'
  }, {
    "Descripcion": "Persona juridica - Extranjero sin sucursal",
    "Value": 10,
    'codigo': 'PJESS'
  }, {
    "Descripcion": "Persona juridica - Extranjero con sucursal",
    "Value": 11,
    'codigo': 'PJECS'
  }].filter(e => e.Value === id)[0].codigo
  
}
