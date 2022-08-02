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


class UndirectedGraph {
  v;
  adj;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
  }

  addEdge(u, v) {
    this.adj[u].insertAtHead(v);
    this.adj[v].insertAtHead(u);
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

class DirectedGraph {
  v;
  adj;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
  }

  addEdge(u, v) {
    this.adj[u].insertAtHead(v);
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

class BFS {
  g;

  constructor(g) {
    this.g = g;
  }

  traverse(s) {
    const vList = new Array(this.g.v).fill().map(() => ({d: Infinity, color: 'white', p: null}));
    vList[s] = {
      d: 0,
      color: 'gray',
      p: null
    };
    const q = new Queue(this.g.v);
    q.enqueue(s);
    while(q.isQueueEmpty() === false) {
      const u = q.dequeue();
      let adj = this.g.adj[u].head;
      while(adj !== null) {
        const v = vList[adj.key];
        if (v.color === 'white') {
          v.color = 'gray';
          v.d = vList[u].d + 1;
          v.p = u;
          q.enqueue(adj.key);
        }
        adj = adj.next;
      }
      vList[u].color = 'black';
    }
    for (let i = 0; i < vList.length; i++) {
      console.log('node - ', i, ' distance from source - ', vList[i].d, ' parent - ', vList[i].p, ' color - ', vList[i].color);
    }
  }
}

class DFS {
  g;
  time = 0;
  vList = [];

  constructor(g) {
    this.g = g;
  }

  traverse() {
    this.vList = new Array(this.g.v).fill().map(() => ({d: Infinity, f: Infinity, color: 'white', p: null}));
    for (let i = 0; i < this.g.v; i++) {
      if (this.vList[i].color === 'white') {
        this.dfsVisit(i);
      }
    }
    for (let i = 0; i < this.vList.length; i++) {
      console.log('node - ', i, ' start - ', this.vList[i].d, ' finish - ', this.vList[i].f, ' parent - ', this.vList[i].p, ' color - ', this.vList[i].color);
    }
  }

  dfsVisit(u) {
    this.time += 1;
    this.vList[u].d = this.time;
    this.vList[u].color = 'gray';
    let adj = this.g.adj[u].head;
    while(adj !== null) {
      if (this.vList[adj.key].color === 'white') {
        this.vList[adj.key].p = u;
        this.dfsVisit(adj.key);
      }
      adj = adj.next;
    }
    this.vList[u].color = 'black';
    this.time += 1;
    this.vList[u].f = this.time;
  }
}

class TopologicalSort {
  g;
  time = 0;
  vList = [];
  sortedList = new SingleLinkedList();

  constructor(g) {
    this.g = g;
  }

  sort() {
    this.vList = new Array(this.g.v).fill().map(() => ({d: Infinity, f: Infinity, color: 'white', p: null}));
    for (let i = 0; i < this.g.v; i++) {
      if (this.vList[i].color === 'white') {
        this.dfsVisit(i);
      }
    }
    let ptr = this.sortedList.head;
    const result = [];
    while(ptr !== null) {
      result.push(ptr.key);
      ptr = ptr.next;
    }
    console.log('Topological sort - ', result.join(', '));
  }

  dfsVisit(u) {
    this.time += 1;
    this.vList[u].d = this.time;
    this.vList[u].color = 'gray';
    let adj = this.g.adj[u].head;
    while(adj !== null) {
      if (this.vList[adj.key].color === 'white') {
        this.vList[adj.key].p = u;
        this.dfsVisit(adj.key);
      }
      adj = adj.next;
    }
    this.vList[u].color = 'black';
    this.time += 1;
    this.vList[u].f = this.time;
    this.sortedList.insertAtHead(u);
  }
}

class StronglyConnectedComponents {
  g;
  vList = [];
  sortedList = new SingleLinkedList();
  time = 0;
  gt;

  constructor(g) {
    this.g = g;
  }

  findConnectedComponents() {
    console.log('Finding connected components ---- ');
    this.vList = new Array(this.g.v).fill().map(() => ({d: Infinity, f: Infinity, color: 'white', p: null}));
    for (let i = 0; i < this.g.v; i++) {
      if (this.vList[i].color === 'white') {
        this.dfsVisit(i, this.g, false);
      }
    }

    this.transposeGraph();

    this.time = 0;
    this.vList = new Array(this.gt.v).fill().map(() => ({d: Infinity, f: Infinity, color: 'white', p: null}));
    let ptr = this.sortedList.head;
    while (ptr !== null) {
      const key = ptr.key;
      if (this.vList[key].color === 'white') {
        console.log('connected component --- ');
        this.dfsVisit(key, this.gt, true);
      }
      ptr = ptr.next;
    }
  }

  dfsVisit(u, g, printNode) {
    this.time += 1;
    this.vList[u].d = this.time;
    this.vList[u].color = 'gray';
    let adj = g.adj[u].head;
    while(adj !== null) {
      if (this.vList[adj.key].color === 'white') {
        this.vList[adj.key].p = u;
        this.dfsVisit(adj.key, g, printNode);
      }
      adj = adj.next;
    }
    this.vList[u].color = 'black';
    this.time += 1;
    this.vList[u].f = this.time;
    if (printNode) {
      console.log('node - ', u);
    } else {
      this.sortedList.insertAtHead(u);
    }
  }

  transposeGraph() {
    this.gt = new DirectedGraph(this.g.v);
    for (let i = 0; i < this.g.v; i++) {
      let adj = this.g.adj[i].head;
      while (adj !== null) {
        const key = adj.key;
        this.gt.addEdge(key, i);
        adj = adj.next;
      }
    }
    console.log('Transpose of graph');
    this.gt.print();
  }
}

const g = new UndirectedGraph(8);
g.addEdge(0, 1);
g.addEdge(0, 4);
g.addEdge(1, 5);
g.addEdge(5, 2);
g.addEdge(5, 6);
g.addEdge(2, 3);
g.addEdge(2, 6);
g.addEdge(6, 7);
g.addEdge(3, 7);
g.addEdge(6, 3);

console.log('Graph print');
g.print();
console.log('-----------------');

const bfs = new BFS(g);
console.log('BFS traverse from source node - 1');
bfs.traverse(1);
console.log('-----------------');

const dfs = new DFS(g);
console.log('DFS traverse');
dfs.traverse();
console.log('-----------------');


const g2 = new DirectedGraph(6);
g2.addEdge(0, 1);
g2.addEdge(0, 3);
g2.addEdge(1, 4);
g2.addEdge(2, 4);
g2.addEdge(2, 5);
g2.addEdge(3, 1);
g2.addEdge(4, 3);
g2.addEdge(5, 5);

console.log('Graph print');
g2.print();
console.log('-----------------');

const bfs2 = new BFS(g2);
console.log('BFS traverse from source node - 0');
bfs2.traverse(0);
console.log('-----------------');
console.log('BFS traverse from source node - 2');
bfs2.traverse(2);
console.log('-----------------');

const dfs2 = new DFS(g2);
console.log('DFS traverse');
dfs2.traverse();
console.log('-----------------');

const tpSort = new TopologicalSort(g2);
console.log('TopologicalSort');
tpSort.sort();
console.log('-----------------');

const g3 = new DirectedGraph(8);
g3.addEdge(0, 1);
g3.addEdge(1, 4);
g3.addEdge(1, 5);
g3.addEdge(1, 2);
g3.addEdge(2, 6);
g3.addEdge(2, 3);
g3.addEdge(3, 2);
g3.addEdge(3, 7);
g3.addEdge(4, 0);
g3.addEdge(4, 5);
g3.addEdge(5, 6);
g3.addEdge(6, 5);
g3.addEdge(6, 7);
g3.addEdge(7, 7);

const scCom = new StronglyConnectedComponents(g3);
console.log('StronglyConnectedComponents');
scCom.findConnectedComponents();
console.log('-----------------');
