class Queue {
  constructor(capacity) {
    this.list = new Array(capacity);
    this.head = -1;
    this.tail = -1;
  }

  isQueueFull() {
    return this.head === (this.tail + 1) % this.list.length;
  }

  isQueueEmpty() {
    return this.head === -1;
  }

  enqueue(val) {
    if (this.isQueueFull()) {
      throw new Error("overflow");
    }
    if (this.head === -1) {
      this.head = 0;
    }
    this.tail = (this.tail + 1) % this.list.length;
    this.list[this.tail] = val;
    return val;
  }

  dequeue() {
    if (this.isQueueEmpty()) {
      throw new Error("undeflow");
    }
    const x = this.list[this.head];
    if (this.head === this.tail) {
      this.head = this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.list.length;
    }
    return x;
  }

  traverse() {
    let start = this.head;
    while (start !== this.tail) {
      console.log(this.list[start]);
      start = (start + 1) % this.list.length;
    }
    console.log(this.list[start]);
  }
}

const queue = new Queue(5);

try {
  console.log("dequeue " + queue.dequeue());
} catch (e) {
  console.log("dequeue error ", e);
}
console.log("enqueue " + queue.enqueue(12));
try {
  console.log("dequeue " + queue.dequeue());
} catch (e) {
  console.log("dequeue error ", e);
}
try {
  console.log("dequeue " + queue.dequeue());
} catch (e) {
  console.log("dequeue error ", e);
}

[2, 4, 3, 6, 7, 5, 6].forEach(val => {
  try {
    console.log("enqueue " + queue.enqueue(val));
  } catch (e) {
    console.log("enqueue error : ", val, e);
  }
});

console.log("queue traverse() ");
queue.traverse();

for (let i = 0; i < 8; i++) {
  try {
    console.log("dequeue " + queue.dequeue());
  } catch (e) {
    console.log("dequeue error ", e);
  }
}
