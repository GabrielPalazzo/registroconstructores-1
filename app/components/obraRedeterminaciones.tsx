import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import Upload from './upload'
import { Button, Select, Table, Alert, Space, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'
import InputNumberModal from './input_number'
import { LinkToFile } from './linkToFile'
import _ from 'lodash'

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
	//const [dataSource, setDataSource] = useState<Array<Redeterminaciones>>(obra.redeterminaciones)
	const [error, setError] = useState('')
	const [archivos, setArchivos] = useState<Array<Archivo>>([])
	const [showError, setShowError] = useState(false)

	useEffect(() => {

	}, [])

	const eliminarDatos = (o: AmpliacionesObras) => {
		obra.redeterminaciones = Object.assign([], obra.redeterminaciones.filter((r: Redeterminaciones) => o.id !== r.id))
		onChange(Object.assign({}, obra))
	}
	const columnsRedeterminaciones = [
		{
			title: 'Eliminar',
			key: 'action',
			render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarDatos(record)}><DeleteOutlined /></div> : <Space size="middle">

			</Space>),
		},
		{
			title: 'Fecha',
			dataIndex: 'fecha',
			key: 'fecha'
		},
		{
			title: 'Monto',
			dataIndex: 'monto',
			key: 'monto'
		},
		{
			title: 'Descripción',
			dataIndex: 'descripcion',
			key: 'descripcion'
		},
		{
			title: 'Adjunto',
			render: (text, record) => <div>{record.archivos && record.archivos.map(f => <LinkToFile fileName={f.name} id={f.cid} />)} </div>,
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
		if ((!descripcion)) {
			setError('La descripcion es requerida')
			setShowError(true)
			return
		}
		if (!_.isEmpty[archivos]) {
			setError('el archivo')
			setShowError(true)
			return
		}
		


		obra.redeterminaciones.push({
			id: getCodigoObra(),
			monto,
			fecha,
			descripcion,
			archivos
		})
		// setDataSource(Object.assign([], dataSource))
		// obra.redeterminaciones = Object.assign([], dataSource)
		onChange(Object.assign({},obra))
		setMonto(0)
		setFecha(null)
		setDescripcion('')
		setArchivos([])
		
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
		<div className="rounded-lg px-4 py-2  pb-4 border mt-6">
			<div className="text-xl font-bold py-2 w-3/4">  Redeterminaciones</div>
			<div className="grid grid-cols-4 gap-4 ">
				<div className="pb-6" >
					<InputNumberModal
						min={0}
						placeholder="000000,000 "
						label="Monto"
						type="number" step="any"
						labelRequired="*"
						labelMessageError=""
						value={monto}
						bindFunction={(val) => setMonto(parseFloat(val))}
					/>

				</div>
				<div className="pb-6" >
					<DatePickerModal
						placeholder="Fecha  (dd/mm/yyyy)"
						label="Fecha de la redeterminación"
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
						label="Descripción"

						labelRequired="*"
						labelMessageError=""
						value={descripcion}
						bindFunction={(value) => { setDescripcion(value) }}
					/>

				</div>
				<div className="pb-6" >
					<Upload
						label="Documentación respaldatoria "
						labelRequired="*"
						labelMessageError=""
						defaultValue={archivos as any}
						onOnLoad={file => {
							archivos.push(file)
							setArchivos(Object.assign([], archivos))
						}}
						onRemove={fileToRemove => {
							setArchivos(Object.assign([], archivos.filter(f => f.cid !== fileToRemove.cid)))
						}}
					/>
				</div>
			</div>
			<div className="text-center ">
				
				<div className=" ">
					<Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
				</div>
			</div>

			<div className="mt-4 ">
				<Table columns={columnsRedeterminaciones} 
				dataSource={Object.assign([],obra.redeterminaciones)} 
				locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }} 
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
				  }} />

			</div>

		</div>
	</div>
}

