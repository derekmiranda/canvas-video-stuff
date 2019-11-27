export default class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  pop() {
    const oldFirst = this.first;
    if (!oldFirst) return null;

    this.first = this.first.next;
    return oldFirst;
  }

  add(item) {
    if (!this.first) {
      this.first = this.last = createNode(item);
    } else {
      this.last.next = createNode(item);
      this.last = this.last.next;
    }
  }
}

function createNode(item) {
  return { item, next: null };
}
