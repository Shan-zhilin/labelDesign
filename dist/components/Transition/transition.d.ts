import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
export declare type TransitionProp = CSSTransitionProps & {
    animation?: 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';
    wrapper?: boolean;
};
declare const Transition: React.FC<TransitionProp>;
export default Transition;
