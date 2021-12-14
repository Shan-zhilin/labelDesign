/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:48:53
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-16 22:46:20
 */
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handelClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handelClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
