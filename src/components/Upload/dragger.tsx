import React, {useState,DragEvent} from 'react';
import classNames from 'classnames'
export interface DraggerProps {
    onFile?:(files:FileList) => void;
}

export const Dragger: React.FC<DraggerProps> = (props) => {
    const {children,onFile} = props
    const [dragOver,setDragOver] = useState(false) //文件是否拖进上传框
    const classes = classNames('upload-dragger',{
        'is-dragover':dragOver
    })
    const handleDrag = (e: DragEvent<HTMLElement>,over:boolean) => {
        // 禁止默认行为
        e.preventDefault()
        setDragOver(over)
    }
    
    return(
        <div
            className={classes}
            onDragOver={(e) => {handleDrag(e,true)}}
            onDragLeave={(e) => {handleDrag(e,false)}}
        >{children}</div>
    )
}

export default Dragger;