// Find number of ways
function coinChange(coins, amount, totalCoins) {
  const dp = new Array(totalCoins + 1).fill().map(() => new Array(amount + 1).fill(-1));
  const ways = memoizedCoinChange(coins, amount, totalCoins, dp);
  return ways;
}

function memoizedCoinChange(coins, amount, totalCoins, dp) {
  if (dp[totalCoins][amount] !== -1) {
    return dp[totalCoins][amount];
  }
  if (totalCoins === 0) {
    return 0;
  }
  if (amount === 0) {
    dp[totalCoins][amount] = 1;
  } else {
    if (coins[totalCoins-1] <= amount) {
      dp[totalCoins][amount] = memoizedCoinChange(coins, amount - coins[totalCoins-1], totalCoins, dp) + memoizedCoinChange(coins, amount, totalCoins-1, dp)
    } else {
      dp[totalCoins][amount] = memoizedCoinChange(coins, amount, totalCoins-1, dp);
    }
  }
  return dp[totalCoins][amount];
}

const coins = [1,3,4];
const amount = 6;
const totalCoins = coins.length;
console.log(coinChange(coins, amount, totalCoins));

// Find minimum number of coins required
function coinChange2(coins, n) {
  const dp = new Array(n+1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = Infinity;
    let result = Infinity;
    for (let c = 0; c < coins.length; c++) {
      if (i - coins[c] >= 0) {
        result = dp[i - coins[c]];
      }
      dp[i] = Math.min(dp[i], result + 1);
    }
  }
  return dp[n] === Infinity ? -1 : dp[n];
}


const coins2 = [1,2,5];
const amount2 = 11;
console.log(coinChange2(coins2, amount2));


// Find minimum number of coins required
function coinChange3(coins, amount, totalCoins) {
  const dp = new Array(totalCoins + 1).fill().map(() => new Array(amount + 1).fill(-1));
  const noOfcoins = memoizedCoinChange3(coins, amount, totalCoins, dp);
  return noOfcoins === Infinity ? -1 : noOfcoins;
}

function memoizedCoinChange3(coins, amount, totalCoins, dp) {
  if (dp[totalCoins][amount] !== -1) {
    return dp[totalCoins][amount];
  }
  if (totalCoins === 0) {
    return Infinity;
  }
  if (amount === 0) {
    dp[totalCoins][amount] = 0;
  } else {
    if (coins[totalCoins-1] <= amount) {
      dp[totalCoins][amount] = Math.min(
        1 + memoizedCoinChange3(coins, amount - coins[totalCoins-1], totalCoins, dp),
        memoizedCoinChange3(coins, amount, totalCoins-1, dp)
      );
    } else {
      dp[totalCoins][amount] = memoizedCoinChange3(coins, amount, totalCoins-1, dp);
    }
  }
  return dp[totalCoins][amount];
}

const coins3 = [1,3,4];
const amount3 = 6;
const totalCoins3 = coins3.length;
console.log(coinChange3(coins3, amount3, totalCoins3));
