import React from 'react';
import Header from '../components/header'
import NavigationStep from '../components/steps'
import Observations from '../components/observation'
import { Input, Table, Space, Steps, Select, Radio, Button, Modal } from 'antd';
import LikeDislike from '../components/like_dislike'

import { PlusOutlined } from '@ant-design/icons';
import Label from '../components/label'
import SelectMultiple from '../components/select_multiple'

const { OptGroup } = Select;

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

function handleChange(value) {
  console.log(`selected ${value}`);
}





class CompanyData extends React.Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
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
          <div className="pb-6">
            <Label title="Tipo de personeria" labelRequired="*" />
            <Select defaultValue="Seleccione un tipo de empresa" onChange={handleChange}>
              <OptGroup label=" Persona Fisica">
                <Option value="PersonaFisica">Persona Física</Option>
              </OptGroup>
              <OptGroup label="Persona Jurídica">
                <Option value="cooperativas">Cooperativas</Option>
                <Option value="SA">Sociedad Anónima</Option>
                <Option value="SRL">Sociedad Resposabilidad limitada</Option>
              </OptGroup>
            </Select>
          </div>
          <div className="pb-6">
            <Label title="Tipo de Empresa" labelRequired="*" />
            <Select mode="multiple"
              placeholder="seleccione una opcion"
              defaultValue={['Seleccione una opcion']}
              onChange={handleChange}
              optionLabelProp="label"
            >
              {tipoEmpresa.map(u => (
                <Option value={u.value} label={u.label}>
                  <div className="demo-option-label-item">

                    {u.option}
                  </div>
                </Option>

              ))}

            </Select>
            <Observations title="El tipo de empresa seleccionado no es el correcto"/>
          </div>
          <div className="pb-6">
            <Label title="Razon Social" labelRequired="*" />
            <Input placeholder="Constructora del oeste" disabled />
            <Observations />
          </div>
          <div className="pb-6">
            <Label title="CUIT" labelRequired="*" />
            <Input placeholder="Ingrese el numero de cuit sin guiones" />
          </div>
          <div className="pb-6">
            <Label title="Nro de Legajo" />
            <Input placeholder="Ingrese el numero de legajo" />
          </div>
          <div className="pb-6">
            <Label title="Email Institucional" labelRequired="*" />
            <Input placeholder="Ingrese el email" />
          </div>


        </div>
        <div className="mt-6">
          <div className="flex  content-center ">
            <div className="text-2xl font-bold py-4 w-3/4"> Apoderados y/o Representantes legales</div>
            <div className=" w-1/4 text-right content-center ">
              <Button type="primary" onClick={this.showModal} icon={<PlusOutlined />}> Agregar</Button>
            </div>
          </div>

          <Table columns={columns} dataSource={data} />
        </div>


        <Modal
          title="Datos de la Persona Física"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <div className="grid grid-cols-2 gap-4 ">

            <div className="pb-6">
              <Label title="Nombre" labelRequired="*" />
              <Input placeholder="Ingrese su nombre de pila"  />
            </div>
            <div className="pb-6">
              <Label title="Apellido" labelRequired="*" />
              <Input placeholder="Ingrese su apellido" />
            </div>
            </div>
            <div className="grid grid-cols-4 gap-4 ">

            <div className="pb-6">
              <Label title="Tipo de Documento"  labelRequired="*" />
              <Input placeholder="Ingrese el numero de legajo" />
            </div>
            <div className="pb-6">
              <Label title="Nro de Documento" labelRequired="*" />
              <Input placeholder="Ingrese el nro de documentp" />
            </div>
            <div className="pb-6">
              <Label title="CUIT / CUIL" labelRequired="*" />
              <Input placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio" />
            </div>
            <div className="pb-6">
              <Label title="Usuario" labelRequired="*" />
              <Input placeholder="Ingrese su usuario recuerde que no puede ser su nombre." />
            </div>



          </div>
        </Modal>


      </div>

    </div>
    )
  }
}

export default CompanyData;
