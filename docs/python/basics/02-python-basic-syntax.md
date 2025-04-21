# Python 基本语法

## 注释

Python 使用 `#` 进行单行注释：

```python
# 这是一个单行注释
print("Hello")  # 这也是一个注释
```

多行注释使用三个引号（单引号或双引号）：

```python
"""
这是一个
多行注释
"""
```

## 变量和数据类型

### 变量命名规则

- 变量名只能包含字母、数字和下划线
- 变量名不能以数字开头
- 变量名区分大小写
- 不能使用 Python 关键字作为变量名

### 基本数据类型

1. **整数（int）**
```python
age = 25
```

2. **浮点数（float）**
```python
pi = 3.14159
```

3. **字符串（str）**
```python
name = "Python"
message = 'Hello, World!'
```

4. **布尔值（bool）**
```python
is_valid = True
is_active = False
```

5. **空值（None）**
```python
result = None
```

## 运算符

### 算术运算符
```python
a = 10
b = 3

print(a + b)  # 加法
print(a - b)  # 减法
print(a * b)  # 乘法
print(a / b)  # 除法
print(a // b) # 整除
print(a % b)  # 取模
print(a ** b) # 幂运算
```

### 比较运算符
```python
print(a > b)   # 大于
print(a < b)   # 小于
print(a >= b)  # 大于等于
print(a <= b)  # 小于等于
print(a == b)  # 等于
print(a != b)  # 不等于
```

### 逻辑运算符
```python
x = True
y = False

print(x and y)  # 与
print(x or y)   # 或
print(not x)    # 非
```

## 输入和输出

### 输出
```python
print("Hello, World!")
print("Hello", "World", sep=", ")  # 指定分隔符
print("Hello", end="!")  # 指定结束符
```

### 输入
```python
name = input("请输入你的名字：")
print(f"你好，{name}！")
```

## 条件语句

### if 语句
```python
age = 18

if age >= 18:
    print("成年人")
else:
    print("未成年人")
```

### elif 语句
```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 循环语句

### while 循环
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

### for 循环
```python
# 遍历字符串
for char in "Python":
    print(char)

# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 使用 range
for i in range(5):  # 0 到 4
    print(i)
```

## 函数

### 定义函数
```python
def greet(name):
    return f"Hello, {name}!"

# 调用函数
print(greet("Python"))
```

### 默认参数
```python
def greet(name="World"):
    return f"Hello, {name}!"

print(greet())  # 使用默认参数
print(greet("Python"))  # 传入参数
```

### 可变参数
```python
def sum_numbers(*args):
    return sum(args)

print(sum_numbers(1, 2, 3, 4, 5))
```

## 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零！")
except Exception as e:
    print(f"发生错误：{e}")
finally:
    print("程序执行完毕")
``` 