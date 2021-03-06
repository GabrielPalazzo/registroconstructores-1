import React, { useState } from 'react'
import { Button, DatePicker, Tooltip,ConfigProvider} from 'antd';
import moment from 'moment'
import { isTramiteEditable } from '../services/business';
import {useSelector} from 'react-redux'

function onChange(date, dateString) {
  console.log(date, dateString);
}
const dateFormat = 'DD/MM/YYYY';

interface Props {
  value: any
  bindFunction: Function
  label?: string,
  labelRequired: string
  placeholder?: any
  labelMessageError?: string
  labeltooltip?: string
  labelObservation?: string
  showHands?: boolean
  locked?: boolean
}

export default (props: Props) => {

  const tramite : TramiteAlta = useSelector(state => state.appStatus.tramiteAlta)

  return (<div >
     
    <div className="flex">
      {props.label && <div className="w-5/5 mb-2">
        <label className="font-bold text-muted-700 text-sm">{props.label}</label>
      </div>}
    </div>
    <div className="w-full">

    <DatePicker 

        disabled={!isTramiteEditable(tramite) || props.locked}
        onChange={(value) => {
          props.bindFunction(moment(value,dateFormat).format(dateFormat))
        }}
        defaultValue={props.value &&  moment(props.value,dateFormat) }
        picker={props.placeholder}
        format={dateFormat} />
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {props.labelMessageError}
    </div>

  </div>

  )
}
