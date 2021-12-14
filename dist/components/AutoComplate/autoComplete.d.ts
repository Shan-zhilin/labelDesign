import React, { ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value?: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 用户输入时更新匹配列表 方法*/
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType>;
    /** 选择某一item 触发事件*/
    onSelect?: (item: DataSourceType) => void;
    /** 用户自定义模板*/
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
