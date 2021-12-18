/*
 * @Author: shanzhilin
 * @Date: 2021-12-18 22:10:49
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-18 22:30:50
 */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainStories from "./mainStories";
export default {
    title: "Welcome",
    component: MainStories,
  } as ComponentMeta<typeof MainStories>;

  const Templete:ComponentStory<typeof MainStories> = (args) => <MainStories {...args}/>;
  
  export const Welcome =  Templete.bind({})