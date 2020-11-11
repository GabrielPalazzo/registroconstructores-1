import React from 'react';
import { useRouter } from 'next/router'
import NavigationStep from '../components/steps'
import InputText from '../components/input_text'
import Header from '../components/header'
import Upload from '../components/upload'
import { Button, Steps,Card } from 'antd';
import Substeps from '../components/subSteps'
import like_dislike from '../components/like_dislike';

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
        <div className="text-base font-bold text-primary-700 pb-2 "> ¿Desea confirmar el envío de su trámite?</div>
        <div  className="text-muted-700 text-sm  mt-2 self-center"  > Puede revisar cada uno de los pasos haciendo click en los mismos</div>
      </Card>
      

      <div className="mt-6 pt-4 text-center">
         
          <Button type="primary"  onClick={() => router.push('/success')}> Enviar Tramite</Button>
        
         </div>

    </div>

  </div>
}


