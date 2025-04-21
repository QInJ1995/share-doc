# Python 文件操作和异常处理

## 文件操作

### 打开和关闭文件
```python
# 打开文件
file = open("example.txt", "r")  # 只读模式
file = open("example.txt", "w")  # 写入模式
file = open("example.txt", "a")  # 追加模式
file = open("example.txt", "rb") # 二进制读取模式

# 使用 with 语句自动关闭文件
with open("example.txt", "r") as file:
    content = file.read()
```

### 读取文件
```python
# 读取整个文件
with open("example.txt", "r") as file:
    content = file.read()

# 逐行读取
with open("example.txt", "r") as file:
    for line in file:
        print(line)

# 读取指定行数
with open("example.txt", "r") as file:
    lines = file.readlines()[:5]  # 读取前5行
```

### 写入文件
```python
# 写入文本
with open("example.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.")

# 写入多行
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("example.txt", "w") as file:
    file.writelines(lines)
```

### 文件操作常用方法
```python
# 检查文件是否存在
import os
if os.path.exists("example.txt"):
    print("File exists")

# 获取文件大小
size = os.path.getsize("example.txt")

# 重命名文件
os.rename("old.txt", "new.txt")

# 删除文件
os.remove("example.txt")
```

## 异常处理

### try-except 语句
```python
try:
    # 可能引发异常的代码
    result = 10 / 0
except ZeroDivisionError:
    # 处理特定异常
    print("不能除以零！")
except Exception as e:
    # 处理其他异常
    print(f"发生错误：{e}")
else:
    # 没有异常时执行
    print("没有发生异常")
finally:
    # 无论是否发生异常都会执行
    print("程序执行完毕")
```

### 常见异常类型
```python
# ZeroDivisionError
try:
    result = 10 / 0
except ZeroDivisionError:
    print("除零错误")

# ValueError
try:
    number = int("abc")
except ValueError:
    print("值错误")

# FileNotFoundError
try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("文件不存在")

# IndexError
try:
    list = [1, 2, 3]
    print(list[3])
except IndexError:
    print("索引超出范围")

# KeyError
try:
    dict = {"a": 1, "b": 2}
    print(dict["c"])
except KeyError:
    print("键不存在")
```

### 自定义异常
```python
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

try:
    raise CustomError("这是一个自定义异常")
except CustomError as e:
    print(f"捕获到自定义异常：{e}")
```

### 异常链
```python
try:
    try:
        result = 10 / 0
    except ZeroDivisionError as e:
        raise ValueError("计算错误") from e
except ValueError as e:
    print(f"错误原因：{e.__cause__}")
```

### 断言
```python
def divide(a, b):
    assert b != 0, "除数不能为零"
    return a / b

try:
    result = divide(10, 0)
except AssertionError as e:
    print(f"断言错误：{e}")
```

### 上下文管理器
```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# 使用自定义上下文管理器
with FileManager("example.txt", "w") as file:
    file.write("Hello, World!")
```

### 日志记录
```python
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

try:
    result = 10 / 0
except ZeroDivisionError:
    logging.error("除零错误", exc_info=True) 