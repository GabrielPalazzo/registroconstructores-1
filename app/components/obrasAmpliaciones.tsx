import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table, Alert , Space} from 'antd';
import { PlusOutlined ,DeleteOutlined} from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

export interface ObrasAmpliacionesProps {
  obra: DDJJObra
  onChange: Function
}

export const ObrasAmpliaciones: React.FC<ObrasAmpliacionesProps> = ({
  obra = null,
  onChange = () => null
}) => {
  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())
  //const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
  const [monto, setMonto] = useState(0)
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [dataSource, setDataSource] = useState<Array<AmpliacionesObras>>(obra.ampliaciones)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {

  }, [])

  const eliminarDatos = (o:AmpliacionesObras) => {
    setDataSource(dataSource.filter( (a:AmpliacionesObras) => o.id!== a.id))
    obra.ampliaciones = Object.assign([],dataSource)
    onChange(Object.assign({},obra))
  }

  const columnsAmpliaciones = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarDatos(record)}><DeleteOutlined /></div> : <Space size="middle">
  
      </Space>),
    },
    {
      title: 'fecha',
      dataIndex: 'fecha',
      key: 'fecha'
    },
    {
      title: 'monto',
      dataIndex: 'monto',
      key: 'monto'
    },
    {
      title: 'descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion'
    },
    {
      title: 'Adjunto',
      dataIndex: 'adjunto',
      key: 'adjunto',
    }
  
  
  ];

  const add = () => {
    if ((!monto)) {
      setError('El monto  es requerido')
      setShowError(true)
      return
    }
    if ((!fecha)) {
      setError('La fecha es requerida')
      setShowError(true)
      return
    }

    dataSource.push({ id:getCodigoObra(), monto, fecha,descripcion })
    setDataSource(Object.assign([], dataSource))
    obra.ampliaciones = Object.assign([],dataSource)
    onChange(obra)
  }
  return <div>
    {showError ? <div className="mb-4">
      <Alert
        message='Error'
        description={error}
        type="error"
        showIcon
        closable
        afterClose={() => setShowError(false)}
      /></div> : ''}
    <div className="rounded-lg px-4 py-2  pb-4 border mt-6">
      
      <div className="text-xl font-bold py-2 w-3/4">  Ampliaciones</div>
      <div className="mb-4">
        <Alert message="En esta sección podrá cargar ampliaciones de contrato, adendas, economías, reducciones contractuales, etc." type="info" />
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="pb-6" >
          <InputTextModal
            label="Monto"
            type="number" step="any"
            labelRequired="*"
            labelMessageError=""
            value={monto}
            bindFunction={(value) => { setMonto(value) }}
          />
        </div>
        <div className="pb-6" >
          <DatePickerModal
            placeholder="Fecha  (dd/mm/yyyy)"
            label="Fecha de la Ampliacion"
            labelRequired="*"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            value={fecha}
            bindFunction={(value) => { setFecha(value) }}
          />
        </div>

        <div className="pb-6" >
          <UploadLine
            label="Ampliación / Reducción contractual"
            labelRequired="*"
          />
        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Descripcion"
            type="number" step="any"
            labelRequired="*"
            labelMessageError=""
            value={descripcion}
            bindFunction={(value) => { setDescripcion(value) }}
          />
        </div>
      </div>
      <div className=" text-center">
        <Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
      </div>
      <div className="mt-4 ">
        <Table columns={columnsAmpliaciones} dataSource={dataSource} />
      </div>

    </div>
  </div>
}

