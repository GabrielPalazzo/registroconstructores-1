import React, { useEffect, useState } from 'react';
import {HeaderPrincipal} from '../components/header'
import NavigationStep from '../components/steps'
import { Input, Table, Space, Steps, Card, Select, Radio, Button, Modal, Checkbox } from 'antd';
import LikeDislike from '../components/like_dislike'

import { Router, useRouter } from 'next/router'
import Upload from '../components/upload'
import DatePicker from '../components/datePicker'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import InputText from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import SelectMultiple from '../components/select_multiple'
import SelectSimple from '../components/select'
import Switch from '../components/switch'
import RadioGroup from '../components/radioGroup'
import SelectModal from '../components/select_modal'
import { useSelector, useDispatch } from 'react-redux'
import { saveTramite } from '../redux/actions/main'
import { getEmptyTramiteAlta, getTramiteByCUIT } from '../services/business';
import { Loading } from '../components/loading';


const { Option } = Select;
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

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







export default () => {

  const router = useRouter()

  const [visible, setVisible] = useState<boolean>(false)
  
  const [tipoEmpresa, setTipoEmpresa] = useState(null)
  const [personeria, setPersoneria] = useState(null)
  const [waitingType, setWaitingType] = useState<'sync'  | 'waiting'>('waiting')
  
  //const tramiteSesion: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta()
  const [tramite, setTramite] = useState<TramiteAlta>(useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())
  const tipoAccion : string = useSelector(state => state.appStatus.tipoAccion) || 'SET_TRAMITE_NUEVO'
  const [nombre, setNombre] = useState(' ')
  const [apellido, setApellido] = useState('')
  const [email,setEmail] = useState('')
  const [propuestaElectronica, setPropuestaElectronica] = useState('')
  const [cuit,setCuit] = useState('')
  const [nroDocumento,setNroDocumento] = useState('')
  const [tipoDocumentoApoderado,setTipoDocumentoApoderado] = useState('')
  const dispatch = useDispatch()
  const paso = useSelector(state => state.appStatus.paso)
  const [isLoading,setIsLoading] = useState(false)


  const showModal = () => {
    setVisible(true)
  }

  const handleSaveApoderado = () => {
    tramite.apoderados.push({
      esAdministrador: false,
      imagenesDni: [],
      apellido,
      nombre,
      email,
      cuit,
      nroDocumento,
      tipoDocumento: tipoDocumentoApoderado
    })
    save()
    setVisible(false)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const save = async () => {
    setWaitingType('sync')
    
    setIsLoading(true)
    if (tramite._id){
      await dispatch(saveTramite(tramite))
    } else {
      if (!(await getTramiteByCUIT(tramite.cuit)))
        await dispatch(saveTramite(tramite))
    }
    setIsLoading(false)
  }


  const removeApoderadoFromList = (record: Apoderado) => {
    tramite.apoderados = tramite.apoderados.filter( (a:Apoderado) => a.cuit !== record.cuit)
    save()
  }

  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (text,record) => (tipoAccion ==='SET_TRAMITE_NUEVO' || !tipoAccion ? <div onClick={() => removeApoderadoFromList(record)}><DeleteOutlined /></div> :<Space size="middle">
      <LikeDislike />
    </Space>),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre'
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
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
    }
  
  
  ];

  const updateObjTramite = () => {
    setTramite(Object.assign({},tramite))
  } 

  const renderApoderadosSection = () => {
    return (<div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="pb-6" >
          <InputTextModal
            label="Nombre"
            labelRequired="*"
            placeholder="Ingrese su nombre de Pila"
            value={nombre}
            bindFunction={setNombre}
            labelMessageError=""
            required />
  
        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Apellido"
            labelRequired="*"
            value={apellido}
            bindFunction={setApellido}
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
            value={nroDocumento}
            bindFunction={setNroDocumento}
            labelMessageError=""
            required />
  
        </div>
        <div className="pb-6" >
          <InputTextModal
            label="CUIT / CUIL"
            labelRequired="*"
            placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
            value={cuit}
            bindFunction={setCuit}
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
            value={email}
            bindFunction={setEmail}
            labelMessageError=""
            required />
  
        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Propuesta Electronica"
            labelRequired="*"
            value={propuestaElectronica}
            bindFunction={setPropuestaElectronica}
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
      <div>
        <Checkbox onChange={onChange}>Declaro bajo juramento que la informacion consignada precedentemente y la documentacion presentada reviste caracter de declaracion jurada
      asi mismo me responsabilizo de su veracidad y me comprometo a facilitar su veracidad</Checkbox>
      </div>
    </div>)
  }

  if (isLoading)
    return <Loading message="" type={waitingType}/>

  return (<div className="">
    <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }}/>
    <div className="border-gray-200 border-b-2">
      <NavigationStep
        current={0} />
    </div>

    <div className="px-20 py-6 ">

      <div className="text-2xl font-bold py-4"> Datos de la empresa</div>
      <div className="grid grid-cols-2 gap-4 ">
        <div >
          <SelectSimple
            value={tramite.personeria}
            bindFunction={(value) => {
              tramite.personeria= value
              updateObjTramite()
            }}
            title="Tipo de personeria"
            defaultOption="Seleccione el tipo de personeria"
            labelRequired="*"
            labelObservation="¿Por qué me observaron este campo? "
            labeltooltip="El tipo de empresa seleccionado es incorrecto"
            labelMessageError=""
            required
            option={tipoPersoneria.map(u => (
              <Option  value={u.value}>{u.label}</Option>
            ))} />

        </div>
        <div >
          <SelectMultiple
            labelRequired="*"
            value={tramite.tipoEmpresa}
            bindFunction={(value) => {
              tramite.tipoEmpresa= value
              updateObjTramite()
            }}
            title="Seleccione el tipo de empresa"
            placeholder="seleccione una opcion"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required
            options={tipoEmpresas.map(u => (
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
            placeHolder="Constructora del oeste"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            value={tramite.razonSocial}
            bindFunction={(value) => {
              tramite.razonSocial= value
              updateObjTramite()
            }}
            required />


        </div>
        <div >
          <InputText
            label="CUIT"
            value={tramite.cuit}
            bindFunction={(value) => {
              tramite.cuit= value
              setTramite(Object.assign({},tramite))
            }}
            placeHolder="Ingrese el numero de cuit sin guiones"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />

        </div>
        <div >
          <InputText
            label="Nro de Legajo"
            value={tramite.nroLegajo}
            bindFunction={(value) => {
              tramite.nroLegajo= value
              updateObjTramite()
            }}
            placeHolder="Ingrese el numero de legajo"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
          />

        </div>
        <div >
          <InputText type="email"
            label="Email institucional"
            value={tramite.email}
            bindFunction={(value) => {
              tramite.email= value
              updateObjTramite()
            }}
            placeHolder="Email Institucional"
          />

        </div>
        <div >
          <InputText
            label="IERIC"
            placeHolder="IERIC"
            value={tramite.ieric}
            bindFunction={(value) => {
              tramite.ieric= value
              updateObjTramite()
            }}
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
          />

        </div>
        <div >
          <DatePicker
            value={tramite.vtoIeric}
            bindFunction={(value) => {
              tramite.vtoIeric=value
              updateObjTramite()
            }}
            label="Fecha vencimiento IERIC"
            labelRequired="*"
            placeholder="dd/mm/aaaa"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
          />

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
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}> Agregar</Button>
          </div>
        </div>

        <Modal
          title="Datos de la Persona Física"
          visible={visible}
          onOk={handleSaveApoderado}
          okText="Guardar"
          onCancel={handleCancel}
          cancelText="Cancelar"
          width={1000}
        >
          {renderApoderadosSection()}
        </Modal>

        <Table  columns={columns} dataSource={tramite.apoderados} />
      </div>

      
      <div className="flex mt-6 pt-6 text-center">
        <Button type="primary" onClick={() => {
          save()
        }} > Guardar y Seguir</Button>
      </div>
    </div>

  </div>
  )
}






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
const tipoDocumento = [
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

const tipoEmpresas = [
  {
    label: 'Constructora',
    value: 'CONSTRUCTORA',
    option: 'Constructora',
  },
  {
    label: 'Provedora',
    value: 'PROVEEDORA',
    option: 'Provedora',
  },
  {
    label: 'Consultora',
    value: 'CONSULTORA',
    option: 'Consultora',
  },

]



