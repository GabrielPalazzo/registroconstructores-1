import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputText, InputTextProps } from './index';

export default {
  title: 'Examples/InputText',
  component: InputText,
  
} as Meta;

const Template: Story<InputTextProps> = (args) => <InputText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
 
  label: 'Button',
};




