import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input
          placeholder="Введите текст"
          maxLength={4}
          // max={11}
          type="text"
          isLimitText={true}
          onChange={() => setDisabled(false)}
        />
        <Button text="Добавить" disabled={disabled} />
        <Button text="Удалить" disabled={disabled} />
        <Button
          text="Очистить"
          extraClass={styles.cancel}
          disabled={disabled}
        />
      </form>
      <div className={styles.circles}>
        <Circle head={"top"} letter={"1"} index={0} />
        <Circle head={"top"} letter={"2"} index={0} />
        <Circle head={"top"} letter={"3"} index={0} />
        <Circle head={"top"} letter={"4"} index={0} />
      </div>
    </SolutionLayout>
  );
};
