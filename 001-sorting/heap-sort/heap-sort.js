var heapSize = 0;

function heapSort(a) {
  buildMaxHeap(a);
  for (i = a.length - 1; i >= 1; i--) {
    var tmp = a[0];
    a[0] = a[i]
    a[i] = tmp;
    heapSize = heapSize - 1;
    maxHeapify(a, 0);
  }
}

function buildMaxHeap(a) {
  heapSize = a.length;
  var mid = Math.floor((a.length-1)/2);
  for (i = mid; i >= 0; i--) {
    maxHeapify(a, i);
  }
}

function maxHeapify(a, i) {
  var l = left(i);
  var r = right(i);
  var largest = i;
  if (l < heapSize && a[l] > a[largest]) {
    largest = l;
  }
  if (r < heapSize && a[r] > a[largest]) {
    largest = r;
  }
  if (largest != i) {
    var tmp = a[i];
    a[i] = a[largest];
    a[largest] = tmp;
    maxHeapify(a, largest);
  }
}

function left(i) {
  return 2*i + 1;
}

function right(i) {
  return 2*i + 2;
}

var a = [10, 23, 1, 5, 23, 67, 8 ,9, 11, -2, 234, 123];
console.log("Before sorting", a);
heapSort(a);
console.log("After sorting", a);