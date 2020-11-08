import React from 'react';
import Header from '../components/header'
import NavigationStep from '../components/steps'
import { Input, Table, Space, Steps,Select,  Radio, Button, Modal } from 'antd';
import LikeDislike from '../components/like_dislike'
import Label from '../components/label'

import { PlusOutlined } from '@ant-design/icons';
import InputText from '../components/input_text'
import SelectMultiple from '../components/select_multiple'
import Select2 from '../components/select'



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


const { Option } = Select;





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
        <NavigationStep />
      </div>

      <div className="px-20 py-6 ">
        
        <div className="text-2xl font-bold py-4"> Datos de la empresa</div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div >
          <Select2
        title="Tipo de personeria" 
        defaultOption="Seleccione el tipo de personeria"
        labelRequired="*" 
        option={tipoPersoneria.map(u => (
          <Option value={u.value}>{u.label}</Option>
         
        ))}/>

          </div>
          <div >
            <SelectMultiple
              labelRequired="*"
              defaultValue={['Constructora']}
              title="Seleccione el tipo de empresa"
              placeholder="seleccione una opcion"
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
              labelMessageError="Este campo es requerido"
              required/>

            
          </div>
          <div >
            <InputText
              label="CUIT"
              labelRequired="*"
              placeholder="Ingrese el numero de cuit sin guiones"
              labelObservation="Porque me observaron este campo"
              labeltooltip="no pertece el cuit"
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
              required />

          </div>


        </div>
        <div className="mt-6">
          <div className="flex  content-center ">
            <div className="text-2xl font-bold py-4 w-3/4"> Apoderados y/o Representantes legales</div>
            <div className=" w-1/4 text-right content-center mt-4 ">
              <Button type="primary" onClick={this.showModal} icon={<PlusOutlined />}> Agregar</Button>
            </div>
          </div>

          <Table columns={columns} dataSource={data} />
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
          <div className="grid grid-cols-2 gap-4 ">

            <div className="pb-6">
            <InputText 
              label="Nombre"
              labelRequired="*"
              placeholder="Ingrese su nombre de Pila"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required/>
              
            </div>
            <div className="pb-6">
            <InputText 
              label="Apellido"
              labelRequired="*"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required/>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">

            <div className="pb-6">
              <Label title="Tipo de Documento" labelRequired="*" />
              <Input placeholder="Ingrese el numero de legajo" />
            </div>
            <div className="pb-6">
            <InputText 
              label="Nro de Documento"
              labelRequired="*"
              placeholder="Ingrese su numero de documento sin deja espacios"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required/>
              
            </div>
            <div className="pb-6">
            <InputText 
              label="CUIT / CUIL"
              labelRequired="*"
              placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required/>
              
            </div>
            <div className="pb-6">
            <InputText 
              label="Usuario"
              labelRequired="*"
              placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
              value=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              required/>
              
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">



          </div>
        </Modal>


      </div>

    </div>
    )
  }
}

export default CompanyData;
