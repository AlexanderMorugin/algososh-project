import { FC, useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";

export const StringComponent: FC = () => {
  const [disabled, setDisabled] = useState(true);

  let array: any = ["h", "e", "l", "l", "o"];
  let count = 0;

  // алгоритм линейного поиска в массиве
  const linearSearch = (array: Array<string>, item: string) => {    
    for (let i = 0; i <= array.length; i++) {
      count += 1;

      if (array[i] === item) {
        return i;
      }
    }
    return null;
  }

  console.log(linearSearch(array, "o"))
  console.log(count)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabled(false)

    // const { value, name } = e.target;
    // setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите текст"
          maxLength={11}
          type="text"
          // value={value}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button text="Развернуть" type="submit" disabled={disabled} />
      </form>
      <div className={styles.circles}>
        <Circle />
        <Circle />
        <Circle />
      </div>
    </SolutionLayout>
  );
};
