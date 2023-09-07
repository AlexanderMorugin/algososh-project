import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";
import renderer from "react-test-renderer";

describe("Тестирование компонента Circle", () => {
  test("Компонент Circle без буквы", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с буквами", () => {
    const circle = renderer.create(<Circle letter="Буквы" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с head", () => {
    const circle = renderer.create(<Circle head="Голова" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с react-элементом в head", () => {
    const circle = renderer
      .create(<Circle head={<span>React Element</span>} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с tail", () => {
    const circle = renderer.create(<Circle tail="Хвост" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с react-элементом в tail", () => {
    const circle = renderer
      .create(<Circle tail={<span>React Element</span>} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с index", () => {
    const circle = renderer.create(<Circle index="4" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle с пропом isSmall ===  true", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle в состоянии default", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle в состоянии changing", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  test("Компонент Circle в состоянии modified", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
