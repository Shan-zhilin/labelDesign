/*
 * @Author: shanzhilin
 * @Date: 2021-12-04 15:24:16
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-05 15:03:45
 */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { faAdjust,faCoffee } from "@fortawesome/free-solid-svg-icons";
import Icon, { IconProps } from "./icon";

export default {
  title: "Icon",
  component: Icon,
  argTypes: {
    size: {
      description: "icon的不同尺寸",
    },
    style: {
      description: "自定义样式",
    },
  },
} as ComponentMeta<typeof Icon>;

// 单个组件模板
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

// 默认Icon
export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
  icon: faAdjust,
  style: {
    fontSize: "50px",
  },
};

// 多个组件渲染模板
const ListTemplate: ComponentStory<typeof Icon> = (args) => {
  const { children } = args;
  const items = children as Array<IconProps>;
  return (
    <>
      {items.map((item: IconProps,index:number) => (
        <Icon {...item} key={index}/>
      ))}
    </>
  );
};
//  不同样式的组件
export const DiffTypeIcon = ListTemplate.bind({});
DiffTypeIcon.args = {
  children: [
    {
        icon:faCoffee,
        theme: 'success',
        style: {
            fontSize:'50px'
        }
    },
    {
        icon:faCoffee,
        theme: 'warning',
        style: {
            fontSize:'50px'
        }
    },
    {
        icon:faCoffee,
        theme: 'danger',
        style: {
            fontSize:'50px'
        }
    }
  ],
};
