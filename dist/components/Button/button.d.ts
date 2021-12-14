import React, { CSSProperties, FC } from "react";
export declare type ButtonSize = "lg" | "sm";
export declare type ButtonType = "primary" | "default" | "success" | 'info' | 'warning' | "link" | "danger" | "disabled";
interface BaseButtonProps {
    /** 自定义类名 */
    className?: string;
    /** 禁用属性 */
    disabled?: boolean;
    /** 按钮尺寸 */
    size?: ButtonSize;
    /** 按钮类型 */
    btnType?: ButtonType;
    /** 链接按钮 href 属性 */
    href?: string;
    /** 按钮子元素 */
    children: React.ReactNode;
    /** 自定义样式 */
    style?: CSSProperties;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 *> ## **引用方式**
 * **import Button from 'labelDesign'**
 *
*/
export declare const Button: FC<ButtonProps>;
export default Button;
