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

  const borrarPeriodo = (p) => {
    // setPeriodos(Object.assign([], periodos.filter(v => v.codigo !== p.codigo)))
    obra.certificaciones = Object.assign([], obra.certificaciones.filter(v => v.codigo !== p.codigo))
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
      render: (text,record) => <div>{numeral(record.monto).format('$0,0.00')}</div>
    },
    {
			title: 'Adjunto',
			render: (text,record) => <div>{record.archivos && record.archivos.map( f=> f.name).join(', ')}</div>,
			key: 'adjunto',
		}
  ]

  const agregarPeriodo = () => {

    let periodosCopy = Object.assign([], obra.certificaciones)

    if (periodoSeleccionado)
      periodosCopy = obra.certificaciones.filter(v => v.codigo !== periodoSeleccionado.codigo)

    periodosCopy.push({
      codigo: periodoSeleccionado ? periodoSeleccionado.codigo : getUniqCode(),
      periodo,
      monto,
      archivos
    })

    setPeriodo('')
    setMonto(0)
   
    setPeriodoSeleccionado(null)
    setArchivos([])
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
          bindFunction={setDescripcion}
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

      <div className="w-1/3 flex items-center mb-4">
        <Button onClick={agregarPeriodo} type={periodo ? 'primary' : 'ghost'}>{periodoSeleccionado ? 'Editar' : 'Agregar'}</Button>
      </div>
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
