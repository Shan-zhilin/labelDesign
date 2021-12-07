/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:50
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-07 23:04:07
 */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Upload from './upload'

export default {
    title: "Upload",
    component: Upload,
    argTypes:{
        onSuccess:{
            action: 'success'
        },
        onError:{
            action: 'error'
        },
        onProgress: {
            action: 'progress'
        }
    }
} as ComponentMeta<typeof Upload>;


const Template: ComponentStory<typeof Upload> = (args) => (
    <Upload {...args} />
);

export const DefaultUpload = Template.bind({})
DefaultUpload.args = {
    action:'https://jsonplaceholder.typicode.com/posts',
}