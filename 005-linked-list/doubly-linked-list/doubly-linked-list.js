class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(key) {
    const node = new Node(key);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  insertAtTail(key) {
    const node = new Node(key);
    if (this.tail == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }

  search(key) {
    let ptr = this.head;
    while (ptr != null && ptr.key != key) {
      ptr = ptr.next;
    }
    if (ptr == null) {
      throw new Error("Key not found");
    } else {
      return ptr;
    }
  }

  delete(key) {
    let ptr = this.head;
    while (ptr != null && ptr.key != key) {
      ptr = ptr.next;
    }
    if (ptr != null) {
      if (ptr.prev == null) {
        this.head = ptr.next;
      } else {
        ptr.prev.next = ptr.next;
      }
      if (ptr.next !== null) {
        ptr.next.prev = ptr.prev;
      }
      if (this.tail == ptr) {
        this.tail = ptr.prev;
      }
      return "Key deleted";
    } else {
      throw new Error("Key not found, so can not be deleted");
    }
  }

  traverse() {
    const result = [];
    let ptr = this.head;
    while (ptr != null) {
      result.push(ptr.key);
      ptr = ptr.next;
    }
    return result;
  }
}

const list = new DoublyLinkedList();

console.log("initial list : ", list.traverse());

list.insertAtTail(10);
console.log("list after insert at tail 10 : ", list.traverse());

console.log("delete 10 ", list.delete(10));
console.log("list after delete 10 : ", list.traverse());

list.insertAtHead(2);
console.log("list after insert at head 2 : ", list.traverse());

list.insertAtHead(7);
console.log("list after insert at head 7 : ", list.traverse());

list.insertAtTail(6);
console.log("list after insert at tail 6 : ", list.traverse());

list.insertAtHead(3);
console.log("list after insert at head 3 : ", list.traverse());

list.insertAtTail(9);
console.log("list after insert at tail 9 : ", list.traverse());

console.log("list : ", list.traverse());

try {
  console.log("search 3 ", list.search(3));
} catch (e) {
  console.log("search 3 error", e);
}

try {
  console.log("search 17 ", list.search(17));
} catch (e) {
  console.log("search 17 error", e);
}

console.log("delete 3 ", list.delete(3));
console.log("list after delete 3 : ", list.traverse());

console.log("delete 2 ", list.delete(2));
console.log("list after delete 2 : ", list.traverse());

console.log("delete 9 ", list.delete(9));
console.log("list after delete 9 : ", list.traverse());

list.insertAtTail(11);
console.log("list after insert at tail 11 : ", list.traverse());

list.insertAtHead(19);
console.log("list after insert at head 19 : ", list.traverse());

try {
  console.log("delete 17 ", list.delete(17));
  console.log("list after delete 17 : ", list.traverse());
} catch (e) {
  console.log("delete 17 error ", e);
  console.log("list after delete 17 error : ", list.traverse());
}
