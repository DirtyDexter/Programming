// All pairs shortest path
// Floyd-Warshall Algo
// Complexity - O(n3)

// Assumtion - Negative weight edges may be present but negative weight cycle is not present

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
  weightMatrix; // weight of path
  parentMatrix; // parent of path
  edgeMatrix; // if there is any edge b/w nodes

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
    this.weightMatrix = new Array(n).fill().map(() => new Array(n));
    this.parentMatrix = new Array(n).fill().map(() => new Array(n));
    this.edgeMatrix = new Array(n).fill().map(() => new Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i == j) {
          this.weightMatrix[i][j] = 0; // no weight from one node to same node
          this.edgeMatrix[i][j] = 1; // from one node to same node
        } else {
          this.weightMatrix[i][j] = Infinity;
          this.edgeMatrix[i][j] = 0;
        }
        this.parentMatrix[i][j] = null;
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
    this.parentMatrix[u][v] = u;
    this.edgeMatrix[u][v] = 1;
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

function floydWarshallAlgo(w, p) {
  const n = w.length;
  let dNew = new Array(n).fill().map(() => new Array(n));
  let pNew = new Array(n).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dNew[i][j] = w[i][j];
      pNew[i][j] = p[i][j];
    }
  }

  for (let k = 0; k < n; k++) {
    let dOld = dNew;
    let pOld = pNew;
    dNew = new Array(n).fill().map(() => new Array(n));
    pNew = new Array(n).fill().map(() => new Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dOld[i][j] <= dOld[i][k] + dOld[k][j]) {
          dNew[i][j] = dOld[i][j];
          pNew[i][j] = pOld[i][j];
        } else {
          dNew[i][j] = dOld[i][k] + dOld[k][j];
          pNew[i][j] = pOld[k][j];
        }
      }
    }
  }
  return {
    d: dNew,
    p: pNew
  };
}

// If there is a path from node a to b
function transitiveClosure(t) {
  const n = t.length;
  let tNew = new Array(n).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      tNew[i][j] = t[i][j];
    }
  }

  for (let k = 0; k < n; k++) {
    let tOld = tNew;
    tNew = new Array(n).fill().map(() => new Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        tNew[i][j] = tOld[i][j] || (tOld[i][k] && tOld[k][j]);
      }
    }
  }
  return tNew;
}

// Graph without negative weight cycle
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

// On diagonal, if weight is negative then it means negative weight cycle exists in graph
const { d, p } = floydWarshallAlgo(g1.weightMatrix, g1.parentMatrix);
console.log('\n---- All pairs shortest path weight matrix ----');
for (let i = 0; i < d.length; i++) {
  console.log(d[i]);
}
console.log('\n---- All pairs shortest path parents matrix ----');
for (let i = 0; i < p.length; i++) {
  console.log(p[i]);
}

const g2 = new DirectedGraph(4);
g2.addEdge(1, 3, 2);
g2.addEdge(1, 2, 4);
g2.addEdge(2, 1, 4);
g2.addEdge(3, 0, 5);
g2.addEdge(3, 2, 6);

console.log('\n ---- Graph-2 ----');
g2.print();

const t = transitiveClosure(g2.edgeMatrix);
console.log('\n---- Transitive closure pf graph ----');
for (let i = 0; i < t.length; i++) {
  console.log(t[i]);
}

// Graph with negative weight cycle
const g3 = new DirectedGraph(8);
g3.addEdge(0, 1, 3);
g3.addEdge(0, 3, 5);
g3.addEdge(0, 5, 2);
g3.addEdge(1, 2, -4);
g3.addEdge(2, 7, 4);
g3.addEdge(3, 4, 6);
g3.addEdge(4, 3, -3);
g3.addEdge(4, 7, 8);
g3.addEdge(5, 6, 3);
g3.addEdge(6, 5, -6);
g3.addEdge(6, 7, 7);
console.log('\n\n ---- Graph-3 ----');
g3.print();

// On diagonal, if weight is negative then it means negative weight cycle exists in graph
const { d: d3, p: p3 } = floydWarshallAlgo(g3.weightMatrix, g3.parentMatrix);
console.log('\n---- All pairs shortest path weight matrix ----');
for (let i = 0; i < d3.length; i++) {
  console.log(d3[i]);
}
