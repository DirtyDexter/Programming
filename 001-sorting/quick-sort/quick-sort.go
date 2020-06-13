package main

import (
	"fmt"
	"math/rand"
)

func main() {
	a := []int{10, 9, 3, -1, 8, 4, 23, 98, 1, 34}
	fmt.Println("Before sorting", a)
	quickSort(a, 0, len(a)-1)
	fmt.Println("After sorting", a)
}

func quickSort(a []int, p int, r int) {
	if p < r {
		q := randomPartition(a, p, r)
		quickSort(a, p, q-1)
		quickSort(a, q+1, r)
	}
}

func randomPartition(a []int, p int, r int) int {
	pivot := getRandom(p, r)
	swap(&a[pivot], &a[r])
	return partition(a, p, r)
}

func getRandom(min int, max int) int {
	r := rand.New(rand.NewSource(55))
	return r.Intn(max-min+1) + min
}

func partition(a []int, p int, r int) int {
	i := p - 1
	for j := p; j < r; j++ {
		if a[j] <= a[r] {
			i = i + 1
			swap(&a[i], &a[j])
		}
	}
	i = i + 1
	swap(&a[i], &a[r])
	return i
}

func swap(x *int, y *int) {
	tmp := *x
	*x = *y
	*y = tmp
}
