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
    "GivenName":string,
    "Surname": string,
    "Email":string,
    "Role": Array<string>  
}

type Apoderado= {
    nombre: string,
    apellido: string,
    email: string, 
    nroDocumento: string,
    tipoDocumento :string, 
    cuit: string 
    esAdministrador: Boolean
    imagenesDni: Array<Archivo>
}

type Archivo= {
    id: string
    uri?: string
    nombreArchivo: string
    fechaCreacion: number
}

type TramiteAlta = {
    _id?: string,
    id: string
    razonSocial: string
    personeria: string
    tipoEmpresa: []
    emailInstitucional: string
    cuit: string
    nroLegajo: string
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
    status: "PRE INSCRIPTO" | "BORRADOR" | "OBSERVADO" | "VERIFICADO" | "PENDIENTE DE REVISION"
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
        fecha:string 
        datos: string
    }
    autoridadesSociedad:Array<{
        nombre: string
        apellido: string
        tipoDocumento: string
        nroDocumento: string
        tipoOrgano:string
        tipoCargo:string
        direccion:string
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
    nroMatriculaComerciante: string, 
    fechaInscripcionMatriculaComerciante: string
}

type ValidatorErrorElement = {
    attribute : string 
    dataId: string
    error: string
}