import { Alert, BackTop, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useState } from 'react'
import { getUniqCode } from '../services/business'
import DatePicker from './datePicker'
import InputTextModal from './input_text_modal'
import Upload from './upload'
import InputNumberModal from './input_number'
import numeral from 'numeral'
import { LinkToFile } from './linkToFile'
import _ from 'lodash'

export interface CertificacionesPrecargadasProps {
  obra: DDJJObra,
  onChange: Function 
}




export const CertificacionesPrecargadas: React.FC<CertificacionesPrecargadasProps> = ({
  obra=null,
  onChange=()=>null
}) => {

  // const [periodos, setPeriodos] = useState(obra.certificaciones)
  const [periodo, setPeriodo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState(0)
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null)
  const [archivos,setArchivos] = useState<Array<Archivo>>([])
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  const borrarPeriodo = (p) => {
    // setPeriodos(Object.assign([], periodos.filter(v => v.codigo !== p.codigo)))
    obra.certificaciones = Object.assign([], obra.certificaciones.filter(v => v.codigo !== p.codigo))
    onChange(Object.assign({},obra))
  }


  const columns = [
    {
      title: 'Eliminar',
      key: 'delete ',
      render: (text, record) => <div onClick={() => borrarPeriodo(record)}><DeleteOutlined /></div>
    },
   // {
    //  title: '',
    //  key: 'edit',
    //  render: (text, record) => <div onClick={() => {
    //setPeriodoSeleccionado(record)
    //    setPeriodo(record.periodo)
    //    setMonto(record.monto)
    //  }}><EditOutlined /></div>
    //},
    {
      title: 'Periodo',
      key: 'periodo',
      sorter: (a, b) => moment(a.periodo).unix() - moment(b.periodo).unix(),
     render: (text, record) => <div>{moment(record.periodo, 'DD/MM/YYYY').format('MMMM YYYY')}</div>
    }, {
      title: 'Monto',
      key:'monto',
      sorter: (a, b) =>a.monto -b.monto,
      render: (text,record) => <div>{numeral(record.monto).format('$0,0.00')}</div>
    },
    {
      title: 'Descripción',
      key:'descripcion',
      dataIndex: 'descripcion',
      //render: (text,record) => <div>{descripcion}</div>
    },
    {
			title: 'Adjunto',
			render: (text,record) => <div>{record.archivos && record.archivos.map(f => <LinkToFile fileName={f.name} id={f.cid} />)} </div>,
			key: 'adjunto',
		}
  ]

  const agregarPeriodo = () => {
    
    if ((!periodo)) {
      setError('El periodo   es requerido')
      setShowError(true)
      return
    }
    if ((!monto)) {
      setError('El monto   es requerido')
      setShowError(true)
      return
    }
    if ((!descripcion)) {
      setError('La descripción es requerida')
      setShowError(true)
      return
    }
    if (_.isEmpty(archivos)) {
			setError('El documento respaldatorio es requerido')
			setShowError(true)
			return
		}

    let periodosCopy = Object.assign([], obra.certificaciones)

    if (periodoSeleccionado)
      periodosCopy = obra.certificaciones.filter(v => v.codigo !== periodoSeleccionado.codigo)


    periodosCopy.push({
      codigo: periodoSeleccionado ? periodoSeleccionado.codigo : getUniqCode(),
      periodo,
      monto,
      descripcion,
      archivos
    })

    setPeriodo('')
    setMonto(0)
    setDescripcion('')
    setPeriodoSeleccionado(null)
    setArchivos([])
    obra.certificaciones = periodosCopy
    onChange(Object.assign({},obra))
    clearState()
  }

  const clearState = () => {
    setPeriodo('')
    setMonto(0)
    setDescripcion('')
    setPeriodoSeleccionado(null)
 
  }



  return <div>
    {showError ? <div className="mb-4">
      <Alert
        message=''
        description={error}
        type="error"
        showIcon
        closable
        afterClose={() => setShowError(false)}
      /></div> : ''}
      <div className="text-xl font-bold py-2 w-3/4">  Certificaciones</div>
    <div className="mb-4">
      <Alert message="“En esta sección podrá cargar cada certificado de la obra, y deberá hacerlo una vez se encuentre facturado, y de forma mensual. Indicar período de facturación (MM/AAAA), monto facturado en ese mes, una breve descripción sobre que es lo que compone este período, y la documental que sustente esta carga. Deberá adjuntar el certificado junto con su factura. En caso de que la cantidad de facturas emitidas al mes sea muy considerable, podrá presentar una certificación contable del libro IVA Ventas, indicando fecha, número de comprobante emitido, importe de la factura, y total mes a mes.”" type="info" />
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
      <InputNumberModal
            label="Monto"
            step="any"
            labelRequired="*"
           
            placeholder="000000,000 "
            value={monto}
            bindFunction={(val) => setMonto(parseFloat(val))}
            labelMessageError=""
            required />
        
       
      </div>
      <div >
        <InputTextModal
          label="Descripcion"
          labelRequired="*"
          labelMessageError=""
          value={descripcion}
          bindFunction={(value) => { setDescripcion(value) }}
        />
      </div>
      <div >
        <Upload
          label="Documentación respaldatoria"
          labelRequired="*"
          labelMessageError=""
          defaultValue={archivos as any}
            onOnLoad={file =>{
              archivos.push(file)
              setArchivos(Object.assign([],archivos))
            }}
            onRemove={fileToRemove => {
              setArchivos(Object.assign([],archivos.filter(f=> f.cid !==fileToRemove.cid)))
            }}
        />
      </div>

      
    </div>
    <div className=" text-center mb-4">
        <Button onClick={agregarPeriodo} type={periodo ? 'primary' : 'ghost'}>{periodoSeleccionado ? 'Editar' : 'Agregar'}</Button>
      </div>


    <div>
      <Table pagination={false} columns={columns} dataSource={Object.assign([],obra.certificaciones)}  
        summary={pageData => {

          return <div>
            {pageData.length > 0 ? <div className="ml-4 font-semibold">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div >{numeral(pageData.map(d => d.monto).reduce((val, acc) => acc = val + acc)).format('$0,0.00')}</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </div> : ''}
          </div>
        }}
      />
    </div>

    
  </div>
}
