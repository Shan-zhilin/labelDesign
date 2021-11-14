import React,{useContext} from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import {MenuItemProps} from './MenuItem'

export interface  SubMenuProps {
    index?:number;
    className?: string
    title:string
}

const SubMenu: React.FC<SubMenuProps>= (props) => {
    const {index,title,className,children} = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item submenu-item',className,{
        'is-active':index === context.index,
    })
    const renderChildren = () => {
        const childrenElement = React.Children.map(children,(child,index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement
            }else {
                console.error('Warning: SubMenu has a child which is not a MenuItem Componetn')
            }
        })
        return(
            <ul className='submenu'>{childrenElement}</ul>
        )
    }
    return(
        <li key={index} className={classes}>
            <div className='submenu-title'>{title}</div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = "SubMenu"

export default SubMenu