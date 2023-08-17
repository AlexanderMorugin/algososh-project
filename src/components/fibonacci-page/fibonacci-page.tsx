import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fibIterative } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const { values, setValues, handleChange } = useForm({
    fibonacci: "" as string,
  });

  const fibonacciRef = React.useRef<Array<number>>([]);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const showCircles = () => {
    if (!fibonacciRef.current) {
      setIsLoading(false);
      return;
    }
    timerRef.current = setInterval(() => {
      setNumber((prev) => {
        const next = prev + 1;

        if (timerRef.current && next >= fibonacciRef.current.length) {
          setIsLoading(false);
          clearInterval(timerRef.current);
        }

        return next;
      });
    }, SHORT_DELAY_IN_MS);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.fibonacci) {
      return null;
    }
    fibonacciRef.current = fibIterative(Number(values.fibonacci))!;
    setIsLoading(true);
    setNumber(0);
    showCircles();
    setValues({ fibonacci: "" });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите число"
          type="number"
          name="fibonacci"
          value={values.fibonacci}
          isLimitText={true}
          max={19}
          onChange={handleChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoading}
          disabled={!values.fibonacci || Number(values.fibonacci) > 19}
        />
      </form>
      {fibonacciRef.current && (
        <ul className={styles.circles}>
          {fibonacciRef.current.slice(0, number).map((item, index) => {
            return (
              <li className={styles.circle} key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
