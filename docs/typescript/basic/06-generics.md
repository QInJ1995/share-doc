# 第六章：泛型

## 泛型的基本概念

泛型（Generics）是 TypeScript 中非常重要的特性，它允许我们创建可重用的组件，这些组件可以支持多种类型。

### 1. 基本泛型函数

```typescript
function identity<T>(arg: T): T {
    return arg;
}

// 使用方式一：显式指定类型
let output1 = identity<string>("myString");

// 使用方式二：类型推断
let output2 = identity("myString");
```

### 2. 泛型接口

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 3. 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 4. 泛型约束

使用 `extends` 关键字来约束泛型类型：

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity({length: 10, value: 3});
```

### 5. 在泛型约束中使用类型参数

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error
```

### 6. 泛型类与接口

```typescript
interface Pair<T, U> {
    first: T;
    second: U;
}

class Pair<T, U> {
    constructor(public first: T, public second: U) {}
}

let pair = new Pair<string, number>("hello", 42);
```

### 7. 泛型默认类型

```typescript
interface A<T = string> {
    name: T;
}

const a: A = { name: "hello" }; // T 默认为 string
const b: A<number> = { name: 123 };
```

### 8. 泛型工具类型

TypeScript 提供了一些内置的泛型工具类型：

```typescript
// Partial<T> - 使类型 T 的所有属性变为可选
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

// Readonly<T> - 使类型 T 的所有属性变为只读
const todo: Readonly<Todo> = {
    title: "Delete inactive users",
    description: "..."
};

// Record<K,T> - 构造一个类型，其属性名的类型为 K，属性值的类型为 T
const pageInfo: Record<string, number> = {
    home: 1,
    about: 2,
    contact: 3
};
```

### 9. 条件类型

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"
```

### 10. 映射类型

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

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

### 11. 类型推断

```typescript
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
    return arr.map(fn);
}

const numbers = [1, 2, 3];
const strings = map(numbers, n => n.toString());
```

### 12. 泛型与继承

```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

function createInstance<T extends Animal>(c: new (...args: any[]) => T, ...args: any[]): T {
    return new c(...args);
}

const dog = createInstance(Dog, "Buddy", "Labrador");
```

### 本章小结

- 学习了泛型的基本概念和用法
- 了解了泛型函数、接口和类
- 掌握了泛型约束的使用
- 理解了泛型工具类型
- 学习了条件类型和映射类型
- 了解了泛型与继承的关系

在下一章中，我们将学习 TypeScript 的高级类型。
