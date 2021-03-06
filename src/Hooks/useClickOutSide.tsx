/*
 * @Author: shanzhilin
 * @Date: 2021-12-05 22:29:44
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-05 23:03:52
 */
import {RefObject,useEffect} from "react"

function useClickOutSide(ref:RefObject<HTMLElement>,handler:Function) {
    useEffect(() => {
        const listener = (event:MouseEvent) =>{
            // 当点击的区域不存在或者点击对象为当前组件区域时取消执行 handler事件
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {return};
            handler(event)
        }
        // 为 body 添加点击事件监听函数
        document.addEventListener('click',listener);
        return () =>{
            document.removeEventListener('click',listener)
        }
    }, [ref,handler])
}

export default useClickOutSide;