function Node(key) {
  this.key = key;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

LinkedList.prototype.insert = function(key) {
  var node = new Node(key);
  var ptr1 = null;
  var ptr2 = this.head;
  while (ptr2 && ptr2.key <= key) {
    ptr1 = ptr2;
    ptr2 = ptr2.next;
  }
  if (ptr1 == null) {
    node.next = this.head;
    this.head = node;
  } else {
    node.next = ptr1.next;
    ptr1.next = node;
  }
};

LinkedList.prototype.traverse = function() {
  var a = [];
  var ptr = this.head;
  while (ptr !== null) {
    a.push(ptr.key);
    ptr = ptr.next;
  }
  return a;
};

function bucketSort(a) {
  b = [];
  var len = a.length;
  for (var i = 0; i < len; i++) {
    b[i] = new LinkedList();
  }
  for (var i = 0; i < len; i++) {
    b[Math.floor(len * a[i])].insert(a[i]);
  }
  c = [];
  for (var i = 0; i < len; i++) {
    var sorted = b[i].traverse();
    c = c.concat(sorted);
  }
  return c;
}

var a = [.78, .17, .39, .26, .72, .94, .21, .12, .23, .68];
console.log("Before sorting", a);
var c = bucketSort(a);
console.log("After sorting", c);
