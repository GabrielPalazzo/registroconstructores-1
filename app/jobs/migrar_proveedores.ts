
import { MigrateService, Parser } from '../services/migrates.services'


(async () => {

  
  const idProveedor = '11969'
  const service = new MigrateService(process.env.CONTRATAR_KEY)

  await service.dbUpd()
  if (await service.proveedorYaMigrado(idProveedor)) {
    throw 'EL proveedor se encuentra ya migrado'
    return
  }

  await service.migrarProveedoresPreInscripcion(idProveedor)
  await service.migrarProveedoresInfoBasica(idProveedor)
  await service.migrarProveedoresBalances(idProveedor)
  await service.migrarProveedoresDatosObra(idProveedor)
  await service.migrarProveedoresCerficado(idProveedor)
  await service.dbUpd()

  const serviceCargarProveedor = new Parser(process.env.CONTRATAR_KEY)
  await serviceCargarProveedor.init(idProveedor)

  await serviceCargarProveedor.dbUpd()
  const info = await serviceCargarProveedor.parseInformacionBasica()
  await serviceCargarProveedor.parseEjercicios()
  serviceCargarProveedor.parseObras()
  await serviceCargarProveedor.save()
  await serviceCargarProveedor.dbUpd()
  

  // console.log(process.argv)


})()