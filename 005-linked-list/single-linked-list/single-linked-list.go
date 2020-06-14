package main

import (
	"fmt"
)

type node struct {
	key  int
	next *node
}

type singleLinkedList struct {
	head *node
	tail *node
}

func (l *singleLinkedList) insertAtHead(key int) {
	node := node{
		key: key,
	}
	if l.head == nil {
		l.head = &node
		l.tail = &node
	} else {
		node.next = l.head
		l.head = &node
	}
}

func (l *singleLinkedList) insertAtTail(key int) {
	node := node{
		key: key,
	}
	if l.tail == nil {
		l.tail = &node
		l.head = &node
	} else {
		l.tail.next = &node
		l.tail = &node
	}
}

func (l *singleLinkedList) search(key int) (*node, error) {
	ptr := l.head
	for ptr != nil && ptr.key != key {
		ptr = ptr.next
	}
	if ptr == nil {
		return nil, fmt.Errorf("key not found: %d", key)
	}
	return ptr, nil
}

func (l *singleLinkedList) traverse() []int {
	ptr := l.head
	result := []int{}
	for ptr != nil {
		result = append(result, ptr.key)
		ptr = ptr.next
	}
	return result
}

func (l *singleLinkedList) delete(key int) (int, error) {
	var ptr1 *node = nil
	ptr2 := l.head
	for ptr2 != nil && ptr2.key != key {
		ptr1 = ptr2
		ptr2 = ptr2.next
	}
	if ptr2 != nil {
		if ptr1 == nil {
			l.head = ptr2.next
		} else {
			ptr1.next = ptr2.next
		}

		if l.tail == ptr2 {
			l.tail = ptr1
		}
		return key, nil
	}
	return -1, fmt.Errorf("key not found so can not be deleted: %d", key)
}

func new() singleLinkedList {
	l := singleLinkedList{}
	return l
}

func main() {
	l := new()

	fmt.Println("list", l.traverse())

	_, err3 := l.delete(11)
	if err3 != nil {
		fmt.Println(err3)
	}

	l.insertAtHead(4)
	v3, err3 := l.delete(4)
	if err3 != nil {
		fmt.Println(err3)
	} else {
		fmt.Println("key deleted", v3)
		fmt.Println("list after deleting", v3, l.traverse())
	}
	l.insertAtTail(8)
	l.insertAtTail(5)
	l.insertAtHead(3)
	l.insertAtHead(7)

	fmt.Println("list", l.traverse())

	_, err := l.search(6)
	if err != nil {
		fmt.Println(err)
	}

	v, _ := l.search(3)
	fmt.Println("key found", v.key)

	v2, _ := l.delete(5)
	fmt.Println("Key deleted", v2)
	fmt.Println("list after deleting 5 ", l.traverse())

	l.insertAtTail(12)
	fmt.Println("list after inserting 12 at tail ", l.traverse())

	_, err2 := l.delete(18)
	if err2 != nil {
		fmt.Println(err2)
	}
}
