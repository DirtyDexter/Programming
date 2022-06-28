let heapSize = 0;

function maxHeapify(a, i) {
	const l = 2*i;
	const r = 2*i + 1;
	let largest = i;
	if (l <= (heapSize - 1) && a[l] > a[i]) {
		largest = l;
	}
	if (r <= (heapSize - 1) && a[r] > a[largest]) {
		largest = r;
	}
	if (largest !== i) {
		const temp = a[largest];
		a[largest] = a[i];
		a[i] = temp;
		maxHeapify(a, largest)
	}
}

// for ascending order
function heapSort(a) {
  heapSize = a.length;
  for (let i = Math.floor(a.length/2); i >= 0; i--) {
    maxHeapify(a, i);
  }

	for (let i = a.length-1; i >= 1; i--) {
		const temp = a[0];
		a[0] = a[i];
		a[i] = temp;
		heapSize--;
		maxHeapify(a, 0);
	}
}

let minHeapSize = 0;

function minHeapify(a, i) {
	const l = 2*i;
	const r = 2*i + 1;
	let smallest = i;
	if (l <= (minHeapSize - 1) && a[l] < a[i]) {
		smallest = l;
	}
	if (r <= (minHeapSize - 1) && a[r] < a[smallest]) {
		smallest = r;
	}
	if (smallest !== i) {
		const temp = a[smallest];
		a[smallest] = a[i];
		a[i] = temp;
		minHeapify(a, smallest);
	}
}

// for descending order
function heapSort2(a) {
  minHeapSize = a.length;
  for (let i = Math.floor(a.length/2); i >= 0; i--) {
    minHeapify(a, i);
	}

	for (let i = a.length-1; i >= 1; i--) {
		const temp = a[0];
		a[0] = a[i];
		a[i] = temp;
		minHeapSize--;
		minHeapify(a, 0);
	}
}

let a = [-2, 1, 34, 8, 11, 7, 3];
heapSort(a);
console.log(a);

a = [-2, 1, 34, 8, 11, 7, 3];
heapSort2(a);
console.log(a);
