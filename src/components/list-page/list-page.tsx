import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <Input
          placeholder="Введите значение"
          maxLength={4}
          type="text"
          extraClass={styles.input}
          isLimitText={true}
          onChange={() => setDisabled(false)}
        />
        <Button text="Добавить в head" disabled={disabled} />        
        <Button text="Добавить в tail" disabled={disabled} />
        <Button text="Удалить из head" disabled={disabled} />
        <Button text="Удалить из tail" disabled={disabled} />
      </form>
      <form className={`${styles.form} ${styles.form_bottom}`}>
        <Input
          placeholder="Введите индекс"

          // maxLength={4}
          // type="text"
          type="number"
          extraClass={styles.input}
          // isLimitText={true}
          onChange={() => setDisabled(false)}
        />
        <Button text="Добавить по индексу" extraClass={styles.button} />        
        <Button text="Удалить по индексу" extraClass={styles.button} />
      </form>
      <div className={styles.circles}>
        <Circle letter={"0"} index={0} head={"head"} />
        <ArrowIcon />
        <Circle letter={"34"} index={1} />
        <ArrowIcon />
        <Circle letter={"8"} index={2} />
        <ArrowIcon />
        <Circle letter={"1"} index={3} tail={"tail"} />
      </div>
    </SolutionLayout>
  );
};
