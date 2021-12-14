import { ReactElement, InputHTMLAttributes, CSSProperties, FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    /** 是否禁用 */
    disabled?: boolean;
    /**Input大小 lg 或者 sm*/
    size?: InputSize;
    /**输入框右侧悬浮图标*/
    icon?: IconProp;
    /**前缀*/
    prepand?: string | ReactElement;
    /**后缀*/
    append?: string | ReactElement;
    /**自定义样式*/
    style?: CSSProperties;
}
/**
 *> ## **引用方式**
 * **import Input from 'labelDesign'**
 *
*/
export declare const Input: FC<InputProps>;
export default Input;
