package main

import (
	"fmt"
)

var heapSize int

func main() {
	a := []int{10, 9, 2, 11, 1, 6}
	fmt.Println("Before sorting", a)
	heapSort(a)
	fmt.Println("After sorting", a)
}

func heapSort(a []int) {
	buildMaxHeap(a)
	for i := len(a) - 1; i >= 1; i-- {
		tmp := a[0]
		a[0] = a[i]
		a[i] = tmp
		heapSize = heapSize - 1
		maxHeapify(a, 0)
	}
}

func buildMaxHeap(a []int) {
	heapSize = len(a)
	mid := (len(a) - 1) / 2
	for i := mid; i >= 0; i-- {
		maxHeapify(a, i)
	}
}

func maxHeapify(a []int, i int) {
	l := left(i)
	r := right(i)
	largest := i
	if l < heapSize && a[l] > a[largest] {
		largest = l
	}

	if r < heapSize && a[r] > a[largest] {
		largest = r
	}

	if largest != i {
		tmp := a[i]
		a[i] = a[largest]
		a[largest] = tmp
		maxHeapify(a, largest)
	}

}

func left(i int) int {
	return 2*i + 1
}

func right(i int) int {
	return 2*i + 2
}
