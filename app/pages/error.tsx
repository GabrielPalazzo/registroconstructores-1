import React from 'react';
import { useRouter } from 'next/router'
import Header from '../components/header'
import { Button, Steps,Card } from 'antd';
import NavigationStep from '../components/steps'
const { Step } = Steps;
export default () => {
  const router = useRouter()

  return <div>
    <Header />
    <div className="border-gray-200 border-b-2 py-4">
      <NavigationStep current={4} />
    </div>
    <div className="px-20 py-6 text-center m-auto mt-6">
   <div className="text-2xl font-bold py-4 text-center"> Enviar trámite</div>
    <Card className="rounded mr-2 text-center m-autop" style={{ width: 500 , margin: 'auto' }}>
        <div className="text-base font-bold text-warning-700 px-8 pb-2 "> Usted tiene items incompletos que deberá completar para poder enviar el trámite</div>
        
      </Card>
      
      <div className="mt-6 pt-4 text-center">
         
          <Button type="primary"  onClick={() => router.push('/informacion_societaria')}> Enviar Tramite</Button>
        
         </div>

    </div>

  </div>
}


