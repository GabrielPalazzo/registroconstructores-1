import { isPersonaFisica } from "./business"


interface ValidatorInterface {
    load: (t:TramiteAlta) => void
    parseInfomacionBasicaSection(): Array<ValidatorErrorElement>
    parseDomicilioSection() : Array<ValidatorErrorElement>
    parseDatosComercialesSection():  Array<ValidatorErrorElement>
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
          error:'La Razon Social es requerida'
        })

      if(!this.tramite.tipoEmpresa)
        toValidate.push({
          attribute:'tipoEmpresa',
          dataId:'',
          error:'Deberá seleccionar al menos un tipo de empresa'
        })

      if(!this.tramite.cuit)
        toValidate.push({
          attribute:'cuit',
          dataId:'',
          error:'El CUIT es requerido'
        })
      
      
      
      
      

      if(this.tramite.esCasadoTitular){
        if(!this.tramite.nombreConyuge)
        toValidate.push({
          attribute:'nombreConyuge',
          dataId:'',
          error:'El nombre del conyuge es requerido'
        })
        
      if(!this.tramite.apellidoConyuge)
        toValidate.push({
          attribute:'apellidoConyuge',
          dataId:'',
          error:'El apellido del conyuge es requerido'
        })
        
      if(!this.tramite.tipoDocumentoConyuge)
        toValidate.push({
          attribute:'tipoDocumentoConyuge',
          dataId:'',
          error:'El Tipo de documento del conyuge es requerido'
        })
        
      if(!this.tramite.documentoConyugue)
        toValidate.push({
          attribute:'documentoConyugue',
          dataId:'',
          error:'El Nro de documento del conyuge es requerido'
        })
      }

        

      return toValidate
    }

    parseDomicilioSection(): ValidatorErrorElement[] {
      const toValidate : Array<ValidatorErrorElement> = []

      if(!this.tramite.domicilioReal)
        toValidate.push({
          attribute:'domicilioReal',
          dataId:'',
          error:'Indíque el domicilio real'
        })
      
      if(!this.tramite.domicilioLegal)
        toValidate.push({
          attribute:'domicilioLegal',
          dataId:'',
          error:'Indíque el domicilio legal'
        })
      

      if(!this.tramite.emailInstitucional)
        toValidate.push({
          attribute:'emailInstitucional',
          dataId:'',
          error:'El domicilio electrónico es obligatorio, en el email declarado recibirá todas las notificaciones. '
        })

      if (isPersonaFisica(this.tramite) && (!this.tramite.altaAFIP ||  !this.tramite.altaAFIP.datos))
        toValidate.push({
          attribute:'fechaAltaAfip',
          dataId:'',
          error:'En la sección domicilio, datos societarios, los datos en el alta de AFIP es obligatorio'
        })

      
       
        
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
    parseDatosComercialesSection(): ValidatorErrorElement[] {
      const toValidate : Array<ValidatorErrorElement> = []
      if(!this.tramite.matriculaComerciante.datos)
        toValidate.push({
          attribute:'matriculaComercianteDatos',
          dataId:'',
          error:"Los datos de la matricula comerciante son requeridos"
        })
      if(!this.tramite.matriculaComerciante.fecha)
        toValidate.push({
          attribute:'matriculaComercianteFecha',
          dataId:'',
          error:"La fecha de Incripcion de la Matricula es requerida"
        })

      if (this.tramite.poseeIERIC){
        if(!this.tramite.ieric)
          toValidate.push({
            attribute:'ieric',
            dataId:'',
            error:'El número de Ieric es requerido'
          })
      
        if(!this.tramite.vtoIeric)
          toValidate.push({
            attribute:'vtoIeric',
            dataId:'',
            error:'La fecha de Vto de Ieric es requerido'
          })
      }
      return toValidate
    }  
}

export const validatorTramite = new Validator()