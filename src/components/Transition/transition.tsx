/*
 * @Author: shanzhilin
 * @Date: 2021-11-27 15:47:28
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-27 16:54:47
 */
import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

const Transition: React.FC<CSSTransitionProps> = (props) => {
  const { children, classNames, animation, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames?classNames:animation}
      {...restProps}
    >
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
    unmountOnExit:true,
    appear:true
}

export default Transition;
