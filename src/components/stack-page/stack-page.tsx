import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { useForm } from "../hooks/useForm";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = React.useState<Array<string>>([]);
  const [isLoading, setIsLoading] = React.useState({
    add: false,
    delete: false,
    clear: false,
  });
  const { values, setValues, handleChange } = useForm({ stack: "" });
  const [bottomIndex, setBottomIndex] = React.useState(-1);

  const stackRef = React.useRef(new Stack());

  const handleAdd = async () => {
    setIsLoading({ ...isLoading, add: true });
    setValues({ stack: "" });
    stackRef.current.push(values.stack);
    showCircles();
    setBottomIndex(stackRef.current.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setBottomIndex(-1);
    setIsLoading({ ...isLoading, add: false });
  };

  const handleDelete = async () => {
    setIsLoading({ ...isLoading, delete: true });
    setBottomIndex(stackRef.current.index);
    stackRef.current.pop();
    await setDelay(SHORT_DELAY_IN_MS);
    setBottomIndex(-1);
    setIsLoading({ ...isLoading, delete: false });
    showCircles();
  };

  const handleClear = async () => {
    await setDelay(SHORT_DELAY_IN_MS);
    setValues({ stack: "" });
    stackRef.current.clear();
    showCircles();
  };

  const showCircles = () => {
    const stack = stackRef.current.array();
    setStackArray(stack.length > 0 ? stack.map((item) => String(item)) : []);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input
          placeholder="Введите текст"
          type="text"
          name="stack"
          value={values.stack}
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          type="submit"
          disabled={!values.stack || isLoading.delete}
          onClick={handleAdd}
          isLoader={isLoading.add}
        />
        <Button
          text="Удалить"
          disabled={stackArray.length === 0 || isLoading.add}
          onClick={handleDelete}
          isLoader={isLoading.delete}
        />
        <Button
          extraClass={styles.reset}
          text="Очистить"
          disabled={!stackArray.length}
          onClick={handleClear}
        />
      </form>
      <ul className={styles.circles}>
        {stackArray.map((item, index) => {
          return (
            <li className={styles.circle} key={index}>
              <Circle
                index={index}
                letter={item}
                head={index === stackArray!.length - 1 ? "top" : undefined}
                state={
                  index === bottomIndex
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
