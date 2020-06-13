// use linear approach
// O(n) complexity

function maxSubArray(a) {
  let sum = 0;
  let low = -1;
  let currentLow = -1;
  let high = -1;
  let maxSum = -Infinity
  for (let i = 0; i < a.length; i++) {
    if (sum > 0) {
      sum = sum + a[i]
    } else {
      sum = a[i]
      currentLow = i;
    }
    if (sum > maxSum) {
      maxSum = sum;
      low = currentLow;
      high = i;
    }
  }
  return {
    low,
    high,
    sum: maxSum
  }
}

const a = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
const { low, high, sum } = maxSubArray(a);
console.log(low, high, sum);

const b = [13, -3, -25, 20, -3, -16, 15, -4, 7]
const { low: low2, high: high2, sum: sum2 } = maxSubArray(b);
console.log(low2, high2, sum2);