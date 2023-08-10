import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { useForm } from "../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QueueClass } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils";
import { HEAD, TAIL } from "../../constants/element-captions";

const queueClass = new QueueClass<string>(7);

export const QueuePage: React.FC = () => {
  const [queueArray, setQueueArray] = React.useState<Array<string>>([]);
  const [isLoading, setIsLoading] = React.useState({
    add: false,
    delete: false,
    clear: false,
  });
  const { values, setValues, handleChange } = useForm({ queue: "" });
  const [elementIndex, setElementIndex] = React.useState(-1);

  React.useEffect(() => {
    setQueueArray([...queueClass.getElements().fill("")]);
  }, []);

  const handleAdd = async () => {
    setIsLoading({ ...isLoading, add: true });
    setElementIndex(queueClass.getTail());
    await setDelay(SHORT_DELAY_IN_MS);
    queueClass.enqueue(values.queue);
    setQueueArray([...queueClass.getElements()]);
    setElementIndex(-1);
    setValues({ ...values, queue: "" });
    setIsLoading({ ...isLoading, add: false });
  };

  const handleDelete = async () => {
    setIsLoading({ ...isLoading, delete: true });
    setElementIndex(queueClass.getHead());
    await setDelay(SHORT_DELAY_IN_MS);
    queueClass.dequeue();
    setQueueArray([...queueClass.getElements()]);
    setElementIndex(-1);
    setIsLoading({ ...isLoading, delete: false });
  };

  const handleClear = async () => {
    setIsLoading({ ...isLoading, clear: true });
    await setDelay(SHORT_DELAY_IN_MS);
    queueClass.clear();
    setQueueArray([...queueClass.getElements()]);
    setIsLoading({ ...isLoading, clear: false });
  };

  const headIndex = (index: number) => {
    return index === queueClass.getHead() && !queueClass.getEmpty() ? HEAD : "";
  };

  const tailIndex = (index: number) => {
    return index === queueClass.getLastIndex() && !queueClass.getEmpty()
      ? TAIL
      : "";
  };

  return (
    <SolutionLayout title="Очередь">
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <Input
          placeholder="Введите значение"
          type="text"
          name="queue"
          value={values.queue}
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          type="submit"
          onClick={handleAdd}
          isLoader={isLoading.add}
          disabled={!values.queue}
        />
        <Button
          text="Удалить"
          onClick={handleDelete}
          isLoader={isLoading.delete}
          disabled={isLoading.add || queueClass.getEmpty()}
        />
        <Button
          extraClass={styles.cancel}
          text="Очистить"
          onClick={handleClear}
          isLoader={isLoading.clear}
          disabled={queueClass.getEmpty()}
        />
      </form>
      <ul className={styles.circles}>
        {queueArray.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item}
              index={index}
              state={
                index === elementIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={headIndex(index) ? HEAD : ""}
              tail={tailIndex(index) ? TAIL : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
