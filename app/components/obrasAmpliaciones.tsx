import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

export interface ObrasAmpliacionesProps {

}

export const ObrasAmpliaciones: React.FC<ObrasAmpliacionesProps> = ({

}) => {
	/*const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
	const [monto, setMonto] = useState('')
	const [fecha, setFecha] = useState('')
	const [dataSource, setDataSource] = useState<Array<AmpliacionesObras>>([])
	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)

	useEffect(() => {

	}, [])
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


		dataSource.push({ monto, fecha })
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
			<div className="text-xl font-bold py-2 w-3/4">  Ampliaciones</div>
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
						label="Adjunte Acta "
						labelRequired="*"
						labelMessageError=""
					/>
				</div>
			</div>
			<div className="mt-6 text-center">
				<Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
			</div>
			<div className="mt-4 ">
				<Table columns={columnsAmpliaciones} dataSource={dataSource} />
			</div>

		</div>
	</div>
}

const columnsAmpliaciones = [

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