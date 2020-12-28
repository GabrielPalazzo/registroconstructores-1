import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

export interface ObrasRedeterminacionesProps {

}

export const ObrasRedeterminaciones: React.FC<ObrasRedeterminacionesProps> = ({

}) => {
	/*const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
	const [monto, setMonto] = useState('')
	const [fecha, setFecha] = useState('')

	useEffect(() => {

	}, [])
	const add = () => {

	}
	return <div>
		<div className="rounded-lg px-4 py-2  pb-4 border mt-6">
			<div className="text-xl font-bold py-2 w-3/4">  Redeterminaciones</div>
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
						label="Fecha de Inscripción"
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
				<Button type="primary" icon={<PlusOutlined />}> Agregar</Button>
			</div>
			<div className="mt-4 ">
				<Table columns={columnsRedeterminaciones} />
			</div>

		</div>
	</div>
}

const columnsRedeterminaciones = [

	{
		title: 'fecha Adjudicacion',
		dataIndex: 'fechaAdjudicacion',
		key: 'fechaAdjudicacion'
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