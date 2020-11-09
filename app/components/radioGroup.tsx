import React, { useState } from 'react'
import { Select,Tooltip,Radio,Button } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';



const customColors = ['#2897D4'];
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}


export default (props) => {

  return (<div >
    <div className="flex">
      <div className="w-3/4">
      <label className="font-bold text-sm">{props.label}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>

      <div className="justify-end w-1/4 text-right">
      <Button type="link" icon={<LikeFilled />} />
          <Button type="link" icon={<DislikeFilled />} />
      </div>

    </div>
    <div className="w-full">
    <Radio.Group name="radiogroup" defaultValue={1}>
      {props.radioOptions}
     
    </Radio.Group>
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


  