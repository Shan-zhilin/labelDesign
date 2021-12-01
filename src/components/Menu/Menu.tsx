/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:21:04
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-01 22:30:57
 */
import React, { createContext, useState } from "react";
import classNames from "classnames";
import {MenuItemProps} from './MenuItem'

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
  /**默认选中*/
  defaultIndex?: string;
  /**自定义类名 */
  className?: string;
  /**Menu展示方向*/ 
  mode?: MenuMode;
  /**自定义样式*/ 
  style?: React.CSSProperties;
  /**选择切换事件*/ 
  onSelect?: SelectCallback;
  /**下拉菜单默认展开*/ 
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

/**
 * ### 引用方式
 * `
 * import Menu from 'labelDesign'
 * `
*/
export const Menu: React.FC<MenuProps> = (props) => {
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
