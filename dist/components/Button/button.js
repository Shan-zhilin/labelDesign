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
 * @Date: 2021-10-09 16:13:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-03 00:10:17
 */
import React from "react";
import classNames from "classnames";
/**
 *> ## **引用方式**
 * **import Button from 'labelDesign'**
 *
*/
export var Button = function (props) {
    var _a;
    var className = props.className, disabled = props.disabled, size = props.size, btnType = props.btnType, href = props.href, children = props.children, style = props.style, restProps = __rest(props, ["className", "disabled", "size", "btnType", "href", "children", "style"]);
    // 类名
    var classes = classNames("btn", className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a.disabled = btnType === 'link' && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ href: href, className: classes, style: style }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled, style: style }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
};
export default Button;
