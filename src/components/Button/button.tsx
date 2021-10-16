/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 16:13:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-10-15 22:46:47
 */
import React, { CSSProperties } from "react";
import classNames from "classnames";

// 枚举类型 定义btnSize
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Success = "success",
  Info = 'info',
  Warning = 'warning',
  Link = "link",
  Danger = "danger",
  Disabled = "disabled",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

// &交叉类型 将两种类型合成一个公共的类型，区别于 | 联合类型 将button按钮的属性统一添加到属性里面
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// ts 映射类型 Partial将传入得类型属性统一变成可选的 因为a连接和button按钮拥有不一样的属性类型，所以需要将合并的类型属性设为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, href, children, style,...restProps } = props;
  // 类名
  const classes = classNames("btn",className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
};

export default Button;
