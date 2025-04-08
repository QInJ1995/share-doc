# 第二章：高级泛型编程

## 泛型约束

### 1. 基础约束

```typescript
// 使用接口约束
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

// 使用类型参数约束
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = source[id] as any;
    }
    return target;
}
```

### 2. 多重约束

```typescript
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

function process<T extends Printable & Loggable>(item: T): void {
    item.print();
    item.log();
}
```

### 3. 泛型类约束

```typescript
class Container<T extends { id: number }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
}
```

## 泛型工具类型

### 1. 基础工具类型

```typescript
// 使所有属性可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 使所有属性只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 选择部分属性
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 排除部分属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 2. 高级工具类型

```typescript
// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// 提取构造函数参数类型
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

// 提取实例类型
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

## 泛型函数重载

### 1. 函数重载

```typescript
function process<T extends string>(value: T): string;
function process<T extends number>(value: T): number;
function process<T>(value: T): T {
    return value;
}

const str = process("hello");  // string
const num = process(42);      // number
```

### 2. 方法重载

```typescript
class DataProcessor<T> {
    process(value: T): T;
    process(value: T[]): T[];
    process(value: T | T[]): T | T[] {
        if (Array.isArray(value)) {
            return value.map(item => this.process(item));
        }
        return value;
    }
}
```

## 泛型接口

### 1. 基础泛型接口

```typescript
interface Container<T> {
    value: T;
    setValue(value: T): void;
    getValue(): T;
}

class Box<T> implements Container<T> {
    constructor(private _value: T) {}

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    setValue(value: T): void {
        this._value = value;
    }

    getValue(): T {
        return this._value;
    }
}
```

### 2. 泛型接口继承

```typescript
interface Readable<T> {
    read(): T;
}

interface Writable<T> {
    write(value: T): void;
}

interface ReadWrite<T> extends Readable<T>, Writable<T> {
    clear(): void;
}
```

## 泛型类

### 1. 基础泛型类

```typescript
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
```

### 2. 泛型类继承

```typescript
class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal {
    bark(): void {
        console.log('Woof!');
    }
}

class Container<T extends Animal> {
    constructor(private animal: T) {}

    getAnimal(): T {
        return this.animal;
    }
}
```

## 泛型应用示例

### 1. 泛型缓存

```typescript
class Cache<T> {
    private cache = new Map<string, T>();

    set(key: string, value: T): void {
        this.cache.set(key, value);
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    clear(): void {
        this.cache.clear();
    }
}
```

### 2. 泛型事件系统

```typescript
type EventHandler<T> = (data: T) => void;

class EventEmitter<T extends string> {
    private events = new Map<T, Set<EventHandler<any>>>();

    on<K extends T>(event: K, handler: EventHandler<any>): void {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event)!.add(handler);
    }

    emit<K extends T>(event: K, data: any): void {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    off<K extends T>(event: K, handler: EventHandler<any>): void {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.delete(handler);
        }
    }
}
```

### 3. 泛型工厂函数

```typescript
interface Creator<T> {
    create(): T;
}

class StringCreator implements Creator<string> {
    create(): string {
        return "Hello";
    }
}

class NumberCreator implements Creator<number> {
    create(): number {
        return 42;
    }
}

function createInstance<T>(creator: Creator<T>): T {
    return creator.create();
}

const str = createInstance(new StringCreator());  // string
const num = createInstance(new NumberCreator());  // number
```

### 本章小结

- 学习了泛型约束的使用方法
- 掌握了泛型工具类型的应用
- 了解了泛型函数重载的实现
- 熟悉了泛型接口和类的使用
- 学习了泛型在实际应用中的示例
- 掌握了泛型工厂函数的实现

在下一章中，我们将学习 TypeScript 中的高级装饰器。 