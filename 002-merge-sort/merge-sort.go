package main

import "fmt"

func main() {
	a := []int{1, 2, 3, 9, 2, 6}
	fmt.Println("Before sorting", a)
	mergeSort(a, 0, len(a)-1)
	fmt.Println("After sorting", a)
}

func mergeSort(a []int, p int, r int) {
	if p < r {
		q := (p + r) / 2
		mergeSort(a, p, q)
		mergeSort(a, q+1, r)
		merge(a, p, q, r)
	}
}

func merge(a []int, p int, q int, r int) {
	n1 := q - p + 1
	n2 := r - q
	i := 0
	j := 0
	k := p
	left := make([]int, n1, n1)
	right := make([]int, n2, n2)
	for i = 0; i < n1; i++ {
		left[i] = a[p+i]
	}
	for j = 0; j < n2; j++ {
		right[j] = a[q+1+j]
	}
	i = 0
	j = 0
	for i < n1 && j < n2 {
		if left[i] <= right[j] {
			a[k] = left[i]
			i++
		} else {
			a[k] = right[j]
			j++
		}
		k++
	}
	for i < n1 {
		a[k] = left[i]
		i++
		k++
	}

	for j < n2 {
		a[k] = right[j]
		j++
		k++
	}

}
