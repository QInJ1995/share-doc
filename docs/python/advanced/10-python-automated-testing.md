# Python自动化测试

## 测试概述

### 测试类型
```python
# 单元测试: 测试单个函数或类
# 集成测试: 测试多个组件交互
# 功能测试: 测试完整功能
# 性能测试: 测试系统性能
# 安全测试: 测试系统安全性
```

### 测试框架
```python
# unittest: Python标准库测试框架
# pytest: 功能强大的测试框架
# nose2: unittest的扩展
# doctest: 文档测试
# hypothesis: 属性测试
```

## 单元测试

### unittest基础
```python
import unittest

class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```

### 测试夹具
```python
class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.db = Database()
        self.db.connect()
        self.db.initialize()

    def tearDown(self):
        self.db.close()

    def test_query(self):
        result = self.db.query("SELECT * FROM users")
        self.assertEqual(len(result), 10)
```

### 测试套件
```python
def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestStringMethods('test_upper'))
    suite.addTest(TestStringMethods('test_isupper'))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```

## pytest框架

### 基础测试
```python
def test_addition():
    assert 1 + 1 == 2

def test_subtraction():
    assert 3 - 1 == 2

def test_multiplication():
    assert 2 * 3 == 6
```

### 测试夹具
```python
import pytest

@pytest.fixture
def database():
    db = Database()
    db.connect()
    yield db
    db.close()

def test_query(database):
    result = database.query("SELECT * FROM users")
    assert len(result) == 10
```

### 参数化测试
```python
@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4),
    (3, 6),
])
def test_double(input, expected):
    assert input * 2 == expected
```

## 测试覆盖率

### coverage.py
```python
# 安装: pip install coverage

# 运行测试并收集覆盖率
# coverage run -m pytest tests/

# 生成报告
# coverage report
# coverage html
```

### pytest-cov
```python
# 安装: pip install pytest-cov

# 运行测试并收集覆盖率
# pytest --cov=myproject tests/

# 生成HTML报告
# pytest --cov=myproject --cov-report=html tests/
```

## 模拟对象

### unittest.mock
```python
from unittest.mock import Mock, patch

def test_api_call():
    # 创建模拟对象
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {'key': 'value'}

    # 模拟requests.get
    with patch('requests.get', return_value=mock_response):
        response = make_api_call()
        assert response == {'key': 'value'}
```

### pytest-mock
```python
def test_database_query(mocker):
    # 模拟数据库连接
    mock_db = mocker.Mock()
    mock_db.query.return_value = [1, 2, 3]

    # 模拟数据库类
    mocker.patch('myapp.Database', return_value=mock_db)

    result = get_data()
    assert result == [1, 2, 3]
```

## 异步测试

### 异步单元测试
```python
import asyncio
import unittest

class TestAsyncFunctions(unittest.TestCase):
    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)

    def tearDown(self):
        self.loop.close()

    def test_async_function(self):
        async def test():
            result = await async_function()
            self.assertEqual(result, 'expected')

        self.loop.run_until_complete(test())
```

### pytest异步测试
```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    result = await async_function()
    assert result == 'expected'
```

## 性能测试

### 时间测试
```python
import timeit

def test_performance():
    setup = '''
from mymodule import slow_function
    '''
    
    stmt = 'slow_function()'
    
    # 运行1000次
    time = timeit.timeit(stmt, setup, number=1000)
    assert time < 1.0  # 应该在1秒内完成
```

### 内存测试
```python
import memory_profiler

@memory_profiler.profile
def test_memory_usage():
    large_list = [i for i in range(1000000)]
    del large_list
```

## 持续集成

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Python Tests

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
        pip install -r requirements.txt
    - name: Run tests
      run: |
        pytest --cov=myproject --cov-report=xml
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
  - pytest --cov=myproject
```

## 测试最佳实践

### 测试组织结构
```python
# 项目结构
project/
    ├── src/
    │   └── myproject/
    │       ├── __init__.py
    │       ├── module1.py
    │       └── module2.py
    └── tests/
        ├── __init__.py
        ├── test_module1.py
        └── test_module2.py
```

### 测试命名规范
```python
# 测试文件命名
test_module.py
test_feature.py

# 测试类命名
class TestFeature(unittest.TestCase):
    pass

# 测试方法命名
def test_feature_behavior():
    pass
```

### 测试文档
```python
def test_feature():
    """
    Test the feature behavior.
    
    Given a specific input,
    When the feature is called,
    Then it should return the expected output.
    """
    # 测试代码
    pass
```

## 实践案例

### Web应用测试
```python
from flask import Flask
import pytest
from myapp import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome' in response.data

def test_login(client):
    response = client.post('/login', data={
        'username': 'test',
        'password': 'test'
    })
    assert response.status_code == 302
    assert '/dashboard' in response.headers['Location']
```

### API测试
```python
import requests
import pytest

@pytest.fixture
def api_url():
    return 'http://localhost:5000/api'

def test_get_users(api_url):
    response = requests.get(f'{api_url}/users')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_user(api_url):
    data = {'username': 'test', 'email': 'test@example.com'}
    response = requests.post(f'{api_url}/users', json=data)
    assert response.status_code == 201
    assert 'id' in response.json()
```

### 数据库测试
```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from myapp.models import Base, User

@pytest.fixture
def db_session():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()

def test_create_user(db_session):
    user = User(username='test', email='test@example.com')
    db_session.add(user)
    db_session.commit()
    
    result = db_session.query(User).first()
    assert result.username == 'test'
    assert result.email == 'test@example.com'
``` 