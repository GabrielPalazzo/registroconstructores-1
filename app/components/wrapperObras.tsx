import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRevisionTramite } from '../redux/actions/revisionTramite'
import _ from 'lodash'
import { Button, Modal, Tooltip } from 'antd'
import { DislikeFilled, InfoCircleOutlined, InfoCircleTwoTone, LikeFilled } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { getReviewAbierta, getUsuario } from '../services/business'
import { RootState } from '../redux/store'


const customColors = ['#2897D4'];
const colors = [
	'red',
	'yellow',
	'orange',
	'cyan',
	'green',
];

export default (props) => {
	const { attributeName } = props
	const dispatch = useDispatch()
	const revisionTramite = useSelector((state: RootState) => state.revisionTramites)
	const [showObs, setShowObs] = useState(false)
	const [textObs, setTextObs] = useState('')
	const [user, setUser] = useState(null)


	const obra: DDJJObra = props.obra
	if (obra && !obra.datosObra[0].observacionesDelRegistro)
		obra.datosObra[0].observacionesDelRegistro = {
			denominacion: '',
			datosGenerales: ''
		}
	console.log(	obra.datosObra[0].observacionesDelRegistro)
	const isEditable = () => {
		return true
	}

	const getColorIcon = (handUp: boolean) => {
		if (	obra.datosObra[0][props.parent][props.field] === null)
			return "#1890ff"

		
			if (handUp)
				return 	obra.datosObra[0].observacionesDelRegistro[props.parent][props.field]==='' ? 'green' : '#e2e8f0'
			else
				return obra.datosObra[0].observacionesDelRegistro[props.parent][props.field]!=='' ? 'red' : '#e2e8f0'
		
	}

	const disLike = () => {
		obra.datosObra[0].observacionesDelRegistro[props.parent][props.field]= textObs
		props.onChange(Object.assign({},obra))

		setShowObs(false)

		if (!textObs)
			return
		setTextObs('')
	}

	const getReviewText = () => {
		const r = revisionTramite && revisionTramite.revision && revisionTramite.revision.reviews.filter(r => r.field.toUpperCase() === attributeName.toUpperCase() && !r.isOk)
		if (!r || r.length === 0)
			return ''

		return _.last(r).review
	}




	return <div className={props.isTitle ? 'w-full' : ''}>
	<Modal
		visible={showObs}
		title="Observaciones"
		onOk={disLike}
		onCancel={() => setShowObs(false)}
	>
		<TextArea placeholder="Escriba aqui el motivo " allowClear onChange={(e) => setTextObs(e.target.value)} />
	</Modal>
	<div className="flex ">
		<div className="flex w-3/4">
			<div >
			
				<label className={props.isTitle ? 'text-2xl font-bold py-4' : 'font-bold text-muted-700 text-sm'}>{props.title}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
			</div>

			{getReviewText() && <div className="pl-2">
				{customColors.map(color => (
					<Tooltip
						title={getReviewText()}
						placement="right"
						color={color}
						key={color}>
						<InfoCircleTwoTone twoToneColor="#f9a822" />
					</Tooltip>
				))}
			</div>}
		</div>

	 <div className="justify-end w-2/5">
				<div className=" text-right">
					<Button type="link" onClick={() => {
						obra.datosObra[0].observacionesDelRegistro[props.parent][props.field]=''
						props.onChange(Object.assign({},obra))
					}} icon={<LikeFilled style={{ color: getColorIcon(true) }} />} />
					<Button onClick={() => setShowObs(true)} type="link" icon={<DislikeFilled style={{ color: getColorIcon(false) }} />} />
				</div>
			</div>
	</div >
	{React.isValidElement(props.children) ?  React.cloneElement(props.children, {isEditable : isEditable()}) : props.children}

</div >
}