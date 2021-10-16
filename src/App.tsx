/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 14:54:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-10-15 22:48:05
 */
import React from "react";
import "./style/index.scss";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus>普通</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          disabled
        </Button>
        <Button btnType={ButtonType.Success} size={ButtonSize.Large} onClick={() => {alert(111)}}>
          success
        </Button>
        <Button
          btnType={ButtonType.Warning}
          size={ButtonSize.Large}
        >
          warning
        </Button>
        <Button
          btnType={ButtonType.Info}
          size={ButtonSize.Large}
        >
          info
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">
          普通连接
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          禁用连接
        </Button>
      </header>
    </div>
  );
}

export default App;
