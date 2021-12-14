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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-09 21:47:08
 */
import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
import Dragger from "./dragger";
/**
 *> ## **引用方式**
 * **import Upload from 'labelDesign'**
 *
 */
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onError = props.onError, onSuccess = props.onSuccess, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultUploadList = props.defaultUploadList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInputRef = useRef(null);
    var _a = useState(defaultUploadList || []), fileList = _a[0], setfileList = _a[1];
    var defaultChildren = children || React.createElement(Button, { btnType: "primary" }, "Click to upload");
    //点击button 按钮展示 input Uplaod 上传窗口
    var handleClick = function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    //upload 筛选文件进行上传
    var HandleUploadChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    //上传事件，包括文件经过beforeUpload 处理后的 文件
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                // 经过beforeUpload 处理过的 filr
                var resultFile = beforeUpload(file);
                if (resultFile && resultFile instanceof Promise) {
                    resultFile.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (resultFile !== false) {
                    post(file);
                }
            }
        });
    };
    // 更新上传文件的 状态
    var updateFileList = function (updataFile, updataObj) {
        setfileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updataFile.uid) {
                    return __assign(__assign({}, file), updataObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var post = function (file) {
        // 当前上传的 file
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // 将当前上传文件更新到上传列表中
        // setfileList([_file, ...fileList]);
        setfileList(function (prelist) {
            return __spreadArray([_file], prelist, true);
        });
        // 创建formData对象
        var formData = new FormData();
        formData.append(name || "file", file);
        // 将用户自定义的formData添加到文件 formData中
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post("https://jsonplaceholder.typicode.com/posts/", {
            headers: __assign(__assign({}, headers), { "Content-type": "multipart/form-data" }),
            withCredentials: withCredentials,
            // 好像这个属性会被浏览器当作是跨域，上传时并没有触发该钩子函数，需要后端接口配置跨域
            // 纯前端技术不知道咋解决，哎........真头大
            onUploadProgress: function (progressEvent) {
                var percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
                if (percentage < 100) {
                    // 更新文件状态
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    console.log(fileList);
                    onProgress && onProgress(percentage, file);
                }
            },
        })
            .then(function (res) {
            // 更新文件状态
            updateFileList(_file, { status: "success", response: res.data });
            onSuccess && onSuccess(res.data, file);
            onChange && onChange(file);
        })
            .catch(function (err) {
            // 更新文件状态
            updateFileList(_file, { status: "error", error: err });
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    // 移除列表中某一项文件
    var handleRemove = function (file) {
        setfileList(function (preList) {
            return preList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", { className: "upload-component", onClick: handleClick },
        drag ? React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, defaultChildren) : defaultChildren,
        React.createElement("input", { type: "file", className: "file-input", style: {
                'display': 'none'
            }, accept: accept, multiple: multiple, onChange: HandleUploadChange, ref: fileInputRef }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: "file",
};
export default Upload;
