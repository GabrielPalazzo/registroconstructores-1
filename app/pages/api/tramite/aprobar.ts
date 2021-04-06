import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';
import middleware from '../../../middlewares/middleware';
import { NextApiResponse } from 'next';
import _ from 'lodash'
import moment from 'moment'
import { CalculadoraCapacidad } from 'rnc-main-lib'

const handler = nextConnect();

handler.use(middleware);


const finalizarTramite = async (tramite: TramiteAlta, usuario: Usuario, db): Promise<TramiteAlta> => {

  const newTramite = {
    _id: nanoid(),
    ...tramite,
    aprobacion: {
      aprobadoPor: usuario,
      aprobadoAt: new Date().getTime()
    }
  };

  await db.collection('tramites').save(newTramite);
  return newTramite
}

const generarCertificado = async (tramite: TramiteAlta, usuario: Usuario, db): Promise<CertificadoCapacidad> => {

  const calculadora = new CalculadoraCapacidad(tramite)
  await calculadora.init()
  const capacidadEjecucion = calculadora
    .getMontoCertificacionesPorPeriodo()
    .aplicarIndiceCorreccion()
    .ordenarMontoDescendente()
    .tomarLosTresPrimerosElementos()
    .aplicarPromedioLineal()
    .aplicarIndicesEconomicos()
    .actualizarPorAntiguedad()
    .value

  const capacidadFinanciera =
    calculadora.filtrarObrasCandidatas()
      .value
      .map(obra => {
        return calculadora.getCompromiso(obra) + calculadora.getIndicadorMultiplicador(obra)
      })
      .reduce((acc, val) => acc += val, 0)


  const certificado: CertificadoCapacidad = {
    _id: nanoid(),
    tramite,
    otorgadoPor: {
      usuario,
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

  await db.collection('certificadosOtorgados').save(certificado);
  return certificado

}


handler.post(async (req: any, res: NextApiResponse) => {

  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  if (_.isEmpty(req.user.Role.filter(r => r === 'JEFE REGISTRO')))
    res.status(403).send('Forbidden')

    // console.log(req.body)
   
  const tramite: TramiteAlta =req.body
   
  tramite.categoria = 'INSCRIPTO'
  tramite.status = 'VERIFICADO'

 
  const mapObras = (obra: DDJJObra) => {
    return {
      ...obra,
      status: "APROBADA" as any
    }
  }

  tramite.ddjjObras = tramite.ddjjObras.map(mapObras)

  const mapEjercicios = (ejercicio: Ejercicio) => {
    return {
      ...ejercicio,
      status: 'APROBADO' as any
    }
  }

  tramite.ejercicios = tramite.ejercicios.map(mapEjercicios)
  

  const tramiteActualizado = await finalizarTramite(tramite, req.user, req.db)
  const certificado =  await generarCertificado(tramiteActualizado, req.user, req.db)
  res.json(certificado)
 



  });

export default handler;
