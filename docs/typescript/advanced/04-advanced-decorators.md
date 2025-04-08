# TypeScript 装饰器进阶

装饰器是一种特殊类型的声明，它可以被附加到类声明、方法、访问符、属性或参数上。装饰器使用 `@expression` 这种形式，其中 `expression` 必须是一个函数，它会在运行时被调用。

## 装饰器工厂

装饰器工厂是一个函数，它返回一个装饰器函数。

```typescript
function color(value: string) {
    return function (target: any) {
        // 做一些事情
    }
}
```

## 装饰器组合

多个装饰器可以同时应用到一个声明上。

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

## 类装饰器

类装饰器在类声明之前被声明，它应用于类的构造函数。

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

方法装饰器声明在一个方法的声明之前，它会被应用到方法的属性描述符上。

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

访问器装饰器声明在一个访问器的声明之前，它会被应用到访问器的属性描述符上。

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

属性装饰器声明在一个属性声明之前。

```typescript
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        // 做一些事情
    };
}

class Greeter {
    @format("Hello, %s")
    greeting: string;
}
```

## 参数装饰器

参数装饰器声明在一个参数声明之前。

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    // 做一些事情
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

## 元数据反射 API

TypeScript 支持为带有装饰器的声明生成元数据。你需要引入 `reflect-metadata` 库。

```typescript
import "reflect-metadata";

class Point {
    x: number;
    y: number;
}

let typeOfPoint = Reflect.getMetadata("design:type", Point.prototype, "x");
```

## 装饰器应用实例

### 日志装饰器

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Called ${propertyKey} and returned: ${JSON.stringify(result)}`);
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

### 验证装饰器

```typescript
function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        for (let arg of args) {
            if (arg === undefined || arg === null) {
                throw new Error(`Invalid argument in ${propertyKey}`);
            }
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

class User {
    @validate
    setName(name: string) {
        this.name = name;
    }
}
```

## 装饰器最佳实践

1. 装饰器应该只做一件事
2. 保持装饰器简单
3. 使用装饰器工厂来增加灵活性
4. 注意装饰器的执行顺序
5. 考虑装饰器的性能影响

## 下一步

- [高级泛型](./05-advanced-generics.md)
- [类型编程进阶](./06-advanced-type-programming.md)
- [类型兼容性](./03-type-compatibility.md) 