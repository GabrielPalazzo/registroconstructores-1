import React from 'react';
import { Steps } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'

const { Step } = Steps;

export default (props) => {
  const router = useRouter()

  return <div className="px-20 py-4">
    <Steps current={props.current}>
      <Step
        title="Inscripción"
        className="cursor-pointer"
        onClick={() => router.push('/informacion_basica')}
      />
      <Step
        title="Información"
        className="cursor-pointer"
        onClick={() => router.push('/domicilio')}
      />
      <Step
        title="DDJ de balances"
        className="cursor-pointer"
        onClick={() => router.push('/ejercicios')}
      />
      <Step
        title="DDJ de obras"
        className="cursor-pointer"
        onClick={() => router.push('/obras')}
      />
      <Step
        title="Enviar trámite"
        className="cursor-pointer"
        onClick={() => router.push('/enviar_tramite')}
      />
    </Steps>
  </div>
}








