// Single source shortest path
// Bellman-Ford algorithm
// Complexity - O(VE)

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
  edges = [];
  //weightMatrix;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
    // this.weightMatrix = new Array(n).fill().map(() => new Array(n));
    // for (let i = 0; i < n; i++) {
    //   for (let j = 0; j < n; j++) {
    //     if (i == j) {
    //       this.weightMatrix[i][i] = 0;
    //     } else {
    //       this.weightMatrix[i][i] = Infinity;
    //     }
    //   }
    // }
  }

  addEdge(u, v, w) {
    this.adj[u].insertAtHead(v);
    this.edges.push({
      u,
      v,
      w
    });
    //this.weightMatrix[u][v] = w;
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

class BellmonFordAlgo {
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
    this.initializeSingleSource(s);
    for (let i = 0; i < this.g.v - 1; i++) {
      for (let j = 0; j < this.g.edges.length; j++) {
        const { u, v, w } = this.g.edges[j];
        this.relax(u, v, w);
      }
    }
    for (let j = 0; j < this.g.edges.length; j++) {
      const { u, v, w } = this.g.edges[j];
      if (this.vList[v].d > this.vList[u].d + w) {
        return false;
      }
    }
    return true;
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

let g = new DirectedGraph(5);
g.addEdge(0, 1, 6);
g.addEdge(0, 3, 7);
g.addEdge(1, 3, 8);
g.addEdge(1, 4, -4);
g.addEdge(1, 2, 5);
g.addEdge(2, 1, -2);
g.addEdge(3, 2, -3);
g.addEdge(3, 4, 9);
g.addEdge(4, 0, 2);
g.addEdge(4, 2, 7);
console.log(' ---- Graph-1 ----');
g.print();

let bfa = new BellmonFordAlgo(g);
console.log('\n\nShortest path from source 0');
let bool = bfa.findSingleSourceShortestPath(0);
if (bool === true) {
  bfa.printPath(0);
} else {
  console.log('Negative weight cycle exists');
}
console.log('----------');

console.log('\n\nShortest path from source 2');
bool = bfa.findSingleSourceShortestPath(2);
if (bool === true) {
  bfa.printPath(2);
} else {
  console.log('Negative weight cycle exists');
}
console.log('----------');


g = new DirectedGraph(8);
g.addEdge(0, 1, 3);
g.addEdge(0, 3, 5);
g.addEdge(0, 5, 2);
g.addEdge(1, 2, -4);
g.addEdge(2, 7, 4);
g.addEdge(3, 4, 6);
g.addEdge(4, 3, -3);
g.addEdge(4, 7, 8);
g.addEdge(5, 6, 3);
g.addEdge(6, 5, -6);
g.addEdge(6, 7, 7);
console.log('\n\n ---- Graph-2 ----');
g.print();

bfa = new BellmonFordAlgo(g);
console.log('\n\nShortest path from source 0');
bool = bfa.findSingleSourceShortestPath(0);
if (bool === true) {
  bfa.printPath(0);
} else {
  console.log('\nNegative weight cycle exists');
}
console.log('----------');

