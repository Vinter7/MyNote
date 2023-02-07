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
  let l = nums.length,
    ans = []
  if (l < 3) return ans
  if (l === 3 && nums[0] + nums[1] + nums[2] !== 0) return ans

  // 三重值
  let has0 = 0
  for (const i of nums) {
    if (i === 0) has0 += 1
  }
  if (has0 >= 3) ans.push([0, 0, 0])
  // 双重值
  let hasDb = []
  let set = Array.from(new Set(nums))
  for (const i of set) {
    if (nums.indexOf(i) !== nums.lastIndexOf(i)) hasDb.push(i)
  }
  for (const i of hasDb) {
    let idx = set.indexOf(0 - 2 * i)
    if (~idx && i !== 0) ans.push([i, i, set[idx]])
  }
  // 单值
  let map = {}
  for (let i = 0; i < set.length; i++) {
    for (let j = i + 1; j < set.length; j++) {
      if (set[j] in map) ans.push([set[i], set[map[set[j]]], set[j]])
      else map[0 - set[i] - set[j]] = j
    }
    map = {}
  }
  return ans
}
```

**电话号码的字母组合**

```js
function func(s) {
  if ((s === '')) return []
  let m = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  let save = []
  for (let i of s) save.push(m[+i - 2])
  let allOut = save.shift().split('')
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
  let c = 1,
    a = head,
    b = a
  while (head.next) {
    head = head.next
    c++
  }
  if(c<n+1) {
      a=a.next
      return a
  }
  for (let i = 0; i < c - n-1; i++) {
    a = a.next
  }
  a.next = a.next?.next
  return b
}
```

**有效的括号**

```js
function func(s) {
  let arr = [],
    map = {
      '(': ')',
      '[': ']',
      '{': '}',
    }
  for (let i of s) {
    if (map[i]) arr.push(map[i])
    else if (arr.pop() !== i) return false
  }
  if (arr.length !== 0) return false
  else return true
}
```

**合并两个有序链表**

```js
function func(l1, l2) {
  if (!(l1 || l2)) return l1
  let l3 = {},
    l3$ = l3
  while (l1 && l2) {
    if (l1.val < l2.val) {
      l3$.next = l1
      l1 = l1.next
    } else {
      l3$.next = l2
      l2 = l2.next
    }
    l3$ = l3$.next
  }
  if (l2) l3$.next = l2
  if (l1) l3$.next = l1
  return l3.next
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
function mergeKLists(lists) {
if (lists.length === 0) return null
  let ans = lists[0]
  for (let i = 1; i < lists.length; i++) {
    ans = func2(ans, lists[i])
  }
  return ans
}

function func2(l1, l2) {
  if (!(l1 || l2)) return l1
  let l3 = {},
    l3$ = l3
  while (l1 && l2) {
    if (l1.val < l2.val) {
      l3$.next = l1
      l1 = l1.next
    } else {
      l3$.next = l2
      l2 = l2.next
    }
    l3$ = l3$.next
  }
  if (l2) l3$.next = l2
  if (l1) l3$.next = l1
  return l3.next
}
```

**下一个排列**

```js
function func(nums) {
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      let temp = nums.slice(i + 1).reverse()
      for (let j = 0; j < temp.length; j++) {
        if (nums[i] < temp[j]) {
          let head = temp[j]
          temp[j] = nums[i]
          nums.splice(i, temp.length + 1, head, ...temp)
          return nums
        }
      }
    }
    if (i === 0) return nums.reverse()
  }
}
```
**最长有效括号**

```js
function func(s) {
  let temp = []
  for (const i of s) {
    if (i === '(') temp.push(0)
    else {
      let idx = temp.lastIndexOf(0)
      if (~idx) {
        temp.splice(idx, 1)
        temp.push(2)
      } else temp.push(1)
    }
  }
  let ans = 0,
    count = 0
  for (const i of temp) {
    if (i === 2) count += 2
    else {
      if (count > ans) ans = count
      count = 0
    }
  }
  if (count > ans) ans = count
  return ans
}
```
****

```js

```
****

```js

```

