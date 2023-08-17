import { ElementStates } from "../../types/element-states";
import { linkedListClass } from "./list-class";

export interface IArray {
  value: string;
  state: ElementStates;
}

export interface IListNode<T> {
  listValue: T;
  next: IListNode<T> | null;
}

export class ListNode<T> implements IListNode<T> {
  listValue: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.listValue = value;
    this.next = next;
  }
}

export interface ILinkedListClass<T> {
  append: (node: T) => void;
  prepend: (node: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addIndex: (node: T, index: number) => void;
  deleteIndex: (index: number) => void;
  getElements: () => IListNode<T>[];
  getSize: () => number;
  getLastNode: () => IListNode<T> | null;
  getFirstNode: () => IListNode<T> | null;
  getNodeIndex: (index: number) => IListNode<T> | null;
}

export const setArray = () => {
  const size = Math.floor(Math.random() * (6 - 2)) + 2;
  const array = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push(randomNumber);
  }
  return array;
};

export const setLinkedList = () => {
  const array = setArray().map((element) => String(element));
  array.forEach((item) => {
    linkedListClass.append({ value: item, state: ElementStates.Default });
  });
};
