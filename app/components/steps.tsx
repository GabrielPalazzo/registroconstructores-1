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
        onClick={() => router.push('/informacion_basica')}
      />
      <Step
        title="Información"
        onClick={() => router.push('/domicilio')}
      />
      <Step
        title="DDJ de balances"
        onClick={() => router.push('/ejercicios')}
      />
      <Step
        title="DDJ de obras"
        onClick={() => router.push('/obras')}
      />
      <Step
        title="Enviar trámite"
        onClick={() => router.push('/enviar_tramite')}
      />
    </Steps>
  </div>
}








