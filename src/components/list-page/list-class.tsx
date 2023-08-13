import { IArray, ILinkedListClass, IListNode, ListNode } from "./utils";

class LinkedListClass<T> implements ILinkedListClass<T> {
  head: ListNode<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(node: T) {
    const newNode = new ListNode(node);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  append(node: T) {
    const newNode = new ListNode(node);
    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }
    let element = this.head;
    while (element.next !== null) {
      element = element.next;
    }
    element.next = newNode;
    this.size++;
  }

  getElements() {
    const array = [];
    let element = this.head;
    while (element) {
      array.push(element);
      element = element.next;
    }
    return array;
  }

  getSize(): number {
    return this.size;
  }

  deleteHead() {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.next) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
      return;
    }
    let element = this.head;
    while (element.next != null && element.next.next != null) {
      element = element.next;
    }
    element.next = null;
    this.size--;
  }

  addIndex(node: T, index: number) {
    const newNode = new ListNode(node);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let element = this.head;
    for (let i = 0; i < index - 1 && element !== null; ++i) {
      element = element.next;
    }
    if (element === null) {
      return;
    }
    newNode.next = element.next;
    element.next = newNode;
    this.size++;
  }

  deleteIndex(index: number) {
    if (this.head === null) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let element = this.head;
    for (let i = 0; i < index - 1 && element !== null; ++i) {
      if (element.next) element = element.next;
    }
    if (element === null || element.next === null) {
      return;
    }
    element.next = element.next.next;
    this.size--;
  }

  getFirstNode() {
    if (!this.head) {
      return null;
    }
    return this.head;
  }

  getLastNode() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    return node;
  }

  getNodeIndex(index: number) {
    if (!this.head) {
      return null;
    }
    let node: IListNode<T> | null = this.head;
    let start = 0;
    while (node && start < index) {
      node = node.next;
      start++;
    }
    
    return node && start === index ? node : null;
  }
}


export const linkedListClass = new LinkedListClass<IArray>();