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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/*
 * @Author: shanzhilin
 * @Date: 2021-12-01 22:36:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-03 00:37:23
 */
import React from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
/**
 *> ## **引用方式**
 * **import Input from 'labelDesign'**
 *
*/
export var Input = function (props) {
    var _a;
    // 取出所有属性
    var disabled = props.disabled, size = props.size, icon = props.icon, prepand = props.prepand, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepand", "append", "style"]);
    // 计算className
    var classes = classNames("input-wrapper", (_a = {},
        _a["input-size-".concat(size)] = size,
        _a["is-disabled"] = disabled,
        _a["input-group"] = prepand || append,
        _a["input-group-append"] = !!append,
        _a["input-group-prepend"] = !!prepand,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepand && React.createElement("div", { className: "input-group-prepend-content" }, prepand),
        icon && !append && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon }))),
        React.createElement("input", __assign({ className: "input-inner", disabled: disabled }, restProps)),
        append && React.createElement("div", { className: "input-group-append-content" }, append)));
};
Input.defaultProps = {
    disabled: false,
};
export default Input;
