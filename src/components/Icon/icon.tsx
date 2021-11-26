/*
 * @Author: shanzhilin
 * @Date: 2021-11-26 23:49:22
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-26 23:57:45
 */
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon:React.FC<IconProps>=(props) => {
    const {className,theme,...restProps} = props
    const classes = classNames('icon',className,{
        [`icon-${theme}`]: theme
    })

    return(
        <FontAwesomeIcon className={classes} {...restProps}/>
    )

}

export default Icon