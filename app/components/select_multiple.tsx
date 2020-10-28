import React from 'react';
import { Input, Table, Space, Steps, Select, Radio } from 'antd';



const { Option } = Select;

function handleChange(value) {
	console.log(`selected ${value}`);
}

export default (props) => {

	return <div className="">

		<div className="px-20 py-6 ">


			<Select mode="multiple"
				placeholder="seleccione una opcion"
				defaultValue={['china']}
				onChange={handleChange}
				optionLabelProp="label"
			>
				<Option value="" label={props.label}>
					<div className="demo-option-label-item">

						{props.option}
					</div>
				</Option>
			</Select>

</div>

	</div>
}