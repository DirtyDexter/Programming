function ithSmallestElement(a, p, r, i) {
	if (i > (r-p+1)) {
		return;
	}
	if (p <= r) {
		const q = partition(a, p, r);
		const k = q-p+1;
		if (k === i) {
			return a[q];
		}
		if (i < k) {
			return ithSmallestElement(a, p, q-1, i);
		} else {
			return ithSmallestElement(a, q+1, r, i-k);
		}
	}
}

function partition(a, p, r) {
	const pivot = a[r];
	let i = p-1;
	for (let j = p; j <= r-1; j++) {
		if (a[j] <= a[r]) {
			i++;
			const temp = a[i];
			a[i] = a[j];
			a[j] = temp;
		}
	}
	i++;
	const temp = a[i];
	a[i] = a[r];
	a[r] = temp;
	return i;
}


const list = [29,38,12,7,43,2,17,53,9,6,14,11];
console.log(ithSmallestElement([...list], 0, list.length-1, 1));
console.log(ithSmallestElement([...list], 0, list.length-1, 2));

console.log(ithSmallestElement([...list], 0, list.length-1, 3));
console.log(ithSmallestElement([...list], 0, list.length-1, 4));

console.log(ithSmallestElement([...list], 0, list.length-1, 5));

console.log(ithSmallestElement([...list], 0, list.length-1, 6));
console.log(ithSmallestElement([...list], 0, list.length-1, 7));

console.log(ithSmallestElement([...list], 0, list.length-1, 8));
console.log(ithSmallestElement([...list], 0, list.length-1, 9));
console.log(ithSmallestElement([...list], 0, list.length-1, 10));
console.log(ithSmallestElement([...list], 0, list.length-1, 11));
console.log(ithSmallestElement([...list], 0, list.length-1, 12));

console.log(ithSmallestElement([...list], 0, list.length-1, 13));
