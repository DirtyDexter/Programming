// Sort in decreasing order via per unit value
function sortItems(items) {
	return items.sort((a, b) => {
		if (a.value/a.weight < b.value/b.weight) {
			return 1;
		} else if (a.value/a.weight > b.value/b.weight) {
			return -1;
		} else {
			return 0;
		}
	});
}


// Greedy approach
function fractionalKnapsack(items, W) {
	let maxValue = 0;
	for (let i = 0; i < items.length && W > 0; i++) {
		if (items[i].weight <= W) {
			maxValue += items[i].value;
			W = W - items[i].weight;
		} else {
			maxValue += (items[i].value/items[i].weight)*W;
			W = 0;
		}
	}
	return maxValue;
}

const items = [ { weight: 30, value: 120 }, { weight: 10, value: 60 }, { weight: 20, value: 100  } ];
const sortedItems = sortItems(items);
console.log(fractionalKnapsack(sortedItems, 50));
