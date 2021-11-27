import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("test button component", () => {
  it("should render the corrent component based on different props", () => {
    render(
      <Button data-testid="button-type" btnType='info'>
        Success
      </Button>
    );
    const element = screen.getByTestId("button-type");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass('btn btn-info')
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType='link' data-testid="button-link">
        禁用连接
      </Button>
    );
    const element = screen.getByTestId("button-link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
  });

  it("should render button with disabled", () => {
    render(
      <Button btnType='primary' data-testid="button-disabled" disabled>
        Disabled
      </Button>
    );
    const element = screen.getByTestId('button-disabled')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON");
  });
});
