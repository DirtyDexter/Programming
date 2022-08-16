// Maximum Flow in network
// Ford-Fulkerson method
// Complexity - O(E|f*|)

// Edmonds-Karp Algo if BFS is used to find Augmenting path
// Complexity - O(VE2)

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

class Node {
  v;
  c;
  f;
  next;

  constructor(v, c) {
    this.v = v;
    this.c = c;
    this.f = 0;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(v, c) {
    const node = new Node(v, c);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  traverse() {
    const result = []
    let ptr = this.head
    while(ptr != null) {
      result.push(`v, c, f - ${ptr.v}, ${ptr.c}, ${ptr.f}`);
      ptr = ptr.next
    }
    return result
  }
}

class DirectedGraph {
  v;
  adj;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
  }

  addEdge(u, v, c) {
    this.adj[u].insertAtHead(v, c);
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

function getResidualGraph(g) {
  const rg = new DirectedGraph(g.v);
  for (let u = 0; u < g.v; u++) {
    let ptr = g.adj[u].head;
    while(ptr !== null) {
      const { v, c, f } = ptr;
      if (c-f > 0) {
        rg.addEdge(u, v, c-f);
      }
      if (f > 0) {
        rg.addEdge(v, u, f);
      }
      ptr = ptr.next;
    }
  }
  return rg;
}


function bfs(g, s, t) {
  const vList = new Array(g.v).fill().map(() => ({p: null, c: 0, color: 'white'}));
  vList[s].color = 'gray';
  const q = new Queue(g.v);
  q.enqueue(s);
  while(q.isQueueEmpty() === false) {
    const u = q.dequeue();
    let ptr = g.adj[u].head;
    while(ptr !== null) {
      const { v, c } = ptr;
      if (vList[v].color === 'white') {
        vList[v].color === 'gray';
        vList[v].p = u;
        vList[v].c = c;
        q.enqueue(v);
        if (v === t) {
          return vList;
        }
      }
      ptr = ptr.next;
    }
    vList[u].color = 'black';
  }
  return false;
}

function fordFulkerson(g, s, t) {
  while(true) {
    const rg = getResidualGraph(g);
    console.log('\n--- Residual Graph ---');
    rg.print();
    const augPathList = bfs(rg, s, t);
    if (augPathList !== false) {
      //console.log('augPathList - ', augPathList);
      let rc = Infinity;
      for (let v = t; v !== s; v = augPathList[v].p) {
        const { c } = augPathList[v];
        rc = Math.min(rc, c);
      }
      console.log('Residual Capacity - ', rc);
      for (let v = t; v !== s; v = augPathList[v].p) {
        const { p } = augPathList[v];
        let ptr = g.adj[p].head;
        while(ptr !== null && ptr.v !== v) {
          ptr = ptr.next;
        }
        if (ptr !== null) {
          ptr.f = ptr.f + rc;
        } else {
          let ptr = g.adj[v].head;
          while(ptr !== null && ptr.v !== p) {
            ptr = ptr.next;
          }
          ptr.f = ptr.f - rc;
        }
      }
    } else {
      console.log('No augmenting path in residual network');
      break;
    }
  }
  console.log('\n--- Final Graph ---');
  g.print();
  let maxFlow = 0;
  let ptr = g.adj[s].head;
  while(ptr !== null) {
    maxFlow += ptr.f;
    ptr = ptr.next;
  }
  console.log('\nMaximum flow in network - ', maxFlow);
}

const g1 = new DirectedGraph(6);
g1.addEdge(0, 1, 16);
g1.addEdge(0, 2, 13);
g1.addEdge(1, 3, 12);
g1.addEdge(2, 1, 4);
g1.addEdge(2, 4, 14);
g1.addEdge(3, 2, 9);
g1.addEdge(3, 5, 20);
g1.addEdge(4, 3, 7);
g1.addEdge(4, 5, 4);
console.log('--- Graph-1 ---');
g1.print();

console.log('\n--- Ford Fulkerson Method, s - 0, t - 5 ---');
fordFulkerson(g1, 0, 5);

