import axios from 'axios'
import { MigrateService, Parser } from '../../services/migrates.services'

export default async (req, res) => {

    const { idProveedor, key } = req.body


    const service = new MigrateService(key)




    await service.dbUpd()
    if (await service.proveedorYaMigrado(idProveedor)) {
        res.status(422).send('EL proveedor se encuentra ya migrado')
        return
    }

    await service.migrarProveedoresPreInscripcion(idProveedor)
    await service.migrarProveedoresInfoBasica(idProveedor)
    await service.migrarProveedoresBalances(idProveedor)
    await service.migrarProveedoresDatosObra(idProveedor)
    await service.migrarProveedoresCerficado(idProveedor)
    await service.dbUpd()

    const serviceCargarProveedor = new Parser(key)
    await serviceCargarProveedor.init(idProveedor)

    await serviceCargarProveedor.dbUpd()
    const info = await serviceCargarProveedor.parseInformacionBasica()
    await serviceCargarProveedor.parseEjercicios()
    serviceCargarProveedor.parseObras()
    await serviceCargarProveedor.save()
    await serviceCargarProveedor.dbUpd()
    res.status(200).send('Done')




}