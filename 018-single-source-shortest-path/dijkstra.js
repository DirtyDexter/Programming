// Single source shortest path
// Dijkstra algorithm
// Complexity - O(V2) - If priority queue is implemented by array
// Complexity - O(ElgV) - If edges are less i.e. in order of o(V2/lgV) and priority queue is implemented by min-heap
// Complexity - O(E + VlgV) - If priority queue is implemented by Fibonacci-Heap

// All weights should be non-negative

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
          this.weightMatrix[i][i] = 0;
        } else {
          this.weightMatrix[i][i] = Infinity;
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

class DijkstraAlgo {
  g;
  vlist;

  constructor(g) {
    this.g = g;
  }

  extractMin() {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < this.vList.length; i++) {
      const node = this.vList[i];
      if (node.inQueue === true && node.d < min) {
        min = node.d;
        minIndex = i;
      }
    }
    if (minIndex !== -1) {
      this.vList[minIndex].inQueue = false;
    }
    return minIndex;
  }

  initializeSingleSource(s) {
    this.vList = new Array(this.g.v).fill().map(() => ({d: Infinity, p: null, inQueue: true}));
    this.vList[s].d = 0;
  }

  relax(u, v, w) {
    if (this.vList[v].d > this.vList[u].d + w) {
      this.vList[v].d = this.vList[u].d + w;
      this.vList[v].p = u;
    }
  }

  findSingleSourceShortestPath(s) {
    this.initializeSingleSource(s);
    while(true) {
      const u = this.extractMin();
      if (u !== -1) {
        let adj = this.g.adj[u].head;
        while(adj !== null) {
          const v = adj.key;
          if (this.vList[v].inQueue === true) {
            this.relax(u, v, this.g.weightMatrix[u][v]);
          }
          adj = adj.next;
        }
      } else {
        break;
      }
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

const g1 = new DirectedGraph(5);
g1.addEdge(0, 1, 10);
g1.addEdge(0, 3, 5);
g1.addEdge(1, 3, 2);
g1.addEdge(1, 2, 1);
g1.addEdge(2, 4, 4);
g1.addEdge(3, 1, 3);
g1.addEdge(3, 2, 9);
g1.addEdge(3, 4, 2);
g1.addEdge(4, 0, 7);
g1.addEdge(4, 2, 6);

console.log(' ---- Graph-1 ----');
g1.print();

const da1 = new DijkstraAlgo(g1);
console.log('\nShortest path from source 0');
da1.findSingleSourceShortestPath(0);
da1.printPath(0);
console.log('------------------');

