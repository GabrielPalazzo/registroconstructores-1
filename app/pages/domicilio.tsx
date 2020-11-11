import React from 'react';
import { useRouter } from 'next/router'
import NavigationStep from '../components/steps'
import InputText from '../components/input_text'
import Header from '../components/header'
import Upload from '../components/upload'
import { Button, Steps } from 'antd';
import Substeps from '../components/subSteps'
import like_dislike from '../components/like_dislike';

const { Step } = Steps;
export default () => {
  const router = useRouter()

  return <div>
    <Header />
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
            labelRequired="*"
            placeholder="Indique calle,numero,provincia"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />
        </div>
      <div className="text-2xl font-bold py-4"> Domicilio Real</div>
        <div>
          <InputText
            label="Domicilio"
            labelRequired="*"
            placeholder="Indique calle,numero,provincia"
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
         
         <Button  className="mr-4"  onClick={() => router.push('/i')}> Volver</Button>
          <Button type="primary"  onClick={() => router.push('/informacion_societaria')}> Guardar y Seguir</Button>
        
         </div>

    </div>

  </div>
}


