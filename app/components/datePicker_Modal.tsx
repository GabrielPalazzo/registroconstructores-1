import React, { useState } from 'react'
import { Button, DatePicker, Tooltip, } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}
const dateFormat = 'DD/MM/YYYY';

export default (props) => {

  return (<div >
    <div className="flex">
      <div className="w-5/5 mb-2">
        <label className="font-bold text-sm">{props.label}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>
    </div>
    <div className="w-full">
      <DatePicker onChange={onChange}
        picker={props.placeholder}
        format={dateFormat} />

    </div>
    <div className="w-full text-xs text-danger-700 px-2 ">
      {props.labelMessageError}
    </div>


  </div>

  )
}
