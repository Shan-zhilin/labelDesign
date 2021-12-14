import React from "react";
export interface UploadProps {
    /** 上传地址*/
    action: string;
    /** 默认上传文件*/
    defaultUploadList?: UploadFile[];
    /** 用户自定义headers*/
    headers?: {
        [key: string]: any;
    };
    /** 用户自定义文件名*/
    name?: string;
    /** 用户自定义上传文件 formData*/
    data?: {
        [key: string]: any;
    };
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
export declare type UploadFileStaus = "ready" | "uploading" | "success" | "error";
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
export declare const Upload: React.FC<UploadProps>;
export default Upload;
