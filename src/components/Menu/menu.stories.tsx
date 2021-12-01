/*
 * @Author: shanzhilin
 * @Date: 2021-12-01 13:49:52
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-01 22:27:21
 */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./Menu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu from "./SubMenu";

export default {
  title: "Menu",
  component: Menu,
  argTypes: {
    mode: {
      defaultValue: "horizontal",
    },
    defaultIndex: {
      defaultValue: "0",
     
    },
    disabled:{
      description: 'MenuItem禁用属性-用于对应MenuItem',
      defaultValue: false,
    },
    title: {
      description: 'SubMenu标题-用于对应SubMenu'
    }
  }
} as ComponentMeta<typeof Menu>;

// 多项子元素渲染模板
const ListTemplate: ComponentStory<typeof Menu> = (args) => {
  const { children } = args;
  const items = children as Array<MenuItemProps>;
  return (
    <Menu {...args}>
      {items.map((item: MenuItemProps) => (
        <MenuItem {...item} />
      ))}
    </Menu>
  );
};

// 横向菜单
export const Horizontal = ListTemplate.bind({});
Horizontal.args = {
  children: [
    {
      children: "item1",
      index: 0,
    },
    {
      children: "item2",
      index: 1,
    },
  ],
  defaultIndex: "1",
};


/** 纵向菜单*/ 
export const Vertical = ListTemplate.bind({});
Vertical.args = {
  mode: "vertical",
  children: [
    {
      children: "item1",
      index: 0,
    },
    {
      children: "item2",
      index: 1,
    },
  ],
  defaultIndex: "1",
};


// 单个元素渲染模板
const oneItemsTemplate: ComponentStory<typeof Menu> = (args) => <Menu {...args}/>;

// 禁用Item
export const DsiabledMenuItems = ListTemplate.bind({})
DsiabledMenuItems.args = {
  mode: "vertical",
  children: [
    {
      children: "item1",
      index: 0,
      disabled:true
    },
    {
      children: "item2",
      index: 1,
    },
  ],
  defaultIndex: "1",
};


// subMenu
export const subMenu  = oneItemsTemplate.bind({})
subMenu.args = {
  children: <SubMenu title="dropdown">
              <MenuItem>coll pink2</MenuItem>
              <MenuItem>coll pink3</MenuItem>
            </SubMenu>
}

