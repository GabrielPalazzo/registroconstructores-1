import React from 'react';
import { useRouter } from 'next/router'
import Header from '../components/header'
import { Button, Steps,Card } from 'antd';
import { CheckCircleFilled  } from '@ant-design/icons';

const { Step } = Steps;
export default () => {
  const router = useRouter()

  return <div>
    <Header />
    
   
    <div className="px-20 py-6 text-center m-auto mt-6">
    <CheckCircleFilled style={{fontSize: 60 , color: '#2E7D33'}} />
    <div className="text-2xl font-bold py-4 text-center"> Su trámite ha sido enviado</div>
    <Card className="rounded mr-2 text-center m-autop" style={{ width: 500 , margin: 'auto' }}>
        <div  className="text-muted-700 text-sm px-8 mt-4 self-center"  > La rectificación de su trámite ha sido completada y será enviada a la ONC para su revisión.</div>
        <div  className="text-muted-700 text-sm px-8 mt-4 self-center"  > Nos pondremos en contacto al mail consignado del Administrador Legitimado.</div>
        <div className="text-base font-bold mt-4 text-primary-700 pb-2 "> Numero de tramite : EX-2020-12345677-APN-MM</div>
        
      </Card>
      
      <div className="mt-6 pt-4 text-center">
         
          <Button type="primary"  onClick={() => router.push('/')}> Volver al inicio</Button>
        
         </div>

    </div>

  </div>
}


