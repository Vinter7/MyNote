# LeeCode

[HOT 100](https://leetcode.cn/problem-list/2cktkvj/)


**两数之和**

辅助哈希表

```js
function twoSum(nums, target) {
  let m = {}
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in m) return [m[nums[i]], i]
    else m[target - nums[i]] = i
  }
  return []
}
```

**两数相加**

```js
function addTwoNumbers(l1, l2) {
    let l3h = new ListNode(0),l3 = l3h
    let carry = 0;
    while (l1 || l2){
        let x = l1 ? l1.val : 0;
        let y = l2 ? l2.val : 0;
        let sum = x + y + carry;
        carry = sum < 10 ? 0 : 1;
        l3.next = new ListNode(sum % 10);
        l3 = l3.next;
        l1 = l1.next
        l2 = l2.next
    }
    if (carry > 0){
        curr.next = new ListNode(carry);
    }
    return l3h.next;
}
```

**无重复字符的最长子串**

```js
function subString(s) {
  let save = [],
    c = 0,
    cs = []
  for (let i of s) {
    save.includes(i) ? (c = 0) : save.push(i)
    cs.push(++c)
  }
  return Math.max(...cs)
}
```

**寻找两个正序数组的中位数**

```js
function func(nums1, nums2) {
  let nums3 = [...nums1, ...nums2].sort()
  let l = nums3.length
  if (l % 2) {
    return nums3[(l + 1) / 2 - 1]
  } else return (nums3[l / 2] + nums3[l / 2 - 1]) / 2
}
```

**最长回文子串**

```js
function func(s) {
  let save = []
  for (let i = 0; i < s.length; i++) {
    let same = [],
      ii = i
    for (let j = i + 1; j < s.length; j++) {
      if (s[j] === s[i]) same.push(j)
    }
    while (same.length) {
      let j = same.pop(),
        jj = j
      while (jj > ii) {
        if (s[--jj] !== s[++ii]) break
      }
      if (ii >= jj) save.push(s.substring(i, j + 1))
    }
  }
  return save.sort((a, b) => a.length - b.length).pop()
}
```

**正则表达式匹配**


```js
function func(s, p) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== p[i]) {
      if (p[i] === '.') continue
      else if (p[i] === '*') {
        if (p[i - 1] === '.') break
        else if (s.substr(i) === s[i - 1].repeat(s.length - i)) break
        else return false
      } else return false
    }
  }
  return true
}
```

**盛最多水的容器**


```js
function func(nums) {
  let s1 = []
  for (let i = 0; i < nums.length - 1; i++) {
    let s2 = []
    for (let j = i; j < nums.length; j++)
      s2.push(Math.min(nums[i], nums[j]) * (j - i))
    s1.push(Math.max(...s2))
  }
  return Math.max(...s1)
}
```

**整数转罗马数字**

```js
function func(n) {
  let sp = {
    4: 'IV',
    40: 'IL',
    400: 'ID',
    9: 'IX',
    90: 'IC',
    900: 'IM',
  }
  if (sp[n]) return sp[n]

  let str = '',
    nn = n
  m = {
    1000: 'M',
    500: 'D',
    100: 'C',
    50: 'L',
    10: 'X',
    5: 'V',
    1: 'I',
  }
  for (i of [1000, 500, 100, 50, 10, 5, 1]) {
    str += m[i].repeat(nn / i)
    nn = nn % i
  }
  return str
}
```

