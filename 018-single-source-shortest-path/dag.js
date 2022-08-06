// Single source shortest path
// Directed Acyclic Graph
// Complexity - O(V+E)

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
    return this.sortedList;
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

class DAGShortestPath {
  g;
  vList;

  constructor(g) {
    this.g = g;
  }

  initializeSingleSource(s) {
    this.vList = new Array(this.g.v).fill().map(() => ({d: Infinity, p: null}));
    this.vList[s].d = 0;
  }

  relax(u, v, w) {
    if (this.vList[v].d > this.vList[u].d + w) {
      this.vList[v].d = this.vList[u].d + w;
      this.vList[v].p = u;
    }
  }

  findSingleSourceShortestPath(s) {
    const ts = new TopologicalSort(this.g);
    const list = ts.sort();
    this.initializeSingleSource(s);
    let ptr = list.head;
    while (ptr !== null) {
      const u = ptr.key;
      let adj = this.g.adj[u].head;
      while (adj !== null) {
        const v = adj.key;
        this.relax(u, v, this.g.weightMatrix[u][v]);
        adj = adj.next;
      }
      ptr = ptr.next;
    }
  }

  printPath(s) {
    for (let v = 0; v < this.g.v; v++) {
      console.log('\n--- Path from ' + s + ' to ' + v + ' ---');
      this.printPathFromSource(s, v);
      console.log('Total weight of path - ', this.vList[v].d);
    }
  }

  printPathFromSource(s, v) {
    if (s === v) {
      console.log(v);
      return;
    }
    if (this.vList[v].p === null) {
      console.log('Path does not exist');
    } else {
      this.printPathFromSource(s, this.vList[v].p);
      console.log(v);
    }
  }
 }

const g1 = new DirectedGraph(6);
g1.addEdge(0, 1, 5);
g1.addEdge(0, 2, 3);
g1.addEdge(1, 3, 6);
g1.addEdge(1, 2, 2);
g1.addEdge(2, 3, 7);
g1.addEdge(2, 4, 4);
g1.addEdge(2, 5, 2);
g1.addEdge(3, 5, 1);
g1.addEdge(3, 4, -1);
g1.addEdge(4, 5, -2);

console.log(' ---- Graph-1 ----');
g1.print();

const dag1 = new DAGShortestPath(g1);
console.log('\nShortest path from source 1');
dag1.findSingleSourceShortestPath(1);
dag1.printPath(1);
console.log('------------------');

console.log('\nShortest path from source 0');
dag1.findSingleSourceShortestPath(0);
dag1.printPath(0);
console.log('------------------');
