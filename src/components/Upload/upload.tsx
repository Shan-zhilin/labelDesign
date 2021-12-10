/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-09 21:47:08
 */
import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export interface UploadProps {
  /** 上传地址*/
  action: string;
  /** 默认上传文件*/
  defaultUploadList?: UploadFile[];
  /** 用户自定义headers*/
  headers?: { [key: string]: any };
  /** 用户自定义文件名*/
  name?: string;
  /** 用户自定义上传文件 formData*/
  data?: { [key: string]: any };
  /** 表示跨域请求时是否需要使用cookie*/
  withCredentials?: boolean;
  /** 可上传的文件类型*/
  accept?: string;
  /** 是否可以多选*/
  multiple?: boolean;
  /** 拖拽上传*/
  drag?: boolean;
  /** 上传文件之前的钩子，参数为上传的文件。 若返回 false 或者返回 Promise 且被 reject，则终止上*/
  beforeUpload?: (file: UploadFile) => boolean | Promise<File>;
  /** 上传进度*/
  onProgress?: (percentagr: number, file: UploadFile) => void;
  /** 上传成功回调事件*/
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 上传失败回调事件*/
  onError?: (err: any, filr: UploadFile) => void;
  /** 文件状态改变触发事件*/
  onChange?: (file: UploadFile) => void;
  /** 用户自定义移除事件*/
  onRemove?: (file: UploadFile) => void;
}

export type UploadFileStaus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid?: string;
  size?: number;
  name?: string;
  status?: UploadFileStaus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

/**
 *> ## **引用方式**
 * **import Upload from 'labelDesign'**
 *
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onError,
    onSuccess,
    beforeUpload,
    onChange,
    defaultUploadList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setfileList] = useState<UploadFile[]>(
    defaultUploadList || []
  );
  //点击button 按钮展示 input Uplaod 上传窗口
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  //upload 筛选文件进行上传
  const HandleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //上传事件，包括文件经过beforeUpload 处理后的 文件
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        // 经过beforeUpload 处理过的 filr
        const resultFile = beforeUpload(file);
        if (resultFile && resultFile instanceof Promise) {
          resultFile.then((processedFile) => {
            post(processedFile);
          });
        } else if (resultFile !== false) {
          post(file);
        }
      }
    });
  };
  // 更新上传文件的 状态
  const updateFileList = (
    updataFile: UploadFile,
    updataObj: Partial<UploadFile>
  ) => {
    setfileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updataFile.uid) {
          return { ...file, ...updataObj };
        } else {
          return file;
        }
      });
    });
  };
  const post = (file: File) => {
    // 当前上传的 file
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // 将当前上传文件更新到上传列表中
    // setfileList([_file, ...fileList]);
    setfileList((prelist) => {
      return [_file, ...prelist];
    });
    // 创建formData对象
    const formData = new FormData();
    formData.append(name || "file", file);
    // 将用户自定义的formData添加到文件 formData中
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post("https://jsonplaceholder.typicode.com/posts/", {
        headers: {
          ...headers,
          "Content-type": "multipart/form-data",
        },
        withCredentials,
        // 好像这个属性会被浏览器当作是跨域，上传时并没有触发该钩子函数，需要后端接口配置跨域
        // 纯前端技术不知道咋解决，哎........真头大
        onUploadProgress: (progressEvent: ProgressEvent) => {
          let percentage =
            Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
          if (percentage < 100) {
            // 更新文件状态
            updateFileList(_file, { percent: percentage, status: "uploading" });
            console.log(fileList);
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        // 更新文件状态
        updateFileList(_file, { status: "success", response: res.data });
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        // 更新文件状态
        updateFileList(_file, { status: "error", error: err });
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  // 移除列表中某一项文件
  const handleRemove = (file: UploadFile) => {
    setfileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };
  return (
    <div className="upload-component" onClick={handleClick}>
      {drag ? <Dragger>{children}</Dragger> : children}
      <input
        type="file"
        className="file-input"
        style={{
          display: "none",
        }}
        accept={accept}
        multiple={multiple}
        onChange={HandleUploadChange}
        ref={fileInputRef}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
