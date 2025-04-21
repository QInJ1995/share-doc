# Python 高级特性

## 装饰器

### 函数装饰器
```python
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行时间: {end - start}秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "完成"

# 使用
result = slow_function()
```

### 带参数的装饰器
```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

# 使用
say_hello()
```

### 类装饰器
```python
class Logger:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print(f"调用函数: {self.func.__name__}")
        result = self.func(*args, **kwargs)
        print(f"函数返回: {result}")
        return result

@Logger
def add(a, b):
    return a + b

# 使用
result = add(1, 2)
```

## 生成器

### 生成器函数
```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 使用
for num in fibonacci(10):
    print(num)
```

### 生成器表达式
```python
# 列表推导式
squares = [x**2 for x in range(10)]

# 生成器表达式
squares_gen = (x**2 for x in range(10))

# 使用
for square in squares_gen:
    print(square)
```

## 上下文管理器

### 使用 contextlib
```python
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    file = open(filename, mode)
    try:
        yield file
    finally:
        file.close()

# 使用
with file_manager("example.txt", "w") as f:
    f.write("Hello, World!")
```

### 异步上下文管理器
```python
import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def async_file_manager(filename, mode):
    file = open(filename, mode)
    try:
        yield file
    finally:
        file.close()

# 使用
async def main():
    async with async_file_manager("example.txt", "w") as f:
        f.write("Hello, World!")

asyncio.run(main())
```

## 元类

### 创建元类
```python
class Meta(type):
    def __new__(cls, name, bases, attrs):
        # 添加类属性
        attrs['created_by'] = 'Meta'
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=Meta):
    pass

# 使用
print(MyClass.created_by)  # 输出: Meta
```

### 使用元类实现单例模式
```python
class Singleton(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    def __init__(self):
        print("Database initialized")

# 使用
db1 = Database()
db2 = Database()
print(db1 is db2)  # 输出: True
```

## 描述符

### 属性描述符
```python
class Descriptor:
    def __init__(self, initial_value=None):
        self.value = initial_value

    def __get__(self, instance, owner):
        return self.value

    def __set__(self, instance, value):
        self.value = value

class MyClass:
    attribute = Descriptor()

# 使用
obj = MyClass()
obj.attribute = 42
print(obj.attribute)  # 输出: 42
```

### 数据验证描述符
```python
class ValidatedProperty:
    def __init__(self, min_value=None, max_value=None):
        self.min_value = min_value
        self.max_value = max_value
        self._value = None

    def __get__(self, instance, owner):
        return self._value

    def __set__(self, instance, value):
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"值不能小于 {self.min_value}")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"值不能大于 {self.max_value}")
        self._value = value

class Person:
    age = ValidatedProperty(min_value=0, max_value=120)

# 使用
person = Person()
person.age = 25
print(person.age)  # 输出: 25
```

## 协程

### 异步函数
```python
import asyncio

async def fetch_data():
    print("开始获取数据")
    await asyncio.sleep(2)
    print("数据获取完成")
    return {"data": 42}

async def main():
    result = await fetch_data()
    print(result)

# 运行
asyncio.run(main())
```

### 并发任务
```python
async def task(name, delay):
    print(f"任务 {name} 开始")
    await asyncio.sleep(delay)
    print(f"任务 {name} 完成")
    return f"任务 {name} 结果"

async def main():
    tasks = [
        task("A", 2),
        task("B", 1),
        task("C", 3)
    ]
    results = await asyncio.gather(*tasks)
    print(results)

# 运行
asyncio.run(main())
```

## 类型注解

### 基本类型注解
```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# 使用类型注解的变量
age: int = 25
pi: float = 3.14159
is_valid: bool = True
```

### 复杂类型注解
```python
from typing import List, Dict, Tuple, Optional, Union

def process_data(
    numbers: List[int],
    config: Dict[str, Union[int, str]],
    point: Tuple[float, float],
    name: Optional[str] = None
) -> Dict[str, int]:
    return {"count": len(numbers)}
```

### 自定义类型
```python
from typing import TypeVar, Generic

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, content: T):
        self.content = content

    def get_content(self) -> T:
        return self.content

# 使用
box = Box[int](42)
content = box.get_content()
``` 