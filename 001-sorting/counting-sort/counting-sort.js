function getMaxElement(a) {
  var max = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i] > max) {
      max = a[i];
    }
  }
  return max;
}

function countingSort(a, k) {
  var c = [];
  var b = [];
  for (var i = 0; i <= k; i++) {
    c[i] = 0;
  }

  for (var i = 0; i < a.length; i++) {
    c[a[i]] = c[a[i]] + 1;
  }

  for (var i = 1; i < c.length; i++) {
    c[i] = c[i - 1] + c[i];
  }

  for (var i = a.length - 1; i >= 0; i--) {
    b[c[a[i]] - 1] = a[i];
    c[a[i]] = c[a[i]] - 1;
  }
  return b;
}

var a = [10, 23, 1, 5, 23, 10, 67, 8, 9, 11, 45, 14];
console.log("Before sorting", a);
var k = getMaxElement(a);
a = countingSort(a, k);
console.log("After sorting", a);
