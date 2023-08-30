import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export enum ArrayData {
  minLength = 3,
  maxLength = 17,
  minValue = 0,
  maxValue = 100,
}

export interface ISort {
  value: number;
  state: ElementStates;
}

export const sorting = (array: Array<ISort>, prev: number, next: number): Array<ISort> => {
  let temp = array[prev].value;
  array[prev].value = array[next].value;
  array[next].value = temp;
  return array;
};

// testing

export const testSorting = (array: Array<number>, prev: number, next: number) => {
  return ([array[prev], array[next]] = [array[next], array[prev]]);
};

export const bubbleSortTest = (array: Array<number>, direction: Direction) => {
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (direction === Direction.Ascending ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
        testSorting(array, j, j + 1);
      }
    }
  }
  return array;
};

export const selectionSortTest = (array: Array<number>, direction: Direction) => {
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (direction === Direction.Ascending ? array[j] < array[minIndex] : array[j] > array[minIndex]) {
        minIndex = j;
      }
    }
    testSorting(array, minIndex, i);
  }
  return array;
  };
