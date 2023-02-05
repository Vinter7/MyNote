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
        l3 = l3?.next;
        l1 = l1?.next
        l2 = l2?.next
    }
    if (carry > 0){
        l3.next = new ListNode(carry);
    }
    return l3h.next;
}
```

**无重复字符的最长子串**

```js
function func(s) {
  let sub = '',
    save = 0
  for (const i of s) {
    let j = sub.indexOf(i)
    if (~j) sub = sub.substring(j + 1) + i
    else {
      sub += i
      if (sub.length > save) save = sub.length
    }
  }
  return save
}
```

**寻找两个正序数组的中位数**

```js
function func(nums1, nums2) {
  let nums3 = [...nums1, ...nums2].sort((a,b)=>a-b)
  let l = nums3.length
  if (l % 2) {
    return nums3[(l + 1) / 2 - 1]
  } else return (nums3[l / 2] + nums3[l / 2 - 1]) / 2
}
```

**最长回文子串**

```js
function func(s) {
  let save = s[0]
  for (let i = 0; i < s.length; i++) {
    let same = [],
      ii = i
    for (let j = i + 1; j < s.length; j++) {
      if (s[j] === s[i]) same.push(j)
    }
    q: for (const j of same.reverse()) {
      for (let k = 1; k < (j - i) / 2; k++) {
        if (s[i + k] !== s[j - k]) continue q
      }
      let ss =s.substring(i, j + 1)
      if(ss.length>save.length) save = ss
    }
  }
  return save
}
```

**正则表达式匹配**


```js
function func(s, p) {
  return s.match(p)?.[0] === s
}
```

**盛最多水的容器**


```js
function func(nums) {
  let i = 0,
    j = nums.length - 1,
    ans = 0
  while (i < j) {
    let area = Math.min(nums[i], nums[j]) * (j - i)
    if (area > ans) ans = area
    if (nums[i] > nums[j]) j -= 1
    else i += 1
  }
  return ans
}
```

**整数转罗马数字**

```js
function func(n) {
  let str = '',
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
    str += m[i].repeat(n / i)
    n = n % i
  }

  let map = {
    DCCCC: 'CM',
    CCCC: 'CD',
    LXXXX: 'XC',
    XXXX: 'XL',
    VIIII: 'IX',
    IIII: 'IV',
  }
  for (const i in map) {
    let idx = str.indexOf(i)
    if (~idx)
      str = str.substring(0, idx) + map[i] + str.substring(idx + i.length)
  }
  return str
}
```

**三数之和**

```js
function func(nums) {
  let arr = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === null) continue
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0)
          arr.push([nums[i], nums[j], nums[k]])
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (new Set([...arr[i], ...arr[j]]).size === 3) arr.splice(j, 1)
    }
  }
  return arr
}
```

**电话号码的字母组合**

```js
function func(s) {
  let m = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  let save = []
  for (let i of s) save.push(m[+i - 2])
  let allOut = [...save.shift()]
  for (let i of save) {
    let out = []
    for (let j of i) for (let k of allOut) out.push(k + j)
    allOut = [...out]
  }
  return allOut
}
```

**删除链表的倒数第 N 个结点**

```js
function func(head, n) {
  let c = 0,a=head,b=a
  while(head.next!==null){
    head = head.next
    c++
  }
  for(let i =0;i<c-n;i++){
    a = a.next
  }
  a.next = a.next.next
  return  b
}
```

**有效的括号**

```js
function func(s) {
  let arr = [],
    $ = {
      '(': ')',
      '[': ']',
      '{': '}',
    }
  for (let i of s) {
    if ($[i]) arr.push($[i])
    else if (arr.pop() !== i) return false
  }
  if (arr.length !== 0) return false
  else return true
}
```

**括号生成**

```js
function func(n) {
  let all = ['()']
  for (let i = 1; i < n; i++) {
    let out = []
    for (let j of all) {
      for (let k = 0; k < j.length; k++) {
        if (j[k] == ')') break
        if (k === 0) out.push('()' + j)
        out.push(j.slice(0, k + 1) + '()' + j.slice(k + 1))
      }
    }
    all = [...out]
  }
  return all
}
```

**合并K个升序链表**

```js
function toArr(l) {
  let arr = []
  while (l) {
    arr.push(l.val)
    l = l.next
  }
  return arr
}

function toL(arr) {
  let l = {
    val: arr.shift(),
    next: null,
  }
  let node,
    pnode = l
  for (const i of arr) {
    node = { val: i, next: null }
    pnode.next = node
    pnode = node
  }
  return l
}

function func(lists){
  let arr = []
  for (const i of lists) {
    arr.push(toArr(i))
  }
  return toL(arr.flat().sort())
}
```

**下一个排列**

```js
function func(nums) {
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] > nums[i - 1])
      return [
        ...nums.slice(0, i - 1),
        nums[i],
        nums[i - 1],
        ...nums.slice(i + 1),
      ]
    else return nums.reverse()
  }
}
```
****

```js

```
****

```js

```
****

```js

```

