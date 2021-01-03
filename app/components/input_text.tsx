import React, { useState } from 'react'
import { Button, Input, Tooltip, } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { isTramiteEditable } from '../services/business';

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
}



export const InputText: React.FC<IProps> = ({
  value ='',
  label='',
  showHands = false,
  bindFunction,
  type,
  placeHolder,
  required = false,
  disabled = false,
  labelMessageError,
  labelObservation,
  labelRequired,
  labeltooltip
}) => {


  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta)

  

  if (!tramite)
    return <div>Loading...</div>
  return <div >
    <div className="flex pb-2">
      <div className="w-3/5">
        <label className="font-bold text-sm text-muted-700">{label}<span className="text-danger-700 ml-1">{labelRequired}</span></label>
      </div>

      {tramite.asignadoA ?<div className="justify-end w-2/5">
        <div className=" text-right">
          <Button type="link" icon={<LikeFilled />} />
          <Button type="link" icon={<DislikeFilled />} />
        </div>
      </div>: '' }
      


    </div>
    <div className="w-full">
      <Input
        value={value}
        placeholder={placeHolder}
        required={required}
        disabled={!isTramiteEditable(tramite)}
        onChange={(e) => bindFunction(e.target.value)}
      />
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {labelMessageError}
    </div>
    <div>
      {customColors.map(color => (
        <Tooltip
          title={labeltooltip}
          placement="right"
          color={color}
          key={color}>
          <span className="text-warning-700 font-bold px-2 text-xs  cursor-pointer">{labelObservation}</span>
        </Tooltip>
      ))}

    </div>

  </div>
}
