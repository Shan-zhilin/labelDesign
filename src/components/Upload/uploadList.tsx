/*
 * @Author: shanzhilin
 * @Date: 2021-12-09 21:49:39
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-09 21:55:09
 */
import React from "react";
import { faFileAlt,faSpinner,faCheckCircle,faTimesCircle,faTimes } from "@fortawesome/free-solid-svg-icons";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

export interface UploadListProps {
  fileList?: UploadFile[];
  onRemove?: (_file: UploadFile) => void;
}

export const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="upload-list">
      {fileList?.map((item:UploadFile) => {
        return (
          <li key={item.uid} className="upload-list-item">
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon={faFileAlt} theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
                {item.status === 'uploading' && <Icon icon={faSpinner} spin theme="secondary" />}
                {item.status === 'success' && <Icon icon={faCheckCircle} theme="success" />}
                {item.status === 'error' && <Icon icon={faTimesCircle} theme="danger" />}
            </span>
            <span className="file-actions">
                <Icon icon={faTimes} onClick={() =>{onRemove && onRemove(item)}}/>
            </span>
            {
                item.status === 'uploading' && 
                <Progress percent={
                    item.percent || 0
                } />
            }
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
