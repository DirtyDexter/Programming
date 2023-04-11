// There are 'n' stones in a row from 0 to n-1. For every ith stone , there are 2 values associated with it, a[i] and b[i] . 
// You have to remove all the stones from the row one by one. Removing the ith stone follows the rule :

// If (i-1)th and (i+1)th stones are still present , then , cost of removing the ith stone is b[i].

// if either (i-1)th or (i+1)th stone is present , then cost of removing the ith stone is a[i].

// if neither (i-1)th nor (i+1)th stone is present , the cost of removing the ith stone is 0.

// Find the minimum total cost of removing all the stones.

// Constraints :
// 1 <= n <= 50000
// 1 <= a[i] , b[i] <= 1000


function stoneGame(a, b) {
  var n = a.length;
  if (n === 0) {
    return 0;
  }

  var dp = new Array(n).fill().map(() => new Array(2).fill(-1));

  function dfs(index, prevRemoved) {
    if (dp[index][prevRemoved] !== -1) {
      return dp[index][prevRemoved];
    }

    if (index === n-1) {
      if (prevRemoved === 1) {
        dp[index][prevRemoved] = 0;
      } else {
        dp[index][prevRemoved] = a[index];
      }
      return  dp[index][prevRemoved];
    }

    if (prevRemoved === 1) {
      var removeCenter = dfs(index+1, 1) + a[index];
      var removeFree = dfs(index+1, 0);
      dp[index][prevRemoved] = Math.min(removeCenter, removeFree);
    } else {
      var removeCenter = dfs(index+1, 1) + b[index];
      var removeRight = dfs(index+1, 0) + a[index];
      dp[index][prevRemoved] = Math.min(removeCenter, removeRight);
    }
    return dp[index][prevRemoved];
  }

  return dfs(0, 1);
}
