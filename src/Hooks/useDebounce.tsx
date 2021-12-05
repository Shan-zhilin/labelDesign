import { useState,useEffect } from "react";
function useDebounce(value:any,delay=300) {
    const [debounceValue,setDebounceValue] = useState(value)
    useEffect(() =>{
        // 防抖函数 开启一个定时器，指定时间内修改值则重新开启定时器
        const handler = window.setTimeout(function(){
            setDebounceValue(value)
        },delay)
        return () =>{
            clearTimeout(handler as unknown as NodeJS.Timeout)
        }
    },[value,delay])
    return debounceValue
}

export default useDebounce