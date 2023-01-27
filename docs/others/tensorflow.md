# TensorFLow 深度学习

## 回归和分类问题

**回归问题**

y = wx + b + e 求w,b使误差最小

Loss = (∑(wx + b - y) ** 2) / n  
w<sub>n+1</sub> = w<sub>n</sub> - η (∂Loss/∂w)  
b<sub>n+1</sub> = b<sub>n</sub> - η (∂Loss/∂b)

常见于连续值预测问题

**分类问题**

数据模态本非线性,仍然用线性拟合的话表达能力太弱\
因此采用非线性模型,显示为套一层非线性激活函数如`Sigmoid`&`ReLU`

o = ReLU(W @ X + b)

为了增强表达能力,使用重复堆叠多次变换的方法

h1 = ReLU(W1 @ X + b1)  
h2 = ReLU(W2 @ h1 + b2)  
o = ReLU(W3 @ h2 + b3)

因为过于复杂,所以使用深度学习框架,自动计算和更新梯度

∂L/∂θ,θ∈{W1,b1,W2,b2,W3,b3}  
θ<sub>n+1</sub> = θ<sub>n</sub> - η (∂Loss/∂θ)

## TensorFLow

### 数据类型

- 数值类型
  - `7` shape==[] dim==0
  - `[7,8]` [2] 1
  - `[[7,8],[8,7],[7,5]]` [3,2] 2
  - `[[[8,7,3,6],[...],[...]],[...]]` [2,3,4] 3
- 字符串类型 `tf.costant('ok')`
- 布尔类型 `tf.constant(True)`
- 数值精度 `dtype`
  - `tf.int16/32/64`
  - `tf.float16/32/64` `tf.double`
  - `tf.cast()` 转换
- 变量(待优化量) `a = tf.Variable([1,2])`

### 创建张量

- `tf.constant(list)` 常
- `tf.convert_to_tensor(Numpy Array)` 转
- `tf.zeros/ones(shape)` 全0/1
- `tf.fill(shape,value)` 填充
- `tf.randomm.normal(shape)` 正态分布
- `tf.random.uniform(shape)` 均匀分布
- `tf.range(start, limit, delta=1)` 序列

### 多维操作

- `x[1,2,3,4]`==`x[1][2][3][4]` 多维索引
- `[start: end: step,start: end: step,...,1:]` 多维切片
- `tf.reshape(x,shape)` 改维度(视图) 不改变存储顺序
  - `shape`中`-1`表自动推导
- `tf.expand_dims(x, axis)` 在指定轴处插入一个新的维度
  - axis=0: [28,28,1]->[1,28,28,1]
- `tf.squeeze(x, ?axis)` 删除指定处维度 默认删除所有长度为1的维度
- `tf.transpose(x,perm:list)` 交换维度 perm为交换次序
- `tf.tile(x, multiples:list)` 复制维度 multiples为该维度复制次数>0
- `tf.broadcast_to(x,shape)` 手动扩展 运算时自动实现
  - 先填充长度为一的维度与目标相同
  - 在把长度为一的维度改成同目标长度

### 运算

- 数学运算
  - `+ - * / // % **` 加减乘除整除余除幂
  - .add .subtract .multiply .divide .pow .square .sqrt
  - .exp .math.log 使用换底公式算其它log
  - `@ ,matmul` 矩阵乘
- 统计
  - `tf.concat([a,b],axis)` 拼接 现有维度上合并 两个班合并
  - `tf.stack([a,b], axis)` 堆叠 创建新维度 新加班级维度
  - `tf.split(x, num_or_size_splits, axis)` 分割
    - 为单数字时为均分份数
    - 为数组时为每份长度
  - `tf.unstack(x,axis)` 切割长度固定为1
  - ``

