// Min no of operations to convert one string to other string
// Allowed operations - Insert, Delete and Replace
// Copy character of no change required

function editDistance(x, y) {
  const dp = [];
	const operation = [];
  for (let i = 0; i <= x.length; i++) {
		dp[i] = [];
		operation[i] = [];
		for (let j = 0; j <= y.length; j++) {
			dp[i].push(undefined);
			operation[i].push(undefined);
			if (j === 0) {
				dp[i][j] = i;
				if (i !== 0) {
					operation[i][j] = 'Delete';
				}
			}
			if (i === 0) {
				dp[i][j] = j;
				if (j !== 0) {
					operation[i][j] = 'Insert';
				}
			}
		}
	}
	const noOfOperations = memoizedEditDistance(x, y, x.length, y.length, dp, operation);
	const operationSeq = [];
	printOperations(operation, x, y, x.length, y.length, operationSeq);
	console.log('Operations:\n', operationSeq.join('\n'));
	console.log('Total operations - ', noOfOperations);
}

function memoizedEditDistance(x, y, n, m, dp, operation) {
	if (dp[n][m] !== undefined) {
		return dp[n][m];
	}
	if (x[n-1] === y[m-1]) {
		dp[n][m] = memoizedEditDistance(x, y, n-1, m-1, dp, operation);
		operation[n][m] = 'Copy';
	} else {
		const insertCost = memoizedEditDistance(x, y, n, m-1, dp, operation); // insert
		const deleteCost = memoizedEditDistance(x, y, n-1, m, dp, operation); // delete
		const replaceCost = memoizedEditDistance(x, y, n-1, m-1, dp, operation); // replace

		let minCost = insertCost;
		let operationType = 'Insert';
		if (deleteCost < minCost) {
			minCost = deleteCost;
			operationType = 'Delete';
		}
		if (replaceCost < minCost) {
			minCost = replaceCost;
			operationType = 'Replace';
		}
		dp[n][m] = 1 + minCost;
		operation[n][m] = operationType;
	}
	return dp[n][m];
}

function printOperations(operation, x, y, i , j, operationSeq) {
	if (i === 0 && j === 0) {
		return;
	}
	if (operation[i][j] === 'Replace') {
		printOperations(operation, x, y, i-1, j-1, operationSeq);
		operationSeq.push(`Replace -> ${x[i-1]} by ${y[j-1]}`);
	} else if (operation[i][j] === 'Insert') {
		printOperations(operation, x, y, i, j-1, operationSeq);
		operationSeq.push(`Insert -> ${y[j-1]}`);
	} else if (operation[i][j] === 'Delete') {
		printOperations(operation, x, y, i-1, j, operationSeq);
		operationSeq.push(`Delete -> ${x[i-1]}`);
	} else {
		printOperations(operation, x, y, i-1, j-1, operationSeq);
		operationSeq.push(`Copy -> ${x[i-1]}`);
	}
}

const x = 'algorithm';
const y = 'altruistic';
editDistance(x, y);