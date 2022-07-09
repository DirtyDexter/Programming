function lcs(x, y) {
	const dp = [];
	const direction = [];
	for (let i = 0; i <= x.length; i++) {
		dp[i] = [];
		direction[i] = [];
		for (let j = 0; j <= y.length; j++) {
			dp[i].push(undefined);
			direction[i].push(undefined);
		}
	}
	for (let i = 0; i <= x.length; i++) {
		dp[i][0] = 0;
	}

	for (let j = 1; j <= y.length; j++) {
		dp[0][j] = 0;
	}
	const lcsLength =  memoizedLcs(x, y, dp, x.length, y.length, direction);
	console.log('LCS Length', lcsLength);
	const lcsSeq = [];
	printLcs(direction, x, x.length, y.length, lcsSeq);
	console.log('LCS: ', lcsSeq.join(''));
}

function memoizedLcs(x, y, dp, i , j, direction) {
	if (dp[i][j] !== undefined) {
		return dp[i][j];
	}
	if (x[i-1] === y[j-1]) {
		dp[i][j] = memoizedLcs(x, y, dp, i-1, j-1, direction) + 1;
		direction[i][j] = 'side';
	} else {
		const leftDp = memoizedLcs(x, y, dp, i, j-1, direction);
		const upDp = memoizedLcs(x, y, dp, i-1, j, direction);
		if (upDp >= leftDp) {
			dp[i][j] = upDp;
			direction[i][j] = 'up';
		} else {
			dp[i][j] = leftDp;
			direction[i][j] = 'left';
		}
	}
	return dp[i][j];
}

function printLcs(direction, x, i , j, lcsSeq) {
	if (i === 0 || j === 0) {
		return;
	}
	if (direction[i][j] === 'side') {
		printLcs(direction, x, i-1, j-1, lcsSeq);
		lcsSeq.push(x[i-1]);
	} else if (direction[i][j] === 'up') {
		printLcs(direction, x, i-1, j, lcsSeq);
	} else {
		printLcs(direction, x, i, j-1, lcsSeq);
	}
}



const x = 'ACCGGTCGAGTGCGCGGAAGCCGGCCGAA';
const y = 'GTCGTTCGGAATGCCGTTGCTCTGTAAA';
lcs(x,y);