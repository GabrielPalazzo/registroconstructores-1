

interface ValidatorInterface {
    load: (t:TramiteAlta) => void
    parseInfomacionBasicaSection(): Array<ValidatorErrorElement>
    parseDomicilioSection() : Array<ValidatorErrorElement>
    parseDDJJSection() : Array<ValidatorErrorElement>
    parseObrasSection() : Array<ValidatorErrorElement>
   
}

class Validator implements ValidatorInterface {
    private tramite: TramiteAlta

    load(t:TramiteAlta) {
        this.tramite = t
    }

    parseInfomacionBasicaSection() : Array<ValidatorErrorElement> {
      const toValidate : Array<ValidatorErrorElement> = []
      
      if(!this.tramite.razonSocial)
        toValidate.push({
          attribute:'razonSocial',
          dataId:'',
          error:'La razon social es requerida'
        })

      if(!this.tramite.tipoEmpresa)
        toValidate.push({
          attribute:'tipoEmpresa',
          dataId:'',
          error:'Debera seleccionar al menos un tipo de empresa'
        })

      if(!this.tramite.cuit)
        toValidate.push({
          attribute:'cuit',
          dataId:'',
          error:'El CUIT es obligatorio'
        })
      
      if(!this.tramite.nroMatriculaComerciante)
        toValidate.push({
          attribute:'nroMatriculaComerciante',
          dataId:'',
          error:'El Nro de matricula es Obligatorio'
        })
      
      if(!this.tramite.fechaInscripcionMatriculaComerciante)
        toValidate.push({
          attribute:'fechaInscripcionMatriculaComerciante',
          dataId:'',
          error:'La fecha de inscripción de la Matrícula de Comerciante en rubro Construcción no puede ser anterior al alta en AFIP'
        })

      if(!this.tramite.domicilioReal)
        toValidate.push({
          attribute:'domicilioReal',
          dataId:'',
          error:'Indique el domicilio real'
        })
      
      if(!this.tramite.domicilioLegal)
        toValidate.push({
          attribute:'domicilioLegal',
          dataId:'',
          error:'Indique el domicilio legal '
        })

      return toValidate
    }

    parseDomicilioSection(): ValidatorErrorElement[] {
      const toValidate : Array<ValidatorErrorElement> = []
      return toValidate
    }
    parseDDJJSection(): ValidatorErrorElement[] {
      const toValidate : Array<ValidatorErrorElement> = []
      return toValidate
    }
    parseObrasSection(): ValidatorErrorElement[] {
      const toValidate : Array<ValidatorErrorElement> = []
      return toValidate
    }      
}

export const validatorTramite = new Validator()