interface IQueueClass<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  getLastIndex: () => number;
  clear: () => void;
  getElements: () => T[] | null[];
  getEmpty: () => void;
}

export class QueueClass<T> implements IQueueClass<T> {
  queueArray: Array<T> = [];
  head = 0;
  tail = 0;
  lastIndex = 0;
  size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.queueArray = Array(size);
  }

  enqueue(item: T) {
    this.lastIndex = this.tail;
    this.queueArray[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  }

  dequeue() {
    delete this.queueArray[this.head];
    this.head = (this.head + 1) % this.size;
    this.length--;
  }

  getElements = () => this.queueArray;

  getHead = () => this.head;

  getTail = () => this.tail;

  getSize = () => this.size;

  getEmpty = () => this.length === 0;

  getLastIndex = () => this.lastIndex;

  clear() {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }
}
