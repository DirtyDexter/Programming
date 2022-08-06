// All pairs shortest path
// Matrix Multiplication
// Complexity - O(n4) or O(n3lgn)

class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(key) {
    const node = new Node(key);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  insertAtTail(key) {
    const node = new Node(key);
    if (this.tail == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  search(key) {
    let ptr = this.head;
    while (ptr != null && ptr.key != key) {
      ptr = ptr.next;
    }
    if (ptr == null) {
      throw new Error("Key not found");
    } else {
      return ptr;
    }
  }

  traverse() {
    const result = []
    let ptr = this.head
    while(ptr != null) {
      result.push(ptr.key)
      ptr = ptr.next
    }
    return result
  }
}

class DirectedGraph {
  v;
  adj;
  //edges = [];
  weightMatrix;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
    this.weightMatrix = new Array(n).fill().map(() => new Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i == j) {
          this.weightMatrix[i][j] = 0;
        } else {
          this.weightMatrix[i][j] = Infinity;
        }
      }
    }
  }

  addEdge(u, v, w) {
    this.adj[u].insertAtHead(v);
    // this.edges.push({
    //   u,
    //   v,
    //   w
    // });
    this.weightMatrix[u][v] = w;
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

function extendShortestPath(l, w) {
  const n = w.length;
  const d = new Array(n).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      d[i][j] = Infinity;
      for (let k = 0; k < n; k++) {
        d[i][j] = Math.min(d[i][j], l[i][k] + w[k][j]);
      }
    }
  }
  return d;
}

// Complexity - O(n4)
function slowAllPairsShortestPath(w) {
  const n = w.length;
  let l = new Array(n).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      l[i][j] = w[i][j];
    }
  }

  for (let m = 2; m < n; m++) {
    l = extendShortestPath(l, w);
  }
  return l;
}

// Complexity - O(n3lgn)
function fastAllPairsShortestPath(w) {
  const n = w.length;
  let l = new Array(n).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      l[i][j] = w[i][j];
    }
  }
  let m = 1;
  while(m < n-1) {
    l = extendShortestPath(l, l);
    m = 2*m;
  }
  return l;
}

const g1 = new DirectedGraph(5);
g1.addEdge(0, 4, -4);
g1.addEdge(0, 2, 8);
g1.addEdge(0, 1, 3);
g1.addEdge(1, 4, 7);
g1.addEdge(1, 3, 1);
g1.addEdge(2, 1, 4);
g1.addEdge(3, 0, 2);
g1.addEdge(3, 2, -5);
g1.addEdge(4, 3, 6);

console.log(' ---- Graph-1 ----');
g1.print();

console.log('\n---- Slow all pairs shortest path ----');
const l = slowAllPairsShortestPath(g1.weightMatrix);
for (let i = 0; i < l.length; i++) {
  console.log(l[i]);
}

console.log('\n ---- Fast all pairs shortest path ----');
const d = fastAllPairsShortestPath(g1.weightMatrix);
for (let i = 0; i < d.length; i++) {
  console.log(d[i]);
}

