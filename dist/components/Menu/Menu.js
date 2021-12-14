/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:21:04
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-03 00:09:36
 */
import React, { createContext, useState } from "react";
import classNames from "classnames";
// context 容器
export var MenuContext = createContext({ index: '0' });
/**
 *> ## **引用方式**
 * **import Menu from 'labelDesign'**
 *
*/
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, defaultIndex = props.defaultIndex, onSelect = props.onSelect, children = props.children, defaultOpenSubmenus = props.defaultOpenSubmenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== 'vertical',
    });
    var handelClick = function (changeIndex) {
        setActive(changeIndex);
        if (onSelect) {
            onSelect(changeIndex);
        }
    };
    // 传递给子组件使用的contextValue
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handelClick,
        mode: mode,
        defaultOpenSubmenus: defaultOpenSubmenus,
    };
    // 对传进来的children 进行判断，如果不是MenuItem类型则进行错误提示
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem Componetn');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubmenus: []
};
export default Menu;
