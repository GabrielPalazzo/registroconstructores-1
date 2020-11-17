type Persona= {
    nombre: string
    apellido: string
    email: string
    cuit: string
}

type Usuario= {
    nombre: string
    apellido: string
    email: string
    cuit: string
    sub: string
    rol: string
}

type Apoderado= {
    persona: Persona
    esAdministrador: Boolean
}

type TramiteAlta = {
    id: string
    razonSocial: string
    personería: string
    tipoEmpresa: string
    apoderados: Array<Apoderado>
    status: "BORRADOR"|"A VERIFICAR"|"VERIFICADO"
    propietario: Usuario
}