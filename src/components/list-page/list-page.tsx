import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../hooks/useForm";
import { setDelay } from "../../utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { IArray, IListNode, setLinkedList } from "./utils";
import { linkedListClass } from "./list-class";
import { HEAD, TAIL } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const linkedListSize = linkedListClass.getSize();

  const [listArray, setListArray] = React.useState<IListNode<IArray>[]>([]);
  const { values, handleChange, setValues } = useForm({
    listValue: "",
    listIndex: "",
  });
  const [isLoading, setIsLoading] = React.useState({
    addHead: false,
    addTail: false,
    addIndex: false,
    deleteHead: false,
    deleteTail: false,
    deleteIndex: false,
    loading: false,
  });
  const [currentElement, setCurrentElement] = React.useState("");
  const [elementIndex, setElementIndex] = React.useState(-1);
  const [smallCircle, setSmallCircle] = React.useState(false);
  const [changeIndex, setChangeIndex] = React.useState(-1);
  const [modIndex, setModIndex] = React.useState(-1);

  React.useEffect(() => {
    setLinkedList();
    setListArray(linkedListClass.getElements());
  }, []);

  const handleAddHead = async () => {
    setIsLoading({ ...isLoading, loading: true, addHead: true });
    const newNode = { value: values.listValue, state: ElementStates.Default };
    linkedListClass.prepend(newNode);
    setElementIndex(0);
    setSmallCircle(true);
    setCurrentElement(values.listValue);
    await setDelay(DELAY_IN_MS);
    setCurrentElement("");
    setSmallCircle(false);
    setValues({ listValue: "", listIndex: "" });
    setElementIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setModIndex(0);
    await setDelay(DELAY_IN_MS);
    setModIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setIsLoading({ ...isLoading, loading: false, addHead: false });
  };

  const handleAddTail = async () => {
    setIsLoading({ ...isLoading, loading: true, addTail: true });
    const newNode = { value: values.listValue, state: ElementStates.Default };
    linkedListClass.append(newNode);
    setElementIndex(linkedListSize - 1);
    setCurrentElement(values.listValue);
    await setDelay(DELAY_IN_MS);
    setCurrentElement("");
    setValues({ listValue: "", listIndex: "" });
    setElementIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setModIndex(linkedListSize);
    await setDelay(DELAY_IN_MS);
    setModIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setIsLoading({ ...isLoading, loading: false, addTail: false });
  };

  const handleDeleteHead = async () => {
    setIsLoading({ ...isLoading, loading: true, deleteHead: true });
    setCurrentElement(listArray[0].listValue.value);
    linkedListClass.getFirstNode()!.listValue.value = "";
    linkedListClass.deleteHead();
    setElementIndex(0);
    setSmallCircle(true);
    await setDelay(DELAY_IN_MS);
    setElementIndex(-1);
    setSmallCircle(false);
    setCurrentElement("");
    setListArray([...linkedListClass.getElements()]);
    setIsLoading({ ...isLoading, loading: false, deleteHead: false });
  };

  const handleDeleteTail = async () => {
    setIsLoading({ ...isLoading, loading: true, deleteTail: true });
    setCurrentElement(listArray[listArray.length - 1].listValue.value);
    linkedListClass.getLastNode()!.listValue.value = "";
    linkedListClass.deleteTail();
    setElementIndex(linkedListSize - 1);
    await setDelay(DELAY_IN_MS);
    setElementIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setIsLoading({ ...isLoading, loading: false, deleteTail: false });
  };

  const handleAddIndex = async () => {
    setIsLoading({ ...isLoading, loading: true, addIndex: true });
    setSmallCircle(true);
    setCurrentElement(values.listValue);
    let start = 0;
    while (start <= Number(values.listIndex)) {
      setChangeIndex(start);
      setElementIndex(start);
      await setDelay(DELAY_IN_MS);
      start++;
    }
    setElementIndex(Number(values.listIndex));
    const newNode = {
      value: values.listValue,
      index: values.listIndex,
      state: ElementStates.Default,
    };
    linkedListClass.addIndex(newNode, Number(newNode.index));
    setValues({ listValue: "", listIndex: "" });
    setElementIndex(-1);
    setCurrentElement("");
    setChangeIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setModIndex(Number(values.listIndex));
    await setDelay(DELAY_IN_MS);
    setModIndex(-1);
    setChangeIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setSmallCircle(false);
    setIsLoading({ ...isLoading, loading: false, addIndex: false });
  };

  const handleDeleteIndex = async () => {
    setIsLoading({ ...isLoading, loading: true, deleteIndex: true });
    let start = 0;
    while (start <= Number(values.listIndex)) {
      setChangeIndex(start);
      await setDelay(DELAY_IN_MS);
      start++;
    }
    setElementIndex(Number(values.listIndex));
    setCurrentElement(listArray[Number(values.listIndex)].listValue.value);
    linkedListClass.getNodeIndex(Number(values.listIndex))!.listValue.value = "";
    linkedListClass.deleteIndex(Number(values.listIndex));
    setValues({ listValue: "", listIndex: "" });
    await setDelay(DELAY_IN_MS);
    setChangeIndex(-1);
    setElementIndex(-1);
    setListArray([...linkedListClass.getElements()]);
    setIsLoading({ ...isLoading, loading: false, deleteIndex: false });
  };

  const getHead = (index: number) => {
    return elementIndex === index && smallCircle === true ? (
      <div className={styles.item}>
        <Circle
          isSmall={true}
          letter={currentElement}
          state={ElementStates.Changing}
        />
      </div>
    ) : index === 0 ? (
      HEAD
    ) : undefined;
  };

  const getTail = (index: number) => {
    return elementIndex === index && smallCircle === false ? (
      <div className={styles.item}>
        <Circle
          isSmall={true}
          letter={currentElement}
          state={ElementStates.Changing}
        />
      </div>
    ) : index === listArray.length - 1 ? (
      TAIL
    ) : undefined;
  };

  return (
    <SolutionLayout title="Связный список">
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <Input
          extraClass={styles.input}
          placeholder="Введите значение"
          type="text"
          name="listValue"
          value={values.listValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.buttonTop}
          text="Добавить в head"
          id="addHead"
          type="submit"
          onClick={handleAddHead}
          isLoader={isLoading.addHead}
          disabled={!values.listValue || isLoading.loading}
        />
        <Button
          extraClass={styles.buttonTop}
          text="Добавить в tail"
          id="addTail"
          onClick={handleAddTail}
          isLoader={isLoading.addTail}
          disabled={!values.listValue || isLoading.loading}
        />
        <Button
          extraClass={styles.buttonTop}
          text="Удалить из head"
          id="deleteHead"
          onClick={handleDeleteHead}
          isLoader={isLoading.deleteHead}
          disabled={listArray.length === 0 || isLoading.loading}
        />
        <Button
          extraClass={styles.buttonTop}
          text="Удалить из tail"
          id="deleteTail"
          onClick={handleDeleteTail}
          isLoader={isLoading.deleteTail}
          disabled={listArray.length === 0 || isLoading.loading}
        />
      </form>
      <form
        className={`${styles.form} ${styles.form_bottom}`}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          type="number"
          name="listIndex"
          value={values.listIndex}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.buttonBottom}
          text="Добавить по индексу"
          id="addIndex"
          type="submit"
          onClick={handleAddIndex}
          isLoader={isLoading.addIndex}
          disabled={!values.listIndex || isLoading.loading || Number(values.listIndex) > listArray.length - 1}
        />
        <Button
          extraClass={styles.buttonBottom}
          text="Удалить по индексу"
          id="deleteIndex"
          onClick={handleDeleteIndex}
          isLoader={isLoading.deleteIndex}
          disabled={!values.listIndex || isLoading.loading || Number(values.listIndex) > listArray.length - 1}
        />
      </form>
      <ul className={styles.circles}>
        {listArray.map((item, index) => {
          return (
            <li className={styles.circle} key={index}>
              <Circle
                letter={item.listValue.value}
                index={index}
                head={getHead(index)}
                tail={getTail(index)}
                state={
                  index === changeIndex
                    ? ElementStates.Changing
                    : index === modIndex
                    ? ElementStates.Modified
                    : ElementStates.Default
                }
              />
              {index !== listArray.length - 1 && (
                <div className={styles.arrow}>
                  <ArrowIcon />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
