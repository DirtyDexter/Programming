// Maximum flow problem
// Relabel-to-front algorithm - one version of push-relabel algorithm
// Complexity - O(V3)

class Node {
  v;
  next;

  constructor(v) {
    this.v = v;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  insertAtHead(v, c) {
    const node = new Node(v, c);
    if (this.head == null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  moveToFront(u) {
    if (u !== this.head) {
      let ptr = this.head;
      while(ptr.next !== u) {
        ptr = ptr.next;
      }
      ptr.next = u.next;
      u.next = this.head;
      this.head = u;
    }
  }

  traverse() {
    const result = []
    let ptr = this.head
    while(ptr != null) {
      result.push(ptr.v);
      ptr = ptr.next
    }
    return result
  }
}

class DirectedGraph {
  v;
  nbr;
  capacityMatrix;

  constructor(n) {
    this.v = n;
    this.nbr = new Array(n).fill().map(() => new SingleLinkedList());
    this.capacityMatrix = new Array(n).fill().map(() => new Array(n).fill(0));
  }

  addEdge(u, v, c) {
    this.nbr[u].insertAtHead(v);
    this.nbr[v].insertAtHead(u);
    this.capacityMatrix[u][v] = c;
  }

  print() {
    console.log(this.capacityMatrix);
  }
}

function getCapacity(g, flowMatrix, u, v) {
  //console.log(u, v);
  if (g.capacityMatrix[u][v] > 0) {
    return g.capacityMatrix[u][v] - flowMatrix[u][v];
  } else {
    return flowMatrix[v][u];
  }
}

function initializePushRelabel(g, s) {
  const list = new Array(g.v).fill().map(() => ({e: 0, h: 0}));
  const flowMatrix = new Array(g.v).fill().map(() => new Array(g.v).fill(0));

  list[s].h = g.v;
  for (let v = 0; v < g.v; v++) {
    const c = g.capacityMatrix[s][v];
    if (c > 0) {
      flowMatrix[s][v] = c;
      list[v].e = c;
      list[s].e = list[s].e - c;
    }
  }
  return {
    list,
    flowMatrix
  }
}

function relabel(g, u, list) {
  let minH = Infinity;
  let ptr = g.nbr[u].head;
  while(ptr !== null) {
    const v = ptr.v;
    if (list[u].h <= list[v].h) {
      minH = Math.min(minH, list[v].h);
    }
    ptr = ptr.next;
  }
  if (minH !== Infinity) {
    list[u].h = 1 + minH;
  }
  console.log('After relabeling height of vertex - ', list[u].h);
}

function push(g, flowMatrix, list, u, v) {
  console.log('\nPushing flow from ', u, ' to ', v);
  const c = getCapacity(g, flowMatrix, u, v);
  const e = list[u].e;
  const minF = Math.min(c, e);
  console.log('flow amount - ', minF);
  if (g.capacityMatrix[u][v] > 0) {
    flowMatrix[u][v] = flowMatrix[u][v] + minF;
  } else {
    flowMatrix[v][u] = flowMatrix[v][u] - minF;
  }
  list[u].e = list[u].e - minF;
  list[v].e = list[v].e + minF;
}

function discharge(g, u, list, flowMatrix) {
  console.log('\nDischarging vertex - ', u);
  while(list[u].e > 0) {
    //console.log('list[u].e - ', list[u].e);
    const v = g.nbr[u].current;
    if (v === null) {
      console.log('\nrelabel vertex - ', u);
      relabel(g, u, list);
      g.nbr[u].current = g.nbr[u].head;
    } else if (getCapacity(g, flowMatrix, u, v.v) > 0 && list[u].h === list[v.v].h+1) {
      push(g, flowMatrix, list, u, v.v);
    } else {
      g.nbr[u].current = g.nbr[u].current.next;
    }
  }
}

function relabelToFront(g, s, t) {
  const { list, flowMatrix } = initializePushRelabel(g, s);
  const l = new SingleLinkedList();
  for (let v = 0; v < g.v; v++) {
    if (v !== s && v !== t) {
      l.insertAtHead(v);
      g.nbr[v].current = g.nbr[v].head;
    }
  }
  let ptr = l.head;
  while(ptr !== null) {
    const u = ptr.v;
    console.log('\n\nChecking Vertex - ', u);
    const oldH = list[u].h;
    discharge(g, u, list, flowMatrix);
    if (list[u].h > oldH) {
      l.moveToFront(ptr);
      console.log('Moving vertex ', u, ' to front');
      console.log('List after moving to front - ', l.traverse());
    }
    ptr = ptr.next;
  }
  console.log('\nFinal excess and height list - ', list);
  console.log('\nFinal flowMatrix ', flowMatrix);
  console.log('\n\nMaximum flow in network - ', list[t].e);
}

const g1 = new DirectedGraph(5);
g1.addEdge(0, 1, 12);
g1.addEdge(0, 2, 14);
g1.addEdge(1, 2, 5);
g1.addEdge(1, 4, 16);
g1.addEdge(2, 3, 8);
g1.addEdge(3, 1, 7);
g1.addEdge(3, 4, 10);
console.log('---Graph-1---');
g1.print();

console.log('\n---Relabel-to-Front Algo---');
relabelToFront(g1, 0, 4);
console.log('\n---End---');

const g2 = new DirectedGraph(6);
g2.addEdge(0, 1, 16);
g2.addEdge(0, 2, 13);
g2.addEdge(1, 3, 12);
g2.addEdge(2, 1, 4);
g2.addEdge(2, 4, 14);
g2.addEdge(3, 2, 9);
g2.addEdge(3, 5, 20);
g2.addEdge(4, 3, 7);
g2.addEdge(4, 5, 4);
console.log('\n\n---Graph-2---');
g2.print();

console.log('\n---Relabel-to-Front Algo---');
relabelToFront(g2, 0, 5);
console.log('\n---End---');
