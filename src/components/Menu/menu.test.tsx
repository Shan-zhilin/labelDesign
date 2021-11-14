/*
 * @Author: shanzhilin
 * @Date: 2021-11-05 20:27:28
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-11-10 23:24:00
 */
import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import Menu, { MenuProps } from "./Menu";
import MenuItem from "./MenuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElemnt: HTMLElement,
  disabledElemnt: HTMLElement;
describe("test menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElemnt = wrapper.getByText("active");
    disabledElemnt = wrapper.getByText("disabled");
  });
  // 一个 it 就相当于是一个case
  it("shoulde render current menu and menu-item based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    // 测试claseename
    expect(menuElement).toHaveClass("menu test");
    // 测试内部元素是否正确
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    // 测试激活的选项类名是否正确
    expect(activeElemnt).toHaveClass("menu-item is-active");
    // 测试禁用类型
    expect(disabledElemnt).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const clickItem = wrapper.getByText("xyz");
    fireEvent.click(clickItem);
    // 点击之后该元素拥有is-active class 原始的 activeElement将失去is-active属性
    expect(clickItem).toHaveClass("menu-item is-active");
    expect(activeElemnt).not.toHaveClass("menu-item is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElemnt);
    expect(disabledElemnt).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it("shuld render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical")
  });
});
