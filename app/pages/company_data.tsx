import React from 'react';
import Header from '../components/header'
import NavigationStep from '../components/steps'
import { Input, Table, Space, Steps, Select, Radio, Button } from 'antd';
import LikeDislike from '../components/like_dislike'

import {LikeOutlined, DislikeOutlined } from '@ant-design/icons';
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
        <LikeDislike/>
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

export default () => {

  return <div className="">
    <Header />
    <div className="border-gray-200 border-b-2">
      <NavigationStep />
    </div>

    <div className="px-20 py-6 ">
      <div className="text-2xl font-bold py-4"> Datos de la empresa</div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label title="Tipo de personeria" />
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
        <div>
          <Label title="Tipo de Empresa" />
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
        </div>
        <div>
          <Label title="Razon Social" />
          <Input placeholder="Constructora del oeste" disabled  />
        </div>
        <div>
          <Label title="CUIT" />
          <Input placeholder="Ingrese el numero de cuit sin guiones" />
        </div>
        <div>
          <Label title="Nro de Legajo" />
          <Input placeholder="Ingrese el numero de legajo" />
        </div>
        <div>
          <Label title="Email Institucional" />
          <Input placeholder="Ingrese el email" />
        </div>


      </div>
      <div  className="mt-6">
      <Table columns={columns} dataSource={data} />
      </div>

     

    </div>

  </div>
}