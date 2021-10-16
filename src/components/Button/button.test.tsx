import React from "react";
import { render, screen } from "@testing-library/react";
import Button, { ButtonType } from "./button";

describe("test button component", () => {
  it("should render the corrent component based on different props", () => {
    render(
      <Button data-testid="button-success" btnType={ButtonType.Success}>
        Success
      </Button>
    );
    const element = screen.getByTestId("button-success");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass('btn btn-success')
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType={ButtonType.Link} data-testid="button-link">
        禁用连接
      </Button>
    );
    const element = screen.getByTestId("button-link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
  });

  it("should render button with disabled", () => {
    render(
      <Button btnType={ButtonType.Primary} data-testid="button-disabled" disabled>
        Disabled
      </Button>
    );
    const element = screen.getByTestId('button-disabled')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON");
  });
});
