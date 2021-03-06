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
  label?: string
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
  maxLength?: number
  
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
  maxLength,
  labeltooltip,
  attributeName
}) => {

  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta)

  if (!tramite)
    return <div>Loading...</div>


  

  const isEditable = () => {
    
    return tramite.status ==='BORRADOR' ||
      (tramite.status ==='OBSERVADO' && getReviewAbierta(tramite).reviews.filter(r => (r.field ===attributeName.toUpperCase()) && !r.isOk).length >0) && getUsuario().isConstructor()

    
  }


  return <div >
    
    <div className="flex pb-2">
    {label && <div className="w-3/4">
        <label className="font-bold text-muted-700 text-sm">{label}</label>
      </div>
      }



    </div>
    <div className="w-full">
      <Input
        value={value}
        placeholder={placeHolder}
        required={required}
        disabled={!isEditable()}
        onChange={(e) => bindFunction(e.target.value)}
        type={type}
        maxLength ={maxLength}
      />
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {labelMessageError}
    </div>
    

  </div>
}
