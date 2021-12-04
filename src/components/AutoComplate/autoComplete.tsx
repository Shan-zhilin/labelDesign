import React, { useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";

interface DataSourceObject {
  value?: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 用户输入时更新匹配列表 方法*/
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType>;
  /** 选择某一item 触发事件*/
  onSelect?: (item: DataSourceType) => void;
  /** 用户自定义模板*/
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;
  const [inputValue, setInputValue] = useState(value); // 输入框值
  const [suggestions, setSuggestion] = useState<DataSourceType[]>([]); // 匹配列表
  // input change 处理方法   
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      if (result instanceof Promise) {
          result.then(data => {
            // data 断言成数组 因为 Promise传入的是一个DataSourceType类型，返回值无法确定时数组类型，所以需要断言
            const dataArray =  data as Array<DataSourceType>
            setSuggestion(dataArray);
          })
      }else {
        setSuggestion(result);
      }
    } else {
      setSuggestion([]);
    }
  };
  // 选择 具体某一项时的触发方法
  const handelSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestion([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  // 根据传入的方法判断是否为用户自定义渲染模板 
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 匹配列表生成方法
  const generatorList = () => {
    return (
      <ul className="auto-complete-list">
        {suggestions.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handelSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="auto-complete-content">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions && generatorList()}
    </div>
  );
};
