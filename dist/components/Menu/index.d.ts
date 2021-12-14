import { FC } from 'react';
import { MenuProps } from './Menu';
import { MenuItemProps } from './MenuItem';
import { SubMenuProps } from './SubMenu';
export declare type ImenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: ImenuComponent;
export default TransMenu;
