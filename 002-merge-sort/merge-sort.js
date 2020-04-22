function mergeSort(a, p, r) {
  if (p < r) {
    var q = Math.floor( ( p + r ) / 2 );
    mergeSort(a, p, q);
    mergeSort(a, q+1, r);
    merge(a, p, q, r);
  }
}

function merge(a, p, q, r) {
  var n1 = q - p + 1;
  var n2 = r - q;
  var left = [];
  var right = [];
  for (var i = 0; i < n1; i++) {
    left[i] = a[p + i];
  }
  for (var j = 0; j < n2; j++) {
    right[j] = a[q + 1 + j];
  }
  i = 0;
  j = 0;
  var k = p;
  while(i < n1 && j < n2) {
    if (left[i] <= right[j]) {
      a[k] = left[i];
      i++;
    } else {
      a[k] = right[j];
      j++;
    }
    k++;
  }
  while(i < n1) {
    a[k] = left[i];
    i++;
    k++;
  }
  while(j < n2) {
    a[k] = right[j];
    j++;
    k++;
  }
}

var a = [10, 2, 1, 89, 12, 1];
console.log("Before sorting", a);
mergeSort(a, 0, a.length - 1);
console.log("After sorting", a);