# Python 面向对象编程

## 类和对象

### 创建类
```python
class Person:
    # 类属性
    species = "Human"

    # 初始化方法
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age

    # 实例方法
    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."

    # 类方法
    @classmethod
    def get_species(cls):
        return cls.species

    # 静态方法
    @staticmethod
    def is_adult(age):
        return age >= 18
```

### 创建对象
```python
# 创建对象
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

# 访问属性
print(person1.name)  # 输出: Alice
print(person2.age)   # 输出: 30

# 调用方法
print(person1.greet())  # 输出: Hello, my name is Alice and I am 25 years old.
```

## 继承

### 单继承
```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# 创建对象
dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.speak())  # 输出: Woof!
print(cat.speak())  # 输出: Meow!
```

### 多继承
```python
class A:
    def method(self):
        return "A"

class B:
    def method(self):
        return "B"

class C(A, B):
    pass

c = C()
print(c.method())  # 输出: A (因为 A 在继承列表中排在前面)
```

## 封装

### 私有属性和方法
```python
class BankAccount:
    def __init__(self, account_number, balance):
        self._account_number = account_number  # 受保护的属性
        self.__balance = balance              # 私有属性

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    def get_balance(self):
        return self.__balance

# 使用
account = BankAccount("12345", 1000)
account.deposit(500)
print(account.get_balance())  # 输出: 1500
```

## 多态

```python
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

# 使用多态
shapes = [Rectangle(4, 5), Circle(3)]
for shape in shapes:
    print(shape.area())
```

## 特殊方法（魔术方法）

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# 使用
v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2
print(v3)  # 输出: Vector(6, 8)
```

## 属性装饰器

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

# 使用
temp = Temperature(25)
print(temp.celsius)     # 输出: 25
print(temp.fahrenheit)  # 输出: 77.0
temp.celsius = 30
print(temp.fahrenheit)  # 输出: 86.0
```

## 抽象基类

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# 使用
dog = Dog()
cat = Cat()
print(dog.speak())  # 输出: Woof!
print(cat.speak())  # 输出: Meow!
```

## 类装饰器

```python
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Database initialized")

# 使用
db1 = Database()
db2 = Database()
print(db1 is db2)  # 输出: True
``` 