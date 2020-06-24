package main

import "fmt"

// Node represents node of tree
type Node struct {
	key    int
	color  string
	left   *Node
	right  *Node
	parent *Node
}

// RedBlackTree represents Tree
type RedBlackTree struct {
	root *Node
	nil  *Node
}

// InorderTraverse tree
func (T *RedBlackTree) InorderTraverse(node *Node) {
	if node != T.nil {
		T.InorderTraverse(node.left)
		fmt.Printf("%d(%s)\t", node.key, node.color)
		T.InorderTraverse(node.right)
	}
}

// Search for node
func (T *RedBlackTree) Search(key int) *Node {
	ptr := T.root
	for ptr != T.nil && ptr.key != key {
		if key < ptr.key {
			ptr = ptr.left
		} else {
			ptr = ptr.right
		}
	}
	return ptr
}

// FindMin key
func (T *RedBlackTree) FindMin(ptr *Node) *Node {
	for ptr != T.nil && ptr.left != T.nil {
		ptr = ptr.left
	}
	return ptr
}

// LeftRotate node
func (T *RedBlackTree) LeftRotate(x *Node) {
	y := x.right
	x.right = y.left
	if y.left != T.nil {
		y.left.parent = x
	}
	y.parent = x.parent
	if x.parent == T.nil {
		T.root = y
	} else if x.parent.left == x {
		x.parent.left = y
	} else {
		x.parent.right = y
	}
	y.left = x
	x.parent = y
}

// RightRotate node
func (T *RedBlackTree) RightRotate(x *Node) {
	y := x.left
	x.left = y.right
	if y.right != T.nil {
		y.right.parent = x
	}
	y.parent = x.parent
	if x.parent == T.nil {
		T.root = y
	} else if x.parent.left == x {
		x.parent.left = y
	} else {
		x.parent.right = y
	}
	y.right = x
	x.parent = y
}

// Insert key in tree
func (T *RedBlackTree) Insert(key int) {
	ptr := T.root
	parent := T.nil
	for ptr != T.nil {
		parent = ptr
		if key < ptr.key {
			ptr = ptr.left
		} else {
			ptr = ptr.right
		}
	}
	newNode := T.NewNode(key)
	newNode.parent = parent
	if parent == T.nil {
		T.root = newNode
	} else if key < parent.key {
		parent.left = newNode
	} else {
		parent.right = newNode
	}
	T.InsertFixup(newNode)
}

// InsertFixup fixes RB Tree properties after node insertion
func (T *RedBlackTree) InsertFixup(z *Node) {
	for z.parent.color == "RED" {
		if z.parent == z.parent.parent.left {
			y := z.parent.parent.right
			if y.color == "RED" {
				y.color = "BLACK"
				z.parent.color = "BLACK"
				z.parent.parent.color = "RED"
				z = z.parent.parent
			} else {
				if z == z.parent.right {
					z = z.parent
					T.LeftRotate(z)
				}
				z.parent.color = "BLACK"
				z.parent.parent.color = "RED"
				T.RightRotate(z.parent.parent)
			}
		} else {
			y := z.parent.parent.left
			if y.color == "RED" {
				y.color = "BLACK"
				z.parent.color = "BLACK"
				z.parent.parent.color = "RED"
				z = z.parent.parent
			} else {
				if z == z.parent.left {
					z = z.parent
					T.RightRotate(z)
				}
				z.parent.color = "BLACK"
				z.parent.parent.color = "RED"
				T.LeftRotate(z.parent.parent)
			}
		}
	}
	T.root.color = "BLACK"
}

// Transpalant changes parent-child relationship
func (T *RedBlackTree) Transpalant(u *Node, v *Node) {
	if u.parent == T.nil {
		T.root = v
	} else if u.parent.left == u {
		u.parent.left = v
	} else {
		u.parent.right = v
	}
	v.parent = u.parent
}

// Delete key in tree
func (T *RedBlackTree) Delete(key int) (int, error) {
	z := T.Search(key)
	if z == T.nil {
		return key, fmt.Errorf("key not found: %d", key)
	}
	y := z
	yColor := y.color
	var x *Node
	if z.left == T.nil {
		x = z.right
		T.Transpalant(z, z.right)
	} else if z.right == T.nil {
		x = z.left
		T.Transpalant(z, z.left)
	} else {
		y = T.FindMin(z.right)
		yColor = y.color
		x = y.right
		if z.right == y {
			x.parent = y
		} else {
			T.Transpalant(y, y.right)
			y.right = z.right
			y.right.parent = y
		}
		T.Transpalant(z, y)
		y.left = z.left
		y.left.parent = y
		y.color = z.color
	}
	if yColor == "BLACK" {
		T.DeleteFixup(x)
	}
	return key, nil
}

// DeleteFixup fixes BR Tree properties after node deletion
func (T *RedBlackTree) DeleteFixup(x *Node) {
	for x != T.root && x.color == "BLACK" {
		if x == x.parent.left {
			w := x.parent.right
			if w.color == "RED" {
				w.color = "BLACK"
				x.parent.color = "RED"
				T.LeftRotate(x.parent)
				w = x.parent.right
			}
			if w.left.color == "BLACK" && w.right.color == "BLACK" {
				w.color = "RED"
				x = x.parent
			} else {
				if w.right.color == "BLACK" {
					w.left.color = "BLACK"
					w.color = "RED"
					T.RightRotate(w)
					w = x.parent.right
				}
				w.color = x.parent.color
				w.right.color = "BLACK"
				x.parent.color = "BLACK"
				T.LeftRotate(x.parent)
				x = T.root
			}
		} else {
			w := x.parent.left
			if w.color == "RED" {
				w.color = "BLACK"
				x.parent.color = "RED"
				T.RightRotate(x.parent)
				w = x.parent.left
			}
			if w.left.color == "BLACK" && w.right.color == "BLACK" {
				w.color = "RED"
				x = x.parent
			} else {
				if w.left.color == "BLACK" {
					w.right.color = "BLACK"
					w.color = "RED"
					T.LeftRotate(w)
					w = x.parent.left
				}
				w.color = x.parent.color
				w.left.color = "BLACK"
				x.parent.color = "BLACK"
				T.RightRotate(x.parent)
				x = T.root
			}
		}
	}
	x.color = "BLACK"
}

// NewNode return reference to new node
func (T *RedBlackTree) NewNode(key int) *Node {
	return &Node{
		key:    key,
		color:  "RED",
		left:   T.nil,
		right:  T.nil,
		parent: T.nil,
	}
}

// NewTree returns reference to new BST
func NewTree() *RedBlackTree {
	nilNode := &Node{
		color: "BLACK",
	}
	return &RedBlackTree{
		root: nilNode,
		nil:  nilNode,
	}
}

func main() {

	rbt := NewTree()

	input := []int{7, 3, 18, 10, 22, 8, 11, 26, 2, 6, 13}

	for _, v := range input {
		fmt.Printf("\nInserting %d :: ", v)
		rbt.Insert(v)
		fmt.Print("tree traversal :: ")
		rbt.InorderTraverse(rbt.root)
		fmt.Println()
	}

	deleteList := []int{18, 11, 3, 10, 22}
	for _, v := range deleteList {
		fmt.Printf("\nTree deletion %d :: ", v)
		_, err := rbt.Delete(v)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Print("tree traversal :: ")
		rbt.InorderTraverse(rbt.root)
		fmt.Println()
	}

}
