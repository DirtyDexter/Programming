package maxsubarray

import "math"

// FindMaxSubArrayDac Divide and Conquer approach
// O(nlogn) complexity
func FindMaxSubArrayDac(a []int, low int, high int) (int, int, int) {
	if low == high {
		return low, high, a[low]
	}
	mid := (low + high) >> 1
	leftLow, leftHigh, leftSum := FindMaxSubArrayDac(a, low, mid)
	rightLow, rightHigh, rightSum := FindMaxSubArrayDac(a, mid+1, high)
	crossLow, crossHigh, crossSum := maxCrossSubArray(a, low, mid, high)
	if leftSum >= rightSum && leftSum >= crossSum {
		return leftLow, leftHigh, leftSum
	} else if rightSum >= leftSum && rightSum >= crossSum {
		return rightLow, rightHigh, rightSum
	} else {
		return crossLow, crossHigh, crossSum
	}
}

func maxCrossSubArray(a []int, low int, mid int, high int) (int, int, int) {
	leftSum := math.MinInt64
	sum := 0
	leftLow := -1
	for i := mid; i >= low; i-- {
		sum = sum + a[i]
		if sum > leftSum {
			leftSum = sum
			leftLow = i
		}
	}
	sum = 0
	rightSum := math.MinInt64
	rightHigh := -1
	for j := mid + 1; j <= high; j++ {
		sum = sum + a[j]
		if sum > rightSum {
			rightSum = sum
			rightHigh = j
		}
	}
	return leftLow, rightHigh, leftSum + rightSum
}
