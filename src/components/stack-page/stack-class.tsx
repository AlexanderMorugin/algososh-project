interface IStackClass<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  array: () => T[];
  index: number;
  size: number;
}

export class StackClass<T> implements IStackClass<T> {
  stackArray: T[] = [];

  push(item: T) {
    this.stackArray.push(item);
  }

  pop() {
    this.stackArray.pop();
  }

  clear() {
    this.stackArray = [];
  }

  array() {
    return this.stackArray;
  }

  get size() {
    return this.stackArray.length;
  }

  get index() {
    return this.size - 1;
  }
}
