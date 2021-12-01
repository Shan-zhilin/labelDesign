/*
 * @Author: shanzhilin
 * @Date: 2021-11-30 17:04:50
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-01 22:19:43
 */
// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { 
      action: "onClick",
      description: '点击回调事件'
    },
    btnType: {
      options: [
        "primary",
        "default",
        "success",
        "info",
        "warning",
        "link",
        "danger",
        "disabled",
      ],
      control: "select",
      description: '按钮主题类型',
      defaultValue: 'default'
    },
    size: {
      options: ['lg','sm'],
      control: 'select',
      description: '按钮尺寸',
    },
    children:{
      description: 'HTML元素 / 文本'
    },
    href: {
      description: '链接按钮 href属性',
      control: 'text'
    },
    disabled: {
      description: '禁用属性',
      control: 'boolean',
      defaultValue: false
    },
    className: {
      description: '自定义类名',
      control: 'text'
    },
    style: {
      description: '自定义样式',
      control: 'object'
    }
  },
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
// 按钮主题
export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
  children: "primary",
};

// 禁用按钮
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: '禁用按钮'
}

// 按钮尺寸
export const Size = Template.bind({});
Size.args = {
  size: "lg",
  children: '按钮尺寸'
}

// 链接按钮
export const Link = Template.bind({})
Link.args = {
  btnType:'link',
  href: 'http://baidu.com',
  children: '链接'
}
