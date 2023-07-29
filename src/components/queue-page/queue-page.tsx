import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <Input
          placeholder="Введите значение"
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
        <Circle head={"head"} tail={"tail"} letter={"1"} index={0} />
        <Circle letter={"2"} index={1} />
        <Circle letter={"3"} index={2} />
        <Circle letter={"4"} index={3} />
        <Circle letter={"2"} index={4} />
        <Circle letter={"3"} index={5} />
        <Circle letter={"4"} index={6} />
      </div>
    </SolutionLayout>
  );
};
