# Python 设计模式

## 创建型模式

### 单例模式
```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# 使用
singleton1 = Singleton()
singleton2 = Singleton()
print(singleton1 is singleton2)  # 输出: True
```

### 工厂模式
```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else:
            raise ValueError("Unknown animal type")

# 使用
factory = AnimalFactory()
dog = factory.create_animal("dog")
cat = factory.create_animal("cat")
print(dog.speak())  # 输出: Woof!
print(cat.speak())  # 输出: Meow!
```

### 建造者模式
```python
class Pizza:
    def __init__(self):
        self.size = None
        self.cheese = False
        self.pepperoni = False
        self.mushrooms = False

class PizzaBuilder:
    def __init__(self):
        self.pizza = Pizza()

    def set_size(self, size):
        self.pizza.size = size
        return self

    def add_cheese(self):
        self.pizza.cheese = True
        return self

    def add_pepperoni(self):
        self.pizza.pepperoni = True
        return self

    def add_mushrooms(self):
        self.pizza.mushrooms = True
        return self

    def build(self):
        return self.pizza

# 使用
builder = PizzaBuilder()
pizza = (builder.set_size("large")
                .add_cheese()
                .add_pepperoni()
                .build())
```

## 结构型模式

### 适配器模式
```python
class OldSystem:
    def specific_request(self):
        return "Old System Response"

class Target:
    def request(self):
        pass

class Adapter(Target):
    def __init__(self, old_system):
        self.old_system = old_system

    def request(self):
        return self.old_system.specific_request()

# 使用
old_system = OldSystem()
adapter = Adapter(old_system)
print(adapter.request())  # 输出: Old System Response
```

### 装饰器模式
```python
class Component:
    def operation(self):
        pass

class ConcreteComponent(Component):
    def operation(self):
        return "ConcreteComponent"

class Decorator(Component):
    def __init__(self, component):
        self.component = component

    def operation(self):
        return self.component.operation()

class ConcreteDecoratorA(Decorator):
    def operation(self):
        return f"ConcreteDecoratorA({self.component.operation()})"

class ConcreteDecoratorB(Decorator):
    def operation(self):
        return f"ConcreteDecoratorB({self.component.operation()})"

# 使用
component = ConcreteComponent()
decorator1 = ConcreteDecoratorA(component)
decorator2 = ConcreteDecoratorB(decorator1)
print(decorator2.operation())
```

### 代理模式
```python
class Subject:
    def request(self):
        pass

class RealSubject(Subject):
    def request(self):
        return "RealSubject"

class Proxy(Subject):
    def __init__(self, real_subject):
        self.real_subject = real_subject

    def request(self):
        # 可以在访问真实对象前后添加额外操作
        print("Proxy: 访问真实对象前")
        result = self.real_subject.request()
        print("Proxy: 访问真实对象后")
        return result

# 使用
real_subject = RealSubject()
proxy = Proxy(real_subject)
print(proxy.request())
```

## 行为型模式

### 观察者模式
```python
class Observer:
    def update(self, subject):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self)

class ConcreteObserver(Observer):
    def update(self, subject):
        print(f"Observer: 收到更新通知")

# 使用
subject = Subject()
observer = ConcreteObserver()
subject.attach(observer)
subject.notify()
```

### 策略模式
```python
class Strategy:
    def execute(self, data):
        pass

class ConcreteStrategyA(Strategy):
    def execute(self, data):
        return sorted(data)

class ConcreteStrategyB(Strategy):
    def execute(self, data):
        return sorted(data, reverse=True)

class Context:
    def __init__(self, strategy):
        self._strategy = strategy

    def set_strategy(self, strategy):
        self._strategy = strategy

    def execute_strategy(self, data):
        return self._strategy.execute(data)

# 使用
data = [3, 1, 4, 1, 5, 9]
context = Context(ConcreteStrategyA())
print(context.execute_strategy(data))  # 输出: [1, 1, 3, 4, 5, 9]

context.set_strategy(ConcreteStrategyB())
print(context.execute_strategy(data))  # 输出: [9, 5, 4, 3, 1, 1]
```

### 命令模式
```python
class Command:
    def execute(self):
        pass

class Light:
    def turn_on(self):
        print("Light is on")

    def turn_off(self):
        print("Light is off")

class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.turn_on()

class LightOffCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.turn_off()

class RemoteControl:
    def __init__(self):
        self.command = None

    def set_command(self, command):
        self.command = command

    def press_button(self):
        self.command.execute()

# 使用
light = Light()
light_on = LightOnCommand(light)
light_off = LightOffCommand(light)

remote = RemoteControl()
remote.set_command(light_on)
remote.press_button()  # 输出: Light is on

remote.set_command(light_off)
remote.press_button()  # 输出: Light is off
```

### 状态模式
```python
class State:
    def handle(self, context):
        pass

class ConcreteStateA(State):
    def handle(self, context):
        print("处理状态A")
        context.state = ConcreteStateB()

class ConcreteStateB(State):
    def handle(self, context):
        print("处理状态B")
        context.state = ConcreteStateA()

class Context:
    def __init__(self):
        self.state = ConcreteStateA()

    def request(self):
        self.state.handle(self)

# 使用
context = Context()
context.request()  # 输出: 处理状态A
context.request()  # 输出: 处理状态B
context.request()  # 输出: 处理状态A
```

### 模板方法模式
```python
class AbstractClass:
    def template_method(self):
        self.base_operation1()
        self.required_operation1()
        self.base_operation2()
        self.hook()

    def base_operation1(self):
        print("AbstractClass: 基础操作1")

    def base_operation2(self):
        print("AbstractClass: 基础操作2")

    def required_operation1(self):
        pass

    def hook(self):
        pass

class ConcreteClass(AbstractClass):
    def required_operation1(self):
        print("ConcreteClass: 必需操作1")

    def hook(self):
        print("ConcreteClass: 钩子操作")

# 使用
concrete = ConcreteClass()
concrete.template_method()
``` 