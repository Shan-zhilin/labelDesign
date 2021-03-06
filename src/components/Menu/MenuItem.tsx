/*
 * @Author: shanzhilin
 * @Date: 2021-11-01 22:48:53
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-16 22:46:20
 */
import React,{useContext} from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export interface MenuItemProps {
    index?:string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties
}

const MenuItem:React.FC<MenuItemProps> = (props) =>{
    const {index,disabled,className,style,children} = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item',className,{
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handelClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return(
        <li className={classes} style={style} onClick={handelClick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem'

export default MenuItem