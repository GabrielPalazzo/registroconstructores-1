import React from 'react';
import { Steps } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'
import {setPaso, setStatusGeneralTramite} from '../redux/actions/main'
import {SET_PASOS} from '../redux/reducers/main'
const { Step } = Steps;


export interface NavigationStepProps {
  current: number,
  generalStatus?:Array<any>,
  completaBalanceYObras: boolean
}

export const NavigationStep: React.FC<NavigationStepProps> = ({
  current =0 ,
  generalStatus=['wait','wait','wait','wait','wait'],
  completaBalanceYObras=false
}) =>{
  const dispatch = useDispatch()
  const router = useRouter()

  const cleanErrors = () => {
    dispatch(setStatusGeneralTramite(['wait','wait','wait','wait','wait']))
  }
  return <div className="px-20 py-4">
    <Steps current={current}>
      <Step
        
        status={generalStatus[0]}
        title="Inscripción"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_INSCRIPCION))
          cleanErrors()
          router.push('/informacion_basica')
        }}
      />
      <Step
        title="Información"
        status={generalStatus[1]}
        className="cursor-pointer"
        onClick={() =>{ 
          dispatch(setPaso(SET_PASOS.SET_PASO_INFORMACION))
          cleanErrors()
          router.push('/domicilio')
        }}
      />
      <Step
        disabled={!completaBalanceYObras}
        status={generalStatus[2]}
        description={!completaBalanceYObras ? "No es Necesario": ''}
        title="DDJ de balances"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_BALANCES))
          cleanErrors()
          router.push('/ejercicios')
        }}
      />
      <Step
        disabled={!completaBalanceYObras}
        status={generalStatus[3]}
        description={!completaBalanceYObras ? "No es Necesario": ''}
        title="DDJ de obras"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_OBRAS))
          cleanErrors()
          router.push('/obras')
        }}/> 
      
      <Step
        title="Enviar trámite"
        status={generalStatus[4]}
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_ENVIAR))
          cleanErrors()
          router.push('/enviar_tramite')}}
      />
    </Steps>
  </div>
}








