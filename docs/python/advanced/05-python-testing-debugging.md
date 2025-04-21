# Python 测试和调试

## 单元测试

### unittest 模块
```python
import unittest

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_add_positive_numbers(self):
        self.assertEqual(add(1, 2), 3)

    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -2), -3)

    def test_add_zero(self):
        self.assertEqual(add(0, 0), 0)

if __name__ == '__main__':
    unittest.main()
```

### pytest 框架
```python
# 安装: pip install pytest

def add(a, b):
    return a + b

def test_add_positive_numbers():
    assert add(1, 2) == 3

def test_add_negative_numbers():
    assert add(-1, -2) == -3

def test_add_zero():
    assert add(0, 0) == 0

# 运行: pytest test_file.py
```

### 测试装饰器
```python
import pytest

@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (-1, -2, -3),
    (0, 0, 0)
])
def test_add(a, b, expected):
    assert add(a, b) == expected

@pytest.mark.skip(reason="跳过测试")
def test_skipped():
    assert False

@pytest.mark.xfail
def test_expected_failure():
    assert False
```

## 测试夹具

### unittest 夹具
```python
import unittest

class TestDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # 在所有测试之前运行一次
        cls.db = connect_to_database()

    @classmethod
    def tearDownClass(cls):
        # 在所有测试之后运行一次
        cls.db.close()

    def setUp(self):
        # 在每个测试之前运行
        self.db.clear()

    def tearDown(self):
        # 在每个测试之后运行
        self.db.rollback()

    def test_insert(self):
        self.db.insert("test")
        self.assertEqual(self.db.count(), 1)
```

### pytest 夹具
```python
import pytest

@pytest.fixture
def database():
    db = connect_to_database()
    yield db
    db.close()

@pytest.fixture
def clean_database(database):
    database.clear()
    return database

def test_insert(clean_database):
    clean_database.insert("test")
    assert clean_database.count() == 1
```

## 模拟对象

### unittest.mock
```python
from unittest import TestCase, mock

def get_data_from_api():
    # 实际API调用
    pass

class TestAPI(TestCase):
    @mock.patch('module.get_data_from_api')
    def test_api_call(self, mock_api):
        mock_api.return_value = {'data': 'test'}
        result = get_data_from_api()
        self.assertEqual(result, {'data': 'test'})
        mock_api.assert_called_once()
```

### pytest-mock
```python
# 安装: pip install pytest-mock

def test_api_call(mocker):
    mock_api = mocker.patch('module.get_data_from_api')
    mock_api.return_value = {'data': 'test'}
    
    result = get_data_from_api()
    assert result == {'data': 'test'}
    mock_api.assert_called_once()
```

## 调试工具

### pdb 调试器
```python
import pdb

def divide(a, b):
    pdb.set_trace()  # 设置断点
    return a / b

# 使用
result = divide(10, 2)
```

### 调试命令
```python
# pdb 常用命令
# n: 执行下一行
# s: 进入函数
# c: 继续执行
# p: 打印变量
# l: 显示当前代码
# w: 显示调用栈
# q: 退出调试
```

### 日志调试
```python
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='debug.log'
)

def process_data(data):
    logging.debug(f"处理数据: {data}")
    try:
        result = data * 2
        logging.info(f"处理成功: {result}")
        return result
    except Exception as e:
        logging.error(f"处理失败: {e}")
        raise
```

## 性能分析

### cProfile
```python
import cProfile

def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

# 使用 cProfile 分析
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

## 异常处理

### 自定义异常
```python
class ValidationError(Exception):
    def __init__(self, message, field=None):
        self.message = message
        self.field = field
        super().__init__(self.message)

def validate_data(data):
    if not data:
        raise ValidationError("数据不能为空")
    if not isinstance(data, dict):
        raise ValidationError("数据必须是字典", "data")
```

### 异常链
```python
try:
    try:
        result = 10 / 0
    except ZeroDivisionError as e:
        raise ValueError("计算错误") from e
except ValueError as e:
    print(f"错误原因: {e.__cause__}")
```

## 调试技巧

### 断言
```python
def divide(a, b):
    assert b != 0, "除数不能为零"
    return a / b

# 使用
try:
    result = divide(10, 0)
except AssertionError as e:
    print(f"断言错误: {e}")
```

### 调试装饰器
```python
def debug(func):
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        print(f"参数: args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"返回值: {result}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

# 使用
result = add(1, 2)
```

### 上下文管理器调试
```python
from contextlib import contextmanager

@contextmanager
def debug_context():
    print("进入上下文")
    try:
        yield
    except Exception as e:
        print(f"发生错误: {e}")
        raise
    finally:
        print("退出上下文")

# 使用
with debug_context():
    result = 10 / 0
```

## 测试覆盖率

### coverage.py
```python
# 安装: pip install coverage

# 运行测试并收集覆盖率
# coverage run -m pytest test_file.py

# 生成覆盖率报告
# coverage report
# coverage html
```

### pytest-cov
```python
# 安装: pip install pytest-cov

# 运行测试并收集覆盖率
# pytest --cov=module test_file.py

# 生成HTML报告
# pytest --cov=module --cov-report=html test_file.py
```

## 持续集成

### GitHub Actions
```yaml
# .github/workflows/python-test.yml
name: Python Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.7, 3.8, 3.9]

    steps:
    - uses: actions/checkout@v2
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v2
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install pytest pytest-cov
    - name: Test with pytest
      run: |
        pytest --cov=module --cov-report=xml
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
```

### Travis CI
```yaml
# .travis.yml
language: python
python:
  - "3.7"
  - "3.8"
  - "3.9"

install:
  - pip install -r requirements.txt
  - pip install pytest pytest-cov

script:
  - pytest --cov=module

after_success:
  - codecov
``` 