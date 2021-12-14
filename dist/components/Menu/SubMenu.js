var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/*
 * @Author: shanzhilin
 * @Date: 2021-11-26 23:06:55
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-27 21:33:47
 */
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var opendSubmenu = context.defaultOpenSubmenus;
    var isOpen = context.mode === "vertical" && index ? opendSubmenu.includes(index) : false;
    var _a = useState(isOpen), menuOpen = _a[0], setMenuOpen = _a[1];
    var hadleClick = function (e) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    // 防抖
    var timer;
    var handleHover = function (e, toggle) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    // 横向菜单时，移入展示菜单
    var hoverEvent = context.mode === "horizontal"
        ? {
            onMouseEnter: function (e) {
                handleHover(e, true);
            },
            onMouseLeave: function (e) {
                handleHover(e, false);
            },
        }
        : {};
    var clickEvent = context.mode !== "horizontal"
        ? {
            onClick: function (e) {
                hadleClick(e);
            },
        }
        : {};
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": index === context.index,
        "is-opend": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    var subMenuClasses = classNames("submenu", {
        "submenu-open": menuOpen,
    });
    var renderChildren = function () {
        var childrenElement = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem Componetn");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeOut: 300, classNames: "zoom-in-top", children: React.createElement("ul", { className: subMenuClasses }, childrenElement), addEndListener: function () { } }));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvent),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvent),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-acon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
