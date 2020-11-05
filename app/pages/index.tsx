import React from 'react';
import { Header } from '../components/Header/index'
import NavigationStep from '../components/steps'
import { InputText }  from '../components/InputText/index';
import { Table, Space, Steps } from 'antd';



const { Step } = Steps;

const columns = [
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

  {
    title: 'Action',
    key: 'action',
    render: (text) => (
      <Space size="middle">
        <a>bien </a>
        <a>mal</a>
      </Space>
    ),
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


export default () => {

  return <div className="">
    <Header
  label="Guardar y Salir"
  onCreateAccount={() => {}}
  onLogin={function noRefCheck() {}}
  onLogout={function noRefCheck() {}}
  user={{}}
/>
    <div className="border-gray-200 border-b-2">
      <NavigationStep />
    </div>

    <div className="px-20 py-6 ">
      <div className="text-2xl font-bold"> Datos de la empresa</div>

      <InputText
        label="Nombre de la empresa"
        labelRequired="*"
        placeholder="escriba su nombre"
        size="large"
      />
      <Table columns={columns} dataSource={data} />

    </div>

  </div>
}