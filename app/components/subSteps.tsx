import React from 'react';
import { Steps} from 'antd';
import { PlusOutlined ,ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'

const { Step } = Steps;

export default (props) => {
  const router = useRouter()

  return <div className="w-2/5 m-auto text-base mt-8">
  <Steps progressDot current={props.current}>
    <Step title="Domicilio"  onClick={() => router.push('/domicilio')} />
    <Step title="Sociedad" onClick={() => router.push('/informacion_societaria')}  />
    <Step title="Propietarios" onClick={() => router.push('/informacion_propietarios')}  />
  </Steps>
  </div>
}








