import {Parser} from '../services/migrates.services'

(async () => {

    const cuitProveedor = '30615614072'
    const service = new Parser(process.env.CONTRATAR_KEY)
    const {
      success
    } = await service.doPreflight()

    await service.init(cuitProveedor)

  
    if (success){
      await service.dbUpd()
      const info = await service.parseInformacionBasica()
      await service.parseEjercicios()
      await service.save()
      await service.dbUpd()
      
    } else {
      console.log('Token Vencido')
    }
    
  })()