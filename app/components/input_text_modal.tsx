import React, { useState } from 'react'
import { Button, Input,Tooltip, } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';


const customColors = ['#2897D4'];
const colors = [
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
];



export default (props) => {

  return (<div >
    <div className="flex">
      <div className="w-5/5 mb-2">
      <label className="font-bold text-sm">{props.label}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>

      

    </div>
    <div className="w-full">
      <Input placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
    
      />
    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {props.labelMessageError}
    </div>
    <div>
   

</div>

  </div>

  )
}