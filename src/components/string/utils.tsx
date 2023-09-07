import { ElementStates } from "../../types/element-states";

export interface ISort {
  letter: string;
  state: ElementStates;
}

export const sorting = (array: Array<ISort>, prev: number, next: number) => {
  return ([array[prev], array[next]] = [array[next], array[prev]]);
};


export const stringSwapTest = (str: string) => {
  const array = str.split('');

  const end = str.length - 1;
  const mid = Math.ceil(str.length / 2);
  for (let i = 0; i < mid; i++) {
    let j = end - i;
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array;
};