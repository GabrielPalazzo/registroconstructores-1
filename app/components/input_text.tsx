import React, { useState } from 'react'
import { Button, Input, Tooltip, Modal } from 'antd';
import { LikeFilled, DislikeFilled, PropertySafetyFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { getReviewAbierta, getUsuario, isTramiteEditable } from '../services/business';
import _ from 'lodash'
import { updateRevisionTramite } from '../redux/actions/revisionTramite';
import { useDispatch } from 'react-redux'

const { TextArea } = Input

const customColors = ['#2897D4'];
const colors = [
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
];

export interface IProps {
  value: string
  label: string
  showHands?: boolean
  bindFunction: Function
  type?: string
  placeHolder?: string
  required?: boolean
  disabled?: boolean
  labelMessageError?: string
  labelObservation?: string
  labeltooltip?: string
  labelRequired?: string
  attributeName: string
}



export const InputText: React.FC<IProps> = ({
  value = '',
  label = '',
  showHands = false,
  bindFunction,
  type,
  placeHolder,
  required = false,
  disabled = false,
  labelMessageError,
  labelObservation,
  labelRequired,
  labeltooltip,
  attributeName
}) => {


  const dispatch = useDispatch()
  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta)
  const revisionTramite = useSelector(state => state.revisionTramites)
  const [showObs, setShowObs] = useState(false)
  const [textObs, setTextObs] = useState('')

  if (!tramite)
    return <div>Loading...</div>


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

  const like = () => {
    if (!revisionTramite.revision)
      revisionTramite.revision = {
        reviews:[]
      }
    revisionTramite.revision.reviews = revisionTramite.revision.reviews.filter(r => r.field !== attributeName.toUpperCase())
    revisionTramite.revision.reviews.push({
      field: attributeName.toUpperCase(),
      isOk: true,
      review: ''
    })
    dispatch(updateRevisionTramite(Object.assign({}, revisionTramite.revision)))
  }

  const disLike = () => {
    if (!revisionTramite.revision)
      revisionTramite.revision = {
        reviews:[]
      }
      
    setShowObs(false)
    
    if (!textObs)
      return 

    revisionTramite.revision.reviews = revisionTramite.revision.reviews.filter(r => r.field !== attributeName.toUpperCase())
    revisionTramite.revision.reviews.push({
      field: attributeName.toUpperCase(),
      isOk: false,
      review: textObs
    })
    dispatch(updateRevisionTramite(Object.assign({}, revisionTramite.revision)))
    setTextObs('')
  }

  const getReviewText = () => {
    const r = revisionTramite && revisionTramite.revision && revisionTramite.revision.reviews.filter(r => r.field.toUpperCase() === attributeName.toUpperCase() && !r.isOk)
    if (!r || r.length === 0)
      return ''

    return _.last(r).review
  }

  const isEditable = () => {
    
    return tramite.status ==='BORRADOR' ||
      (tramite.status ==='OBSERVADO' && getReviewAbierta(tramite).reviews.filter(r => (r.field ===attributeName.toUpperCase()) && !r.isOk).length >0) && getUsuario().isConstructor()

    
  }


  return <div >
    <Modal
      visible={showObs}
      title="Observaciones"
      onOk={disLike}
      onCancel={() => setShowObs(false)}
    >
      <TextArea placeholder="Escriba aqui el motivo " allowClear onChange={(e) => setTextObs(e.target.value)} />
    </Modal>

    <div className="flex pb-2">
      <div className="w-3/5">
        <label className="font-bold text-sm text-muted-700">{label}<span className="text-danger-700 ml-1">{labelRequired}</span></label>
      </div>

      {tramite.asignadoA ? <div className="justify-end w-2/5">
        <div className=" text-right">
          <Button onClick={like} type="link" icon={<LikeFilled style={{ color: getColorIcon(true) }} />} />
          <Button onClick={() => setShowObs(true)} type="link" icon={<DislikeFilled style={{ color: getColorIcon(false) }} />} />
        </div>
      </div> : ''}



    </div>
    <div className="w-full">
      <Input
        value={value}
        placeholder={placeHolder}
        required={required}
        disabled={!isEditable()}
        onChange={(e) => bindFunction(e.target.value)}
        type={type}
      />
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {labelMessageError}
    </div>
    <div>
      {customColors.map(color => (
        <Tooltip
          title={getReviewText()}
          placement="right"
          color={color}
          key={color}>
          <span className="text-warning-700 font-bold px-2 text-xs  cursor-pointer">{getReviewText() ? 'Este campo tiene observaciones' : ''}</span>
        </Tooltip>
      ))}

    </div>

  </div>
}
