// Dynamic programming
function knapsack01(values, weights, n, W) {
	const dp = [];
	for (let i = 0; i <= values.length; i++) {
		dp[i] = [];
		for (let j = 0; j <= W; j++) {
			dp[i].push(undefined);
			if (i === 0 || j === 0) {
				dp[i][j] = 0;
			}
		}
	}
	return memoizedKnapsack01(values, weights, n, W, dp);
}

function memoizedKnapsack01(values, weights, n, w, dp) {
	if (dp[n][w] !== undefined) {
		return dp[n][w];
	}
	if (weights[n-1] > w) {
		dp[n][w] = memoizedKnapsack01(values, weights, n-1, w, dp);
	} else {
		dp[n][w] = Math.max(
			memoizedKnapsack01(values, weights, n-1, w, dp),
			memoizedKnapsack01(values, weights, n-1, w - weights[n-1], dp) + values[n-1]
		)
	}
	return dp[n][w];
}

const values = [60, 100, 120];
const weights = [10, 20, 30];
console.log(knapsack01(values, weights, 3, 50));


// Need to understand logic -??
function knapSack2(W , wt , val , n) {
  // making and initializing dp array
	var dp = Array(W + 1).fill(0);

	for (let i = 1; i < n + 1; i++) {
		for (let w = W; w >= 0; w--) {
			if (wt[i - 1] <= w) {
				// finding the maximum value
				dp[w] = Math.max(dp[w], dp[w - wt[i - 1]] + val[i - 1]);
			}
		}
	}
	return dp[W]; // returning the maximum value of knapsack
}
const values2 = [60, 100, 120];
const weights2 = [10, 20, 30];
console.log(knapSack2(50, weights, values, 3));