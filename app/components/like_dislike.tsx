import React, { useState } from 'react'
import { Button } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';



export default (props) => {


    return (<div className=" text-right">

        <Button type="link">
            <LikeOutlined  />
        </Button>
        <Button type="link" >
            <DislikeOutlined  />
        </Button>

        <style>
          {`
          .ant-btn{
              padding:0px 4px;
          }
        `}
        </style>
    </div>




    )
}
