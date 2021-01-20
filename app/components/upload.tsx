import React, { useState } from 'react'
import { Button, Upload, message, Tooltip } from 'antd';
import { LikeFilled, DislikeFilled, CloudUploadOutlined } from '@ant-design/icons';
import { getToken } from '../services/business';

const { Dragger } = Upload;
const customColors = ['#2897D4'];



interface Props {
  label:string
  labelMessageError?: string
  labelRequired?:string
  onOnLoad: Function
  defaultValue:[]
  onRemove: Function
}

export default (props:Props) => {

  const propsUpload = {
    multiple: false,
    defaultFileList:props.defaultValue,
    action: '/api/files/new',
    headers: {
      authorization: 'Bearer ' + getToken()
    },
    onRemove(fileToRemove){
      props.onRemove(fileToRemove)
    },
    onChange(info) {

      let fileList = [...info.fileList]
      fileList.forEach(function(file, index) {
        let reader = new FileReader();
        reader.onload = (e) => {
           file.base64 =  e.target.result;
        };
        reader.readAsDataURL(info.file.originFileObj);
      });

      
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        //console.log(info.file.response.filesSaved[0].cid)
        props.onOnLoad({
          uid: info.file.uid,//info.file.response.filesSaved[0],
          cid: info.file.response.filesSaved[0].cid,
          createdAt: info.file.response.filesSaved[0].createdAt,
          type:info.file.type,
          size: info.file.size,
          name:info.file.name
        } as Archivo)
        //console.log(info)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (<div >
    <div className="flex">
      <div className="w-5/5 pb-2">
        <label className="font-bold text-muted-700 text-sm">{props.label}<span className="text-danger-700 ml-1">{props.labelRequired}</span></label>
      </div>



    </div>
    <div className="w-full">
      <Dragger
        defaultFileList={[]}
      {...propsUpload}>
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <p className="ant-upload-text text-sm">Haga click o arrastre un archivo aquí</p>

      </Dragger>
    </div>
    <div className="w-full text-xs text-danger-700 px-2 pt-2">
      {props.labelMessageError}
    </div>
    <div>


    </div>

  </div>

  )
}
