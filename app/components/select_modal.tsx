import React, { useState } from 'react'
import { Select, Tooltip, Button } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';


const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}


const customColors = ['#2897D4'];

interface Props {
  value: any
  bindFunction: Function
  title: string
  labelRequired?: string
  defaultOption: string
  option: any
  labelMessageError?: string
  labeltooltip?: string
  labelObservation? : string
  required: boolean
  showHands? : boolean
}


export default (props) => {

  return (<div >
    <div className="flex">
      <div className="w-3/4 mb-2">
        <label className="font-bold text-muted-700 text-sm">{props.title}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>
    </div>
    <div className="w-full">
      <Select
        style={{ width: '100%' }}
        defaultValue={props.defaultOption} onChange={handleChange}>
        {props.option}
      </Select>
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {props.labelMessageError}
    </div>



  </div>

  )
}
