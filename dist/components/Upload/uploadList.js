/*
 * @Author: shanzhilin
 * @Date: 2021-12-09 21:49:39
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-09 21:55:09
 */
import React from "react";
import { faFileAlt, faSpinner, faCheckCircle, faTimesCircle, faTimes, } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "upload-list", onClick: function (e) {
            e.stopPropagation();
        } }, fileList === null || fileList === void 0 ? void 0 : fileList.map(function (item) {
        return (React.createElement("li", { key: item.uid, className: "upload-list-item" },
            React.createElement("span", { className: "file-name file-name-".concat(item.status) },
                React.createElement(Icon, { icon: faFileAlt, theme: "secondary" }),
                item.name),
            React.createElement("span", { className: "file-status" },
                item.status === "uploading" && (React.createElement(Icon, { icon: faSpinner, spin: true, theme: "secondary" })),
                item.status === "success" && (React.createElement(Icon, { icon: faCheckCircle, theme: "success" })),
                item.status === "error" && (React.createElement(Icon, { icon: faTimesCircle, theme: "danger" }))),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: faTimes, onClick: function () {
                        onRemove && onRemove(item);
                    } })),
            item.status === "uploading" && (React.createElement(Progress, { percent: item.percent || 0 }))));
    })));
};
export default UploadList;
