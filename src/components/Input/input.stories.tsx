/*
 * @Author: shanzhilin
 * @Date: 2021-12-03 00:01:38
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-03 00:36:26
 */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input, { InputProps } from "./input";

export default {
  title: "Input",
  component: Input,
  argTypes: {
    disabled: {
      description: "input 禁用",
      defaultValue: false,
      control: "boolean",
    },
    size: {
      options: ["lg", "sm"],
      description: "Input大小 lg 或者 sm",
      icon: "输入框右侧悬浮图标 fortawesome 图标",
      control: "select",
    },
    prepand: {
      control: "text",
    },
    append: {
      control: "text",
    },
    style: {
      control: "object",
    },
  },
} as ComponentMeta<typeof Input>;

//输入框渲染模板
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// 默认 输入框
export const DefaultInput = Template.bind({});
DefaultInput.args = {
  placeholder: "默认输入框",
  style: {
    width: "300px",
    marginBottom: "30px",
  },
};

// 禁用 输入框
export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder: "禁用",
  style: {
    width: "300px",
    marginBottom: "30px",
  },
  disabled: true,
};

// 带 Icon
export const WithIconInput = Template.bind({});
WithIconInput.args = {
  style: {
    width: "300px",
    marginBottom: "30px",
  },
  icon: faSearch,
  placeholder: " 带Icon",
};

// 多项子元素渲染模板
const ListTemplate: ComponentStory<typeof Input> = (args) => {
  const { children } = args;
  const items = children as Array<InputProps>;
  return (
    <>
      {items.map((item: InputProps) => (
        <Input {...item} />
      ))}
    </>
  );
};

// 大小 不同的 input
export const DiffSizeInput = ListTemplate.bind({});
DiffSizeInput.args = {
  children: [
    {
      style: {
        width: "300px",
        marginBottom: "30px",
      },
      size: "lg",
      placeholder: "lg",
    },
    {
      style: {
        width: "300px",
        marginBottom: "30px",
      },
      size: "sm",
      placeholder: "sm",
    },
  ],
};

// 前后缀
export const AffixInput = ListTemplate.bind({});
AffixInput.args = {
    children: [
      {
        style: {
          width: "300px",
          marginBottom: "30px",
        },
        prepand: "with perpand",
        placeholder: "带前缀",
      },
      {
        style: {
          width: "300px",
          marginBottom: "30px",
        },
        append: "with append",
        placeholder: "带后缀",
      },
    ],
  };