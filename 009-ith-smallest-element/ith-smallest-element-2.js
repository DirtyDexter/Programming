let heapSize;

function ithSmallestElement(a, k) {
	if (k > a.length) {
		return;
	}
	
	heapSize = a.length;

	for (let i = Math.floor(a.length/2); i >= 0; i--) {
		minHeapify(a, i);
	}

	for (let i = a.length-1; i > a.length - k; i--) {
		const temp = a[0];
		a[0] = a[i];
		a[i] = temp;
		heapSize--;
		minHeapify(a, 0);
	}
	return a[0];
}

function minHeapify(a, i) {
	const left = 2*i;
	const right = 2*i + 1;
	let smallest = i;
	if (left <= heapSize-1 && a[left] < a[smallest]) {
		smallest = left;
	}
	if (right <= heapSize-1 && a[right] < a[smallest]) {
		smallest = right;
	}
	if (smallest !== i) {
		const temp = a[i];
		a[i] = a[smallest];
		a[smallest] = temp;
		minHeapify(a, smallest);
	}
}


const list = [29,38,12,7,43,2,17,53,9,6,14,11];
// console.log(ithSmallestElement([...list], 1));
// console.log(ithSmallestElement([...list], 2));

//console.log(ithSmallestElement([...list], 3));
console.log(ithSmallestElement([...list], 4));

// console.log(ithSmallestElement([...list], 5));

// console.log(ithSmallestElement([...list], 6));
// console.log(ithSmallestElement([...list], 7));

// console.log(ithSmallestElement([...list], 8));
// console.log(ithSmallestElement([...list], 9));
// console.log(ithSmallestElement([...list], 10));
// console.log(ithSmallestElement([...list], 11));
// console.log(ithSmallestElement([...list], 12));

// console.log(ithSmallestElement([...list], 13));