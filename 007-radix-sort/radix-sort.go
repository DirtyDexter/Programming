package main

import "fmt"

func main() {
	a := []uint64{10, 19, 32, 55, 45, 34, 23, 48, 41, 24, 24}
	fmt.Println("Before sorting", a)
	radixSort(a)
	fmt.Println("After sorting", a)
}

func radixSort(a []uint64) {
	maxElem := getMaxElement(a)
	var exp uint64
	for exp = 1; maxElem/exp > 0; exp = exp * 10 {
		countingSort(a, exp)
	}
}

func countingSort(a []uint64, exp uint64) {
	c := make([]int, 10, 10)
	b := make([]uint64, len(a), len(a))

	for _, v := range a {
		ithDigit := (v / exp) % 10
		c[ithDigit] = c[ithDigit] + 1
	}

	for i := 1; i < len(c); i++ {
		c[i] = c[i-1] + c[i]
	}

	for i := len(a) - 1; i >= 0; i-- {
		ithDigit := (a[i] / exp) % 10
		b[c[ithDigit]-1] = a[i]
		c[ithDigit] = c[ithDigit] - 1
	}

	for i, v := range b {
		a[i] = v
	}
}

func getMaxElement(a []uint64) uint64 {
	max := a[0]
	for i := 1; i < len(a); i++ {
		if a[i] > max {
			max = a[i]
		}
	}
	return max
}
