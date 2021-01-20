import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import Upload from './upload'
import { Button, Select, Table, Alert , Space} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

export interface ObrasRedeterminacionesProps {
	obra: DDJJObra
	onChange: Function
}

export const ObrasRedeterminaciones: React.FC<ObrasRedeterminacionesProps> = ({
	obra = null,
	onChange = () => null
}) => {
	const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())
	/*const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
	const [monto, setMonto] = useState(0)
	const [fecha, setFecha] = useState('')
	const [descripcion, setDescripcion] = useState('')
	const [dataSource, setDataSource] = useState<Array<Redeterminaciones>>(obra.redeterminaciones)
	const [error, setError] = useState('')
	const [archivos,setArchivos] = useState<Array<Archivo>>([])
	const [showError, setShowError] = useState(false)

	useEffect(() => {

	}, [])

	const eliminarDatos = (o:AmpliacionesObras) => {
		setDataSource(dataSource.filter( (r:Redeterminaciones) => o.id!== r.id))
		obra.redeterminaciones = Object.assign([],dataSource)
		onChange(Object.assign({},obra))
	  }
	const columnsRedeterminaciones = [
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
			title: 'Descripcion',
			dataIndex: 'descripcion',
			key: 'descripcion'
		},
		{
			title: 'Adjunto',
			render: (text,record) => <div>{record.archivos && record.archivos.map( f=> f.name).join(', ')}</div>,
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


		dataSource.push({ 
			id:getCodigoObra(),
			monto, 
			fecha,
			descripcion,
			archivos })
		setDataSource(Object.assign([], dataSource))
		obra.redeterminaciones = Object.assign([],dataSource)
		onChange(obra)
		setMonto(0)
		setFecha(null)
		setDescripcion('')
		setArchivos([])
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
			<div className="text-xl font-bold py-2 w-3/4">  Redeterminaciones</div>
			<div className="grid grid-cols-3 gap-4 ">
				<div className="pb-6" >
					<InputTextModal
						label="Monto"
						type="number" step="any" 
						min="0" 
						labelRequired="*"
						labelMessageError=""
						value={monto}
						bindFunction={(value) => { setMonto(value) }}
					/>

				</div>
				<div className="pb-6" >
					<DatePickerModal
						placeholder="Fecha  (dd/mm/yyyy)"
						label="Fecha de la redeterminacion"
						labelRequired="*"
						labelObservation=""
						labeltooltip=""
						labelMessageError=""
						value={fecha}
						bindFunction={(value) => { setFecha(value) }}
					/>
				</div>
				<div className="pb-6" >
					<InputTextModal
						label="Descripcion"
						 
						labelRequired="*"
						labelMessageError=""
						value={descripcion}
						bindFunction={(value) => { setDescripcion(value) }}
					/>

				</div>
				</div>
				<div className="grid grid-cols-2 gap-4 ">
				<div className="pb-6" >
					<Upload
						label="Adjuntar documento de respaldo de la redeterminación "
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
				<div className="mt-8 ">
				<Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
			</div>
			</div>
			
			<div className="mt-4 ">
				<Table columns={columnsRedeterminaciones} dataSource={dataSource} />
			</div>

		</div>
	</div>
}

