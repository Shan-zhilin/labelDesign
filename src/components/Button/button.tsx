/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 16:13:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-27 17:07:26
 */
import React, { CSSProperties,FC } from "react";
import classNames from "classnames";

// 枚举类型 定义btnSize
export type ButtonSize = "lg" | "sm"

export type ButtonType = 
  "primary"|
  "default"|
  "success"|
  'info' |
  'warning' |
 "link"|
 "danger"|
 "disabled"

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

// &交叉类型 将两种类型合成一个公共的类型，区别于 | 联合类型 将button按钮的属性统一添加到属性里面
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// ts 映射类型 Partial将传入得类型属性统一变成可选的 因为a连接和button按钮拥有不一样的属性类型，所以需要将合并的类型属性设为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, href, children, style,...restProps } = props;
  // 类名
  const classes = classNames("btn",className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} style={style} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} style={style} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
