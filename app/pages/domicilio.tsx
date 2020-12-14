import React,{useState} from 'react';
import { useRouter } from 'next/router'
import NavigationStep from '../components/steps'
import InputText from '../components/input_text'
import {HeaderPrincipal} from '../components/header'
import Upload from '../components/upload'
import { Button, Steps } from 'antd';
import Substeps from '../components/subSteps'
import {useSelector} from 'react-redux'
import { getEmptyTramiteAlta, getTramiteByCUIT } from '../services/business';
import {useDispatch} from 'react-redux'
import { saveTramite } from '../redux/actions/main'

const { Step } = Steps;
export default () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [waitingType, setWaitingType] = useState('sync')

  const [tramite, setTramite] = useState<TramiteAlta>(useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())

  const updateObjTramite = () => {
    setTramite(Object.assign({},tramite))
  } 

  const save = async () => {
    setWaitingType('sync')
    
    setIsLoading(true)
    if (tramite._id){
      await dispatch(saveTramite(tramite))
    } else {
      if (!(await getTramiteByCUIT(tramite.cuit)))
        await dispatch(saveTramite(tramite))
    }
    setIsLoading(false)
  }


  return <div>
   <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }}/>
    <div className="border-gray-200 border-b-2 py-4">
      <NavigationStep current={1} />
    </div>
    <div className="w-2/5 m-auto text-base mt-8">
    <Substeps progressDot current={0} />
    </div>
    <div className="px-20 py-6 ">
      <div className="text-2xl font-bold py-4"> Domicilio Legal</div>
        <div >
          <InputText
            label="Domicilio"
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
        </div>
      <div className="text-2xl font-bold py-4"> Domicilio Real</div>
        <div>
          <InputText
            value={tramite.domicilioReal}
            bindFunction={(value) => {
              tramite.domicilioReal = value
              updateObjTramite()
            }}
            label="Domicilio"
            placeHolder="Indique calle,numero,provincia"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />
        </div>
      <div className="pt-4">
        <Upload
            label="Adjunte un documento en donde conste el ultimo domicilio real inscripto en la IGJ o Registro de Comercio "
            labelRequired="*"
            labelMessageError=""
          />
          
       
      </div>

      <div className="mt-6 pt-6 text-center">
          <Button type="primary"  onClick={() => {
            if (!tramite || !tramite.cuit)
              return 
            save()
            router.push('/informacion_societaria')
          }}> Guardar y Seguir</Button>
         </div>

    </div>

  </div>
}


