/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-09 00:46:57
 */
import React, { ChangeEvent, useRef,useState } from "react";
import axios from "axios";
import Button from "../Button/button";

export interface UploadProps {
  /** 上传地址*/
  action: string;
  /** 上传文件之前的钩子，参数为上传的文件。 若返回 false 或者返回 Promise 且被 reject，则终止上*/
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传进度*/
  onProgress?: (percentagr: number, file: File) => void;
  /** 上传成功回调事件*/
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调事件*/
  onError?: (err: any, filr: File) => void;
  onChange?:(file:File) => void
}

export type UploadFileStaus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid?: string;
  size?:number;
  name?:string;
  status?:UploadFileStaus;
  percent?: number;
  raw?: File;
  response?:any;
  error?:any;
}

/**
 *> ## **引用方式**
 * **import Upload from 'labelDesign'**
 *
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const { action, onProgress, onError, onSuccess, beforeUpload, onChange } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setfileList] = useState<UploadFile[]>([])
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
          resultFile.then(processedFile => {
            post(processedFile)
          })
        }else if (resultFile !== false) {
          post(file)
        }
      }
    });
  };
  // 更新上传文件的 状态
  const updateFileList = (updataFile:UploadFile,updataObj:Partial<UploadFile>) =>{
    setfileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updataFile.uid) {
          return { ...file, ...updataObj}
        }else {
          return file
        }
      })
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setfileList([_file,...fileList])
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post("https://jsonplaceholder.typicode.com/posts/", {
        headers: {
          "Content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
          if (percentage < 100) {
            // 更新文件状态
            updateFileList(_file,{percent:percentage,status:'uploading'})
            console.log(fileList)
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        // 更新文件状态
        updateFileList(_file,{status:'success',response:res.data})
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file)
      })
      .catch((err) => {
        // 更新文件状态
        updateFileList(_file,{status:'error',error:err})
        onError && onError(err, file);
        onChange &&  onChange(file)
      });
  };
  console.log(fileList)
  return (
    <div className="upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload file
      </Button>
      <input
        type="file"
        className="file-input"
        style={{
          display: "none",
        }}
        onChange={HandleUploadChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default Upload;
