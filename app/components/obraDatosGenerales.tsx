import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import Upload from './upload'
import { Button, Select, Table, Alert, Space,Empty } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

const { Option } = Select;
export interface ObrasDatosGeneralesProps {
  obra: DDJJObra
  onChange: Function
}




export const ObrasDatosGenerales: React.FC<ObrasDatosGeneralesProps> = ({
  obra = null,
  onChange = () => null
}) => {
  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())
  const [codigo, setCodigo] = useState(getCodigoObra())
  const [estado, setEstado] = useState('')
  const [tipoContratacion, settipoContratacion] = useState('')
  const [nivel, setNivel] = useState('')
  const [denominacion, setDenominacion] = useState(obra.denominacion)
  const [fechaAdjudicacion, setfechaAdjudicacion] = useState('')
  const [fechaInicio, setfechaInicio] = useState('')
  const [fechaFin, setfechaFin] = useState('')
  const [dataSource, setDataSource] = useState<Array<DatosObraGeneral>>(obra.datosObra)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [actas, setActas] = useState<Array<Archivo>>([])
  useEffect(() => {

  }, [])

  const eliminarDatos = (r: DatosObraGeneral) => {
    setDataSource(dataSource.filter((d: DatosObraGeneral) => r.codigo !== d.codigo))
  }

  const columnsEstado = [
    {
      title: 'Eliminar',
      key: 'action',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarDatos(record)}><DeleteOutlined /></div> : <Space size="middle">

      </Space>),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Tipo de Contratacion',
      dataIndex: 'tipoContratacion',
      key: 'tipoContratacion',
    },
    {
      title: 'Nivel',
      dataIndex: 'nivel',
      key: 'nivel',
    },
    {
      title: 'fecha Adjudicacion',
      dataIndex: 'fechaAdjudicacion',
      key: 'fechaAdjudicacion'
    },
    {
      title: 'fecha Inicio',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio'
    },
    {
      title: 'fecha Fin',
      dataIndex: 'fechaFin',
      key: 'fechaFin'
    },

    {
      title: 'Adjunto',
      key: 'adjunto',
      render: (text,record) => <div>{record.acta && record.acta.map(f => f.name).join(', ')}</div>
    }


  ];

  const EstadoObra = [
    {
      label: 'Pre Adjudicada',
      value: 'Preadjudicada',
    },
    {
      label: 'Adjudicada ',
      value: 'Adjudicada',
    },
    {
      label: 'En Ejecución',
      value: 'Ejecucion',
    },
    {
      label: 'Finalizada',
      value: 'Finalizada',
    },
    {
      label: 'Suspendida ',
      value: 'Suspendida',
    },
    {
      label: 'Anulada ',
      value: 'Anulada',
    },
  ];

  const TipoContratacion = [
    {
      label: 'Público',
      value: 'Publica',
    },
    {
      label: 'Privado',
      value: 'Privada',
    },
    {
      label: 'Subcontrato público',
      value: 'SubPublica',
    },
    {
      label: 'Subcontrato privado ',
      value: 'SubPrivada',
    }
  ];
  const TipoNivel = [
    {
      label: 'Nacional',
      value: 'Nacional',
    },
    {
      label: 'Provincial ',
      value: 'Provincial',
    },
    {
      label: 'Municipal ',
      value: 'Municipal',
    },
    {
      label: 'Privado ',
      value: 'Privado',
    },
  ];





  const add = () => {

    if ((estado === 'Anulada' || estado === 'Finalizada' || estado === 'Suspendida') && (!fechaFin)) {
      setError('La fecha de fin es requerida')
      setShowError(true)
      return
    }
    if ((estado === 'Ejecucion' || estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida') && (!fechaInicio)) {
      setError('La fecha de Inicio  es requerida')
      setShowError(true)
      return
    }
    if ((!estado)) {
      setError('El tipo de estado  es requerido')
      setShowError(true)
      return
    }
    if ((!tipoContratacion)) {
      setError('El tipo de Contratación es requerido')
      setShowError(true)
      return
    }
    if ((!nivel)) {
      setError('El tipo tipo de nivel  es requerido')
      setShowError(true)
      return
    }
    if ((!denominacion)) {
      setError('La denominación es requerida')
      setShowError(true)
      return
    }
    if ((!fechaAdjudicacion)) {
      setError('La fecha   es requerida')
      setShowError(true)
      return
    }


    setEstado("")
    settipoContratacion("")
    setNivel("")
    setfechaAdjudicacion("")
    setfechaFin("")
    setfechaInicio("")
    setError('')
    setShowError(false)
    obra.denominacion = denominacion

    dataSource.push({ 
      tipoContratacion, 
      nivel, 
      estado, 
      codigo: 
      getCodigoObra(), 
      fechaFin, 
      fechaInicio, 
      fechaAdjudicacion,
      acta:actas })
    setDataSource(Object.assign([], dataSource))

    obra.datosObra = obra.datosObra.filter((o: DatosObraGeneral) => o.codigo !== codigo)
    // obra.datosObra = Object.assign({}, dataSource)
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

    <div className="grid grid-cols-1 gap-4 ">

      <div className="pb-6" >
        <InputTextModal
          label="Denominacion"
          labelRequired="*"
          value={denominacion}
          bindFunction={(value) => { setDenominacion(value) }}
          labelMessageError=""

          disabled />

      </div>
    </div>


    <div className="grid grid-cols-4 gap-4 ">
      <div className="pb-6" >
        <SelectModal
          title="Estado"
          defaultOption="Tipo de Estado"
          labelRequired="*"
          labelMessageError=""
          value={estado}
          bindFunction={(value) => setEstado(value)}
          option={EstadoObra.map(u => (
            <Option value={u.value}>{u.label}</Option>

          ))}
        />
      </div>

      <div className="pb-6" >
        <SelectModal
          title="Tipo de Contratacion"
          defaultOption="Tipo de contratacion"
          labelRequired="*"
          labelMessageError=""
          value={tipoContratacion}
          bindFunction={(value) => { settipoContratacion(value) }}
          required
          option={TipoContratacion.map(u => (
            <Option value={u.value}>{u.label}</Option>

          ))}
        />
      </div>
      <div className="pb-6" >
        <SelectModal
          title="Nivel"
          defaultOption="Nivel"
          labelRequired="*"
          labelMessageError=""
          value={nivel}
          bindFunction={(value) => { setNivel(value) }}
          required
          option={TipoNivel.map(u => (
            <Option value={u.value}>{u.label}</Option>

          ))}
        />
      </div>


      <div className="pb-6" >
        <DatePickerModal
          placeholder="Fecha  (dd/mm/yyyy)"
          label={estado === 'Preadjudicada' ? 'Fecha de Pre Adjudicación' : 'Fecha de Adjudicación'}
          labelRequired="*"
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
          value={fechaAdjudicacion}
          bindFunction={(value) => { setfechaAdjudicacion(value) }}
        />
      </div>
      {estado === 'Ejecucion' || estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ?
        <div className="pb-6" >
          <DatePickerModal
            placeholder="Fecha  (dd/mm/yyyy)"
            label="Fecha  de Inicio"
            labelRequired="*"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            value={fechaInicio}
            bindFunction={(value) => { setfechaInicio(value) }}
          />
        </div> : ''}
      {estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ? <div className="pb-6" >
        <DatePickerModal
          placeholder="Fecha  (dd/mm/yyyy)"
          label={estado === 'Finalizada' ? 'Fecha de Finalizacion' : 'Fecha de Suspencion'}
          labelRequired="*"
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
          value={fechaFin}
          bindFunction={(value) => { setfechaFin(value) }}
        />
      </div> : ''}

      <div className="pb-6" >
        <Upload
          label="Adjunte Acta "
          labelRequired="*"
          labelMessageError=""
          defaultValue={actas as any}
          onOnLoad={file => {
            actas.push(file)
            setActas(Object.assign([],actas))
          }}
          onRemove={fileToRemove => {
            setActas(Object.assign([],actas.filter(f => f.cid!==fileToRemove.cid)))
          }}

          
        />
      </div>
      <div className="mt-8 ">
        <Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
      </div>

    </div>
    <div className="mt-4">
      <Table columns={columnsEstado} dataSource={dataSource} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>,}} />
    </div>
  </div>
}

