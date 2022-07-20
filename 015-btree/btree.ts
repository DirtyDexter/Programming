class BNode {
  t = 0;
  n = 0;
  keys = [];
  child = [];
  leaf = true;

  constructor(t) {
    this.t = t;
  }
}

class BTree {
  root;
  t;

  constructor(t) {
    this.t = t;
    this.root = null;
  }

  traverse(x) {
    if (x !== null) {
      for (let i = 0; i < x.child.length; i++) {
        this.traverse(x.child[i]);
        //console.log('key[i]', x.keys[i]);
      }
      console.log('x.n, x.leaf, x.keys', x.n, x.leaf, x.keys);
    }
  }

  insert(key) {
    if (this.root === null) {
      const newNode = new BNode(this.t);
      newNode.keys = [key];
      newNode.n = 1;
      this.root = newNode;
    } else if (this.root.n === (2*this.t - 1)) {
      const newNode = new BNode(this.t);
      newNode.leaf = false;
      newNode.child = [this.root];
      this.root = newNode;
      this.splitChild(this.root, 0);
      //this.traverse(this.root);
      this.insertNonFull(this.root, key);
    } else {
      this.insertNonFull(this.root, key);
    }
  }

  insertNonFull(x, key) {
    if (x.leaf === true) {
      let i = x.n - 1;
      while(i >= 0 && key < x.keys[i]) {
        x.keys[i+1] = x.keys[i];
        i--;
      }
      i++;
      x.keys[i] = key;
      x.n = x.n + 1;
    } else {
      let i = 0;
      while (i <= x.n-1 && key > x.keys[i]) {
        i++;
      }
      let y = x.child[i];
      if (y.n === (2*this.t - 1)) {
        this.splitChild(x, i);
        if (key > x.keys[i]) {
          y = x.child[i+1];
        }
      }
      this.insertNonFull(y, key);
    }
  }

  splitChild(x, i) {
    //console.log('x', x);
    const y = x.child[i];
    //console.log('y', y);
    const z = new BNode(this.t);
    z.leaf = y.leaf;
    for(let i = Math.floor(((2*this.t)-1) / 2) + 1; i <= 2*this.t-2; i++) {
      z.keys.push(y.keys[i]);
    }
    if (y.leaf === false) {
      for(let i = Math.floor(((2*this.t)-1) / 2) + 1; i <= 2*this.t-1; i++) {
        z.child.push(y.child[i]);
      }
    }
    z.n = this.t - 1;
    //console.log('z', z);

    const key = y.keys[this.t-1];
    let j = x.n - 1;
    while(j >= 0 && key < x.keys[j]) {
      x.keys[j+1] = x.keys[j];
      j--;
    }
    j++;
    x.keys[j] = key;
    x.n = x.n + 1;
    //console.log('x', x);

    let k = x.child.length - 1;
    while(k > j) {
      x.child[k+1] = x.child[k];
      k--;
    }
    x.child[j+1] = z;
    //console.log('x', x);
    y.keys = y.keys.slice(0, this.t-1);
    y.n = this.t - 1;
    //console.log('y', y);
  }
}

console.log('First Tree');
let t = new BTree(3);
console.log('Inserting 10');
t.insert(10);
t.traverse(t.root);
console.log('------');
console.log('Inserting 20');
t.insert(20);
t.traverse(t.root);
console.log('------');
console.log('Inserting 5');
t.insert(5);
t.traverse(t.root);
console.log('------');
console.log('Inserting 6');
t.insert(6);
t.traverse(t.root);
console.log('------');
console.log('Inserting 12');
t.insert(12);
t.traverse(t.root);
console.log('------');
console.log('Inserting 30');
t.insert(30);
t.traverse(t.root);
console.log('------');
console.log('Inserting 7');
t.insert(7);
t.traverse(t.root);
console.log('------');
console.log('Inserting 17');
t.insert(17);
t.traverse(t.root);
console.log('------');


console.log('Second Tree');
t = new BTree(3);
console.log('Inserting 10');
t.insert(10);
t.traverse(t.root);
console.log('------');
console.log('Inserting 20');
t.insert(20);
t.traverse(t.root);
console.log('------');
console.log('Inserting 30');
t.insert(30);
t.traverse(t.root);
console.log('------');
console.log('Inserting 40');
t.insert(40);
t.traverse(t.root);
console.log('------');
console.log('Inserting 50');
t.insert(50);
t.traverse(t.root);
console.log('------');
console.log('Inserting 60');
t.insert(60);
t.traverse(t.root);
console.log('------');
console.log('Inserting 70');
t.insert(70);
t.traverse(t.root);
console.log('------');
console.log('Inserting 80');
t.insert(80);
t.traverse(t.root);
console.log('------');
console.log('Inserting 90');
t.insert(90);
t.traverse(t.root);
console.log('------');
