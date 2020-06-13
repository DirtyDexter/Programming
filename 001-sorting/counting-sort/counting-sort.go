package main

import "fmt"

func main() {
	a := []uint64{10, 9, 3, 8, 4, 0, 23, 18, 1, 0, 24}
	fmt.Println("Before sorting", a)
	k := getMaxElement(a)
	b := countingSort(a, k)
	fmt.Println("After sorting", b)
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

func countingSort(a []uint64, k uint64) []uint64 {
	c := make([]uint64, k+1, k+1)
	b := make([]uint64, len(a), len(a))
	for _, v := range a {
		c[v] = c[v] + 1
	}

	for i := 1; i < len(c); i++ {
		c[i] = c[i-1] + c[i]
	}

	for i := len(a) - 1; i >= 0; i-- {
		b[c[a[i]]-1] = a[i]
		c[a[i]] = c[a[i]] - 1
	}
	return b

}
