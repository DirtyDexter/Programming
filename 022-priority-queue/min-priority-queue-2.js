// Priority Queue
// Using Fibonacci heap
// Complexity - O(lgn) and O(1)

class Node {
  key;
  left;
  right;
  parent;
  child;
  degree;
  mark;

  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.child = null;
    this.degree = 0;
    this.mark = false;
  }
}

class FibonacciHeap {
  min = null;
  n = 0;
  mapping = {};

  insertInRootList(node) {
    if (this.min === null) {
      node.left = node;
      node.right = node;
    } else {
      node.left = this.min.left;
      node.left.right = node;
      node.right = this.min;
      this.min.left = node;
    }
  }

  removeFromRootList(node) {
    node.left.right = node.right;
    node.right.left = node.left;
  }

  fibHeapInsert(key) {
    const node = new Node(key);
    this.insertInRootList(node);
    if (this.min === null) {
      this.min = node;
    } else if (node.key < this.min.key) {
      this.min = node;
    }
    this.n += 1;
    this.mapping[key] = node;
  }

  fibHeapExtractMin() {
    const z = this.min;
    if (z !== null) {
      const firstChild = z.child;
      let child = z.child;
      let nextChild;
      while(child !== null) {
        nextChild = child.right;
        this.insertInRootList(child);
        child.parent = null;
        if (nextChild !== firstChild) {
          child = nextChild;
        } else {
          child = null;
        }
      }
      this.removeFromRootList(z);
      if (z.right === z) {
        this.min = null;
      } else {
        this.min = z.right;
        this.consolidate();
      }
      this.n -= 1;
      this.mapping[z.key] = undefined;
    }
    return z;
  }

  consolidate() {
    // phi = 1.61803
    const phi = (1 + Math.sqrt(5)) / 2;
    const dofn = Math.floor(Math.log(this.n) / Math.log(phi)); // maximum degree one node can have
    const a = new Array(dofn+1).fill(null);
    let w = this.min;
    let check = this.min;
    do {
      let x = w;
      let d = w.degree;
      while(a[d] !== null && a[d] !== x) {
        let y = a[d];
        if (x.key > y.key) {
          let temp = x;
          x = y;
          y = temp;
          w = x;
        }
        //console.log('linking ', y.key , ' to ', x.key);
        this.fibHeapLink(y, x);
        check = x;
        a[d] = null;
        d += 1;
      }
      a[d] = x;
      w = w.right;
    } while (w !== null && w !== check);
    this.min = null;
    for (let i = 0; i <= dofn; i++) {
      if (a[i] !== null) {
        this.insertInRootList(a[i]);
        if (this.min === null) {
          this.min = a[i];
        } else if (a[i].key < this.min.key) {
          this.min = a[i];
        }
      }
    }
  }

  fibHeapLink(y, x) {
    this.removeFromRootList(y);
    let child = x.child;
    if (child === null) {
      y.right = y;
      y.left = y;
    } else {
      y.right = child;
      y.left = child.left;
      child.left.right = y;
      child.left = y;
    }
    x.child = y;
    y.parent = x;
    x.degree += 1;
    y.mark = false;
  }

  fibHeapDecreaseKey(x, k) {
    if (x.key < k) {
      throw new Error('New key is greater than current key');
    }
    x.key = k;
    const y = x.parent;
    if (y !== null && x.key < y.key) {
      this.cut(x, y);
      this.cascadingCut(y);
    }
    if (x.key < this.min.key) {
      this.min = x;
    }
  }

  cut(x, y) {
    if (x.right === x) {
      y.child = null;
    } else {
      x.left.right = x.right;
      x.right.left = x.left;
      if (y.child === x) {
        y.child = x.right;
      }
    }
    y.degree -= 1;
    this.insertInRootList(x);
    x.parent = null;
    x.mark = false;
  }

  cascadingCut(y) {
    const z = y.parent;
    if (z !== null) {
      if (y.mark === false) {
        y.mark = true;
      } else {
        this.cut(y, z);
        this.cascadingCut(z);
      }
    }
  }

  fibHeapDelete(x) {
    this.fibHeapDecreaseKey(x, - Infinity);
    this.fibHeapExtractMin();
  }

  print(node, list) {
    //console.log('node - ', node);
    list.push('(');
    if (node === null) {
      list.push(')');
    } else {
      let temp = node;
      do {
        list.push(temp.key);
        this.print(temp.child, list);
        list.push('->');
        temp = temp.right;
      } while(temp !== node);
      list.push(')');
    }
  }
}

const fib1 = new FibonacciHeap();
fib1.fibHeapInsert(17);
fib1.fibHeapInsert(26);
fib1.fibHeapInsert(30);
fib1.fibHeapInsert(39);
fib1.fibHeapInsert(10);
fib1.fibHeapInsert(20);
fib1.fibHeapInsert(18);
fib1.fibHeapInsert(42);
fib1.fibHeapInsert(12);

console.log('---FIB-HEAP---');
let list = [];
fib1.print(fib1.min, list);
console.log(list.join(''));

console.log('\n---Extract Min---');
console.log(fib1.fibHeapExtractMin().key);
list = [];
fib1.print(fib1.min, list);
console.log(list.join(''));
//console.log(fib1.min);

console.log('\n---Decrease key from 30 to 8---');
fib1.fibHeapDecreaseKey(fib1.mapping['30'], 8);
list = [];
fib1.print(fib1.min, list);
console.log(list.join(''));
//console.log(fib1.mapping['17']);

console.log('\n---Decrease key from 26 to 6---');
fib1.fibHeapDecreaseKey(fib1.mapping['26'], 6);
list = [];
fib1.print(fib1.min, list);
console.log(list.join(''));

console.log('\n---Decrease key from 12 to 16---');
try {
  fib1.fibHeapDecreaseKey(fib1.mapping['12'], 16);
} catch (e) {
  console.log(e.message);
}

