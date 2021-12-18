/*
 * @Author: shanzhilin
 * @Date: 2021-12-04 21:20:31
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-18 23:10:24
 */
import React, {
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import classNames from "classnames";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/icon";
import useDebounce from "../../Hooks/useDebounce";
import useClickOutSide from "../../Hooks/useClickOutSide";
import Transition from "../Transition/transition";

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

/**
 *> ## **引用方式**
 * **import AutoComplete from 'labelDesign'**
 * 
*/
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;
  const [inputValue, setInputValue] = useState(value); // 输入框值
  const [suggestions, setSuggestion] = useState<DataSourceType[]>([]); // 匹配列表
  const [loading, setLoading] = useState(false); //输入时渲染loading;
  const debounceValue = useDebounce(inputValue); // 添加防抖的 inputvalue
  const [highLightedIndex, setHighLightedIndex] = useState(-1); // 高亮显示的 index
  const triggerSearch = useRef(false); // 控制 当使用快捷键 enter选择 item时 会触发一次search
  const componentRef = useRef<HTMLDivElement>(null); // 点击外部区域关闭下拉框
  // input change 处理方法
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true;
    const value = e.target.value.trim();
    setInputValue(value);
  };

  // 选择 具体某一项时的触发方法
  const handelSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
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
      <Transition
        in={suggestions.length > 0}
        classNames="zoom-in-top"
        children={
          <ul className="auto-complete-list">
            {suggestions.map((item, index) => {
              const classes = classNames("auto-complete-item", {
                "is-active": highLightedIndex === index,
              });
              return (
                <li
                  className={classes}
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
        }
        addEndListener={() => {}}
      />
    );
  };

  const hightLigntIndex = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightedIndex(index);
  };
  // 快捷键按下时的触发方法
  const handleKeyDow = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 38:
        hightLigntIndex(highLightedIndex - 1);
        break;
      case 40:
        hightLigntIndex(highLightedIndex + 1);
        break;
      case 27:
        setSuggestion([]);
        setHighLightedIndex(-1);
        break;
      case 13:
        if (suggestions[highLightedIndex]) {
          handelSelect(suggestions[highLightedIndex]);
        }
        break;
      default:
        break;
    }
  };
  // 执行点击外部区域关闭 列表框的 hooks
  useClickOutSide(componentRef, () => {
    setSuggestion([]);
    setHighLightedIndex(-1);
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(debounceValue as string);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setLoading(false);
          // data 断言成数组 因为 Promise传入的是一个DataSourceType类型，返回值无法确定时数组类型，所以需要断言
          const dataArray = data as Array<DataSourceType>;
          setSuggestion(dataArray);
        });
      } else {
        setSuggestion(result);
      }
    } else {
      setSuggestion([]);
    }
    setHighLightedIndex(-1);
  }, [debounceValue]);
  return (
    <div className="auto-complete-content" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDow}
        {...restProps}
      />
      {loading && (
        <div className="suggestion-loading-icon">
          <Icon icon={faSpinner} spin size="2x" />
        </div>
      )}
      {suggestions && generatorList()}
    </div>
  );
};

export default AutoComplete;
