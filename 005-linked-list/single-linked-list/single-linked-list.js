class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

class SingleLinkedList {
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
    let ptr1 = null;
    let ptr2 = this.head;
    while (ptr2 != null && ptr2.key != key) {
      ptr1 = ptr2;
      ptr2 = ptr2.next;
    }
    if (ptr2 != null) {
      if (ptr1 == null) {
        this.head = ptr2.next;
      } else {
        ptr1.next = ptr2.next;
      }
      if (this.tail == ptr2) {
        this.tail = ptr1;
      }
      return "Key deleted"
    } else {
      throw new Error("Key not found, so can not be deleted");
    }
  }

  traverse() {
    const result = []
    let ptr = this.head
    while(ptr != null) {
      result.push(ptr.key)
      ptr = ptr.next
    }
    return result
  }
}

const list = new SingleLinkedList()

console.log("list : ", list.traverse())

list.insertAtHead(2)
list.insertAtHead(7)
list.insertAtTail(6)
list.insertAtHead(3)
list.insertAtTail(9)

console.log("list : ", list.traverse())

try {
  console.log("search 3 ", list.search(3))
} catch(e) {
  console.log("search 3 error", e)
}


try {
  console.log("search 17 ", list.search(17))
} catch(e) {
  console.log("search 17 error", e)
}

console.log("delete 3 ", list.delete(3))
console.log("list after delete 3 : ", list.traverse())

console.log("delete 7 ", list.delete(7))
console.log("list after delete 7 : ", list.traverse())

console.log("delete 9 ", list.delete(9))
console.log("list after delete 9 : ", list.traverse())

list.insertAtTail(11)
console.log("list after insert at tail 11 : ", list.traverse())

try {
  console.log("delete 17 ", list.delete(17))
  console.log("list after delete 17 : ", list.traverse())
} catch(e) {
  console.log("delete 17 error ", e)
  console.log("list after delete 17 error : ", list.traverse())
}

