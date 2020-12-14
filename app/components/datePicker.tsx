import React, { useState } from 'react'
import { Button, DatePicker, Tooltip, } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import moment from 'moment';


const customColors = ['#2897D4'];
const colors = [
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
];

const dateFormat = 'DD/MM/YYYY';

interface Props {
  value: any
  bindFunction: Function
  label: string,
  labelRequired: string
  placeholder: any
  labelMessageError?: string
  labeltooltip?: string
  labelObservation: string
  showHands?: boolean
}

export default (props: Props) => {

  return (<div >
    <div className="flex">
      <div className="w-3/5">
        <label className="font-bold text-sm">{props.label}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>

      {props.showHands ? <div className="justify-end w-2/5">
        <div className=" text-right">
          <Button type="link" icon={<LikeFilled />} />
          <Button type="link" icon={<DislikeFilled />} />
        </div>
      </div> : ''}

    </div>
    <div className="w-full">
      <DatePicker 
        onChange={(value) => {
          props.bindFunction(moment(value,dateFormat))
        }}
        defaultValue={props.value &&  moment(props.value,dateFormat) }
        picker={props.placeholder}
        format={dateFormat} />

    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {props.labelMessageError}
    </div>
    <div>
      {customColors.map(color => (
        <Tooltip
          title={props.labeltooltip}
          placement="right"
          color={color}
          key={color}>
          <span className="text-warning-700 font-bold px-2 text-xs  cursor-pointer">{props.labelObservation}</span>
        </Tooltip>
      ))}

    </div>

  </div>

  )
}
