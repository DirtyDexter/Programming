// Trie Data structure
// Complexity - O(m) - m is length of word

// Ternary search tree can also be used
// https://www.geeksforgeeks.org/ternary-search-tree/
// Complexity - O(h) - h is height of tree

class TrieNode {
  c;
  children;
  isWord;
  
  constructor(c) {
    this.c = c;
    this.isWord = false;
    this.children = {};
  }

  insert(word) {
    if (!!word) {
      const character = word[0];
      let child = this.children[character];
      if (child === null || child === undefined) {
        child = new TrieNode(character);
        this.children[character] = child;
      }
      if (word.length > 1) {
        child.insert(word.slice(1));
      } else {
        child.isWord = true;
      }
    }
  }
}

class Trie {
  root;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    this.root.insert(word);
  }
  
  delete(word) {
    this.remove(this.root, word, 0);
  }

  remove(node, word, depth) {
    if (node === null || node === undefined) {
      return undefined;
    }

    if (word.length === depth) {
      if (node.isWord === true) {
        console.log('Word found');
        node.isWord = false;
      } else {
        console.log('Word not found');
      }

      if (Object.values(node.children).length === 0) {
        node = undefined;
      }
      return node;
    }
    const character = word[depth];
    const child = this.remove(node.children[character], word, depth+1);
    if (!!child) {
      node.children[character] = child;
    } else {
      delete node.children[character];
    }

    if (Object.values(node.children).length === 0 && node.isWord === false) {
      node = undefined;
    }

    return node;
  }

  findPrefix(word) {
    return this.find(word, false);
  }

  findExact(word) {
    return this.find(word, true);
  }

  find(word, exact) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      node = node.children[word[i]];
      if (node === null || node === undefined) {
        return false;
      }
    }
    return !exact || node.isWord;
  }

  suggestWords(prefix) {
    const list = [];
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      node = node.children[prefix[i]];
      if (node === null || node === undefined) {
        return list;
      }
    }
    this.suggest(node, list, prefix);
    return list;
  }

  suggest(node, list, prefix) {
    if (node.isWord) {
      list.push(prefix);
    }
    
    Object.values(node.children).map(child => {
      this.suggest(child, list, prefix.concat(child.c));
    });
  }
}

const trie1 = new Trie();
trie1.insert('hello');
trie1.insert('help');
trie1.insert('helping');
trie1.insert('hell');
trie1.insert('cat');
trie1.insert('cats');
trie1.insert('dog');
trie1.insert('cow');

console.log('\nFind exact hello - ', trie1.findExact('hello'));
console.log('\nFind prefix hel - ', trie1.findPrefix('hel'));
console.log('\nFind exact helps - ', trie1.findExact('helps'));

console.log('\nSuggestions for prefix - hel ', trie1.suggestWords('hel'));
console.log('\nSuggestions for prefix - help ', trie1.suggestWords('help'));
console.log('\nSuggestions for prefix - hell ', trie1.suggestWords('hell'));
console.log('\nSuggestions for prefix - test ', trie1.suggestWords('test'));
console.log('\nSuggestions for prefix - ca ', trie1.suggestWords('ca'));
console.log('\nSuggestions for prefix - c ', trie1.suggestWords('c'));

console.log('\nDelete word - help');
console.log('Find word - help - ', trie1.findExact('help'));
trie1.delete('help');
console.log('Find word - help - ', trie1.findExact('help'));
console.log('Find word - helping - ', trie1.findExact('helping'));

console.log('\nDelete word - hel');
console.log('Find word - hel - ', trie1.findExact('hel'));
trie1.delete('hel');
console.log('Find word - hel - ', trie1.findExact('hel'));

console.log('\nDelete word - hello');
console.log('Find word - hello - ', trie1.findExact('hello'));
trie1.delete('hello');
console.log('Find word - hello - ', trie1.findExact('hello'));
console.log('Find word - hell - ', trie1.findExact('hell'));
console.log('Suggestions for prefix - hel ', trie1.suggestWords('hel'));

console.log('\nSuggestions for prefix - d ', trie1.suggestWords('d'));
console.log('Delete word - dog');
console.log('Find word - dog - ', trie1.findExact('dog'));
trie1.delete('dog');
console.log('Find word - dog - ', trie1.findExact('dog'));
console.log('\Suggestions for prefix - d ', trie1.suggestWords('d'));
