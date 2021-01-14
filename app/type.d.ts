type Persona = {
  nombre: string
  apellido: string
  email: string
  cuit: string
}

type Usuario = {
  "iss": string,
  "iat": string,
  "aud": string,
  "sub": string,
  cuit: string
  "GivenName": string,
  "Surname": string,
  "Email": string,
  "Role": Array<string>
}

type Apoderado = {
  nombre: string,
  apellido: string,
  email: string,
  nroDocumento: string,
  tipoDocumento: string,
  cuit: string
  esAdministrador: Boolean
  imagenesDni: Array<Archivo>
  tipoApoderado: string
}

type Archivo = {
  id: string
  uri?: string
  nombreArchivo: string
  fechaCreacion: number
}
type UbicacionGeografica ={
  lat: number
  lng: number
  slug: string
}
type DatosObraGeneral = {
  estado: string
  codigo: string
  tipoContratacion:string
  nivel:string
  fechaAdjudicacion:string
  fechaInicio:string
  fechaFin:string
}
type Redeterminaciones ={
  id: string
  monto:number
  fecha:string
}
type AmpliacionesObras ={
  id: string
  monto:number
  fecha:string
}
type Certificaciones ={
  numeroCertificacion:number
  descripcion:string
  monto:number
  fecha:string
}
type CertificacionesCerradas={
  fecha:string
  monto:number
  numeroCertificacion:number
  descripcion:string
}

type DDJJObra ={
  id: string
  denominacion:string
  ubicacion:Array<string>
  datosObra:Array<DatosObraGeneral>
  ubicacionGeografica:Array<UbicacionGeografica>
  ampliaciones:Array<AmpliacionesObras>
  redeterminaciones: Array<Redeterminaciones>
  certificaciones: Array<{
    codigo: string,
    monto: number
    periodo: string
  }>

  plazoPorContrato:number
  prorroga:number
  transcurrido:number
  restante:number
  razonSocialUTE:string
  cuitUTE:string
  participacionUTE:string
  razonSocialComitente:string
  cuitComitente:string
  montoInicial:string
  especialidades: string
  subespecialidades:string
}

type AutoridadEmpresa  ={
  nombre: string
  apellido: string
  tipoDocumento: string
  nroDocumento: string
  tipoOrgano: string
  tipoCargo: string
  direccion: string
  cuit: string
  inhibiciones: boolean
  observaciones: string
}

type TramiteAlta = {
  _id?: string,
  revisiones?: Array<RevisionTramite>
  id: string
  createdAt?: Date
  razonSocial: string
  nombreTitular: string
  apellidoTitular: string
  esCasadoTitular: boolean
  nombreConyuge: string
  apellidoConyuge: string
  tipoDocumentoConyuge: string
  documentoConyugue: string
  personeria: string
  tipoEmpresa: []
  emailInstitucional: string
  cuit: string
  nroLegajo: string
  asignadoA?: Usuario
  tipoEmpresa: {
    label: string
    value: string
    option: string
  }
  apoderados: Array<Apoderado>
  statusObs?: Array<{
    attribute: string
    obs: string
  }>
  categoria: 'PRE INSCRIPTO' | 'INSCRIPTO' | 'DESACTUALIZADO'
  status: "BORRADOR" | "OBSERVADO" | "VERIFICADO" | "PENDIENTE DE REVISION" | "A SUPERVISAR" | "SUBSANADO" | "PENDIENTE DE APROBACION"
  propietario: Usuario
  certificadoFiscal: Archivo
  email: string
  ieric: string
  vtoIeric: string
  domicilioReal: string
  domicilioLegal: string
  registroPublicoDeComercio: string
  igj: string
  rubroConstruccion: {
    lugar: string,
    fecha: string
    datos: string
  }
  autoridadesSociedad: Array<{
    nombre: string
    apellido: string
    tipoDocumento: string
    nroDocumento: string
    tipoOrgano: string
    tipoCargo: string
    direccion: string
    cuit: string
    inhibiciones: boolean
    observaciones: string
  }>
  sistemaCalidad: Array<{
    cuit: string,
    norma: string,
    direccion: string,
    fechaOtorgamiento: string
    fechaExpiracion: string
  }>,
  ejercicios: Array<{
    fechaInicio: string
    fechaCierre: string
    activoCorriente: number
    activoNoCorriente: number
    pasivoCorriente: number
    pasivoNoCorriente: number
    ventasEjercicio: number
    capitalSuscripto: number
  }>,
  ddjjObras: Array<DDJJObra>,
  matriculaComerciante: {
    datos: string,
    fecha: string,
    archivo?: Archivo
  },
  altaAFIP: {
    datos: string,
    fecha: string,
    archivo?: Archivo
  },
  ultimaModificacionMatriculaOActividadesAFIP: {
    datos: string,
    fecha: string,
    archivo?: Archivo
  },
  fechaInscripcionMatriculaComerciante: string
  aplicaDecretoDoscientosDos: boolean
  datosDecretoDoscientosDos: Array<{
    razonSocial: string
    cuit: string
    tipoFuncionario: string
    tipoVinculo: string
    observaciones: string
  }>,
  poseeIERIC: boolean
  datosSocietarios: {
    fechaInscripcion: string,
    fechaVencimiento: string
    cooperativa : {
      inscriptionINAES: {
        datos:string
        fecha:string
      }
      modificacionINAES: {
        datos:string
        fecha: string
      }
      ultimaModifcacionINAES: {
        datos: string
        fecha: string
      }
    }
    sociedadAnonima: {
      inscripcion: {
        datos: string
        fecha: string
      }
      modificacion: {
        datos: string
        fecha: string
      }
      ultimaModificacion : {
        datos: string
        fecha: string
      }
    }
    ute: {
      inscripcionUTE: {
        datos:string
        fecha: string
      },
      modificacionUTE: {
        datos: string
        fecha:string
      }
    }
  
    
  }
  
}

type ValidatorErrorElement = {
  attribute: string
  dataId: string
  error: string
}

type RevisionTramite ={
  version: number
  creator: Usuario
  status: 'ABIERTA' | 'CERRADA',
  reviews:Array<{
    field: string
    review: string
    isOk: boolean
  }>
}