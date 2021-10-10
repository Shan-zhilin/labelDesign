/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 16:13:51
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-10-10 23:51:25
 */
import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Link = "link",
  Disabled = "disabled",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { className, disabled, size, btnType, href, children } = props;
  // 类名
  const classes = classNames("btn", {
    className,
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
    disabled:false,
    btnType:ButtonType.Default
}

export default Button;