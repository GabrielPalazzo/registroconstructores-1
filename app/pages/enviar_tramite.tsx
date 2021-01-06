import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {NavigationStep} from '../components/steps'
import {InputText} from '../components/input_text'
import { HeaderPrincipal } from '../components/header'
import { Button, Steps, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { saveTramite, setStatusGeneralTramite } from '../redux/actions/main'
import { getEmptyTramiteAlta, getTramiteByCUIT, isConstructora,isPersonaFisica, sendTramite } from '../services/business';
import {validatorTramite} from '../services/validator'
import { Loading } from '../components/loading';

const { Step } = Steps;
export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [waitingType, setWaitingType] = useState('sync')
  const dispatch = useDispatch()
  const router = useRouter()
  const [tramite, setTramite] = useState<TramiteAlta>(useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())
  const tipoAccion: string = useSelector(state => state.appStatus.tipoAccion) || 'SET_TRAMITE_NUEVO'
  const [erroresSeccionInformacionBasica, setErroresSeccionInformacionBasica] = useState<Array<ValidatorErrorElement>>([])
  const [erroresSeccionDomicilio, setErroresSeccionDomicilio] = useState<Array<ValidatorErrorElement>>([])
  const [erroresSeccionComercial, setErroresSeccionComercial] = useState<Array<ValidatorErrorElement>>([])
  const [erroresSeccionDDJJ, setErroresSeccionDDJJ] = useState<Array<ValidatorErrorElement>>([])
  const [erroresSeccionObras, setErroresSeccionObras] = useState<Array<ValidatorErrorElement>>([])

  const statusGeneralTramite = useSelector( state => state.appStatus.resultadoAnalisisTramiteGeneral)

  useEffect(() => {
    if (!tramite.cuit && tipoAccion!=='SET_TRAMITE_NUEVO')
      router.push('/')
    
    validatorTramite.load(tramite)
    setErroresSeccionInformacionBasica(validatorTramite.parseInfomacionBasicaSection())
    setErroresSeccionDomicilio(validatorTramite.parseDomicilioSection())
    setErroresSeccionComercial(validatorTramite.parseDatosComercialesSection())
    dispatch(setStatusGeneralTramite([
      validatorTramite.parseInfomacionBasicaSection().length > 0 ? 'error': 'finish',
      validatorTramite.parseDomicilioSection().length > 0  || validatorTramite.parseDatosComercialesSection().length > 0 ? 'error' : 'finish',
      validatorTramite.parseDDJJSection().length > 0 ? 'error' : 'finish',
      validatorTramite.parseObrasSection().length > 0 ? 'error' : 'finish']))
  },[])

  const save = async () => {
    setWaitingType('sync')

    setIsLoading(true)
    if (tramite._id) {
      await dispatch(saveTramite(tramite))
    } else {
      if (!(await getTramiteByCUIT(tramite.cuit)))
        await dispatch(saveTramite(tramite))
    }
    setIsLoading(false)
  }

  const updateObjTramite = () => {
    setTramite(Object.assign({}, tramite))
  }

  if ((!tramite.cuit) || (isLoading))
    return <Loading message="" type="waiting"/>

  return <div>
    <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }} />
    <div className="border-gray-200 border-b-2 py-4">
      <NavigationStep current={4}  generalStatus={statusGeneralTramite} completaBalanceYObras={!isPersonaFisica(tramite) || isConstructora(tramite) }/>
    </div>

    <div className="px-20 py-6 text-center m-auto mt-6">
      <div className="text-2xl font-bold py-4 text-center"> Enviar trámite</div>
      {erroresSeccionInformacionBasica.length ===0 
        && erroresSeccionDomicilio.length === 0 
        && erroresSeccionDDJJ.length === 0 
        && erroresSeccionComercial.length === 0 
        && erroresSeccionObras.length === 0 
        ? 
        
      <div>
        <Card className="rounded mr-2 text-center m-autop" style={{ width: 500, margin: 'auto' }}>
          <div className="text-base font-bold text-primary-700 pb-2 "> ¿Desea confirmar el envío de su trámite?</div>
          <div className="text-muted-700 text-sm  mt-2 self-center"  > Puede revisar cada uno de los pasos haciendo click en los mismos</div>
        </Card>
        <div className="mt-6 pt-4 text-center">
          <Button type="primary" onClick={() => {
            setIsLoading(true)
            sendTramite(tramite).then(result => {
              dispatch(saveTramite(result))
              router.push('/success')
            })
          }}> Enviar Tramite</Button>
        </div>
      </div>
        : 
      <Card className="rounded mr-2 text-center m-autop" style={{ width: 500 , margin: 'auto' }}>
        <div className="text-base font-bold text-warning-700 px-8 pb-2 "> 
        <div>
          Usted tiene items incompletos que deberá completar para poder enviar el trámite
        </div>
        <div className="text-gray-800 text-left p-2 font-thin">
          {erroresSeccionInformacionBasica.length > 0 ? 
          <div>
            <div className="font-bold">Información Básica</div>
            <li>
              {erroresSeccionInformacionBasica.map( (e:ValidatorErrorElement) => <ul>{e.error}</ul>)}
            </li>
          </div> : ''}
          {erroresSeccionDomicilio.length > 0 ? 
          <div>
            <div className="font-bold">Domicilio</div>
            <li>
              {erroresSeccionDomicilio.map( (e:ValidatorErrorElement) => <ul>{e.error}</ul>)}
            </li>
          </div> : ''}
          {erroresSeccionComercial.length > 0 ? 
          <div>
            <div className="font-bold">Información Comercial</div>
            <li>
              {erroresSeccionComercial.map( (e:ValidatorErrorElement) => <ul>{e.error}</ul>)}
            </li>
          </div> : ''}
        </div>
        </div>
      </Card>}
      

      


      
    </div>

  </div>
}


