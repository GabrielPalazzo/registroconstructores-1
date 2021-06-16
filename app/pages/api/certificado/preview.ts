import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import { CalculadoraCapacidad } from 'rnc-main-lib'
import moment from 'moment';
import { nanoid } from 'nanoid';
import _ from 'lodash'
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: NextApiResponse) => {
    const tramite:TramiteAlta = req.body
    
    const calculadora = new CalculadoraCapacidad(tramite)
    await calculadora.init()
    const capacidadEjecucion = calculadora
      .getMontoCertificacionesPorPeriodo()
      .aplicarIndiceCorreccion()
      .ordenarMontoDescendente()
      .tomarLosTresPrimerosElementos()
      .aplicarPromedioLineal()
      .aplicarIndicesEconomicos()
  
    const capacidadFinanciera = _.isEmpty(tramite.ddjjObras) ? capacidadEjecucion :
      capacidadEjecucion - calculadora.filtrarObrasCandidatas()
        .value
        .map(obra => {
          return calculadora.getCompromiso(obra)
        })
        .reduce((acc, val) => acc += val, 0)
  
  
  
    const certificadoGenerado: CertificadoCapacidad = {
      _id: nanoid(),
      tramite,
      otorgadoPor: {
        usuario:null,
        fecha: new Date().getTime()
      },
      vigencia: {
        fechaDesde: new Date().getTime(),
        fechaHasta: moment().add(1, 'year').toDate().getTime()
      },
      status: 'VIGENTE',
      capacidadEjecucion,
      capacidadFinanciera,
    }

    res.json(certificadoGenerado)
  
});


export default handler