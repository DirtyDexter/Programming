class Stack {
  constructor(length) {
    this.list = new Array(length);
    this.top = -1
  }

  isStackEmpty() {
    return this.top === -1;
  }

  isStackFull() {
    return this.top === this.list.length - 1;
  }

  push(val) {
    if (this.isStackFull()) {
      throw new Error("overflow");
    }
    this.top = this.top + 1;
    this.list[this.top] = val;
  }

  pop() {
    if (this.isStackEmpty()) {
      throw new Error("underflow");
    }
    const x = this.list[this.top];
    this.top = this.top - 1;
    return x;
  }
}

const stack = new Stack(5);
stack.push(3);
stack.push(5);
stack.push(4);
stack.push(9);
stack.push(7);
try {
  stack.push(8);
} catch (e) {
  console.log("push error : " + e);
}
console.log("pop", stack.pop());
console.log("pop", stack.pop());
console.log("pop", stack.pop());
console.log("pop", stack.pop());
console.log("pop", stack.pop());
try {
  console.log("pop", stack.pop());
} catch (e) {
  console.log("pop error : " + e);
}
