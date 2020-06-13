package main

import (
	"fmt"
	"math"
)

type arrayEle float64

type node struct {
	key  arrayEle
	next *node
}

type linkedList struct {
	head *node
}

func (l *linkedList) insert(key arrayEle) {
	newNode := node{
		key: key,
	}
	var ptr1 *node = nil
	ptr2 := l.head
	for ptr2 != nil && ptr2.key <= key {
		ptr1 = ptr2
		ptr2 = ptr2.next
	}
	if ptr1 == nil {
		newNode.next = l.head
		l.head = &newNode
	} else {
		newNode.next = ptr1.next
		ptr1.next = &newNode
	}

}

func (l *linkedList) traverse() []arrayEle {
	c := []arrayEle{}
	ptr := l.head
	for ptr != nil {
		c = append(c, ptr.key)
		ptr = ptr.next
	}
	return c
}

func bucketSort(a []arrayEle) []arrayEle {
	b := make([]linkedList, len(a), len(a))

	for _, v := range a {
		floatVal := float64(v * arrayEle(len(a)))
		index := int(math.Floor(floatVal))
		b[index].insert(v)
	}

	c := []arrayEle{}
	for i := range b {
		sorted := b[i].traverse()
		c = append(c, sorted...)
	}
	return c
}

func main() {
	a := []arrayEle{.10, .19, .32, .55, 0.91, 0.99, .45, .34, .23, .48, 0.89, 0.992, .41, .24, .24, 0.02}
	fmt.Println("Before sorting", a)
	b := bucketSort(a)
	fmt.Println("After sorting", b)
}
