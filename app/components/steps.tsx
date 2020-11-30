import React from 'react';
import { Steps } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'
import {setPaso} from '../redux/actions/main'
import {SET_PASOS} from '../redux/reducers/main'
const { Step } = Steps;

export default (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  return <div className="px-20 py-4">
    <Steps current={props.current}>
      <Step
        title="Inscripción"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_INSCRIPCION))
          router.push('/informacion_basica')
        }}
      />
      <Step
        title="Información"
        className="cursor-pointer"
        onClick={() =>{ 
          dispatch(setPaso(SET_PASOS.SET_PASO_INFORMACION))
          router.push('/domicilio')
        }}
      />
      <Step
        title="DDJ de balances"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_BALANCES))
          router.push('/ejercicios')
        }}
      />
      <Step
        title="DDJ de obras"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_OBRAS))
          router.push('/obras')
        }}
      />
      <Step
        title="Enviar trámite"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setPaso(SET_PASOS.SET_PASO_ENVIAR))
          router.push('/enviar_tramite')}}
      />
    </Steps>
  </div>
}








