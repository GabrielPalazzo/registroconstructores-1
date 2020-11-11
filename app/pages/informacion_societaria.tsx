import React from 'react';
import { useRouter } from 'next/router'
import NavigationStep from '../components/steps'
import InputText from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import Header from '../components/header'
import DatePicker from '../components/datePicker'
import Switch from '../components/switch'
import DatePickerModal from '../components/datePicker_Modal'
import Upload from '../components/upload'
import { Button, Card, Steps, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Substeps from '../components/subSteps'
import Link from 'next/link'


const { Step } = Steps;
const renderModalCalidad = () => {
  return (<div>
    <div className="grid grid-cols-2 gap-4 ">
      <div className="pb-6" >
        <InputTextModal
          label="CUIT / CUIL"
          labelRequired="*"
          placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
        <InputTextModal
          label="Norma"
          labelRequired="*"
          value=""

          labelMessageError=""
          required />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 ">

      <div className="pb-6" >
        <InputTextModal
          label="Direccion"
          labelRequired="*"
          placeholder="Ingrese su numero de documento sin deja espacios"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="pb-6" >
          <DatePickerModal
            label="Fecha de otorgamiento"
            labelRequired="*"
            placeholder="Ingrese su numero de documento sin deja espacios"
            value=""

            labelMessageError=""
            required />

        </div>
        <div className="pb-6" >
          <DatePickerModal
            label="Fecha de expiracion"
            labelRequired="*"
            placeholder="Ingrese su numero de documento sin deja espacios"
            value=""

            labelMessageError=""
            required />

        </div>
      </div>


    </div>

    <div className="grid grid-cols-2 gap-4 ">
      <div className="pb-6" >
        <Upload
          label="Adjunte  Documento "
          labelRequired="*"
          labelMessageError=""
        />
      </div>
    </div>
  </div>)
}


const renderModalAutoridad = () => {
  return (<div>
    <div className="grid grid-cols-2 gap-4 ">
      <div className="pb-6" >
        <InputTextModal
          label="Nombre"
          labelRequired="*"
          placeholder="Ingrese su nombre de Pila"
          value=""

          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
        <InputTextModal
          label="Apellido"
          labelRequired="*"
          value=""
          labelMessageError=""
          required />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4 ">
      <div className="pb-6" >
        <InputTextModal
          label="Tipo de Doc"
          labelRequired="*"
          placeholder="Ingrese su numero de documento sin deja espacios"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
        <InputTextModal
          label="Nº de Documento"
          labelRequired="*"
          placeholder="Ingrese su numero de documento sin deja espacios"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
        <InputTextModal
          label="tipo de Organo"
          labelRequired="*"
          placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
        <InputTextModal
          label="Tipo de Cargo"
          labelRequired="*"
          placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
          value=""
          labelMessageError=""
          required />

      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 ">
      <div className="pb-6" >
        <InputTextModal
          label="Direccion"
          labelRequired="*"
          placeholder="Ingrese su email personal"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="pb-6" >
          <InputTextModal
            label="CUIT"
            labelRequired="*"
            value=""
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />
        </div>

        <div className="pb-6" >
          <Switch
            label="Inhibiciones"
            labelRequired="*"
            SwitchLabel1="Si"
            SwitchLabel2="No"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
          />
        </div>
      </div>


    </div>
    <div className="grid grid-cols-1 gap-4 ">
      <div className="pb-6" >
        <InputTextModal
          label="Observaciones"
          labelRequired="*"
          value=""
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
          required />
      </div>

      <div className="pb-6" >
        <Upload
          label="Adjunte Frente y Dorso del documento "
          labelRequired="*"
          labelMessageError=""
        />
      </div>
    </div>
  </div>)
}


const renderNoData = () => {


  return (<div>
    <Card>
      <div className="mt-4">
        <div className="text-sm text-center">No hay Datos ingresados</div>
        <div className="text-primary-700 text-sm text-center mt-2 font-bold flex justify-center">Cargue uno presionando Agregar
      <svg width="70" height="31" viewBox="0 0 70 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="pl-2">
            <path d="M30.8624 25.6685L31.1624 26.6225L30.8624 25.6685ZM69.9995 2.03192C70.0171 1.47992 69.5839 1.01814 69.0319 1.00051L60.0365 0.713215C59.4845 0.695585 59.0227 1.12878 59.0051 1.68078C58.9875 2.23279 59.4207 2.69457 59.9727 2.7122L67.9686 2.96757L67.7132 10.9635C67.6956 11.5155 68.1288 11.9773 68.6808 11.9949C69.2328 12.0125 69.6946 11.5793 69.7122 11.0273L69.9995 2.03192ZM1 29.8452C0.886109 30.8387 0.886455 30.8388 0.886848 30.8388C0.88704 30.8388 0.887479 30.8389 0.887865 30.8389C0.888635 30.839 0.889592 30.8391 0.890733 30.8392C0.893015 30.8395 0.896038 30.8398 0.899799 30.8402C0.907319 30.8411 0.917788 30.8422 0.931181 30.8436C0.957967 30.8464 0.996449 30.8503 1.04643 30.855C1.14638 30.8645 1.29231 30.8773 1.48262 30.8914C1.86323 30.9197 2.42138 30.9531 3.14418 30.9753C4.58971 31.0198 6.69421 31.0195 9.35444 30.8432C14.6748 30.4906 22.2199 29.4339 31.1624 26.6225L30.5625 24.7146C21.7905 27.4724 14.4045 28.5041 9.22219 28.8476C6.63111 29.0193 4.59145 29.0189 3.20566 28.9763C2.51279 28.955 1.98348 28.9231 1.63055 28.8969C1.45408 28.8838 1.32173 28.8722 1.23508 28.864C1.19176 28.8599 1.15986 28.8566 1.1396 28.8545C1.12946 28.8534 1.12224 28.8526 1.11795 28.8522C1.1158 28.8519 1.11439 28.8518 1.11371 28.8517C1.11337 28.8517 1.11322 28.8517 1.11325 28.8517C1.11326 28.8517 1.11342 28.8517 1.11343 28.8517C1.11364 28.8517 1.11389 28.8517 1 29.8452ZM31.1624 26.6225C49.0798 20.9894 57.7588 13.9165 69.6842 2.72932L68.3158 1.27068C56.4952 12.3597 48.0739 19.2091 30.5625 24.7146L31.1624 26.6225Z" fill="#0072BB" />
          </svg></div>
      </div>
    </Card>

  </div>)
}

class Society extends React.Component {
  state = {
    ModalAutoridad: false,
    ModalCalidad: false,
  };

  showModalAutoridad = (ModalAutoridad) => {
    this.setState({
      ModalAutoridad,
    });
  };

  showModalCalidad = (ModalCalidad) => {
    this.setState({
      ModalCalidad,
    });
  };

  handleSaveAutoridad = e => {
    console.log(e);
    this.setState({
      ModalAutoridad: false,
    });
  };

  handleCancelAutoridad = e => {
    console.log(e);
    this.setState({
      ModalAutoridad: false,
    });
  };
  handleSaveCalidad = e => {
    console.log(e);
    this.setState({
      ModalCalidad: false,
    });
  };

  handleCancelCalidad = e => {
    console.log(e);
    this.setState({
      ModalCalidad: false,
    });
  };




  render() {


    return (<div>
      <Header />
      <div className="border-gray-200 border-b-2 py-4">
        <NavigationStep current={1} />
      </div>
      <div className="w-2/5 m-auto text-base mt-8">
        <Substeps progressDot current={1} />
      </div>



      <div className="px-20 py-6 ">

        <div className="text-2xl font-bold py-4"> Constitución Societaria</div>
        <div className="grid grid-cols-2 gap-4 ">
          <div >
            <InputText
              label="Registro publico  de comercio"
              labelRequired="*"
              placeholder="Registro publico  de comercio"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required />
          </div>
          <div >
            <InputText
              label="Inspeccion General de Justicia"
              labelRequired="*"
              placeholder="Inspeccion General de Justicia"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required />
          </div>
        </div>

        <div className="text-2xl font-bold py-4 mt-4"> Inscripción en el rubro de construcción</div>
        <div className="grid grid-cols-4 gap-4 ">
          <div ><InputText
            label="Lugar"
            labelRequired="*"
            placeholder=""
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required /></div>
          <div >
            <DatePicker
              label="Fecha"
              labelRequired="*"
              placeholder="Inspeccion General de Justicia"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required /></div>
          <div >
            <DatePicker
              label="Fecha"
              labelRequired="*"
              placeholder="Inspeccion General de Justicia"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required /></div>
          <div >
            <InputText
              label="Datos"
              labelRequired="*"
              placeholder="Inspeccion General de Justicia"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required /></div>
        </div>

        <div className="flex  content-center ">
          <div className="text-2xl font-bold py-4 w-3/4"> Autoridad</div>
          <div className=" w-1/4 text-right content-center mt-4 ">
            <Button type="primary" onClick={this.showModalAutoridad} icon={<PlusOutlined />}> Agregar</Button>
          </div>
        </div>
        {renderNoData()}
        <Modal
          title="Datos de la Autoridad"
          visible={this.state.ModalAutoridad}
          onOk={this.handleSaveAutoridad}
          okText="Guardar"
          onCancel={this.handleCancelAutoridad}
          cancelText="Cancelar"
          width={1000}
        >
          {renderModalAutoridad()}
        </Modal>


        <div className="flex  content-center mt-6">
          <div className="text-2xl font-bold py-4 w-3/4"> Sistema de Calidad</div>
          <div className=" w-1/4 text-right content-center mt-4 ">
            <Button type="primary" onClick={this.showModalCalidad} icon={<PlusOutlined />}> Agregar</Button>
          </div>
        </div>
        {renderNoData()}
        <Modal
          title="Datos del Sistema de Calidad"
          visible={this.state.ModalCalidad}
          onOk={this.handleSaveCalidad}
          okText="Guardar"
          onCancel={this.handleCancelCalidad}
          cancelText="Cancelar"
          width={1000}
        >
          {renderModalCalidad()}
        </Modal>




        <div className="mt-6 pt-6 text-center">
          <Link href="/domicilio" >

            <Button className="mr-4" > Volver</Button>
          </Link>
          <Link href="/informacion_propietarios" >
            <Button type="primary" > Guardar y Seguir</Button>
          </Link>

        </div>

      </div>

    </div>
    )
  }
}

export default Society;

