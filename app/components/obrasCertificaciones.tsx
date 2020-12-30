import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

export interface ObrasCertificacionesProps {

}

export const ObrasCertificaciones: React.FC<ObrasCertificacionesProps> = ({

}) => {
  /*const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
  const [numeroCertificacion, setNumeroCertificacion] = useState(0)
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState(0)
  const [fecha, setFecha] = useState('')
  const [dataSource, setDataSource] = useState<Array<Certificaciones>>([])
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {

  }, [])
  const add = () => {
    if ((!numeroCertificacion)) {
      setError('El numero de Certificación/Factura  es requerido')
      setShowError(true)
      return
    }
    if ((!descripcion)) {
      setError('La descripción  es requerida')
      setShowError(true)
      return
    }
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


    dataSource.push({ monto, fecha, numeroCertificacion, descripcion })
    setDataSource(Object.assign([], dataSource))
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

      <div className="text-xl font-bold py-2 w-3/4">  Certificaciones Vigentes</div>
      <div className="mb-4">
        <Alert message="En esta sección declarar aquellos certificados o facturas emitidos con posterioridad al último ejercicio económico declarado. Deberá cargarlos individualmente, ya sea que correspondan a monto básico, redeterminaciones o ampliaciones. Para obras privadas, podrá englobar la facturación mensual en 1 solo monto, colocando como fecha la correspondiente a la última factura emitida ese mes, y adjuntando en 1 documento todo el respaldo de ese monto. También podrá declarar notas de crédito correspondientes a facturas del ejercicio vigente" type="info" />
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="pb-6" >
          <InputTextModal
            type="number" step="any"
            label="Nro Certificación / Factura"
            labelRequired="*"
            value={numeroCertificacion}
            bindFunction={(value) => { setNumeroCertificacion(value) }}
            labelMessageError=""
          />
        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Descripcion"
            labelRequired="*"
            value={descripcion}
            bindFunction={(value) => { setDescripcion(value) }}
            labelMessageError=""
          />
        </div>
        <div className="pb-6" >
          <DatePickerModal
            label="Fecha Certificacion"
            labelRequired="*"
            value={fecha}
            bindFunction={(value) => { setFecha(value) }}
            labelMessageError=""
          />
        </div>
        <div className="pb-6" >
          <InputTextModal
            type="number" step="any"
            label="Monto"
            labelRequired="*"
            value={monto}
            bindFunction={(value) => { setMonto(value) }}
            labelMessageError=""
          />

        </div>

        <div className="pb-6" >
          <UploadLine
            label="Adjunte Certificación y facturación "
            labelRequired="*"
            labelMessageError=""
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
      </div>
      <div className="mt-4 ">
      <Table columns={columnsCertificacionesVigentes} dataSource={dataSource} />
      </div>

    </div>

  </div>
}
const columnsCertificacionesVigentes = [
  {
    title: 'Número de certificación',
    dataIndex: 'numeroCertificacion',
    key: 'numeroCertificacion'
  },
  {
    title: 'Descripción',
    dataIndex: 'descripcion',
    key: 'descripcion'
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
    title: 'Adjunto',
    dataIndex: 'adjunto',
    key: 'adjunto',
  }


];
