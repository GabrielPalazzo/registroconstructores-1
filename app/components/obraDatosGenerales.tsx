import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import {InputText} from './input_text'
import SelectModal from './select_modal'
import SelectSimple from './select'
import Upload from './upload'
import { Button, Select, Table, Alert, Space, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'
import {LinkToFile} from '../components/linkToFile'
import { RootState } from '../redux/store'
import _ from 'lodash'
import Wrapper from './wrapper'



const { Option } = Select;
export interface ObrasDatosGeneralesProps {
  obra: DDJJObra
  onChange: Function
  modo : 'NEW' | 'EDIT' | 'VIEW'
} 



export const ObrasDatosGenerales: React.FC<ObrasDatosGeneralesProps> = ({
  obra = null,
  onChange = () => null,
  modo = null
}) => {

  const tramite: TramiteAlta = useSelector((state: RootState) => state.appStatus.tramiteAlta || getEmptyTramiteAlta())
  const [codigo, setCodigo] = useState(getCodigoObra())
  const [estado, setEstado] = useState('')
  const [tipoContratacion, settipoContratacion] = useState('')

  const [nivel, setNivel] = useState('')
  // const [denominacion, setDenominacion] = useState(obra.denominacion)
  const [fechaAdjudicacion, setfechaAdjudicacion] = useState('')
  const [fechaInicio, setfechaInicio] = useState('')
  const [fechaFin, setfechaFin] = useState('')
  //const [dataSource, setDataSource] = useState<Array<DatosObraGeneral>>([])
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [actas, setActas] = useState<Array<Archivo>>([])
  useEffect(() => {
    //setDenominacion(obra.denominacion)
    //setDataSource(Object.assign([], obra.datosObra))
  }, [])

 
  const eliminarDatos = (r: DatosObraGeneral) => {
    obra.datosObra = obra.datosObra.filter((d: DatosObraGeneral) => r.codigo !== d.codigo)
    onChange(Object.assign({},obra))
    // setDataSource(dataSource.filter((d: DatosObraGeneral) => r.codigo !== d.codigo))
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
      render: (text, record) => <div>{record.acta && record.acta.map(f => <LinkToFile fileName={f.name} id={f.cid} />)}</div>
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
    if ((!obra.denominacion)) {
      setError('La denominación es requerida')
      setShowError(true)
      return
    }
    if ((!fechaAdjudicacion)) {
      setError('La fecha   es requerida')
      setShowError(true)
      return
    }
    if (_.isEmpty(actas)) {
			setError('El acta es requerida')
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

   // obra.denominacion = denominacion

   obra.datosObra.push({
      tipoContratacion,
      nivel,
      estado,
      codigo: getCodigoObra(),
      fechaFin,
      fechaInicio,
      fechaAdjudicacion,
      acta: actas
    })
    // setDataSource(Object.assign([], dataSource))

    //obra.datosObra = obra.datosObra.filter((o: DatosObraGeneral) => o.codigo !== codigo) 
    //obra.datosObra = Object.assign({}, dataSource)
    setActas([])
    onChange(Object.assign({}, obra))
    clearState()
    
  }

  const clearState = () =>{
    setEstado("")
    settipoContratacion("")
    setNivel("")
    setfechaAdjudicacion("")
    setfechaFin("")
    setfechaInicio("")
    setActas([])
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

      <div className="grid grid-cols-1 gap-4 ">

        <div className="pb-6" >

        <Wrapper attributeName="Denominacion" title="Denominacion" labelRequired="*">
          <InputText
            attributeName='Denominacion'
            value={obra.denominacion}
            bindFunction={(value) => {
              obra.denominacion = value
              onChange(Object.assign({}, obra))
            }}
            placeHolder="Denominacion"
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            required />
        </Wrapper>
         

        </div>
      </div>


      <div className="grid grid-cols-4 gap-4 ">
        <div className="pb-6" >
        <Wrapper title="Estado" attributeName="estado" labelRequired="*">
        
        <SelectSimple
            defaultOption="Tipo de Estado"
            labelMessageError=""
            value={estado}
            bindFunction={(value) => setEstado(value)}
            option={EstadoObra.map(u => (
              <Option value={u.value}>{u.label}</Option>
              
            ))}
            required
          />
          </Wrapper>
        </div>

        <div className="pb-6" >
        <Wrapper title="Tipo de Contratacion" attributeName="TipoContratacion" labelRequired="*">
        
        <SelectSimple
            defaultOption="Tipo de contratacion"
            labelMessageError=""
            value={tipoContratacion}
            bindFunction={(value) => { settipoContratacion(value) }}
            required
            option={TipoContratacion.map(u => (
              <Option value={u.value}>{u.label}</Option>

            ))}
          />
          </Wrapper>
        </div>
        <div className="pb-6" >
        <Wrapper title="Nivel" attributeName="Nivel" labelRequired="*">
        
        <SelectSimple
            defaultOption="Nivel"
            labelMessageError=""
            value={nivel}
            bindFunction={(value) => { setNivel(value) }}
            required
            option={TipoNivel.map(u => (
              <Option value={u.value}>{u.label}</Option>

            ))}
          />
          </Wrapper>
        </div>


        <div className="pb-6" >

        
            <Wrapper title={estado === 'Preadjudicada' ? 'Fecha de Pre Adjudicación' : 'Fecha de Adjudicación'} attributeName="FechaPreAdjuducada" labelRequired="*">
          <DatePickerModal
            placeholder="Fecha  (dd/mm/yyyy)"
            
            labelRequired=""
            labelObservation=""
            locked={modo === 'VIEW'}
            labeltooltip=""
            labelMessageError=""
            value={fechaAdjudicacion}
            bindFunction={(value) => { setfechaAdjudicacion(value) }}
          />
          </Wrapper>
        </div>
        {estado === 'Ejecucion' || estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ?
          <div className="pb-6" >
              <Wrapper title="Fecha de Inicio" attributeName="FechaInicio" labelRequired="*">
        
            <DatePickerModal
              placeholder="Fecha  (dd/mm/yyyy)"
              locked={modo === 'VIEW'}
              labelRequired=""
              labelObservation=""
              labeltooltip=""
              labelMessageError=""
              value={fechaInicio}
              bindFunction={(value) => { setfechaInicio(value) }}
            />
            </Wrapper>
          </div> : ''}
        {estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ? <div className="pb-6" >
        <Wrapper title={estado === 'Finalizada' ? 'Fecha de Finalizacion' : 'Fecha de Suspencion'} attributeName="FechaFin" labelRequired="*">
        
          <DatePickerModal
            placeholder="Fecha  (dd/mm/yyyy)"
            labelRequired=""
            locked={modo === 'VIEW'}
            labelObservation=""
            labeltooltip=""
            labelMessageError=""
            value={fechaFin}
            bindFunction={(value) => { setfechaFin(value) }}
          />
          </Wrapper>
        </div> : ''}

        <div className="pb-6" >
        <Wrapper title="Adjunte Acta" attributeName="acta" labelRequired="*">
       
        
          <Upload
            
            labelMessageError=""
           // defaultValue={(obra.actasObra ? Object.assign([],obra.actasObra ): Object.assign([],[])) as any}
           // onOnLoad={file => {
             // if (!obra.actasObra)
               // obra.actasObra = []

              //obra.actasObra.push(file)
              //onChange(Object.assign({},obra))
            //}}
            //onRemove={fileToRemove => {
              //obra.actasObra = obra.actasObra.filter(f => f.cid !== fileToRemove.cid)
              //onChange(Object.assign({},obra))
              // setActas(Object.assign([], actas.filter(f => f.cid !== fileToRemove.cid)))
           // }}

           defaultValue={actas as any}
           onOnLoad={file => {
             actas.push(file)
             setActas(Object.assign([], actas))
           }}
           onRemove={fileToRemove => {
             setActas(Object.assign([], actas.filter(f => f.cid !== fileToRemove.cid)))
           }}


          />
          </Wrapper>
        </div>
        <div className="mt-8 ">
          <Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
        </div>

      </div>
      <div className="mt-4">
        <Table columns={columnsEstado} dataSource={Object.assign([],obra.datosObra)} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }} />
      </div>
    </div>
}

