/*
 * @Author: shanzhilin
 * @Date: 2021-12-18 22:09:55
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-18 23:09:05
 */
/***
 * 这个组件是 stories 的入口文件，用于访问时的介绍界面，放在这里的原因是，
 * 不知道如何配置 默认的入口文件，所以就放在这里让他自动加载，这并不是一个很好的方法
 * 比较好的方法是 能过进行配置 stories的加载顺序，还需要研究一下。
 * */
import React from "react";

const MainStories = (props: any) => {
  const useStyle: React.CSSProperties = {
    marginTop: "20px",
  };
  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <h4>👏欢迎使用lebalDesign！</h4>
      <h4>🏗lebalDesign 是一个 react 组件,个人学习所作</h4>
      <h4>
        🏚GitHub代码库: &nbsp;&nbsp;👉
        <a
          href="https://github.com/Shan-zhilin/labelDesign"
          target="_blank"
          rel="noopener noreferrer"
        >
          点这里
        </a>
      </h4>
      <h4>😀欢迎大家积极 Star✨ and Follow👍</h4>
      <div style={useStyle}>
        <h5
          style={{
            fontWeight: "bold",
          }}
        >
          安装方式
        </h5>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px 20px",
            marginBottom: "20px",
          }}
        >
          <code>npm i labeldesign --save</code>
        </div>
        <h5
          style={{
            fontWeight: "bold",
          }}
        >
          使用方式
        </h5>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px 20px",
          }}
        >
            {'//'}引入样式<br />
            <code>import 'labeldesign/dist/index.css'</code><br />
            {'//'}使用组件<br />
            <code>import { `{ Button }` } from 'labeldesign'</code>
        </div>
      </div>
    </div>
  );
};

export default MainStories;
