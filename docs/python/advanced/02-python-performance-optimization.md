# Python 性能优化

## 性能分析工具

### cProfile
```python
import cProfile

def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

# 使用 cProfile 分析函数性能
cProfile.run('slow_function()')
```

### line_profiler
```python
# 安装: pip install line_profiler

@profile
def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

# 运行: kernprof -l script.py
```

### memory_profiler
```python
# 安装: pip install memory_profiler

@profile
def memory_intensive_function():
    data = []
    for i in range(1000000):
        data.append(i)
    return data

# 运行: python -m memory_profiler script.py
```

## 代码优化技巧

### 使用列表推导式
```python
# 不推荐
result = []
for i in range(1000):
    if i % 2 == 0:
        result.append(i * 2)

# 推荐
result = [i * 2 for i in range(1000) if i % 2 == 0]
```

### 使用生成器
```python
# 不推荐
def get_numbers(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

# 推荐
def get_numbers(n):
    for i in range(n):
        yield i
```

### 使用内置函数
```python
# 不推荐
total = 0
for num in numbers:
    total += num

# 推荐
total = sum(numbers)
```

### 避免不必要的循环
```python
# 不推荐
def find_duplicates(lst):
    duplicates = []
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            if lst[i] == lst[j]:
                duplicates.append(lst[i])
    return duplicates

# 推荐
def find_duplicates(lst):
    from collections import Counter
    return [item for item, count in Counter(lst).items() if count > 1]
```

## 数据结构优化

### 使用集合进行成员检查
```python
# 不推荐
if item in list_of_items:
    pass

# 推荐
if item in set_of_items:
    pass
```

### 使用字典进行快速查找
```python
# 不推荐
def find_value(key, items):
    for item in items:
        if item[0] == key:
            return item[1]
    return None

# 推荐
def find_value(key, dictionary):
    return dictionary.get(key)
```

### 使用 collections 模块
```python
from collections import defaultdict, Counter, deque

# 使用 defaultdict
word_counts = defaultdict(int)
for word in words:
    word_counts[word] += 1

# 使用 Counter
word_counts = Counter(words)

# 使用 deque
queue = deque()
queue.append(1)
queue.popleft()
```

## 内存优化

### 使用 __slots__
```python
# 不推荐
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 推荐
class Person:
    __slots__ = ['name', 'age']
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

### 使用生成器表达式
```python
# 不推荐
squares = [x**2 for x in range(1000000)]

# 推荐
squares = (x**2 for x in range(1000000))
```

### 使用 itertools
```python
from itertools import chain, islice, count

# 合并多个可迭代对象
combined = chain(list1, list2, list3)

# 切片迭代器
sliced = islice(iterator, start, stop, step)

# 无限计数器
for i in count(start=0, step=1):
    if i > 100:
        break
```

## 并发优化

### 使用多线程
```python
import threading

def worker():
    print("Worker thread")

# 创建线程
thread = threading.Thread(target=worker)
thread.start()
thread.join()
```

### 使用多进程
```python
import multiprocessing

def worker():
    print("Worker process")

# 创建进程
process = multiprocessing.Process(target=worker)
process.start()
process.join()
```

### 使用线程池
```python
from concurrent.futures import ThreadPoolExecutor

def task(n):
    return n * n

with ThreadPoolExecutor(max_workers=4) as executor:
    results = executor.map(task, range(10))
```

### 使用进程池
```python
from concurrent.futures import ProcessPoolExecutor

def task(n):
    return n * n

with ProcessPoolExecutor(max_workers=4) as executor:
    results = executor.map(task, range(10))
```

## 编译优化

### 使用 Cython
```python
# 安装: pip install cython

# example.pyx
def calculate(int n):
    cdef int i
    cdef int result = 0
    for i in range(n):
        result += i
    return result

# 编译: python setup.py build_ext --inplace
```

### 使用 Numba
```python
# 安装: pip install numba

from numba import jit

@jit(nopython=True)
def calculate(n):
    result = 0
    for i in range(n):
        result += i
    return result
```

## 缓存优化

### 使用 functools.lru_cache
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### 使用缓存装饰器
```python
def cache(func):
    cached_results = {}
    
    def wrapper(*args):
        if args in cached_results:
            return cached_results[args]
        result = func(*args)
        cached_results[args] = result
        return result
    
    return wrapper

@cache
def expensive_function(x):
    # 耗时计算
    return x * x
```

## 数据库优化

### 使用批量操作
```python
# 不推荐
for item in items:
    cursor.execute("INSERT INTO table VALUES (?)", (item,))

# 推荐
cursor.executemany("INSERT INTO table VALUES (?)", [(item,) for item in items])
```

### 使用索引
```python
# 创建索引
cursor.execute("CREATE INDEX idx_name ON table (column_name)")

# 使用索引查询
cursor.execute("SELECT * FROM table WHERE column_name = ?", (value,))
```

### 使用连接池
```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'sqlite:///database.db',
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10
)
``` 