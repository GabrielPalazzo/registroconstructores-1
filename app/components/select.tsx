import React, { useState } from 'react'
import { Select } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import LikeDislike from '../components/like_dislike'


const { Option, OptGroup } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}




export default (props) => {

    return (<div >
        <div className="flex">
            <div className="w-3/4">
                <label>{props.title}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
            </div>

            <div className="justify-end w-1/4">
                <LikeDislike />
            </div>

        </div>
        <div className="w-full">
            <Select
                style={{ width: '100%' }}
                defaultValue={props.defaultOption} onChange={handleChange}>
                {props.option}
            </Select>
        </div>


    </div>

    )
}
