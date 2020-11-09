import React, { useState } from 'react'
import { Select, Tooltip, Button } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';


const { Option, OptGroup } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}


const customColors = ['#2897D4'];




export default (props) => {

    return (<div >
        <div className="flex">
            <div className="w-3/4">
            <label className="font-bold text-sm">{props.title}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
            </div>

            <div className="justify-end w-1/4">
                <div className=" text-right">
                    <Button type="link" icon={<LikeFilled />} className="p-5"/>
                    <Button type="link" icon={<DislikeFilled />} />
                </div>
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
