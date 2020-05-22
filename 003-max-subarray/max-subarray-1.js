// Complexity O(nlogn)
// Divide and conquer approach

function maxSubArray(a, low, high) {
  if (low === high) {
    return {
      low,
      high,
      sum: a[low]
    };
  } else {
    const mid = Math.floor((low + high) / 2);
    const { low: leftLow, high: leftHigh, sum: leftSum } = maxSubArray(a, low, mid);
    const { low: rightLow, high: rightHigh, sum: rightSum } = maxSubArray(a, mid + 1, high);
    const { low: crossLow, high: crossHigh, sum: crossSum} = maxCrossSubArray(a, low, mid, high);
    if (leftSum >= rightSum && leftSum >= crossSum) {
      return { low: leftLow, high: leftHigh, sum: leftSum };
    } else if (rightSum >= leftSum && rightSum >= crossSum) {
      return { low: rightLow, high: rightHigh, sum: rightSum };
    } else {
      return { low: crossLow, high: crossHigh, sum: crossSum };
    }
  }
}

function maxCrossSubArray(a, low, mid, high) {
  let leftSum = -Infinity
  let sum = 0;
  let leftLow = -1;
  for (let i = mid; i >= low; i--) {
    sum = sum + a[i];
    if (sum > leftSum) {
      leftSum = sum;
      leftLow = i;
    }
  }
  let rightSum = -Infinity
  sum = 0;
  let rightHigh = -1;
  for (let j = mid + 1; j <= high; j++) {
    sum = sum + a[j];
    if (sum > rightSum) {
      rightSum = sum;
      rightHigh = j;
    }
  }
  return {
    low: leftLow,
    high: rightHigh,
    sum: leftSum + rightSum
  };
}

const a = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
const { low, high, sum } = maxSubArray(a, 0, a.length - 1);
console.log(low, high, sum);

const b = [13, -3, -25, 20, -3, -16, 15, -4, 7]
const { low: low2, high: high2, sum: sum2 } = maxSubArray(b, 0, b.length-1);
console.log(low2, high2, sum2);