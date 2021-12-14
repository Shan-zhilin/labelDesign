import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var children = props.children, onFile = props.onFile;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1]; //文件是否拖进上传框
    var classes = classNames("upload-dragger", {
        "is-dragover": dragOver, // 文件移入css 类
    });
    // 拖拽行为
    var handleDrag = function (e, over) {
        // 禁止默认行为
        e.preventDefault();
        setDragOver(over);
    };
    // 鼠标弹起触发上传
    var handleDrop = function (e) {
        // 禁止默认行问
        e.preventDefault();
        setDragOver(false);
        onFile && onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) {
            handleDrag(e, true);
        }, onDragLeave: function (e) {
            handleDrag(e, false);
        }, onDrop: handleDrop }, children));
};
export default Dragger;
