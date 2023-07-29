import { FC, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: FC = () => {
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);

  // Рекурсия
  const fib = (n: number): number => {
    if (n <= 2) {
     return 1;
   }
   return fib(n - 1) + fib(n - 2);
}

console.log(fib(6))

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoader(true);
}

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите число"
          type="number"
          maxLength={19}
          max={19}
          isLimitText={true}
          onChange={() => setDisabled(false)}
        />
        <Button
        text="Расчитать"
        type="submit"
        isLoader={loader}
        disabled={disabled}
        />
      </form>
      <div className={styles.circles}>
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />

        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </div>
    </SolutionLayout>
  );
};
