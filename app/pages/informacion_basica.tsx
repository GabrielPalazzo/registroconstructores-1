import React from 'react';
import Header from '../components/header'
import NavigationStep from '../components/steps'
import { Input, Table, Space, Steps, Card, Select, Radio, Button, Modal } from 'antd';
import LikeDislike from '../components/like_dislike'
import { useRouter } from 'next/router'
import Upload from '../components/upload'

import { PlusOutlined } from '@ant-design/icons';
import InputText from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import SelectMultiple from '../components/select_multiple'
import SelectSimple from '../components/select'
import Switch from '../components/switch'
import RadioGroup from '../components/radioGroup'
import SelectModal from '../components/select_modal'
import Link from 'next/link'
import uploadLine from '../components/uploadLine';

const { Option } = Select;


const renderNoData = () => {
  return (<div>
    <div className="mt-4">
      <Card >
        <div className="text-sm text-center">No hay Autoridades Cargadas</div>
        <div className="text-primary-700 text-sm text-center mt-2 font-bold flex justify-center">Cargue uno presionando Agregar
      <svg width="70" height="31" viewBox="0 0 70 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="pl-2">
            <path d="M30.8624 25.6685L31.1624 26.6225L30.8624 25.6685ZM69.9995 2.03192C70.0171 1.47992 69.5839 1.01814 69.0319 1.00051L60.0365 0.713215C59.4845 0.695585 59.0227 1.12878 59.0051 1.68078C58.9875 2.23279 59.4207 2.69457 59.9727 2.7122L67.9686 2.96757L67.7132 10.9635C67.6956 11.5155 68.1288 11.9773 68.6808 11.9949C69.2328 12.0125 69.6946 11.5793 69.7122 11.0273L69.9995 2.03192ZM1 29.8452C0.886109 30.8387 0.886455 30.8388 0.886848 30.8388C0.88704 30.8388 0.887479 30.8389 0.887865 30.8389C0.888635 30.839 0.889592 30.8391 0.890733 30.8392C0.893015 30.8395 0.896038 30.8398 0.899799 30.8402C0.907319 30.8411 0.917788 30.8422 0.931181 30.8436C0.957967 30.8464 0.996449 30.8503 1.04643 30.855C1.14638 30.8645 1.29231 30.8773 1.48262 30.8914C1.86323 30.9197 2.42138 30.9531 3.14418 30.9753C4.58971 31.0198 6.69421 31.0195 9.35444 30.8432C14.6748 30.4906 22.2199 29.4339 31.1624 26.6225L30.5625 24.7146C21.7905 27.4724 14.4045 28.5041 9.22219 28.8476C6.63111 29.0193 4.59145 29.0189 3.20566 28.9763C2.51279 28.955 1.98348 28.9231 1.63055 28.8969C1.45408 28.8838 1.32173 28.8722 1.23508 28.864C1.19176 28.8599 1.15986 28.8566 1.1396 28.8545C1.12946 28.8534 1.12224 28.8526 1.11795 28.8522C1.1158 28.8519 1.11439 28.8518 1.11371 28.8517C1.11337 28.8517 1.11322 28.8517 1.11325 28.8517C1.11326 28.8517 1.11342 28.8517 1.11343 28.8517C1.11364 28.8517 1.11389 28.8517 1 29.8452ZM31.1624 26.6225C49.0798 20.9894 57.7588 13.9165 69.6842 2.72932L68.3158 1.27068C56.4952 12.3597 48.0739 19.2091 30.5625 24.7146L31.1624 26.6225Z" fill="#0072BB" />
          </svg></div>
      </Card>
    </div>
  </div>)
}




const renderModal = () => {
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
    <SelectModal
              title="Tipo de documento"
              defaultOption="Seleccione el tipo de Doc"
              labelRequired="*"
              labelMessageError=""
              required
              option={tipoDocumento.map(u => (
                <Option value={u.value}>{u.label}</Option>

              ))} />
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
          label="CUIT / CUIL"
          labelRequired="*"
          placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
      <InputTextModal
          label="Usuario"
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
          label="Email"
          labelRequired="*"
          placeholder="Ingrese su email personal"
          value=""
          labelMessageError=""
          required />

      </div>
      <div className="pb-6" >
      <InputTextModal
          label="Propuesta Electronica"
          labelRequired="*"
          value=""
          labelMessageError=""
          required />
      </div>
      <div className="pb-6" >
        <RadioGroup
          label="¿Qué tipo de persona desea dar de alta? "
          labelRequired="*"
          value=""
          labelMessageError=""
          radioOptions={tipoPersona.map(u => (
            <Radio value={u.value} >
              {u.label}
            </Radio>
          ))

          }

        />
      </div>
      <div className="pb-6" >
        <Switch
          label="Administrador Legitimado"
          labelRequired="*"
          SwitchLabel1="Si"
          SwitchLabel2="No"
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
        />
      </div>

    </div>
    <div className="grid grid-cols-3 gap-4 ">
    <div className="pb-6" >
      <Upload
        label="Adjunte fotos de frente y dorso del DNI"
        labelRequired="*"
        labelMessageError=""

      />
      </div>
      <div className="pb-6" >
        <Upload
          label="Adjunte el poder"
          labelRequired="*"
          labelMessageError=""
        />
      </div>
      <div className="pb-6" >
        <Upload
          label="Adjunte Acta "
          labelRequired="*"
          labelMessageError=""
        />
      </div>
    </div>
  </div>)
}




class CompanyData extends React.Component {


  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSave = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
    

    return (<div className="">
      <Header />
      <div className="border-gray-200 border-b-2">
        <NavigationStep 
        current={0} />
      </div>

      <div className="px-20 py-6 ">

        <div className="text-2xl font-bold py-4"> Datos de la empresa</div>
        <div className="grid grid-cols-2 gap-4 ">
          <div >
            <SelectSimple
              title="Tipo de personeria"
              defaultOption="Seleccione el tipo de personeria"
              labelRequired="*"
              labelObservation="¿Por qué me observaron este campo? "
              labeltooltip="El tipo de empresa seleccionado es incorrecto"
              labelMessageError=""
              required
              option={tipoPersoneria.map(u => (
                <Option value={u.value}>{u.label}</Option>

              ))} />

          </div>
          <div >
            <SelectMultiple
              labelRequired="*"
              defaultValue={['Constructora']}
              title="Seleccione el tipo de empresa"
              placeholder="seleccione una opcion"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required
              options={tipoEmpresa.map(u => (
                <Option value={u.value} label={u.label}>
                  <div className="demo-option-label-item">
                    {u.option}
                  </div>
                </Option>
              ))

              } />

          </div>
          <div >
            <InputText

              label="Razon Social"
              labelRequired="*"
              placeholder="Constructora del oeste"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required />


          </div>
          <div >
            <InputText
              label="CUIT"
              labelRequired="*"
              placeholder="Ingrese el numero de cuit sin guiones"
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required />

          </div>
          <div >
            <InputText
              label="Nro de Legajo"
              placeholder="Ingrese el numero de legajo"
              disabled
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
            />

          </div>
          <div >
            <InputText type="email"
              label="Email institucional"
              labelRequired="*"
              placeholder="Email Institucional"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              status="" />

          </div>
          <div >
            <InputText 
              label="IERIC"
              labelRequired="*"
              placeholder="IERIC"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              status="" />

          </div>
          <div >
            <Upload
              label="Adjunte certificado"
              labelRequired="*"
              labelMessageError="" />

          </div>


        </div>
        <div className="mt-6">
          <div className="flex  content-center ">
            <div className="text-2xl font-bold py-4 w-3/4"> Apoderados y/o Representantes legales</div>
            <div className=" w-1/4 text-right content-center mt-4 ">
              <Button type="primary" onClick={this.showModal} icon={<PlusOutlined />}> Agregar</Button>
            </div>
          </div>

          <Modal
            title="Datos de la Persona Física"
            visible={this.state.visible}
            onOk={this.handleSave}
            okText="Guardar"
            onCancel={this.handleCancel}
            cancelText="Cancelar"
            width={1000}
          >
            {renderModal()}
          </Modal>


          <Table columns={columns} dataSource={data} />
        </div>

        <div className="mt-6 pt-6 text-center">
        <Link href="/" >
          <Button className="mr-4" > Volver</Button>
          </Link>
         <Link href="/domicilio" >
         <Button type="primary" > Guardar y Seguir</Button>
         </Link> 

        </div>



      </div>

    </div>
    )
  }
}

export default CompanyData;






const tipoPersona = [
  {
    label: 'Apoderado',
    value: 'Apoderado',
  },
  {
    label: 'Representante Legal',
    value: 'Rep Legal',
  }

]

const tipoPersoneria = [
  {
    label: 'Persona Fisica',
    value: 'PF',
  },
  {
    label: 'Sociedad Anonima',
    value: 'SA',
  },
  {
    label: 'Sociedad Responsabilidad Limitada',
    value: 'SRL',
  },


]
const tipoDocumento= [
  {
    label: 'DU',
    value: 'DU',
  },
  {
    label: 'Pasaporte',
    value: 'Pasaporte',
  },
  {
    label: 'Cedula de indentidad',
    value: 'CD',
  },


]

const tipoEmpresa = [
  {
    label: 'Constructora',
    value: 'Constructora',
    option: 'Constructora',
  },
  {
    label: 'Provedora',
    value: 'Provedora',
    option: 'Provedora',
  },
  {
    label: 'Consultora',
    value: 'Consultora',
    option: 'Consultora',
  },

]


const columns = [
  {
    title: 'Action',
    key: 'action',
    render: (text) => (
      <Space size="middle">
        <LikeDislike />
      </Space>
    ),
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Apellido',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'CUIT',
    dataIndex: 'cuit',
    key: 'cuit',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Admin. Legitimado',
    dataIndex: 'admin_legitimado',
    key: 'admin_legitimado',
  },


];

const data = [
  {
    key: '1',
    name: 'Leonardo',
    first_name: ' Leenen',
    cuit: 33333333333,
    email: 'leonardo.leenen@gmail.com',
    user: 'LeonardoLeenen',
    admin_legitimado: 'SI',

  },
  {
    key: '1',
    name: 'Maria Noel',
    first_name: ' Leenen',
    cuit: 33444444445,
    email: 'marianoel.leenen@gmail.com',
    user: 'MariaNoelLeenen',
    admin_legitimado: 'NO',

  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',

  },
];
