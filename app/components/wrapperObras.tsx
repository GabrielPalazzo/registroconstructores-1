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
	if (!obra.datosObra[0].observacionesDelRegistro)
		obra.datosObra[0].observacionesDelRegistro = {
			denominacion: '',
			datosGenerales: ''
		}
	obra.datosObra[0].observacionesDelRegistro.denominacion

	const isEditable = () => {
		return true
	}

	const getColorIcon = (handUp: boolean) => {
		const r = revisionTramite && revisionTramite.revision && revisionTramite.revision.reviews.filter(r => r.field.toUpperCase() === attributeName.toUpperCase())
		if (!r || r.length == 0)
			return "#1890ff"

		if (_.last(r).field.toUpperCase() === attributeName.toUpperCase()) {
			if (handUp)
				return _.last(r).isOk ? 'green' : '#e2e8f0'
			else
				return !_.last(r).isOk ? 'red' : '#e2e8f0'
		}
	}

	const disLike = () => {
		if (!revisionTramite.revision)
			revisionTramite.revision = {
				reviews: []
			}

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
					<Button type="link" icon={<LikeFilled style={{ color: getColorIcon(true) }} />} />
					<Button onClick={() => setShowObs(true)} type="link" icon={<DislikeFilled style={{ color: getColorIcon(false) }} />} />
				</div>
			</div>
	</div >
	{React.isValidElement(props.children) ?  React.cloneElement(props.children, {isEditable : isEditable()}) : props.children}

</div >
}