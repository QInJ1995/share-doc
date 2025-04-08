# 第九章：装饰器

## 装饰器概述

装饰器（Decorators）是 TypeScript 中的一个实验性特性，它提供了一种在类声明、方法、访问器、属性或参数上添加元数据的方式。

### 1. 启用装饰器

在 `tsconfig.json` 中启用装饰器支持：

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

### 2. 装饰器工厂

装饰器工厂是一个返回装饰器函数的函数：

```typescript
function color(value: string) {
    return function (target: any) {
        // 使用 value 做一些事情
    }
}
```

## 类装饰器

类装饰器在类声明之前被声明，应用于类的构造函数：

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

## 方法装饰器

方法装饰器声明在一个方法的声明之前，应用于方法的属性描述符：

```typescript
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

## 访问器装饰器

访问器装饰器声明在一个访问器的声明之前，应用于访问器的属性描述符：

```typescript
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```

## 属性装饰器

属性装饰器声明在一个属性声明之前：

```typescript
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        // 在 target 上存储元数据
    }
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
}
```

## 参数装饰器

参数装饰器声明在一个参数声明之前：

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    // 在 target 上存储元数据
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
```

## 装饰器组合

多个装饰器可以应用到一个声明上：

```typescript
function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}

class ExampleClass {
    @first()
    @second()
    method() {}
}
```

## 装饰器应用顺序

装饰器的应用顺序：

1. 参数装饰器，然后依次是方法装饰器，访问器装饰器，或属性装饰器应用到每个实例成员
2. 参数装饰器，然后依次是方法装饰器，访问器装饰器，或属性装饰器应用到每个静态成员
3. 参数装饰器应用到构造函数
4. 类装饰器应用到类

## 装饰器示例

### 1. 类装饰器示例

```typescript
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

### 2. 方法装饰器示例

```typescript
function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Called ${propertyKey}, result: ${result}`);
        return result;
    };
    return descriptor;
}

class Calculator {
    @log
    add(x: number, y: number): number {
        return x + y;
    }
}
```

### 3. 属性装饰器示例

```typescript
function DefaultValue(value: any) {
    return function (target: Object, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function() {
                return this[`_${propertyKey}`] || value;
            },
            set: function(newValue) {
                this[`_${propertyKey}`] = newValue;
            },
            enumerable: true,
            configurable: true
        });
    }
}

class Person {
    @DefaultValue("John")
    name: string;
}
```

### 本章小结

- 学习了装饰器的基本概念和用法
- 了解了不同类型的装饰器（类、方法、访问器、属性、参数）
- 掌握了装饰器的组合和应用顺序
- 理解了装饰器的实际应用场景

在下一章中，我们将学习 TypeScript 的工程配置。
