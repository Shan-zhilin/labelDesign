/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:21:04
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-16 23:14:31
 */
import React, { createContext, useState } from "react";
import classNames from "classnames";
import {MenuItemProps} from './MenuItem'

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubmenus?: string[]
}
interface ImenuContext {
  index:string;  // menu-item 的id标志
  onSelect?: SelectCallback;  // 点击每一个menu-item 的回调事件 这里用于更改active-index
  mode?:MenuMode,  // menu菜单的显示方式
  defaultOpenSubmenus?: string[] // 默认打开的下拉菜单选项
}

// context 容器
export const MenuContext = createContext<ImenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, children,defaultOpenSubmenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== 'vertical',
  });
  const handelClick = (changeIndex: string) => {
    setActive(changeIndex);
    if (onSelect) {
      onSelect(changeIndex);
    }
  };
  // 传递给子组件使用的contextValue
  const passedContext: ImenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handelClick,
    mode:mode,
    defaultOpenSubmenus,
  };
  // 对传进来的children 进行判断，如果不是MenuItem类型则进行错误提示
  const renderChildren = () => {
    return React.Children.map(children,(child,index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement,{
          index:index.toString()
        })
      }else {
        console.error('Warning: Menu has a child which is not a MenuItem Componetn')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: "horizontal",
  defaultOpenSubmenus:[]
};

export default Menu;
