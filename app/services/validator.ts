

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

        if(!this.tramite.nroLegajo)
          toValidate.push({
            attribute:'nroLegajo',
            dataId:'',
            error:'El Nro de Legajo es obligatorio'
          })

      return toValidate
    }

    parseDomicilioSection(): ValidatorErrorElement[] {
        throw new Error("Method not implemented.")
    }
    parseDDJJSection(): ValidatorErrorElement[] {
        throw new Error("Method not implemented.")
    }
    parseObrasSection(): ValidatorErrorElement[] {
        throw new Error("Method not implemented.")
    }
   
    
         
}

export const validatorTramite = new Validator()