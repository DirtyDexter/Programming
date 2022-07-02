class Node {
	key;
	color;
	left;
	right;
	parent;

	constructor(key) {
		this.key = key;
		this.color = 'red';
		this.left = null;
		this.right = null;
		this.parent = null;
	}
}

class RedBlackTree {
	root;
	nil;
	traverseData = [];

	constructor () {
		this.nil = new Node();
		this.nil.color  = 'black';
		this.root = this.nil;
	}

	inorderTraverse(node) {
		if (node !== this.nil) {
			this.inorderTraverse(node.left);
			//console.log(node.key, node.color);
			this.traverseData.push(`${node.key} (${node.color})`)
			this.inorderTraverse(node.right);
		}
	}

	search(key) {
		let ptr = this.root;
		while (ptr !== this.nil && ptr.key !== key) {
			if (key < ptr.key) {
				ptr = ptr.left;
			} else {
				ptr = ptr.right;
			}
		}
		return ptr;
	}

	transplant(u, v) {
		if (u.parent === this.nil) {
			this.root = v;
		} else if (u === u.parent.left) {
			u.parent.left = v;
		} else {
			u.parent.right = v;
		}
		v.parent = u.parent;
	}

	findMinima(node) {
		while (node.left !== this.nil) {
			node = node.left;
		}
		return node;
	}

	leftRotate(x) {
		const y = x.right;
		x.right = y.left;
		if (y.left !== this.nil) {
			y.left.parent = x;
		}

		y.parent = x.parent;
		if (x.parent === this.nil) {
			this.root = y;
		} else if (x === x.parent.left) {
			x.parent.left = y;
		} else {
			x.parent.right = y;
		}
		x.parent = y;
		y.left = x;
	}

	rightRotate(x) {
		const y = x.left;
		x.left = y.right;
		if (y.right !== this.nil) {
			y.right.parent = x;
		}

		y.parent = x.parent;
		if (x.parent === this.nil) {
			this.root = y;
		} else if (x === x.parent.left) {
			x.parent.left = y;
		} else {
			x.parent.right = y;
		}
		x.parent = y;
		y.right = x;
	}

	insert(key) {
		let ptr = this.root;
		let parent = this.nil;
		while (ptr !== this.nil) {
			parent = ptr;
			if (key <= ptr.key) {
				ptr = ptr.left;
			} else {
				ptr = ptr.right;
			}
		}

		const newNode = new Node(key);
		newNode.left = this.nil;
		newNode.right = this.nil;
		newNode.parent = parent;

		if (parent === this.nil) {
			this.root = newNode;
		} else if (key <= parent.key) {
			parent.left = newNode;
		} else {
			parent.right = newNode;
		}
		this.insertFixup(newNode);
	}

	insertFixup(z) {
		while (z.parent.color === 'red') {
			if (z.parent === z.parent.parent.left) {
				const y = z.parent.parent.right;
				if (y.color === 'red') {
					y.color = 'black';
					z.parent.color = 'black';
					z.parent.parent.color = 'red';
					z = z.parent.parent;
				} else {
					if (z === z.parent.right) {
						z = z.parent;
						this.leftRotate(z);
					}
					z.parent.color = 'black';
					z.parent.parent.color = 'red';
					this.rightRotate(z.parent.parent);
				}
			} else {
				const y = z.parent.parent.left;
				if (y.color === 'red') {
					y.color = 'black';
					z.parent.color = 'black';
					z.parent.parent.color = 'red';
					z = z.parent.parent;
				} else {
					if (z === z.parent.left) {
						z = z.parent;
						this.rightRotate(z);
					}
					z.parent.color = 'black';
					z.parent.parent.color = 'red';
					this.leftRotate(z.parent.parent);
				}
			}
		}
		this.root.color = 'black';
	}

	delete(key) {
		const z = this.search(key);
		if (z !== this.nil) {
			let y = z;
			let x = y.right;
			let yColor = y.color;
			if (z.left === this.nil) {
				x = z.right;
				this.transplant(z, z.right);
			} else if (z.right === this.nil) {
				x = z.left;
				this.transplant(z, z.left);
			} else {
				y = this.findMinima(z.right);
				yColor = y.color;
				x = y.right;
				if (y.parent === z) {
					x.parent = y;
				} else {
					this.transplant(y, y.right);
					y.right = z.right;
					z.right.parent = y;
				}
				this.transplant(z, y);
				y.left = z.left;
				z.left.parent = y;
				y.color = z.color;
			}
			if (yColor === 'black') {
				this.deleteFixup(x);
			}
		}
	}

	deleteFixup(x) {
		while (x !== this.root && x.color === 'black') {
			if (x === x.parent.left) {
				const w = x.parent.right;
				if (w.color === 'red') {
					w.color = 'black';
					x.parent.color = 'red';
					this.leftRotate(x.parent);
					w = x.parent.right;
				}
				if (w.left.color === 'black' && w.right.color === 'black') {
					w.color = 'red';
					x = x.parent;
				} else {
					if (w.right.color === 'black') {
						w.left.color = 'black';
						w.color = 'red';
						this.rightRotate(w);
						w = x.parent.right;
					}
					w.color = x.parent.color;
					x.parent.color = 'black';
					w.right.color = 'black';
					this.leftRotate(x.parent);
					x = this.root;
				}
			} else {
				const w = x.parent.left;
				if (w.color === 'red') {
					w.color = 'black';
					x.parent.color = 'red';
					this.rightRotate(x.parent);
					w = x.parent.left;
				}
				if (w.left.color === 'black' && w.right.color === 'black') {
					w.color = 'red';
					x = x.parent;
				} else {
					if (w.left.color === 'black') {
						w.right.color = 'black';
						w.color = 'red';
						this.leftRotate(w);
						w = x.parent.left;
					}
					w.color = x.parent.color;
					x.parent.color = 'black';
					w.left.color = 'black';
					this.rightRotate(x.parent);
					x = this.root;
				}
			}
		}
		x.color = 'black';
	}
}

const tree1 = new RedBlackTree();

tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

const input = [7, 3, 18, 10, 22, 8, 11, 26, 2, 6, 13];
input.map(key => {
	tree1.insert(key);
	console.log(`inserting ${key} : `);
	tree1.traverseData = [];
	tree1.inorderTraverse(tree1.root);
	console.log(tree1.traverseData.join(', '));
	console.log('=======');
});

const deleteInput = [8, 10, 6];
deleteInput.map(key => {
	tree1.delete(key);
	console.log(`Deleting ${key} : `);
	tree1.traverseData = [];
	tree1.inorderTraverse(tree1.root);
	console.log(tree1.traverseData.join(', '));
	console.log('=======');
});


