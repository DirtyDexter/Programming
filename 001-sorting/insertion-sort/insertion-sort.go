package main

import "fmt"

func main() {
	a := []int{10, 23, 1, 5, 23, 67, 8, 9}
	fmt.Println("Before sorting", a)
	insertionSort(a)
	fmt.Println("After sorting", a)
}

func insertionSort(a []int) {
	for j := 1; j < len(a); j++ {
		key := a[j]
		i := j - 1
		for i >= 0 && a[i] > key {
			a[i+1] = a[i]
			i--
		}
		a[i+1] = key
	}
}
