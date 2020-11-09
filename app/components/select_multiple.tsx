import React, { useState } from 'react'
import { Select,Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import LikeDislike from '../components/like_dislike'



const customColors = ['#2897D4'];
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}


export default (props) => {

  return (<div >
    <div className="flex">
      <div className="w-3/4">
      <label className="font-bold text-sm">{props.title}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>

      <div className="justify-end w-1/4">
        <LikeDislike />
      </div>

    </div>
    <div className="w-full">
      <Select mode="multiple"
        style={{ width: '100%' }}
        placeholder={props.placeholder}
        onChange={handleChange}
        optionLabelProp="label">

        {props.options}
      </Select>
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
