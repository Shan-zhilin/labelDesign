/*
 * @Author: shanzhilin
 * @Date: 2021-11-26 23:49:22
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-04 16:30:17
 */
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light'

export interface IconProps extends FontAwesomeIconProps {
    /** icon 样式*/ 
    theme?: ThemeProps
}

/**
 *> ## **引用方式**
 * **import Icon from 'labelDesign'**
 * >
 * > ## **图标库**
 * **这里引用 FontaweSome 组件库
 * [FontaweSome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)
 * >
 * > ## **基本用法**
```js
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon={faCoffee} />
```    
*/
export const Icon:React.FC<IconProps>=(props) => {
    const {className,theme,...restProps} = props
    const classes = classNames('icon',className,{
        [`icon-${theme}`]: theme
    })

    return(
        <FontAwesomeIcon className={classes} {...restProps}/>
    )

}

export default Icon