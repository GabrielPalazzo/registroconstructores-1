import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCodigoObra, getEmptyTramiteAlta } from '../services/business'
import InputTextModal from './input_text_modal'
import SelectModal from './select_modal'
import UploadLine from './uploadLine'
import { Button, Select, Table, Alert, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePickerModal from './datePicker_Modal'

const { Option } = Select;
export interface ObrasDatosGeneralesProps {
  obra: DDJJObra
  onChange: Function
}

export const ObrasDatosGenerales: React.FC<ObrasDatosGeneralesProps> = ({
  obra=null,
  onChange = () => null
}) => {
	const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || getEmptyTramiteAlta())
	const [codigo, setCodigo] = useState(getCodigoObra())
	const [estado, setEstado] = useState('')
	const [tipoContratacion, settipoContratacion] = useState('')
	const [nivel, setNivel] = useState('')
	const [denominacion, setDenominacion] = useState('')
	const [fechaAdjudicacion, setfechaAdjudicacion] = useState('')
	const [fechaInicio, setfechaInicio] = useState('')
	const [fechaFin, setfechaFin] = useState('')
	const [dataSource, setDataSource] = useState<Array<DatosObraGeneral>>([])
	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)
	useEffect(() => {

	}, [])

	const eliminarDatos = (r: DatosObraGeneral) => {
		setDataSource(dataSource.filter((d: DatosObraGeneral) => r.codigo !== d.codigo))
	}


	const columnsEstado = [
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarDatos(record)}><DeleteOutlined /></div> : <Space size="middle">

			</Space>),
		},
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
			label: 'Subcontratación público',
			value: 'SubPublica',
		},
		{
			label: 'Subcontratación privado ',
			value: 'SubPrivada',
		}
	];
	const TipoNivel = [
		{
			label: 'Nacional',
			value: 'Nacional',
    },
    {
			label: 'Provincial',
			value: 'Provincial',
		},
		{
			label: 'Municipal',
			value: 'Municipal',
		},
		{
			label: 'Privado ',
			value: 'Privado',
		}
	]

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
		if ((!denominacion)) {
			setError('La denominación es requerida')
			setShowError(true)
			return
		}
		if ((!fechaAdjudicacion)) {
			setError('La fecha   es requerida')
			setShowError(true)
			return
		}

		setCodigo(getCodigoObra())
		setEstado("")
		settipoContratacion("")
		setNivel("")
		setDenominacion("")
		setfechaAdjudicacion("")
		setfechaFin("")
		setfechaInicio("")
		setError('')
		setShowError(false)


		dataSource.push({ tipoContratacion, nivel, codigo, estado, denominacion, fechaFin, fechaInicio, fechaAdjudicacion })
    setDataSource(Object.assign([], dataSource))
    obra.datosObra=obra.datosObra.filter( (o:DatosObraGeneral) => o.codigo!==codigo)
    obra.datosObra = Object.assign({},dataSource)

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

		<div className="grid grid-cols-4 gap-4 ">

			<div className="pb-6" >
				<InputTextModal
					label="Codigo"
					labelRequired="*"
					value={codigo}
					bindFunction={(value) => null}
					labelMessageError=""
					disabled={true} />

			</div>
			<div className="pb-6" >
				<SelectModal
					title="Estado"
					defaultOption="Tipo de Estado"
					labelRequired="*"
					labelMessageError=""
					value={estado}
					bindFunction={(value) => setEstado(value)}
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
					label={estado === 'Preadjudicada' ? 'Fecha de Pre Adjudicación' : 'Fecha de Adjudicación'}
					labelRequired="*"
					labelObservation=""
					labeltooltip=""
					labelMessageError=""
					value={fechaAdjudicacion}
					bindFunction={(value) => { setfechaAdjudicacion(value) }}
				/>
			</div>
			{estado === 'Ejecucion' || estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ?
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
				</div> : ''}
			{estado === 'Finalizada' || estado === 'Anulada' || estado === 'Suspendida' ? <div className="pb-6" >
				<DatePickerModal
					placeholder="Fecha  (dd/mm/yyyy)"
					label={estado === 'Finalizada' ? 'Fecha de Finalizacion' : 'Fecha de Suspencion'}
					labelRequired="*"
					labelObservation=""
					labeltooltip=""
					labelMessageError=""
					value={fechaFin}
					bindFunction={(value) => { setfechaFin(value) }}
				/>
			</div> : ''}

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

