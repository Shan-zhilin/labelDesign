// Button.stories.ts|tsx

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';

export default {
  title: 'Button',  
  component: Button,
  argTypes: { 
    onClick: { action: 'clicked' },
    btnType: {
       options: ['primary','default','success','info','warning','link','danger','disabled'],
       control:'select'
}
    },
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
     btnType:'primary',
     children: 'primary'
};