type Persona= {
    nombre: string
    apellido: string
    email: string
    cuit: string
}

type Apoderado= {
    persona: Persona
    esAdministrador: Boolean
}

type TramiteAlta = {
    razonSocial: string
    personería: string
    tipoEmpresa: string
    apoderados: Array<Apoderado>
}