function quickSort(a, p, r) {
  if (p < r) {
    q = randomPartition(a, p, r);
    quickSort(a, p, q - 1);
    quickSort(a, q + 1, r);
  }
}

function randomPartition(a, p, r) {
  var pivot = getRandom(p, r);
  var tmp = a[pivot];
  a[pivot] = a[r];
  a[r] = tmp;
  return partition(a, p, r);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function partition(a, p, r) {
  var i = p - 1;
  for (var j = p; j < r; j++) {
    if (a[j] <= a[r]) {
      i = i + 1;
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
  }
  i = i + 1;
  var tmp = a[i];
  a[i] = a[r];
  a[r] = tmp;
  return i;
}

var a = [10, 9, 17, 23, 12, -2, 8, 45];
console.log("Before sorting", a);
quickSort(a, 0, a.length - 1);
console.log("After sorting", a);
