function insertionSort(a) {
  for (var j = 1; j < a.length; j++) {
    var key = a[j];
    var i = j - 1;
    while(i >=0 && a[i] > key) {
      a[i+1] = a[i];
      i--;
    }
    a[i+1] = key;
  }
}

var a = [10, 23, 1, 5, 23, 67, 8 ,9];
console.log("Before sorting", a);
insertionSort(a);
console.log("After sorting", a);