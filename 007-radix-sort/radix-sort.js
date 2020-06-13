function radixSort(a) {
  const maxElem = getMaxElement(a);
  for (let exp = 1; Math.floor(maxElem / exp) > 0; exp = exp * 10) {
    countingSort(a, exp);
  }
}

function countingSort(a, exp) {
  const c = [];
  const b = [];

  for (let i = 0; i < 10; i++) {
    c[i] = 0;
  }

  for (let i = 0; i < a.length; i++) {
    const ithDigit = Math.floor(a[i] / exp) % 10;
    c[ithDigit] = c[ithDigit] + 1;
  }

  for (let i = 1; i < c.length; i++) {
    c[i] = c[i - 1] + c[i];
  }

  for (let i = a.length - 1; i >= 0; i--) {
    const ithDigit = Math.floor(a[i] / exp) % 10;
    b[c[ithDigit] - 1] = a[i];
    c[ithDigit] = c[ithDigit] - 1;
  }

  for (let i = 0; i < b.length; i++) {
    a[i] = b[i];
  }
}

function getMaxElement(a) {
  var max = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i] > max) {
      max = a[i];
    }
  }
  return max;
}

var a = [21, 8133, 952, 172, 1, 41, 51, 0, 2342, 4];
console.log("Before sorting", a);
radixSort(a);
console.log("After sorting", a);
