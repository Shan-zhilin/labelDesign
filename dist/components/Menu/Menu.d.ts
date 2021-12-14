import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
    /**默认选中*/
    defaultIndex?: string;
    /**自定义类名 */
    className?: string;
    /**Menu展示方向*/
    mode?: MenuMode;
    /**自定义样式*/
    style?: React.CSSProperties;
    /**选择切换事件*/
    onSelect?: SelectCallback;
    /**下拉菜单默认展开*/
    defaultOpenSubmenus?: string[];
}
interface ImenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenus?: string[];
}
export declare const MenuContext: React.Context<ImenuContext>;
/**
 *> ## **引用方式**
 * **import Menu from 'labelDesign'**
 *
*/
export declare const Menu: React.FC<MenuProps>;
export default Menu;
