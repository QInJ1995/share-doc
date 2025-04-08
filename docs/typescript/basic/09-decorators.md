# TypeScript 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。

## 启用装饰器

在 `tsconfig.json` 中启用装饰器支持：

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

## 类装饰器

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

```typescript
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = function() {
            return value;
        };
        const setter = function(newVal: any) {
            value = newVal;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class Greeter {
    @format("Hello, %s")
    greeting: string;
}
```

## 参数装饰器

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let requiredParameters: number[] = [];
    if (target[propertyKey]) {
        requiredParameters = target[propertyKey];
    }
    requiredParameters.push(parameterIndex);
    target[propertyKey] = requiredParameters;
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

## 装饰器工厂

```typescript
function color(value: string) {
    return function (target) {
        // 用 value 做一些事情
    }
}
```

## 装饰器组合

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

1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
3. 参数装饰器应用到构造函数。
4. 类装饰器应用到类。

## 下一步

- [工程配置](./10-project-configuration.md)
- [最佳实践](./11-best-practices.md)
- [常见问题](./12-faq.md)
