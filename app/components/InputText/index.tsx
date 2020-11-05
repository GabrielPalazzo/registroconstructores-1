import React from 'react';
import {Input } from 'antd';

export interface InputTextProps {
 
  size?: 'small' | 'medium' | 'large';
  
  label: string;
  placeholder: string;
  labelRequired:string;
}

export const InputText: React.FC<InputTextProps> = ({
 
  size = 'medium',
  labelRequired,
  label,placeholder,
  ...props
}) => {
  
  return (
    <div >
    <div className="flex">
      <div className="w-3/4">
        <label>{label}<span className="text-danger-700 ml-1">{labelRequired}</span></label>
      </div>

      

    </div>
    <div className="w-full">
      <Input placeholder={placeholder} 
    
      />
    </div>


  </div>
  );
};
