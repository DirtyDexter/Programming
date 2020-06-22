package main

import "fmt"

// Node represents node of tree
type Node struct {
	key    int
	left   *Node
	right  *Node
	parent *Node
}

// BinarySearchTree represents Tree
type BinarySearchTree struct {
	root *Node
}

// NewNode return reference to new node
func (t *BinarySearchTree) NewNode(key int) *Node {
	return &Node{
		key: key,
	}
}

// InorderTraverse tree
func (t *BinarySearchTree) InorderTraverse(node *Node) {
	if node != nil {
		t.InorderTraverse(node.left)
		fmt.Printf("%d\t", node.key)
		t.InorderTraverse(node.right)
	}
}

// Search for node
func (t *BinarySearchTree) Search(key int) *Node {
	ptr := t.root
	for ptr != nil && ptr.key != key {
		if key < ptr.key {
			ptr = ptr.left
		} else {
			ptr = ptr.right
		}
	}
	return ptr
}

// FindMin key
func (t *BinarySearchTree) FindMin(ptr *Node) *Node {
	for ptr != nil && ptr.left != nil {
		ptr = ptr.left
	}
	return ptr
}

// FindMax key
func (t *BinarySearchTree) FindMax(ptr *Node) *Node {
	for ptr != nil && ptr.right != nil {
		ptr = ptr.right
	}
	return ptr
}

// FindInorderSuccessor of given node
func (t *BinarySearchTree) FindInorderSuccessor(ptr *Node) *Node {
	if ptr != nil {
		if ptr.right != nil {
			return t.FindMin(ptr.right)
		}
		y := ptr
		x := ptr.parent
		for x != nil && x.right == y {
			y = x
			x = x.parent
		}
		return x
	}
	return ptr
}

// FindInorderPredecessor of given node
func (t *BinarySearchTree) FindInorderPredecessor(ptr *Node) *Node {
	if ptr != nil {
		if ptr.left != nil {
			return t.FindMax(ptr.left)
		}
		y := ptr
		x := ptr.parent
		for x != nil && x.left == y {
			y = x
			x = x.parent
		}
		return x
	}
	return ptr
}

// Insert key in tree
func (t *BinarySearchTree) Insert(key int) {
	ptr := t.root
	var parent *Node = nil
	for ptr != nil {
		parent = ptr
		if key < ptr.key {
			ptr = ptr.left
		} else {
			ptr = ptr.right
		}
	}
	newNode := t.NewNode(key)
	if parent == nil {
		t.root = newNode
	} else if key < parent.key {
		parent.left = newNode
	} else {
		parent.right = newNode
	}
	newNode.parent = parent
}

// Transpalant changes parent-child relationship
func (t *BinarySearchTree) Transpalant(u *Node, v *Node) {
	if u.parent == nil {
		t.root = v
	} else if u.parent.left == u {
		u.parent.left = v
	} else {
		u.parent.right = v
	}

	if v != nil {
		v.parent = u.parent
	}
}

// Delete key in tree
func (t *BinarySearchTree) Delete(key int) (int, error) {
	node := t.Search(key)
	if node == nil {
		return key, fmt.Errorf("key not found: %d", key)
	}
	if node.left == nil {
		t.Transpalant(node, node.right)
	} else if node.right == nil {
		t.Transpalant(node, node.left)
	} else {
		successor := t.FindInorderSuccessor(node)
		if node.right != successor {
			t.Transpalant(successor, successor.right)
			successor.right = node.right
			successor.right.parent = successor
		}
		t.Transpalant(node, successor)
		successor.left = node.left
		node.left.parent = successor
	}
	return key, nil
}

// NewTree returns reference to new BST
func NewTree() *BinarySearchTree {
	return &BinarySearchTree{}
}

func main() {

	bst := NewTree()

	fmt.Println("Tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 6:: ")
	_, err := bst.Delete(6)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Inserting 40")
	bst.Insert(40)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 20")
	bst.Insert(20)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 70")
	bst.Insert(70)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 80")
	bst.Insert(80)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 50")
	bst.Insert(50)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 45")
	bst.Insert(45)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 90")
	bst.Insert(90)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 75")
	bst.Insert(75)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 72")
	bst.Insert(72)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Inserting 74")
	bst.Insert(74)
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 45 :: ")
	_, err = bst.Delete(45)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 9 :: ")
	_, err = bst.Delete(9)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 70 :: ")
	_, err = bst.Delete(70)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 72 :: ")
	_, err = bst.Delete(72)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 74 :: ")
	_, err = bst.Delete(74)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")

	fmt.Println("Tree deletion 80 :: ")
	_, err = bst.Delete(80)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("tree traversal :: ")
	bst.InorderTraverse(bst.root)
	fmt.Println("")
}
