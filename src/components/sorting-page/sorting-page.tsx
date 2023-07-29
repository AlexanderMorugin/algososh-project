import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <RadioInput label="Выбор" />
        <RadioInput label="Пузырек" extraClass={styles.radioInput} />
        <Button sorting={Direction.Ascending} text="По возрастанию" extraClass={`${styles.button} ${styles.buttonFirst}`} />
        <Button sorting={Direction.Descending} text="По убыванию" extraClass={styles.button} />
        <Button text="Новый массив" extraClass={`${styles.button} ${styles.buttonLast}`} />
      </div>
      <ul className={styles.columns}>
        <Column index={2} />
        <Column index={34} />
        <Column index={17} />
        <Column index={100} />
        <Column index={50} />
      </ul>
    </SolutionLayout>
  );
};
