// Minimum Spanning Tree

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


class UndirectedGraph {
  v;
  adj;
  edges = [];
  edgeMatrix;

  constructor(n) {
    this.v = n;
    this.adj = new Array(n).fill().map(() => new SingleLinkedList());
    this.edgeMatrix = new Array(n).fill().map(() => new Array(n));
  }

  addEdge(u, v, w) {
    this.adj[u].insertAtHead(v);
    this.adj[v].insertAtHead(u);
    this.edges.push({
      u,
      v,
      w
    });
    this.edgeMatrix[u][v] = w;
    this.edgeMatrix[v][u] = w;
  }

  print() {
    for (let i = 0; i < this.v; i++) {
      const edges = this.adj[i].traverse();
      console.log('node - ', i, ' edges - ', edges);
    }
  }
}

class KruskalAlgo {
  g;
  parent;
  rank;

  constructor(g) {
    this.g = g;
    this.parent = new Array(this.g.v);
    this.rank = new Array(this.g.v);
  }

  makeSet(u) {
    this.parent[u] = u;
    this.rank[u] = 0;
  }

  findSet(u) {
    if (this.parent[u] !== u) {
      this.parent[u] = this.findSet(this.parent[u]);
    }
    return this.parent[u];
  }

  union(u, v) {
    this.linkSet(this.findSet(u), this.findSet(v));
  }

  linkSet(u, v) {
    if (this.rank[u] > this.rank[v]) {
      this.parent[v] = u;
    } else {
      this.parent[u] = v;
      if (this.rank[u] === this.rank[v]) {
        this.rank[v] += 1;
      }
    }
  }

  sortItems(items) {
    return items.sort((a, b) => {
      if (a.w < b.w) {
        return -1;
      } else if (a.w > b.w) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  mst() {
    for (let i = 0; i < this.g.v; i++) {
      this.makeSet(i);
    }
    const mstEdges = [];    
    const sortedEdges = this.sortItems([...this.g.edges]);
    // console.log('Sorted Edges --- ');
    // for (let i = 0; i < sortedEdges.length; i++) {
    //   console.log('u, v, w ', sortedEdges[i].u, sortedEdges[i].v, sortedEdges[i].w);
    // }
    for (let i = 0; i < sortedEdges.length; i++) {
      const { u, v } = sortedEdges[i];
      if (this.findSet(u) !== this.findSet(v)) {
        mstEdges.push(sortedEdges[i]);
        this.union(u, v);
      }
    }
    console.log('MST Edges --- ');
    let weight = 0;
    for (let i = 0; i < mstEdges.length; i++) {
      console.log('u, v, w ', mstEdges[i].u, mstEdges[i].v, mstEdges[i].w);
      weight += mstEdges[i].w;
    }
    console.log('Total MST weight --- ', weight);
  }
}

class PrimAlgo {
  g;

  constructor(g) {
    this.g = g;
  }

  mst() {

  }
}

const g = new UndirectedGraph(9);
g.addEdge(0, 1, 4);
g.addEdge(0, 7, 8);
g.addEdge(1, 7, 11);
g.addEdge(1, 2, 8);
g.addEdge(2, 8, 2);
g.addEdge(2, 5, 4);
g.addEdge(2, 3, 7);
g.addEdge(3, 5, 14);
g.addEdge(3, 4, 9);
g.addEdge(4, 5, 10);
g.addEdge(5, 6, 2);
g.addEdge(6, 7, 1);
g.addEdge(6, 8, 6);
g.addEdge(7, 8, 7);

console.log('Graph print');
g.print();
console.log('-----------------');

console.log('MST by Kruskal Algo');
const kmst = new KruskalAlgo(g);
kmst.mst();
console.log('-----------------');
