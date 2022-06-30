class Node {
	key;
	left;
	right;

	constructor (key) {
		this.key = key;
		this.left = this.right = null;
	}
}

class BST {
	root;
	traverseData = [];

	constructor() {
		this.root = null;
	}

	insert(key) {
		const newNode = new Node(key);
		let x = this.root;
		let y = null;
		while (x !== null) {
			y = x;
			if (key <= x.key) {
				x = x.left;
			} else {
				x = x.right;
			}
		}
		if (y === null) {
			this.root = newNode;
		} else if (key <= y.key) {
			y.left = newNode;
		} else {
			y.right = newNode;
		}
	}

	inorderTraverse(node) {
		if (node !== null) {
			this.inorderTraverse(node.left);
			//console.log(node.key);
			this.traverseData.push(node.key);
			this.inorderTraverse(node.right);
		}
	}

	search(key) {
		let node = this.root;
		let parent = null;
		while (node !== null && node.key !== key) {
			parent = node;
			if (key < node.key) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return {
			node,
			parent
		};
	}

	delete(key) {
		const  { node, parent } = this.search(key);
		if (node !== null) {
			if (node.left === null) {
				this.transplant(parent, node, node.right);
			} else if (node.right === null) {
				this.transplant(parent, node, node.left);
			} else {
				let inorderSuccParent = node;
				let inorderSucc = node.right;
				while (inorderSucc.left !== null) {
					inorderSuccParent = inorderSucc;
					inorderSucc = inorderSucc.left;
				}
				if (inorderSuccParent !== node) {
					this.transplant(inorderSuccParent, inorderSucc, inorderSucc.right);
					inorderSucc.right = node.right;
				}
				inorderSucc.left = node.left;
				this.transplant(parent, node, inorderSucc);
			}
		}
	}

	transplant(parent, u, v ) {
		if (parent === null) {
			this.root = v;
		} else if (u.key <= parent.key) {
			parent.left = v;
		} else {
			parent.right = v;
		}
	}
}

const tree1 = new BST();

tree1.insert(80);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(20);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(240);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(180);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(325);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(310);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(300);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(312);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(314);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(305);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(302);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(308);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(40);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(16);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(14);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(30);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(80);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.insert(75);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(308);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 308');
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(16);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 16');
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(312);
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 312');
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(240); // left and right child both are not null
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 240');
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(310); // left and right child both are not null and right child is inorder successor
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 310');
console.log(tree1.traverseData.join(', '));
console.log('=======');

tree1.delete(80); // delete root
tree1.traverseData = [];
tree1.inorderTraverse(tree1.root);
console.log('After delete 80');
console.log(tree1.traverseData.join(', '));
console.log('=======');

console.log('search-314', tree1.search(314));
console.log('=======');

console.log('search-79', tree1.search(79));
console.log('=======');

console.log('search-75', tree1.search(75));
console.log('=======');