// String matching
// Knuth-Morris-Pratt(KMP) Algo
// Complexity - O(n+m) => n - length of text, m -> length of pattern

function computePrefixTable(p) {
  const m = p.length;
  const pf = new Array(m);
  pf[0] = 0;
  let k = 0;
  for (let q = 1; q < m; q++) {
    while (k > 0 && p[k+1 - 1] !== p[q]) {
      k = pf[k - 1];
    }
    if (p[k+1 - 1] === p[q]) {
      k = k + 1;
    }
    pf[q] = k;
  }
  return pf;
}

function kmpMatcher(t, p) {
  console.log('Text string - ', t);
  console.log('Pattern - ', p);
  let matched = false;
  const n = t.length;
  const m = p.length;
  const pf = computePrefixTable(p);
  console.log('Prefix table - ', pf);
  let q = 0;
  for (let i = 0; i < n; i++) {
    while (q > 0 && p[q+1 -1] !== t[i]) {
      q = pf[q -1];
    }
    if (p[q+1 -1] === t[i]) {
      q = q + 1;
    }
    if (q === m) {
      matched = true;
      console.log('Pattern matches from index - ', i-m+1);
      q = pf[q -1];
    }
  }
  if (matched === false) {
    console.log('No match found for given pattern');
  }
}

const p = "ababaca";
console.log(computePrefixTable(p));

const p2 = "abcdeabfabc";
console.log(computePrefixTable(p2));

const p3 = "aabcadaabe";
console.log(computePrefixTable(p3));

console.log('\n---KMP Algo---');
kmpMatcher("ababacaba", "ababaca");
console.log('---End---');

console.log('\n---KMP Algo---');
kmpMatcher("abababacaba", "ababaca");
console.log('---End---');

console.log('\n---KMP Algo---');
kmpMatcher("aaababaabaababaab", "aabab");
console.log('---End---');

console.log('\n---KMP Algo---');
kmpMatcher("aaababaabaababaab", "aababc");
console.log('---End---');
