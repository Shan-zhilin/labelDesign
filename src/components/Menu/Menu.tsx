/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:21:04
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-11 00:51:29
 */
import React, { createContext, useState } from "react";
import classNames from "classnames";
import {MenuItemProps} from './MenuItem'

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}
interface ImenuContext {
  index: number;
  onSelect?: SelectCallback;
}

// context 容器
export const MenuContext = createContext<ImenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== 'vertical',
  });
  const handelClick = (changeIndex: number) => {
    setActive(changeIndex);
    if (onSelect) {
      onSelect(changeIndex);
    }
  };
  // 传递给子组件使用的contextValue
  const passedContext: ImenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handelClick,
  };
  // 对传进来的children 进行判断，如果不是MenuItem类型则进行错误提示
  const renderChildren = () => {
    return React.Children.map(children,(child,index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement,{
          index
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
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
