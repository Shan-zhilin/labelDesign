/*
 * @Author: shanzhilin
 * @Date: 2021-12-07 21:45:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-07 23:45:07
 */
import React, { ChangeEvent, useRef } from "react";
import axios from "axios";

import Button from "../Button/button";

export interface UploadProps {
  /** 上传地址*/
  action: string;
  /** 上传进度*/
  onProgress?: (percentagr: number, file: File) => void;
  /** 上传成功回调事件*/
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调事件*/
  onError?: (err: any, filr: File) => void;
}

/**
 *> ## **引用方式**
 * **import Upload from 'labelDesign'**
 *
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const { action, onProgress, onError, onSuccess } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

 //点击button 按钮展示 input Uplaod 上传窗口   
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 //upload 筛选文件进行上传
  const HandleUploadChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files
    if (!files) {
        return
    }
    uploadFiles(files)
    if (fileInputRef.current) {
        fileInputRef.current.value = ''
    }
  }
  //上传事件
  const uploadFiles = (files:FileList) =>{
      let postFiles = Array.from(files)
      postFiles.forEach(file => {
          const formData = new FormData()
          formData.append(file.name,file)
          axios.post('https://jsonplaceholder.typicode.com/posts/',{
            headers:{
                'Content-type':'multipart/form-data'
            },
            onUploadProgress: (e:any) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    onProgress && onProgress(percentage,file)
                }
            }
          }).then(res => {
              console.log(res)
              onSuccess && onSuccess(res.data,file)
          }).catch(err => {
              console.log(err)
              onError && onError(err,file)
          })
      })
  }
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
