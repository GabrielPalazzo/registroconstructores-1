import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputText, InputTextProps } from './InputText';

export default {
  title: 'Examples/InputText',
  component: InputText,
  
} as Meta;

const Template: Story<InputTextProps> = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
 
  label: 'etiqueta',
};




