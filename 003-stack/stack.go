package main

import (
	"errors"
	"fmt"
)

type stack struct {
	list []int
	top  int
}

func (s *stack) isStackEmpty() bool {
	return s.top == -1
}

func (s *stack) isStackFull() bool {
	return s.top == len(s.list)-1
}

func (s *stack) push(val int) (int, error) {
	if s.isStackFull() {
		return -1, errors.New("overflow")
	}
	s.top = s.top + 1
	s.list[s.top] = val
	return val, nil
}

func (s *stack) pop() (int, error) {
	if s.isStackEmpty() {
		return -1, errors.New("undeflow")
	}
	x := s.list[s.top]
	s.top = s.top - 1
	return x, nil
}

func main() {
	s := stack{
		list: make([]int, 5, 5),
		top:  -1,
	}
	list := []int{3, 2, 7, 9, 4, 6, 8}
	for _, v := range list {
		_, err := s.push(v)
		if err != nil {
			fmt.Println(err)
		}
	}

	for i := 0; i < 7; i++ {
		val, err2 := s.pop()
		if err2 != nil {
			fmt.Println(err2)
		} else {
			fmt.Println("poped: ", val)
		}
	}

}
