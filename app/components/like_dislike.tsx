import React, { useState } from 'react'
import { Button } from 'antd';
import { LikeFilled , DislikeFilled  } from '@ant-design/icons';



export default (props) => {


    return (<div className=" text-right">

        <Button type="link">
        <LikeFilled  style={{ color: '#2E7D33' }}/>
        </Button>
        <Button type="link" >
        <DislikeFilled />
        </Button>

        <style>
          {`
          .ant-btn{
              padding:0px 4px;
          }
          .like{
              color: #2E7D33;
          }
          .dislike{
              color:#F9A822;
          }
          .neutro{
              color:#333333;
              opacity:0.15;
          }
        `}
        </style>
    </div>




    )
}
