# Python 数据结构

## 列表（List）

列表是 Python 中最常用的数据结构之一，它是一个有序的、可变的序列。

### 创建列表
```python
# 空列表
empty_list = []

# 包含元素的列表
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
```

### 访问列表元素
```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])    # 输出: apple
print(fruits[-1])   # 输出: cherry
```

### 列表切片
```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])     # 输出: [2, 3, 4]
print(numbers[:3])      # 输出: [0, 1, 2]
print(numbers[3:])      # 输出: [3, 4, 5, 6, 7, 8, 9]
print(numbers[::2])     # 输出: [0, 2, 4, 6, 8]
```

### 修改列表
```python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "orange"    # 修改元素
fruits.append("grape")  # 添加元素
fruits.insert(1, "pear") # 插入元素
fruits.remove("apple")  # 删除元素
del fruits[0]          # 删除指定索引的元素
```

### 列表方法
```python
numbers = [1, 2, 3, 4, 5]
numbers.append(6)      # 添加元素
numbers.extend([7, 8]) # 扩展列表
numbers.pop()         # 删除并返回最后一个元素
numbers.sort()        # 排序
numbers.reverse()     # 反转
```

## 元组（Tuple）

元组是不可变的序列，通常用于存储不会改变的数据。

### 创建元组
```python
# 空元组
empty_tuple = ()

# 包含元素的元组
numbers = (1, 2, 3, 4, 5)
single = (1,)  # 单个元素的元组
```

### 访问元组元素
```python
numbers = (1, 2, 3, 4, 5)
print(numbers[0])    # 输出: 1
print(numbers[-1])   # 输出: 5
```

## 字典（Dictionary）

字典是一种键值对的数据结构，用于存储关联数据。

### 创建字典
```python
# 空字典
empty_dict = {}

# 包含键值对的字典
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

### 访问字典元素
```python
print(person["name"])    # 输出: John
print(person.get("age")) # 输出: 30
```

### 修改字典
```python
person["age"] = 31      # 修改值
person["country"] = "USA" # 添加新键值对
del person["city"]      # 删除键值对
```

### 字典方法
```python
person.keys()    # 返回所有键
person.values()  # 返回所有值
person.items()   # 返回所有键值对
```

## 集合（Set）

集合是无序的、不重复的元素集合。

### 创建集合
```python
# 空集合
empty_set = set()

# 包含元素的集合
fruits = {"apple", "banana", "cherry"}
```

### 集合操作
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# 并集
print(set1 | set2)  # 输出: {1, 2, 3, 4, 5}

# 交集
print(set1 & set2)  # 输出: {3}

# 差集
print(set1 - set2)  # 输出: {1, 2}
```

### 集合方法
```python
fruits.add("orange")    # 添加元素
fruits.remove("apple")  # 删除元素
fruits.discard("banana") # 安全删除元素
```

## 字符串（String）

字符串是不可变的字符序列。

### 字符串操作
```python
text = "Hello, World!"

# 访问字符
print(text[0])    # 输出: H
print(text[-1])   # 输出: !

# 字符串切片
print(text[0:5])  # 输出: Hello
print(text[7:])   # 输出: World!

# 字符串方法
text.upper()      # 转换为大写
text.lower()      # 转换为小写
text.split(",")   # 分割字符串
text.replace("World", "Python") # 替换子串
```

## 列表推导式

列表推导式提供了一种简洁的方式来创建列表。

```python
# 创建平方数列表
squares = [x**2 for x in range(10)]

# 创建偶数列表
evens = [x for x in range(10) if x % 2 == 0]

# 创建字符串列表
words = ["hello", "world", "python"]
lengths = [len(word) for word in words]
```

## 字典推导式

字典推导式提供了一种简洁的方式来创建字典。

```python
# 创建数字平方字典
squares = {x: x**2 for x in range(5)}

# 创建字符串长度字典
words = ["hello", "world", "python"]
lengths = {word: len(word) for word in words}
``` 