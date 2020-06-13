package main

import (
	maxsubarray "Programming/003-max-subarray/max-sub-array"
	"fmt"
)

func main() {
	a := []int{13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7}
	low, high, sum := maxsubarray.FindMaxSubArrayDac(a, 0, len(a)-1)
	fmt.Println(low, high, sum)

	a = []int{13, -3, -25, 20, -3, -16, 15, -4, 7}
	low, high, sum = maxsubarray.FindMaxSubArrayDac(a, 0, len(a)-1)
	fmt.Println(low, high, sum)

	a = []int{13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7}
	low, high, sum = maxsubarray.FindMaxSubArrayLinear(a)
	fmt.Println(low, high, sum)

	a = []int{13, -3, -25, 20, -3, -16, 15, -4, 7}
	low, high, sum = maxsubarray.FindMaxSubArrayLinear(a)
	fmt.Println(low, high, sum)
}
