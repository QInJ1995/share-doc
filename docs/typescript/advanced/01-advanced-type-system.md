# 第一章：高级类型系统

## 条件类型

### 1. 基础条件类型

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

### 2. 分布式条件类型

```typescript
type ToArray<T> = T extends any ? T[] : never;

type A = ToArray<string | number>;  // string[] | number[]
type B = ToArray<string>;           // string[]
```

### 3. 类型推断

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type A = ReturnType<() => string>;  // string
type B = ReturnType<(x: number) => number>;  // number
```

## 映射类型

### 1. 基础映射类型

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

### 2. 键重映射

```typescript
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User {
    name: string;
    age: number;
}

type UserGetters = Getters<User>;
// {
//     getName: () => string;
//     getAge: () => number;
// }
```

### 3. 属性过滤

```typescript
type FilterStringKeys<T> = {
    [P in keyof T as T[P] extends string ? P : never]: T[P];
};

interface Person {
    name: string;
    age: number;
    email: string;
}

type StringKeys = FilterStringKeys<Person>;
// {
//     name: string;
//     email: string;
// }
```

## 递归类型

### 1. 递归类型别名

```typescript
type JsonValue = 
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

const json: JsonValue = {
    name: "John",
    age: 30,
    hobbies: ["reading", "gaming"],
    address: {
        street: "123 Main St",
        city: "New York"
    }
};
```

### 2. 递归工具类型

```typescript
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};

interface User {
    name: string;
    profile: {
        age: number;
        address: {
            city: string;
        };
    };
}

type ReadonlyUser = DeepReadonly<User>;
```

## 模板字面量类型

### 1. 基础模板字面量类型

```typescript
type Greeting<T extends string> = `Hello, ${T}!`;

type A = Greeting<"World">;  // "Hello, World!"
type B = Greeting<"TypeScript">;  // "Hello, TypeScript!"
```

### 2. 类型推断

```typescript
type ParseQueryString<T extends string> = T extends `${infer Param}=${infer Value}`
    ? { [K in Param]: Value }
    : {};

type A = ParseQueryString<"name=John">;  // { name: "John" }
```

### 3. 字符串操作类型

```typescript
type Capitalize<S extends string> = S extends `${infer C}${infer T}`
    ? `${Uppercase<C>}${T}`
    : S;

type A = Capitalize<"hello">;  // "Hello"
```

## 类型守卫和类型谓词

### 1. 自定义类型守卫

```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function processValue(value: unknown) {
    if (isString(value)) {
        console.log(value.toUpperCase());
    }
}
```

### 2. 类型谓词

```typescript
interface User {
    name: string;
    age: number;
}

function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'age' in value &&
        typeof (value as User).name === 'string' &&
        typeof (value as User).age === 'number'
    );
}
```

## 类型兼容性

### 1. 结构类型系统

```typescript
interface Named {
    name: string;
}

class Person {
    constructor(public name: string) {}
}

let p: Named = new Person("John");  // OK
```

### 2. 函数类型兼容性

```typescript
type Handler = (event: Event) => void;

const handler: Handler = (e: MouseEvent) => {
    console.log(e.clientX);
};  // OK
```

## 类型运算符

### 1. keyof 运算符

```typescript
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person;  // "name" | "age"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

### 2. typeof 运算符

```typescript
const colors = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
} as const;

type Colors = typeof colors;
type ColorValues = Colors[keyof Colors];
```

### 3. 索引访问运算符

```typescript
interface User {
    name: string;
    age: number;
    address: {
        city: string;
    };
}

type UserName = User["name"];  // string
type UserCity = User["address"]["city"];  // string
```

### 本章小结

- 学习了条件类型的使用和类型推断
- 掌握了映射类型和键重映射
- 了解了递归类型的实现
- 熟悉了模板字面量类型
- 学习了类型守卫和类型谓词
- 掌握了类型兼容性规则
- 了解了类型运算符的使用

在下一章中，我们将学习 TypeScript 中的高级泛型编程。 