package main

import (
	"errors"
	"fmt"
)

type queue struct {
	list []int
	head int
	tail int
}

func (q *queue) isQueueEmpty() bool {
	return q.head == -1
}

func (q *queue) isQueueFull() bool {
	return q.head == (q.tail+1)%len(q.list)
}

func (q *queue) enqueue(val int) (int, error) {
	if q.isQueueFull() {
		return -1, errors.New("overflow")
	}
	if q.head == -1 {
		q.head = 0
	}
	q.tail = (q.tail + 1) % len(q.list)
	q.list[q.tail] = val
	return val, nil
}

func (q *queue) dequeue() (int, error) {
	if q.isQueueEmpty() {
		return -1, errors.New("underflow")
	}
	x := q.list[q.head]
	if q.head == q.tail {
		q.head = -1
		q.tail = -1
	} else {
		q.head = (q.head + 1) % len(q.list)
	}
	return x, nil
}

func (q *queue) traverse() []int {
	start := q.head
	result := []int{}
	for start != q.tail {
		result = append(result, q.list[start])
		start = (start + 1) % len(q.list)
	}
	result = append(result, q.list[start])
	return result
}

func new(capacity int) queue {
	q := queue{
		list: make([]int, capacity, capacity),
		head: -1,
		tail: -1,
	}
	return q
}

func main() {
	q := new(5)

	q.enqueue(5)
	q.enqueue(8)
	q.enqueue(6)
	q.enqueue(2)
	q.enqueue(9)
	fmt.Println("queue", q.traverse())
	_, err := q.enqueue(11)
	if err != nil {
		fmt.Println(err)
	}
	for i := 1; i < 8; i++ {
		v, err := q.dequeue()
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println("dequeue ", v)
		}
	}
	q.enqueue(23)
	q.enqueue(12)
	q.enqueue(23)
	fmt.Println("queue", q.traverse())
	v, err := q.dequeue()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("dequeue ", v)
	}
	fmt.Println("queue", q.traverse())
}
