export class QueueClass<T> {
  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  container: Array<T> = [];
  size: number = 0;
  length: number = 0;
  index: number = 0;
  tail: number = 0;
  head: number = 0;

  enqueue(item: T) {
    this.index = this.tail;
    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  add() {
    return this.container;
  }

  dequeue() {
    delete this.container[this.head];
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  reset() {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }

  empty() {
    return this.length === 0;
  }
}
