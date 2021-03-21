
import {MigrateService} from '../services/migrates.services'


(async () => {

  const idProveedor = '12084'
  const service = new MigrateService(process.env.CONTRATAR_KEY)

  /*
  const {
    success
  } = await service.doPreflight()
  */
  
  const success=true
  if (success){

    
    await service.dbUpd()
    const preinscripcion = await service.migrarProveedoresPreInscripcion(idProveedor)
    const infoBasica = await service.migrarProveedoresInfoBasica(idProveedor)
    const balances = await service.migrarProveedoresBalances(idProveedor)
    await service.migrarProveedoresDatosObra(idProveedor)
    await service.migrarProveedoresCerficado(idProveedor)
  
    await service.dbUpd()
  } else {
    console.log('Token Vencido')
  }
  

})()