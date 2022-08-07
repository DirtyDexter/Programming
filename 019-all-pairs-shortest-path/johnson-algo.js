// All pairs shortest path
// Johnson's algo for sparse graphs
// Complexity - O(V2logV + VE) - If fibonacci heap is used for priority queue
// Complexity - O(VElgV) - If binary heap is used for priority queue
// Complexity - O(V3) - If array is used for priority queue

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

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
  }

  addEdge(u, v, w) {
    this.adj[u].insertAtHead(v);
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

function extractMin(list) {
  let min = Infinity;
  let minIndex = -1;
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    if (node.inQueue === true && node.d < min) {
      min = node.d;
      minIndex = i;
    }
  }
  if (minIndex !== -1) {
    list[minIndex].inQueue = false;
  }
  return minIndex;
}

function initializeSingleSource(s, n) {
  const list = new Array(n).fill().map(() => ({d: Infinity, p: null}));
  list[s].d = 0;
  return list;
}

function relax(list, u, v, w) {
  if (list[v].d > list[u].d + w[u][v]) {
    list[v].d = list[u].d + w[u][v];
    list[v].p = u;
  }
}

function bellmonFordAlgo(g, w, s) {
  //const list = initializeSingleSource(s, g.v);
  const list = new Array(g.v).fill().map(() => ({d: Infinity, p: null}));
  list[s].d = 0;
  for (let i = 0; i < g.v - 1; i++) {
    for (let u = 0; u < g.v; u++) {
      let ptr = g.adj[u].head;
      while(ptr !== null) {
        v = ptr.key;
        relax(list, u, v, w);
        ptr = ptr.next;
      }
    }
  }
  for (let u = 0; u < g.v; u++) {
    let ptr = g.adj[u].head;
    while(ptr !== null) {
      v = ptr.key;
      if (list[v].d > list[u].d + w[u][v]) {
        return false;
      }
      ptr = ptr.next;
    }
  }
  return list;
}

function dijkstraAlgo(g, w, s) {
  //const list = initializeSingleSource(s, g.v);
  const list = new Array(g.v).fill().map(() => ({d: Infinity, p: null, inQueue: true}));
  list[s].d = 0;
  while(true) {
    const u = extractMin(list);
    if (u !== -1) {
      let adj = g.adj[u].head;
      while(adj !== null) {
        const v = adj.key;
        if (list[v].inQueue === true) {
          relax(list, u, v, w);
        }
        adj = adj.next;
      }
    } else {
      break;
    }
  }
  return list;
}

function johnsonAlgo(g, w) {
  const gNew = new DirectedGraph(g.v + 1);
  for (let u = 0; u < g.v; u++) {
    let ptr = g.adj[u].head;
    while(ptr !== null) {
      v = ptr.key;
      gNew.addEdge(u, v);
      ptr = ptr.next;
    }
  }
  for (let i = 0; i < g.v; i++) {
    gNew.addEdge(g.v, i);
  }
  // console.log('\n---New graph----');
  // gNew.print();

  const wNew = new Array(gNew.v).fill().map(() => new Array(gNew.v));
  for (i = 0; i < wNew.length; i++) {
    for (j = 0; j < wNew.length; j++) {
      if (i === wNew.length-1) {
        wNew[i][j] = 0;
      } else if (j === wNew.length-1) {
        wNew[i][j] = Infinity;
      } else {
        wNew[i][j] = w[i][j];
      }
    }
  }
  // console.log('\n---Weight matrix of new graph----');
  // console.log(wNew);

  const h = new Array(gNew.v);
  const list = bellmonFordAlgo(gNew, wNew, gNew.v-1);
  if (list === false) {
    console.log('Graph contains negative weight cycle');
  } else {
    // console.log('\n---Bellmon-Ford single source shortest path list---');
    // console.log(list);
    for (let i = 0; i < list.length; i++) {
      h[i] = list[i].d;
    }
    // reweight matrix
    const wRe = new Array(wNew.length).fill().map(() => new Array(wNew.length));
    for (let i = 0; i < wRe.length; i++) {
      for (let j = 0; j < wRe.length; j++) {
        wRe[i][j] = wNew[i][j] + h[i] - h[j];
      }
    }
    console.log('\n ---- Weigh matrix after reweighting ----');
    console.log(wRe);

    const d = new Array(g.v).fill().map(() => new Array(g.v));
    const p = new Array(g.v).fill().map(() => new Array(g.v));
    for (let i = 0; i < g.v; i++) {
      const dList = dijkstraAlgo(g, wRe, i);
      for (let j = 0; j < dList.length; j++) {
        const v = dList[j];
        d[i][j] = v.d + h[j] - h[i];
        p[i][j] = v.p;
      }
    }
    console.log('\n---Final result weight matrix---\n');
    console.log(d);
    console.log('\n---Final result parent matrix---\n');
    console.log(p);
    return {
      d,
      p
    };
  }
}

// Graph without negative weight cycle
const n1 = 5;
const g1 = new DirectedGraph(n1);
const w1 = new Array(n1).fill().map(() => new Array(n1));
for (let i = 0; i < n1; i++) {
  for (let j = 0; j < n1; j++) {
    if (i == j) {
      w1[i][j] = 0;
    } else {
      w1[i][j] = Infinity;
    }
  }
}
g1.addEdge(0, 4);
w1[0][4] = -4;
g1.addEdge(0, 2);
w1[0][2] = 8;
g1.addEdge(0, 1);
w1[0][1] = 3;
g1.addEdge(1, 4);
w1[1][4] = 7;
g1.addEdge(1, 3);
w1[1][3] = 1;
g1.addEdge(2, 1);
w1[2][1] = 4;
g1.addEdge(3, 0);
w1[3][0] = 2;
g1.addEdge(3, 2);
w1[3][2] = -5;
g1.addEdge(4, 3);
w1[4][3] = 6;

console.log('\n---- Graph-1 ----');
g1.print();

console.log('\n---Johnson Algo for graph-1---\n');
johnsonAlgo(g1, w1);

const n2 = 8;
const g2 = new DirectedGraph(n2);
const w2 = new Array(n2).fill().map(() => new Array(n2));
for (let i = 0; i < n2; i++) {
  for (let j = 0; j < n2; j++) {
    if (i == j) {
      w2[i][j] = 0;
    } else {
      w2[i][j] = Infinity;
    }
  }
}
g2.addEdge(0, 1);
w2[0][1] = 3;
g2.addEdge(0, 3);
w2[0][3] = 5;
g2.addEdge(0, 5);
w2[0][5] = 2;
g2.addEdge(1, 2);
w2[1][2] = -4;
g2.addEdge(2, 7);
w2[2][7] = 4;
g2.addEdge(3, 4);
w2[3][4] = 6;
g2.addEdge(4, 3);
w2[4][3] = -3;
g2.addEdge(4, 7);
w2[4][7] = 8;
g2.addEdge(5, 6);
w2[5][6] = 3;
g2.addEdge(6, 5);
w2[6][5] = -6;
g2.addEdge(6, 7);
w2[6][7] = 7;
console.log('\n\n ---- Graph-2 ----');
g2.print();

console.log('\n---Johnson Algo for graph-2---\n');
johnsonAlgo(g2, w2);
