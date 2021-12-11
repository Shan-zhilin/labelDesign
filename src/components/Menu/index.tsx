/*
 * @Author: shanzhilin
 * @Date: 2021-12-11 23:25:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-11 23:32:56
 */
import {FC} from 'react'
import Menu, {MenuProps} from './Menu'
import MenuItem, {MenuItemProps} from './MenuItem'
import SubMenu,{SubMenuProps} from './SubMenu'

// 创建一个联合类型 向外暴露出 MenuItem，SubMenu形成 Menu.Item Menu.submenu 形式可以访问使用
export type ImenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as ImenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu