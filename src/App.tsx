/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 14:54:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-14 23:49:58
 */
import React from "react";
import "./style/index.scss";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex={0}
          onSelect={(index) => {
            alert(index);
          }}
          mode="vertical"
        >
          <MenuItem>coll pink</MenuItem>
          <MenuItem disabled>coll pink1</MenuItem>
          <MenuItem>coll pink2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>coll pink2</MenuItem>
            <MenuItem>coll pink3</MenuItem>
          </SubMenu>
        </Menu>
        {/* <Button autoFocus>普通</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          disabled
        </Button>
        <Button
          btnType={ButtonType.Success}
          size={ButtonSize.Large}
          onClick={() => {
            alert(111);
          }}
        >
          success
        </Button>
        <Button btnType={ButtonType.Warning} size={ButtonSize.Large}>
          warning
        </Button>
        <Button btnType={ButtonType.Info} size={ButtonSize.Large}>
          info
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">
          普通连接
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          禁用连接
        </Button> */}
      </header>
    </div>
  );
}

export default App;
