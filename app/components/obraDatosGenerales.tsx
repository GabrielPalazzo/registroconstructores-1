import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

const { Option } = Select;
export interface ObrasDatosGeneralesProps {

}

export const ObrasDatosGenerales: React.FC<ObrasDatosGeneralesProps> = ({

}) => {
	/*const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())*/
	const [codigo, setCodigo] = useState('')
	const [estado, setEstado] = useState('')
	const [tipoContratacion, settipoContratacion] = useState('')
	const [nivel, setNivel] = useState('')
	const [denominacion, setDenominacion] = useState('')
	const [fechaAdjudicacion, setfechaAdjudicacion] = useState('')
	const [fechaInicio, setfechaInicio] = useState('')
	const [fechaFin, setfechaFin] = useState('')
	const [dataSource, setDataSource] = useState<Array<DatosObraGeneral>>([])

	useEffect(() => {

	}, [])
	const add = () => {
		dataSource.push({tipoContratacion,nivel,codigo,estado,denominacion,fechaFin,fechaInicio,fechaAdjudicacion})
		setDataSource(Object.assign({},dataSource))
	/*	setDataSource([{
			fechaFin: "10",
			codigo: "nnn",
			fechaInicio: "90",
			fechaAdjudicacion: "333",
			denominacion: "peppe",
			tipoContratacion: "dhdhdh",
			nivel: "eeee",
			estado: "yyyy"

		}])*/
	}
	return <div> <div className="grid grid-cols-4 gap-4 ">
		<div className="pb-6" >
			<InputTextModal
				label="Codigo"
				labelRequired="*"
				value={codigo}
				bindFunction={(value) => { setCodigo(value) }}
				labelMessageError=""
				disabled />

		</div>
		<div className="pb-6" >
			<SelectModal
				title="Estado"
				defaultOption="Tipo de Estado"
				labelRequired="*"
				labelMessageError=""
				value={estado}
				bindFunction={(value) => { setEstado(value) }}
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
	</div>
		<div className="grid grid-cols-4 gap-4 ">
			<div className="pb-6" >
				<InputTextModal
					label="Denominacion"
					labelRequired="*"
					value={denominacion}
					bindFunction={(value) => { setDenominacion(value) }}
					labelMessageError=""

					disabled />

			</div>
			<div className="pb-6" >
				<DatePickerModal
					placeholder="Fecha  (dd/mm/yyyy)"
					label="Fecha de Adjuducacion"
					labelRequired="*"
					labelObservation=""
					labeltooltip=""
					labelMessageError=""
					value={fechaAdjudicacion}
					bindFunction={(value) => { setfechaAdjudicacion(value) }}
				/>
			</div>
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
			</div>
			<div className="pb-6" >
				<DatePickerModal
					placeholder="Fecha  (dd/mm/yyyy)"
					label="Fecha Fin"
					labelRequired="*"
					labelObservation=""
					labeltooltip=""
					labelMessageError=""
					value={fechaFin}
					bindFunction={(value) => { setfechaFin(value) }}
				/>
			</div>
			<div className="pb-6" >
				<UploadLine
					label="Adjunte Acta "
					labelRequired="*"
					labelMessageError=""
				/>
			</div>
			<div className="mt-6 ">
				<Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
			</div>

		</div>
		<div className="mt-4">
			<Table columns={columnsEstado} dataSource={dataSource} />
		</div>
	</div>
}

const columnsEstado = [
	{
		title: 'Codigo',
		dataIndex: 'codigo',
		key: 'codigo',
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
		title: 'Denominacion',
		dataIndex: 'denominacion',
		key: 'denominacion',
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
		dataIndex: 'adjunto',
		key: 'adjunto',
	}


];

const EstadoObra = [
	{
		label: 'Preadjudicada',
		value: 'Preadjudicada',
	},
	{
		label: 'Ejecución',
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
		label: 'Adjudicada ',
		value: 'Adjudicada',
	},
	{
		label: 'Anulada ',
		value: 'Anulada',
	},
];

const TipoContratacion = [
	{
		label: 'Pública',
		value: 'Publica',
	},
	{
		label: 'Privada',
		value: 'Privada',
	},
	{
		label: 'Subcontratación pública',
		value: 'SubPublica',
	},
	{
		label: 'Subcontratación privada ',
		value: 'SubPrivada',
	}
];
const TipoNivel = [
	{
		label: 'Municipal',
		value: 'Municipal',
	},
	{
		label: 'Provincial',
		value: 'Provincial',
	},
	{
		label: 'Nacional',
		value: 'Nacional',
	},
	{
		label: 'Privado ',
		value: 'Privado',
	}
]