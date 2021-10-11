/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 16:13:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-10-11 23:40:10
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

const Button: React.FC<BaseButtonProps> = (props) => {
  const { className, disabled, size, btnType, href, children, style } = props;
  // 类名
  const classes = classNames("btn",className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} style={style}>
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
