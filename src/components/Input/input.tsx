/*
 * @Author: shanzhilin
 * @Date: 2021-12-01 22:36:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-03 00:37:23
 */
import React, { ReactElement, InputHTMLAttributes, CSSProperties,FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
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
export const Input: FC<InputProps> = (props) => {
  // 取出所有属性
  const { disabled, size, icon, prepand, append, style, ...restProps } = props;
  // 计算className
  const classes = classNames("input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepand || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepand,
  });
  const fixControlledValue = (value:any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepand && <div className="input-group-prepend-content">{prepand}</div>}
      {icon && !append && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append-content">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
