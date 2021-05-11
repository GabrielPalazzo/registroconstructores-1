import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { NavigationStep } from '../components/steps'
import { InputText } from '../components/input_text'
import { HeaderPrincipal } from '../components/header'
import Upload from '../components/upload'
import { Button, Steps, Alert } from 'antd';
import Substeps from '../components/subSteps'
import { useSelector } from 'react-redux'
import { allowGuardar, getEmptyTramiteAlta, getTramiteByCUIT, isConstructora, isPersonaFisica,isPersonaExtranjera } from '../services/business';
import { useDispatch } from 'react-redux'
import { saveTramite } from '../redux/actions/main'
import { Loading } from '../components/loading';
import Wrapper from '../components/wrapper'
import { RootState } from '../redux/store';


const { Step } = Steps;
export default () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [waitingType, setWaitingType] = useState<'sync' | 'waiting'>('waiting')
  const statusGeneralTramite = useSelector((state: RootState) => state.appStatus.resultadoAnalisisTramiteGeneral)
  const tipoAccion: string = useSelector((state: RootState) => state.appStatus.tipoAccion)
  const [tramite, setTramite] = useState<TramiteAlta>(useSelector((state: RootState) => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)


  useEffect(() => {
    if (!tramite.cuit && tipoAccion !== 'SET_TRAMITE_NUEVO')
      router.push('/')
  }, [])


  const updateObjTramite = () => {
    setTramite(Object.assign({}, tramite))
  }

  const save = async () => {
    if (tramite.status === 'BORRADOR') {
      setWaitingType('sync')
      setIsLoading(true)
      if (tramite._id) {
        await dispatch(saveTramite(tramite))
      } else {
        if (!(await getTramiteByCUIT(tramite.cuit)))
          await dispatch(saveTramite(tramite))
      }
    }


  }

  if (isLoading)
    return <Loading message="" type={waitingType} />


  const showBotonGuardar = () => {
    if (!allowGuardar(tramite))
      return <div></div>


    return <div className="mt-6 pt-6 text-center">
      <Button type="primary" onClick={async () => {
        if (tramite.emailInstitucional.trim() && !/\S+@\S+\.\S+/.test(tramite.emailInstitucional.trim())) {
          setError('El campo Email se debe ser xxxxx@jjjj.jjj')
          setShowError(true)
          return
        }
        if (!tramite || !tramite.cuit)
          return
        await save()
        setIsLoading(true)
        router.push('/informacion_societaria')
      }}> Guardar y Seguir</Button>
    </div>
  }
  return <div>
    <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }} />
    <div className="border-gray-200 border-b-2 px-20 ">
      <NavigationStep current={1} generalStatus={statusGeneralTramite} completaBalanceYObras={!isPersonaFisica(tramite) || isConstructora(tramite)} />
    </div>
    <Substeps progressDot current={0} esPersonaFisica={isPersonaFisica(tramite) || isPersonaExtranjera(tramite) } />
    <div className="px-8 mx-8 py-6 ">

      <div className="text-2xl font-bold py-4"> Domicilio Legal</div>
      <div >
        <Wrapper attributeName="domicilioLegal" title="Domicilio" labelRequired="*">
          <InputText
            attributeName='domicilioLegal'
            value={tramite.domicilioLegal}
            bindFunction={(value) => {
              tramite.domicilioLegal = value
              updateObjTramite()
            }}
            placeHolder="Indique calle,numero,provincia"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />
        </Wrapper>
      </div>
      <div className="pt-4">
      <Wrapper attributeName="documentoUltimoDomicilio" title="Adjunte un documento en donde conste el último domicilio legal inscripto en la IGJ o Registro de Comercio" labelRequired="*">
        <Upload
         labelMessageError=""
          defaultValue={tramite.constanciaDomicilioLegal as any}
          onRemove={fileToRemove => {
            tramite.constanciaDomicilioLegal = tramite.constanciaDomicilioLegal.filter(f => f.cid !== fileToRemove.uid)
            save()
            setIsLoading(false)
          }}
          onOnLoad={file => {
            if (!tramite.constanciaDomicilioLegal)
              tramite.constanciaDomicilioLegal = []

            tramite.constanciaDomicilioLegal.push(file)
            save()
            setIsLoading(false)
          }}

        />
        </Wrapper>


      </div>
      <div className="text-2xl font-bold py-4"> Domicilio Real</div>
      <div>
      <Wrapper attributeName="domicilioReal" title="Domicilio" labelRequired="*">
        <InputText
          value={tramite.domicilioReal}
          attributeName='domicilioReal'
          bindFunction={(value) => {
            tramite.domicilioReal = value
            updateObjTramite()
          }}
          placeHolder="Indique calle,numero,provincia"
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
          required />
          </Wrapper>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-4 ">
        <div className="pb-6" >
          <InputText
            value={tramite.telefono}
            attributeName='telefono'
            bindFunction={(value) => {
              tramite.telefono = value
              updateObjTramite()
            }}
            label="Telefono"
            labelRequired="*"
            placeHolder="Indique el numero de telefono"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />

        </div>
        <div className="pb-6" >
          <InputText
            value={tramite.telefonoAlternativo}
            attributeName='telefonoAlternativo'
            bindFunction={(value) => {
              tramite.telefonoAlternativo = value
              updateObjTramite()
            }}
            label="Telefono Alternativo"
            labelRequired=""
            placeHolder="Indique el numero de telefono"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />

        </div>
      </div>

      <div className="text-2xl font-bold py-4"> Domicilio Electronico</div>
      {showError ? <div className="mb-4">
        <Alert
          message=''
          description={error}
          type="error"
          showIcon
          closable
          afterClose={() => setShowError(false)}
        /></div> : ''}
      <div>
      <Wrapper attributeName="emailInstitucional" title="Email Institucional" labelRequired="*">
        <InputText
          attributeName="emailInstitucional"
          value={tramite.emailInstitucional}
          bindFunction={(value) => {
            tramite.emailInstitucional = value
            updateObjTramite()
          }}
          type="email"
          placeHolder="Email Institucional"
        />
        </Wrapper>
      </div>




      {showBotonGuardar()}

    </div>

  </div>
}


