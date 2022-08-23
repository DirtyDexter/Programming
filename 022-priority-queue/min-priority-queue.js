// Priority Queue
// Using Binary-Heap
// Complexity - O(lgn) for all operations

class MinPriorityQueue {
  list = [];
  heapSize = 0;

  parent(i) {
    return Math.floor(i/2);
  }

  left(i) {
    return 2*i;
  }

  right(i) {
    return 2*i + 1;
  }

  minHeapify(i) {
    const left = this.left(i);
    const right = this.right(i);
    let smallest = i;
    if (left < this.heapSize && this.list[left] < this.list[smallest]) {
      smallest = left;
    }
    if (right < this.heapSize && this.list[right] < this.list[smallest]) {
      smallest = right;
    }
    if (smallest !== i) {
      const temp = this.list[i];
      this.list[i] = this.list[smallest];
      this.list[smallest] = temp;
      this.minHeapify(smallest);
    }
  }

  heapMinimum() {
    return this.list[0];
  }

  heapExtractMin() {
    if (this.heapSize === 0) {
      return undefined;
    }
    const min = this.list[0];
    this.list[0] = this.list[this.heapSize - 1];
    this.heapSize = this.heapSize - 1;
    //this.list = this.list.slice(0, this.heapSize);
    this.minHeapify(0);
    return min;
  }

  heapDecreaseKey(i, key) {
    if (this.list[i] < key) {
      return 'New value is greater than current value';
    }
    this.list[i] = key;
    while (i > 0 && this.list[this.parent(i)] > this.list[i]) {
      const temp = this.list[this.parent(i)];
      this.list[this.parent(i)] = this.list[i];
      this.list[i] = temp;
      i = this.parent(i);
    }
  }

  minHeapInsert(key) {
    this.heapSize = this.heapSize + 1;
    this.list[this.heapSize - 1] = Infinity;
    this.heapDecreaseKey(this.heapSize - 1, key);
  }
}

const q1 = new MinPriorityQueue();
q1.minHeapInsert(1);
q1.minHeapInsert(34);
q1.minHeapInsert(8);
q1.minHeapInsert(-2);
q1.minHeapInsert(11);
q1.minHeapInsert(7);
q1.minHeapInsert(3);

console.log('\nPriority Queue - ', q1.list.slice(0, q1.heapSize));

console.log('\nHeapMinimum - ', q1.heapMinimum());

console.log('\nExtract Min - ', q1.heapExtractMin());
console.log('Priority Queue - ', q1.list.slice(0, q1.heapSize));

console.log('\nExtract Min - ', q1.heapExtractMin());
console.log('Priority Queue - ', q1.list.slice(0, q1.heapSize));
