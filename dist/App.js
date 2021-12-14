/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 14:54:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-08 23:37:57
 */
import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./style/index.scss";
import Upload from "./components/Upload/upload";
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(""), title = _b[0], setTitle = _b[1];
    useEffect(function () {
        // axios.get('https://jsonplaceholder.typicode.com/posts/1').then(resp =>{
        //   console.log(resp)
        // })
        axios
            .post("https://jsonplaceholder.typicode.com/posts", {
            title: "lebalDesign",
            body: "woshihaoren",
            testId: "111",
        })
            .then(function (res) {
            setTitle(res.data.title);
        });
    });
    var handleChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadedFile = files[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios
                .post("https://jsonplaceholder.typicode.com/posts", {
                headers: {
                    "Content-type": "multipart/form-data",
                },
                onUploadProgress: function (e) {
                    var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    console.log(percentage);
                },
            })
                .then(function (res) {
                console.log(res);
            });
        }
    };
    // 上传前检测 图片尺寸 返回 bollean 类型
    var chickFileSize = function (file) {
        if (Math.round(file.size / 1024 / 1024) > 5) {
            console.log('图片尺寸太大');
            return false;
        }
        return true;
    };
    // 返回promise 类型
    // const filePromise = (file: File) => {
    //   const newFile = new File([file],'new_name.psd',{type: file.type})
    //   return Promise.resolve(newFile)
    // }
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("h2", null,
                "test:",
                title),
            React.createElement("input", { type: "file", name: "myfile", onChange: handleChange }),
            React.createElement(Upload, { onError: function (res) {
                    console.log(res);
                }, onProgress: function (p, r) {
                    console.log(p);
                }, 
                // beforeUpload={filePromise}
                action: "https://jsonplaceholder.typicode.com/posts" }))));
}
export default App;
