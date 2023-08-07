import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { useForm } from "../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QueueClass } from "./queue-class";

export const QueuePage: React.FC = () => {
  const queueClass = new QueueClass<string>(7);

  const [queueArray, setQueueArray] = React.useState<Array<string>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { values, setValues, handleChange } = useForm({ queueArray: "" });
  const [currentIndex, setCurrenrIndex] = React.useState(-1);

  React.useEffect(() => {
    setQueueArray(queueClass.add().fill(""));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setIsLoading(true);
    queueClass.enqueue(values.queueArray);
    setQueueArray([...queueClass.add()]);
    setValues({ ...values, queueArray: "" });
  };

  const resetQueueArray = () => {
    setIsLoading(true);
    queueClass.reset();
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите значение"
          type="text"
          name="queueArray"
          value={values.queueArray}
          maxLength={4}
          max={4}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          type="button"
          disabled={!values.queueArray}
          onClick={handleAdd}
        />

        <Button text="Удалить" disabled={!values.queueArray} />

        <Button
          text="Очистить"
          type="button"
          extraClass={styles.cancel}
          // disabled={true}
          disabled={queueClass.empty()}
          onClick={resetQueueArray}
        />
      </form>
      <ul className={styles.circles}>
        {queueArray.map((item, index) => (
          <li key={index}>
            <Circle
              // head={"head"}
              // tail={"tail"}
              letter={item}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
