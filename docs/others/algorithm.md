# 数据结构与算法

[参考《 Hello，算法 》](https://www.hello-algo.com/)



## 复杂度

**时间复杂度**

::: code-group
```js [常数阶]
// 与n无关
function constant(n) {
    let count = 0;
    for (let i = 0; i < 1000; i++) count++;
    return count;
}
```
```js [线性阶 n]
// 与n正比
function linear(n) {
    let count = 0;
    for (let i = 0; i < n; i++) count++;
    return count;
}
```
```js [平方阶 n^2]
// 与n平方关系
function quadratic(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            count++;
        }
    }
    return count;
}
```
```js [指数阶 2^n]
// 一分为二
function expRecur(n) {
    if (n == 1) return 1;
    return expRecur(n - 1) + expRecur(n - 1) 
}
```
```js [对数阶 log n]
// 每层减半
function logRecur(n) {
    if (n <= 1) return 1;
    return logRecur(n / 2) + 1;
}
```
```js [线性对数阶 nlog n]
// 组合嵌套
function linearLogRecur(n) {
    if (n <= 1) return 1;
    let count = linearLogRecur(n / 2) +1
    for (let i = 0; i < n; i++) {
        count++;
    }
    return count;
}
```
```js [阶乘阶 n!]
// 每一层分裂出n个
function factorialRecur(n) {
    if (n == 0) return 1;
    let count = 0;
    for (let i = 0; i < n; i++) {
        count += factorialRecur(n - 1);
    }
    return count;
}
```
:::

**空间复杂度**

::: code-group
```py [常数阶]
def constant(n):
    a = 0
    nums = [0] * 10000

    for i in range(n):c = i
    for _ in range(n):func()
```
```py [线性阶O(n)]
def linear(n):
    nums = [0] * n

    mapp = {}
    for i in range(n):
        mapp[i] = str(i)
```
```py [平方阶O(n^2)]
matrix = [[0] * n for _ in range(n)]

def quadratic_recur(n):
    if n <= 0: return 0
    nums = [0] * n
    return quadratic_recur(n - 1)
```
```py [指数阶O(2^n)]
# 满二叉树
def build_tree(n):
    if n == 0: return None
    root = TreeNode(0)
    root.left = build_tree(n - 1)
    root.right = build_tree(n - 1)
    return root
```
```py [对数阶O(log n)]
# 对数阶常见于分治算法、数据类型转换等
```
:::


## 数据结构

- 逻辑结构
  - 线性
    - 数组、链表、栈、队列、哈希表
  - 非线性
    - 树、图、堆、哈希表
- 物理结构
  - 连续 (数组)
    - 栈、队列、堆、哈希表、矩阵、张量
  - 离散 (链表)
    - 栈、队列、堆、哈希表、树、图

### 数组链表

- 数组
  - 访问元素非常高效，占用内存少
  - 初始化后长度不可变，插入或删除元素效率低下
- 链表
  - 插入与删除结点效率高
  - 链表访问结点效率低
  - 单向链表 环形链表 双向链表
- 列表
  - 长度可变的数组

### 栈和队列

- 栈
  - 先入后出
- 队列
  - 先入先出
- 双向队列
  - 两端都可以添加与删除

::: code-group
```js [栈]
class ArrayStack {
    stack;
    constructor() {
        this.stack = [];
    }
    /* 获取栈的长度 */
    get size() {
        return this.stack.length;
    }
    /* 判断栈是否为空 */
    empty() {
        return this.stack.length === 0;
    }
    /* 入栈 */
    push(num) {
        this.stack.push(num);
    }
    /* 出栈 */
    pop() {
        if (this.empty())
            throw new Error("栈为空");
        return this.stack.pop();
    }
    /* 访问栈顶元素 */
    top() {
        if (this.empty())
            throw new Error("栈为空");
        return this.stack[this.stack.length - 1];
    }
};
```
```js [队列]
class ArrayQueue {
    #queue;       // 用于存储队列元素的数组
    #front = 0;   // 头指针，指向队首
    #rear = 0;    // 尾指针，指向队尾 + 1
    constructor(capacity) {
        this.#queue = new Array(capacity);
    }
    /* 获取队列的容量 */
    get capacity() {
        return this.#queue.length;
    }
    /* 获取队列的长度 */
    get size() {
        // 由于将数组看作为环形，可能 rear < front ，因此需要取余数
        return (this.capacity + this.#rear - this.#front) % this.capacity;
    }
    /* 判断队列是否为空 */
    empty() {
        return this.#rear - this.#front == 0;
    }
    /* 入队 */
    offer(num) {
        if (this.size == this.capacity)
            throw new Error("队列已满");
        // 尾结点后添加 num
        this.#queue[this.#rear] = num;
        // 尾指针向后移动一位，越过尾部后返回到数组头部
        this.#rear = (this.#rear + 1) % this.capacity;
    }
    /* 出队 */
    poll() {
        const num = this.peek();
        // 队头指针向后移动一位，若越过尾部则返回到数组头部
        this.#front = (this.#front + 1) % this.capacity;
        return num;
    }
    /* 访问队首元素 */
    peek() {
        if (this.empty())
            throw new Error("队列为空");
        return this.#queue[this.#front];
    }
}
```
:::

### 散列表

- 哈希表
  - 键值映射
- 哈希函数
  - 尽量少哈希冲突
  - 计算尽量高效
  - 空间使用率高
- 哈希冲突
  - 链式地址
    - 链表引入
    - 二叉树引入
  - 开放寻址
    - 线性探测
    - 多次哈希



```js
class Entry {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

/* 基于数组简易实现的哈希表 */
class ArrayHashMap {
    #bucket;
    constructor() {
        // 初始化一个长度为 100 的桶（数组）
        this.#bucket = new Array(100).fill(null);
    }

    /* 哈希函数 */
    #hashFunc(key) {
        return key % 100;
    }

    /* 查询操作 */
    get(key) {
        let index = this.#hashFunc(key);
        let entry = this.#bucket[index];
        if (entry === null) return null;
        return entry.val;
    }

    /* 添加操作 */
    set(key, val) {
        let index = this.#hashFunc(key);
        this.#bucket[index] = new Entry(key, val);
    }

    /* 删除操作 */
    delete(key) {
        let index = this.#hashFunc(key);
        // 置为 null ，代表删除
        this.#bucket[index] = null;
    }
}
```

### 二叉树和堆

- 类型
  - 完美~ 全满
  - 完全~ 就底层没满
  - 完满~ 除叶外都满
  - 平衡~ 左右最多差1
- AVL 树 略

```js
function TreeNode(val, left, right) {
    this.val = val
    this.left = left
    this.right = right
}

let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5);

n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5

// n1n2 插入 P
let P = new TreeNode(0)
n1.left = P
P.left = n2
// 删除 P
n1.left = n2

// 层序遍历
function hierOrder(root) {
    let queue = [root]
    let list = [];
    while (queue.length) {
        let node = queue.shift()
        list.push(node.val)
        if (node.left)
            queue.push(node.left)
        if (node.right)
            queue.push(node.right)
    }
    return list;
}
// 前序、中序、后序遍历 略

// 查找结点
function search(num) {
    let cur = root;
    while (cur !== null) {
        if (cur.val < num) cur = cur.right;
        else if (cur.val > num) cur = cur.left;
        else break;
    }
    return cur;
}
// 插入节点
function insert(num) {
    let cur = root, pre = null;
    while (cur !== null) {
        if (cur.val === num) return null;
        pre = cur
        cur = cur.val < num ?  cur.right :  cur.left
    }
    let node = new Tree.TreeNode(num)
    pre.val < num ? pre.right = node : pre.left = node
    return node;
}
// 删除节点
function remove(num) {
    let cur = root, pre = null
    while (cur !== null) {
        if (cur.val === num) break
        pre = cur
        cur = cur.val < num ?  cur.right :  cur.left
    }
    if (cur === null) return null;

    if (cur.left === null || cur.right === null) {
        let child = cur.left === null ? cur.right : cur.left
        pre.left === cur ? pre.left = child : pre.right = child
    }
    // 子结点数量为2情况略
    return cur;
}
```

堆部分暂无


## 算法

### 查找算法

::: code-group
```js [线性查找]
// 通用性极佳但时间复杂度太高
function linearA(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1; 
}
function linearL(head, target) {
    while(head) {
        if(head.val === target) {
            return head;
        }
        head = head.next;
    }
    return null;
}
```
```js [二分查找]
// 效率很高 仅适用于有序数组
// 数据量较小时 线性查找更快
function binarySearch(nums, target) {
    let i = 0, j = nums.length
    while (i < j) {
        let m = parseInt((i + j) / 2)
        if (nums[m] < target) i = m + 1
        else if (nums[m] > target) j = m
        else return m
    }
    return -1
}
```
```js [哈希查找]
// 用于数据量大且无序
// 以空间换时间
map.has(target) ? map.get(target) : -1
```
:::

### 排序算法

::: code-group
```js [冒泡排序]
function bubbleSort(nums) {
    for (let i = nums.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (nums[j] > nums[j + 1]) {
                let tmp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = tmp
            }
        }
    }
}
```
```js [插入排序]
// 用于短数组
function insertionSort(nums) {
    for (let i = 1; i < nums.length; i++) {
        let base = nums[i], j = i - 1
        while (j >= 0 && nums[j] > base) {
            nums[j + 1] = nums[j]
            j--
        }
        nums[j + 1] = base
    }
}
```
```js [快速排序]
// 用于长数组
function swap(nums, i, j) {
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}
function partition(nums, left, right) {
    let i = left, j = right;
    while (i < j) {
        while (i < j && nums[j] >= nums[left]) {
            j -= 1
        }
        while (i < j && nums[i] <= nums[left]) {
            i += 1
        }
        swap(nums, i, j)
    }
    swap(nums, i, left)
    return i
}
function quickSort(nums, left, right) {
    if (left >= right) return
    const pivot = partition(nums, left, right)
    quickSort(nums, left, pivot - 1)
    quickSort(nums, pivot + 1, right)
}
```
```js [归并排序]
// 用于链表
function merge(nums, left, mid, right) {
    let tmp = nums.slice(left, right + 1)
    let leftStart = left - left, leftEnd = mid - left   
    let rightStart = mid + 1 - left, rightEnd = right - left
    let i = leftStart, j = rightStart
    for (let k = left; k <= right; k++) {
        if (i > leftEnd) {
            nums[k] = tmp[j++]
        } else if (j > rightEnd || tmp[i] <= tmp[j]) {
            nums[k] = tmp[i++]
        } else {
            nums[k] = tmp[j++]
        }
    }
}

function mergeSort(nums, left, right) {
    if (left >= right) return
    let mid = Math.floor((left + right) / 2)
    mergeSort(nums, left, mid)
    mergeSort(nums, mid + 1, right)
    merge(nums, left, mid, right)
}
```
:::

