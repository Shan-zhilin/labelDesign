/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 14:54:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-10-11 00:14:26
 */
import React from "react";
import "./style/index.scss";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>biaff</h1>
        <h2>biaff</h2>
        <h3>biaff</h3>
        <br />
        <hr />
        <Button>hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          disabled
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          large
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
          small
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          连接
        </Button>
      </header>
    </div>
  );
}

export default App;
