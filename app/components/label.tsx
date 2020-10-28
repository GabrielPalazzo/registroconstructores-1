import React, { useState } from 'react'
import { Button } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import LikeDislike from '../components/like_dislike'


export default (props) => {

  return (<div className="flex">
    <div className="w-3/4">
      <label>{props.title}</label>
    </div>

    <div className="justify-end w-1/4">
      <LikeDislike />
    </div>


  </div>

  )
}
