// import { ElementStates } from "../types/element-states";

// export interface ISort {
//   letter?: string;
//   value: number;
//   state: ElementStates;
// }

// export const sort = (array: Array<ISort>, prevIndex: number, nextIndex: number) => {
//   return ([array[prevIndex], array[nextIndex]] = [array[nextIndex], array[prevIndex]]);
// };

export const setDelay = (time: number) => {
  return new Promise((res) => setTimeout(res, time));
};