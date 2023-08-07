import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ISort, ArrayData, sorting } from "./utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<ISort[]>([]);
  const [sortType, setSortType] = React.useState<"bubble" | "selection">("selection");
  const [isLoading, setIsLoading] = React.useState<Direction | null>(null);

  React.useEffect(() => {
    randomArr();
  }, []);

  const randomArr = (e?: React.FormEvent<HTMLButtonElement>) => {
    e?.preventDefault();    
    const length = Math.random() * (ArrayData.maxLength - ArrayData.minLength) + ArrayData.minLength;
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push({
        value: Math.floor(Math.random() * (ArrayData.maxValue - ArrayData.minValue) + ArrayData.minValue),
        state: ElementStates.Default,
      });
    }
    setArray(newArray);
  };

  const bubbleSort = async (direction: Direction) => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        newArray[j].state = ElementStates.Changing;
        newArray[j + 1].state = ElementStates.Changing;
        await setDelay(DELAY_IN_MS);
        setArray([...newArray]);
        if (
          direction === Direction.Descending
            ? newArray[j].value < newArray[j + 1].value
            : newArray[j].value > newArray[j + 1].value
        ) {
          setArray(sorting(newArray, j, j + 1).slice(0));
        }
        newArray[j].state = ElementStates.Default;
      }
      newArray[newArray.length - i - 1].state = ElementStates.Modified;
      setArray([...newArray]);
    }
    setIsLoading(null);
  };

  const selectionSort = async (direction: Direction) => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length - 1; i++) {
      newArray[i].state = ElementStates.Changing;
      let temp = i;
      for (let j = i + 1; j < newArray.length; j++) {
        newArray[j].state = ElementStates.Changing;
        setArray([...newArray]);
        await setDelay(DELAY_IN_MS);
        if (
          direction === Direction.Descending
            ? newArray[j].value > newArray[temp].value
            : newArray[j].value < newArray[temp].value
        ) {
          temp = j;
        }
        newArray[j].state = ElementStates.Default;
      }
      setArray(sorting(newArray, temp, i).slice(0));
      newArray[i].state = ElementStates.Modified;
    }
    newArray[newArray.length - 1].state = ElementStates.Modified;
    setArray([...newArray]);
    setIsLoading(null);
  };

  const handleSort = (direction: Direction) => {
    setIsLoading(direction);
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].state = ElementStates.Default;
    }
    setArray([...newArray]);
    sortType === "selection" ? selectionSort(direction) : bubbleSort(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label="Выбор"
          name="sort"
          value="selection"
          checked={sortType === "selection"}
          onChange={() => setSortType("selection")}
          disabled={!!isLoading}
        />
        <RadioInput
          label="Пузырёк"
          name="sort"
          value="bubble"
          checked={sortType === "bubble"}
          onChange={() => setSortType("bubble")}
          disabled={!!isLoading}
        />

        <Button
          extraClass={styles.buttonFirst}
          text="По возрастанию"
          sorting={Direction.Ascending}
          isLoader={isLoading === Direction.Ascending}
          onClick={() => handleSort(Direction.Ascending)}          
          disabled={!!isLoading}
        />
        <Button
          extraClass={styles.button}
          text="По убыванию"
          sorting={Direction.Descending}
          isLoader={isLoading === Direction.Descending}
          onClick={() => handleSort(Direction.Descending)}          
          disabled={!!isLoading}
        />
        <Button
          text="Новый массив"
          extraClass={styles.buttonLast}
          onClick={randomArr}
          disabled={!!isLoading}
        />
      </form>
      <ul className={styles.columns}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Column index={item.value} key={index} state={item.state} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
