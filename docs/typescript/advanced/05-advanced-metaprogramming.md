# 第五章：高级元编程

## 反射和元数据

### 1. 反射 API

```typescript
class User {
    constructor(
        @Reflect.metadata('design:type', String)
        public name: string,
        @Reflect.metadata('design:type', Number)
        public age: number
    ) {}

    @Reflect.metadata('design:returntype', String)
    getFullName(): string {
        return `${this.name} (${this.age})`;
    }
}

// 获取类的元数据
const userMetadata = Reflect.getMetadata('design:paramtypes', User);
console.log(userMetadata); // [String, Number]

// 获取方法的元数据
const methodMetadata = Reflect.getMetadata('design:returntype', User.prototype, 'getFullName');
console.log(methodMetadata); // String
```

### 2. 自定义元数据

```typescript
// 定义元数据键
const METADATA_KEYS = {
    VALIDATION: 'validation',
    PERMISSION: 'permission',
    CACHE: 'cache'
} as const;

// 定义验证装饰器
function Validate(min: number, max: number) {
    return Reflect.metadata(METADATA_KEYS.VALIDATION, { min, max });
}

// 定义权限装饰器
function RequirePermission(permission: string) {
    return Reflect.metadata(METADATA_KEYS.PERMISSION, permission);
}

class Product {
    @Validate(0, 100)
    price: number;

    @RequirePermission('admin')
    delete(): void {
        // 删除逻辑
    }
}

// 获取验证规则
const validationRules = Reflect.getMetadata(
    METADATA_KEYS.VALIDATION,
    Product.prototype,
    'price'
);
```

## 装饰器工厂

### 1. 方法装饰器工厂

```typescript
interface LogOptions {
    level: 'info' | 'warn' | 'error';
    prefix?: string;
}

function Log(options: LogOptions = { level: 'info' }) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const prefix = options.prefix || target.constructor.name;
            console[options.level](`${prefix}.${propertyKey}`, ...args);
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

class Calculator {
    @Log({ level: 'info', prefix: 'Calculator' })
    add(a: number, b: number): number {
        return a + b;
    }

    @Log({ level: 'error' })
    divide(a: number, b: number): number {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    }
}
```

### 2. 类装饰器工厂

```typescript
interface ServiceOptions {
    singleton?: boolean;
    dependencies?: string[];
}

function Service(options: ServiceOptions = {}) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        Reflect.defineMetadata('service:options', options, constructor);
        
        if (options.singleton) {
            const instance = new constructor();
            Reflect.defineMetadata('service:instance', instance, constructor);
        }
    };
}

@Service({ singleton: true, dependencies: ['Database'] })
class UserService {
    constructor(private db: Database) {}
}
```

## 属性访问器

### 1. 属性描述符

```typescript
class PropertyManager {
    static defineProperty<T>(
        target: any,
        propertyKey: string,
        options: {
            get?: () => T;
            set?: (value: T) => void;
            enumerable?: boolean;
            configurable?: boolean;
        }
    ) {
        Object.defineProperty(target, propertyKey, {
            get: options.get,
            set: options.set,
            enumerable: options.enumerable ?? true,
            configurable: options.configurable ?? false
        });
    }
}

class Person {
    private _age: number = 0;

    constructor() {
        PropertyManager.defineProperty(this, 'age', {
            get: () => this._age,
            set: (value: number) => {
                if (value >= 0 && value <= 150) {
                    this._age = value;
                } else {
                    throw new Error('Invalid age');
                }
            }
        });
    }
}
```

### 2. 属性代理

```typescript
class PropertyProxy<T> {
    private value: T;
    private listeners: ((value: T) => void)[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    get(): T {
        return this.value;
    }

    set(newValue: T): void {
        const oldValue = this.value;
        this.value = newValue;
        this.notifyListeners(oldValue, newValue);
    }

    subscribe(listener: (value: T) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(oldValue: T, newValue: T): void {
        this.listeners.forEach(listener => listener(newValue));
    }
}

class User {
    name = new PropertyProxy<string>('');
    age = new PropertyProxy<number>(0);
}
```

## 类型操作符

### 1. 条件类型

```typescript
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;

type StringOrNumber<T> = T extends string | number ? T : never;

type ExtractNonNullable<T> = T extends null | undefined ? never : T;

type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

type ExtractArray<T> = T extends Array<infer U> ? U : T;
```

### 2. 映射类型

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

## 类型守卫

### 1. 自定义类型守卫

```typescript
interface User {
    name: string;
    age: number;
}

interface Admin {
    name: string;
    role: string;
}

function isUser(value: any): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.name === 'string' &&
        typeof value.age === 'number'
    );
}

function isAdmin(value: any): value is Admin {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.name === 'string' &&
        typeof value.role === 'string'
    );
}

function processUser(value: User | Admin) {
    if (isUser(value)) {
        console.log(value.age); // 类型安全
    } else if (isAdmin(value)) {
        console.log(value.role); // 类型安全
    }
}
```

### 2. 类型谓词

```typescript
type ValidationResult<T> = {
    isValid: boolean;
    value: T;
    errors: string[];
};

function validateUser(user: any): ValidationResult<User> {
    const errors: string[] = [];
    
    if (typeof user.name !== 'string') {
        errors.push('Name must be a string');
    }
    
    if (typeof user.age !== 'number') {
        errors.push('Age must be a number');
    }
    
    return {
        isValid: errors.length === 0,
        value: user as User,
        errors
    };
}
```

## 类型推断

### 1. 类型推断工具

```typescript
type InferReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type InferParameterType<T> = T extends (arg: infer P) => any ? P : any;

type InferArrayType<T> = T extends Array<infer U> ? U : T;

type InferPromiseType<T> = T extends Promise<infer U> ? U : T;

type InferConstructorType<T> = T extends new (...args: any[]) => infer R ? R : any;
```

### 2. 类型推断应用

```typescript
class TypeInference {
    static getReturnType<T extends (...args: any[]) => any>(
        fn: T
    ): InferReturnType<T> {
        return fn() as InferReturnType<T>;
    }

    static getParameterType<T extends (arg: any) => any>(
        fn: T
    ): InferParameterType<T> {
        return {} as InferParameterType<T>;
    }

    static getArrayType<T extends any[]>(arr: T): InferArrayType<T> {
        return arr[0] as InferArrayType<T>;
    }
}

// 使用示例
const add = (a: number, b: number) => a + b;
type AddReturnType = InferReturnType<typeof add>; // number
type AddParameterType = InferParameterType<typeof add>; // number
```

### 本章小结

- 学习了反射和元数据的使用
- 掌握了装饰器工厂的创建和应用
- 了解了属性访问器的实现
- 熟悉了类型操作符的使用
- 学习了类型守卫和类型谓词
- 掌握了类型推断的技巧

在下一章中，我们将学习 TypeScript 中的高级设计模式。 