package maxsubarray

import "math"

// FindMaxSubArrayLinear use linear approach
// O(n) complexity
func FindMaxSubArrayLinear(a []int) (int, int, int) {
	maxSum := math.MinInt64
	sum := 0
	low := -1
	high := -1
	currentLow := -1
	for i, v := range a {
		if sum > 0 {
			sum += v
		} else {
			sum = v
			currentLow = i
		}
		if sum > maxSum {
			maxSum = sum
			low = currentLow
			high = i
		}
	}
	return low, high, maxSum
}
