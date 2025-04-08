# 第三章：高级装饰器

## 类装饰器

### 1. 基础类装饰器

```typescript
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}

@classDecorator
class Example {
    property = "property";
    hello: string;

    constructor(m: string) {
        this.hello = m;
    }
}
```

### 2. 工厂类装饰器

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Example {
    constructor() {
        console.log("Creating new instance");
    }
}
```

### 3. 元数据类装饰器

```typescript
function table(tableName: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata('tableName', tableName, constructor);
    };
}

@table('users')
class User {
    id: number;
    name: string;
}
```

## 方法装饰器

### 1. 基础方法装饰器

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };

    return descriptor;
}

class Example {
    @log
    multiply(a: number, b: number) {
        return a * b;
    }
}
```

### 2. 异步方法装饰器

```typescript
function asyncLog() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            console.log(`Starting ${propertyKey}`);
            try {
                const result = await originalMethod.apply(this, args);
                console.log(`Completed ${propertyKey}`);
                return result;
            } catch (error) {
                console.error(`Error in ${propertyKey}:`, error);
                throw error;
            }
        };

        return descriptor;
    };
}

class Example {
    @asyncLog()
    async fetchData() {
        // 异步操作
        return await fetch('https://api.example.com/data');
    }
}
```

### 3. 缓存方法装饰器

```typescript
function cache() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const cache = new Map();

        descriptor.value = function(...args: any[]) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            return result;
        };

        return descriptor;
    };
}

class Example {
    @cache()
    expensiveOperation(n: number) {
        // 耗时操作
        return n * n;
    }
}
```

## 属性装饰器

### 1. 基础属性装饰器

```typescript
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];

        const getter = () => {
            return value;
        };

        const setter = (newVal: any) => {
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

class Example {
    @format("YYYY-MM-DD")
    date: string;
}
```

### 2. 验证属性装饰器

```typescript
function validate(min: number, max: number) {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];

        const getter = () => {
            return value;
        };

        const setter = (newVal: number) => {
            if (newVal < min || newVal > max) {
                throw new Error(`Value must be between ${min} and ${max}`);
            }
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

class Example {
    @validate(0, 100)
    age: number;
}
```

## 参数装饰器

### 1. 基础参数装饰器

```typescript
function required(target: any, propertyKey: string, parameterIndex: number) {
    const requiredParameters: number[] = Reflect.getOwnMetadata(
        'required',
        target,
        propertyKey
    ) || [];
    requiredParameters.push(parameterIndex);
    Reflect.defineMetadata(
        'required',
        requiredParameters,
        target,
        propertyKey
    );
}

class Example {
    greet(@required name: string) {
        return `Hello ${name}`;
    }
}
```

### 2. 验证参数装饰器

```typescript
function validateEmail(target: any, propertyKey: string, parameterIndex: number) {
    const validateParameters: number[] = Reflect.getOwnMetadata(
        'validateEmail',
        target,
        propertyKey
    ) || [];
    validateParameters.push(parameterIndex);
    Reflect.defineMetadata(
        'validateEmail',
        validateParameters,
        target,
        propertyKey
    );
}

class Example {
    sendEmail(@validateEmail email: string) {
        // 发送邮件
    }
}
```

## 装饰器工厂

### 1. 基础装饰器工厂

```typescript
function logWithPrefix(prefix: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            console.log(`${prefix}: Calling ${propertyKey}`);
            const result = originalMethod.apply(this, args);
            console.log(`${prefix}: Result:`, result);
            return result;
        };

        return descriptor;
    };
}

class Example {
    @logWithPrefix('DEBUG')
    multiply(a: number, b: number) {
        return a * b;
    }
}
```

### 2. 组合装饰器

```typescript
function compose(...decorators: Function[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        return decorators.reduce((descriptor, decorator) => {
            return decorator(target, propertyKey, descriptor);
        }, descriptor);
    };
}

class Example {
    @compose(
        logWithPrefix('DEBUG'),
        cache()
    )
    expensiveOperation(n: number) {
        return n * n;
    }
}
```

## 装饰器应用示例

### 1. 依赖注入

```typescript
function inject(service: any) {
    return function (target: any, propertyKey: string) {
        const serviceInstance = new service();
        Object.defineProperty(target, propertyKey, {
            get: () => serviceInstance
        });
    };
}

class UserService {
    getUsers() {
        return ['John', 'Jane'];
    }
}

class UserController {
    @inject(UserService)
    userService: UserService;

    getUsers() {
        return this.userService.getUsers();
    }
}
```

### 2. 权限控制

```typescript
function requireRole(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            if (!hasRole(role)) {
                throw new Error('Unauthorized');
            }
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

class UserController {
    @requireRole('admin')
    deleteUser(userId: number) {
        // 删除用户
    }
}
```

### 3. 性能监控

```typescript
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${end - start}ms`);
        return result;
    };

    return descriptor;
}

class Example {
    @measure
    async fetchData() {
        // 异步操作
        return await fetch('https://api.example.com/data');
    }
}
```

### 本章小结

- 学习了类装饰器的使用和实现
- 掌握了方法装饰器的应用
- 了解了属性装饰器的实现
- 熟悉了参数装饰器的使用
- 学习了装饰器工厂和组合装饰器
- 掌握了装饰器在实际应用中的示例

在下一章中，我们将学习 TypeScript 中的高级异步编程。 