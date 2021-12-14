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
 * @Date: 2021-12-04 21:20:31
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-05 23:30:15
 */
import React, { useState, useEffect, useRef, } from "react";
import Input from "../Input/input";
import classNames from "classnames";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/icon";
import useDebounce from "../../Hooks/useDebounce";
import useClickOutSide from "../../Hooks/useClickOutSide";
import Transition from "../Transition/transition";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1]; // 输入框值
    var _b = useState([]), suggestions = _b[0], setSuggestion = _b[1]; // 匹配列表
    var _c = useState(false), loading = _c[0], setLoading = _c[1]; //输入时渲染loading;
    var debounceValue = useDebounce(inputValue); // 添加防抖的 inputvalue
    var _d = useState(-1), highLightedIndex = _d[0], setHighLightedIndex = _d[1]; // 高亮显示的 index
    var triggerSearch = useRef(false); // 控制 当使用快捷键 enter选择 item时 会触发一次search
    var componentRef = useRef(null); // 点击外部区域关闭下拉框
    // input change 处理方法
    var handleChange = function (e) {
        triggerSearch.current = true;
        var value = e.target.value.trim();
        setInputValue(value);
    };
    // 选择 具体某一项时的触发方法
    var handelSelect = function (item) {
        triggerSearch.current = false;
        setInputValue(item.value);
        setSuggestion([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    // 根据传入的方法判断是否为用户自定义渲染模板
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    // 匹配列表生成方法
    var generatorList = function () {
        return (React.createElement(Transition, { in: suggestions.length > 0, classNames: "zoom-in-top", children: React.createElement("ul", { className: "auto-complete-list" }, suggestions.map(function (item, index) {
                var classes = classNames("auto-complete-item", {
                    "is-active": highLightedIndex === index,
                });
                return (React.createElement("li", { className: classes, key: index, onClick: function () {
                        handelSelect(item);
                    } }, renderTemplate(item)));
            })), addEndListener: function () { } }));
    };
    var hightLigntIndex = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightedIndex(index);
    };
    // 快捷键按下时的触发方法
    var handleKeyDow = function (e) {
        switch (e.keyCode) {
            case 38:
                hightLigntIndex(highLightedIndex - 1);
                break;
            case 40:
                hightLigntIndex(highLightedIndex + 1);
                break;
            case 27:
                setSuggestion([]);
                setHighLightedIndex(-1);
                break;
            case 13:
                if (suggestions[highLightedIndex]) {
                    handelSelect(suggestions[highLightedIndex]);
                }
                break;
            default:
                break;
        }
    };
    // 执行点击外部区域关闭 列表框的 hooks
    useClickOutSide(componentRef, function () {
        setSuggestion([]);
        setHighLightedIndex(-1);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var result = fetchSuggestions(debounceValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    // data 断言成数组 因为 Promise传入的是一个DataSourceType类型，返回值无法确定时数组类型，所以需要断言
                    var dataArray = data;
                    setSuggestion(dataArray);
                });
            }
            else {
                setSuggestion(result);
            }
        }
        else {
            setSuggestion([]);
        }
        setHighLightedIndex(-1);
    }, [debounceValue]);
    return (React.createElement("div", { className: "auto-complete-content", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDow }, restProps)),
        loading && (React.createElement("div", { className: "suggestion-loading-icon" },
            React.createElement(Icon, { icon: faSpinner, spin: true, size: "2x" }))),
        suggestions && generatorList()));
};
export default AutoComplete;
