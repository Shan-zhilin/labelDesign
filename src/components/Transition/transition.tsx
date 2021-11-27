/*
 * @Author: shanzhilin
 * @Date: 2021-11-27 15:47:28
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-27 22:00:13
 */
import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

//使用交叉类型 将两个类型合并成一个新的类型
export type TransitionProp = CSSTransitionProps & {
  animation?: 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom',
  wrapper?: boolean  // wrapper 的作用是防止外层的元素拥有transition，那么外层的transition 会覆盖本层的同名 transition 属性，那么当外面包裹一层之后transition不会被继承到内部元素，则效果就会显现
}
const Transition: React.FC<TransitionProp> = (props) => {
  const { children, classNames, animation,wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames?classNames:animation}
      {...restProps}
    >
      {wrapper? <div>{children}</div>:children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
    unmountOnExit:true,
    appear:true
}

export default Transition;
