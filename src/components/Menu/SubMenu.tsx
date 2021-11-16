import React,{useContext,useState} from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import {MenuItemProps} from './MenuItem'

export interface  SubMenuProps {
    index?:string;
    className?: string
    title:string
}

const SubMenu: React.FC<SubMenuProps>= (props) => { 
    const {index,title,className,children} = props
    const context = useContext(MenuContext)
    const opendSubmenu = context.defaultOpenSubmenus as Array<string>
    const isOpen = (context.mode === 'vertical' && index) ? opendSubmenu.includes(index):false
    const [menuOpen,setMenuOpen] = useState(isOpen)
    const hadleClick = (e:React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    // 防抖
    let timer:any
    const handleHover = (e:React.MouseEvent,toggle:boolean) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        },300)
    }
    // 横向菜单时，移入展示菜单
    const hoverEvent = context.mode === 'horizontal' ? {
        onMouseEnter: (e:React.MouseEvent) => {
            handleHover(e,true)
        },
        onMouseLeave: (e:React.MouseEvent) => {
            handleHover(e,false)
        }
    }:{}
    const clickEvent = context.mode !== 'horizontal'?{
        onClick: (e:React.MouseEvent) => {
            hadleClick(e)
        }
    }:{}
    const classes = classNames('menu-item submenu-item',className,{
        'is-active':index === context.index,
    })
    const subMenuClasses = classNames('submenu',{
        'submenu-open': menuOpen
    })
    const renderChildren = () => {
        const childrenElement = React.Children.map(children,(child,i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement,{
                    index: `${index}-${i}`
                })
            }else {
                console.error('Warning: SubMenu has a child which is not a MenuItem Componetn')
            }
        })
        return(
            <ul className={subMenuClasses}>{childrenElement}</ul>
        )
    }
    return(
        <li key={index} className={classes} {...hoverEvent}>
            <div className='submenu-title' {...clickEvent}>{title}</div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = "SubMenu"

export default SubMenu