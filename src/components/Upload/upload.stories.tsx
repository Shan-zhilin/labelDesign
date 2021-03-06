/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:50
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-18 23:15:44
 */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Upload, { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Upload",
  component: Upload,
  argTypes: {
    onSuccess: {
      action: "success",
    },
    onError: {
      action: "error",
    },
    onProgress: {
      action: "progress",
    },
  },
} as ComponentMeta<typeof Upload>;

const testFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  {
    uid: "124",
    size: 1234,
    name: "xmz.md",
    status: "success",
    percent: 30,
  },
  {
    uid: "125",
    size: 1234,
    name: "eyiha.md",
    status: "error",
    percent: 30,
  },
];
const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const DefaultUpload = Template.bind({});
DefaultUpload.args = {
  action: "https://jsonplaceholder.typicode.com/posts",
  defaultUploadList: testFileList,
  name: "fileName",
  data: {
    key: "value",
  },
  headers: {
    "X-Powered-By": "labelDesign",
  },
  multiple: true,
  accept: ".jpg",
};

export const DragUpload = Template.bind({});
DragUpload.args = {
  action: "https://jsonplaceholder.typicode.com/posts",
  defaultUploadList: testFileList,
  name: "fileName",
  data: {
    key: "value",
  },
  multiple: true,
  accept: ".jpg",
  drag: true,
  children:
      <p style={{
          textAlign:'center'
      }}>
        <Icon icon={faFileUpload} size="lg"></Icon>
        <br />
        点击或者拖拽到此处进行上传
      </p>
};
