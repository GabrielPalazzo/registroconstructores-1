import { Alert, BackTop, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useState } from 'react'
import { getUniqCode } from '../services/business'
import DatePicker from './datePicker'
import InputTextModal from './input_text_modal'
import UploadLine from './uploadLine'

export interface CertificacionesPrecargadasProps {
  obra: DDJJObra,
  onChange: Function 
}




export const CertificacionesPrecargadas: React.FC<CertificacionesPrecargadasProps> = ({
  obra=null,
  onChange=()=>null
}) => {

  const [periodos, setPeriodos] = useState(obra.certificaciones)
  const [periodo, setPeriodo] = useState('')
  const [monto, setMonto] = useState(0)
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null)

  const borrarPeriodo = (p) => {
    setPeriodos(Object.assign([], periodos.filter(v => v.codigo !== p.codigo)))
    obra.certificaciones = Object.assign([], periodos.filter(v => v.codigo !== p.codigo))
    onChange(Object.assign({},obra))
  }


  const columns = [
    {
      title: '',
      key: 'delete ',
      render: (text, record) => <div onClick={() => borrarPeriodo(record)}><DeleteOutlined /></div>
    },
    {
      title: '',
      key: 'edit',
      render: (text, record) => <div onClick={() => {
        setPeriodoSeleccionado(record)
        setPeriodo(record.periodo)
        setMonto(record.monto)
      }}><EditOutlined /></div>
    },
    {
      title: 'Periodo',
      key: 'periodo',
      render: (text, record) => <div>{moment(record.periodo, 'DD/MM/YYYY').format('MMMM YYYY')}</div>
    }, {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto'
    }]

  const agregarPeriodo = () => {

    let periodosCopy = Object.assign([], periodos)

    if (periodoSeleccionado)
      periodosCopy = periodos.filter(v => v.codigo !== periodoSeleccionado.codigo)

    periodosCopy.push({
      codigo: periodoSeleccionado ? periodoSeleccionado.codigo : getUniqCode(),
      periodo,
      monto
    })

    setPeriodo('')
    setMonto(0)
    setPeriodos(periodosCopy)
    setPeriodoSeleccionado(null)
    obra.certificaciones = periodosCopy
    onChange(Object.assign({},obra))
  }



  return <div>
    <div className="mb-4">
      <Alert message="En esta sección podrá agregar todas las certificaciones que posea de la obra consignando: período (MM/AAAA), monto y la documental que sustenten los datos ingresados. Las certificaciones deben declararse una vez facturadas, indicando fecha de facturación, y adjuntando como respaldo el propio certificado y su respectiva factura" type="info" />
    </div>
    <div className="grid grid-cols-4 gap-4 ">

      <div >
        <DatePicker
          picker='month'
          placeholder="Periodo (mm/yyyy)"
          label="Periodo"
          labelRequired="*"
          labelObservation=""
          labeltooltip=""
          labelMessageError=""
          value={periodo}
          bindFunction={setPeriodo}
        />
      </div>
      <div >
        <InputTextModal
          label="Monto"
          type="number"
          labelRequired="*"
          labelMessageError=""
          value={monto}
          bindFunction={setMonto}
        />
      </div>
      <div >
        <UploadLine
          label="Documentación respaldatoria"
          labelRequired="*"
          labelMessageError=""
        />
      </div>

      <div className="w-1/3 flex items-center">
        <Button onClick={agregarPeriodo} type={periodo ? 'primary' : 'ghost'}>{periodoSeleccionado ? 'Editar' : 'Agregar'}</Button>
      </div>
    </div>


    <div>
      <Table pagination={false} columns={columns} dataSource={periodos}
        summary={pageData => {

          return <div>
            {pageData.length > 0 ? <div className="ml-4 font-semibold">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div >{pageData.map(d => d.monto).reduce((val, acc) => acc = val + acc)}</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </div> : ''}
          </div>
        }}
      />
    </div>

    
  </div>
}
