import { ElementStates } from "../../types/element-states";

export interface ISort {
  letter: string;
  state: ElementStates;
}

export const sorting = (array: Array<ISort>, prev: number, next: number) => {
  return ([array[prev], array[next]] = [array[next], array[prev]]);
};
