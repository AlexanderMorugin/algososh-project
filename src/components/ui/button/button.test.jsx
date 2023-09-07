import { Button } from "./button";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Тестирование компонента Button", () => {
  test("Кнопка без текста", () => {
    const button = renderer.create(<Button text="" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test("Кнопка с текстом", () => {
    const button = renderer.create(<Button text="Кнопка с текстом" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test("Кнопка заблокирована", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test("Кнопка с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test("Проверяем корректность вызова колбека при клике на кнопку", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
