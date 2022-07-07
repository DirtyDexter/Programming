// Given a rod of length n inches and an array of prices that contains prices of all pieces of size smaller than n.
// Determine the maximum value obtainable by cutting up the rod and selling the pieces

function rodCut(price, n) {
	const dp = [];
	return memoizedRodCut(price, n, dp);
}

function memoizedRodCut(price, n , dp) {
	if (dp[n] !== undefined) {
		return dp[n];
	}
	let q = -Infinity;
	if (n === 0) {
		q = 0;
	} else {
		for (let i = 1; i <= n; i++) {
			q = Math.max(q, price[i-1] + memoizedRodCut(price, n-i, dp));
		}
	}
	dp[n] = q;
	return q;
}

const priceList = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
console.log(rodCut(priceList, 10));


function rodCut2(price, n) {
	const dp = [];
	return memoizedRodCut2(price, n, dp);
}

function memoizedRodCut2(price, n, dp) {
	if (dp[n] !== undefined) {
		return dp[n];
	}
	let q = -Infinity;
	if (n === 1) {
		q = price[n-1];
	} else {
		q = Math.max(price[n-1], maxPair(price, n, dp));
	}
	dp[n] = q;
	return q;
}

function maxPair(price, n, dp) {
	let max = -Infinity;
	for (let i = 1; i < n; i++) {
		max = Math.max(max, memoizedRodCut2(price, i , dp) + memoizedRodCut2(price, n-i , dp));
	}
	return max;
}

const priceList2 = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
console.log(rodCut2(priceList2, 10));