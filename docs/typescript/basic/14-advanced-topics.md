# TypeScript 高级主题

让我们深入了解 TypeScript 的一些高级特性。

## 类型编程

### 条件类型

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
```

### 映射类型

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends keyof any, T> = {
    [P in K]: T;
}
```

### 递归类型

```typescript
type JsonValue = 
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
}
```

## 类型推断

### 类型推断上下文

```typescript
type Action =
    | { type: "increment"; amount: number }
    | { type: "decrement"; amount: number }
    | { type: "reset" };

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case "increment":
            return state + action.amount;
        case "decrement":
            return state - action.amount;
        case "reset":
            return 0;
    }
}
```

### 类型推断优先级

```typescript
function createArray<T>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

const strings = createArray(3, "hello"); // string[]
const numbers = createArray(3, 0); // number[]
```

## 类型兼容性

### 结构类型系统

```typescript
interface Point {
    x: number;
    y: number;
}

interface NamedPoint {
    x: number;
    y: number;
    name: string;
}

let point: Point = { x: 0, y: 0 };
let namedPoint: NamedPoint = { x: 0, y: 0, name: "Origin" };

point = namedPoint; // OK
namedPoint = point; // Error
```

### 函数类型兼容性

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

## 高级类型操作

### 类型查询

```typescript
type T0 = typeof "hello"; // "hello"
type T1 = typeof 42; // 42
type T2 = typeof true; // true
```

### 类型断言

```typescript
const foo = {} as { bar: number };
foo.bar = 123;
```

### 类型保护

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: unknown) {
    if (isString(value)) {
        // value 现在是 string 类型
    }
}
```

## 工具类型

### 内置工具类型

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T2 = NonNullable<string | null | undefined>; // string
type T3 = ReturnType<() => string>; // string
type T4 = InstanceType<typeof Date>; // Date
```

### 自定义工具类型

```typescript
type Nullable<T> = T | null;
type Promisify<T> = {
    [P in keyof T]: Promise<T[P]>;
};
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## 类型系统扩展

### 声明合并

```typescript
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };
```

### 模块扩充

```typescript
// observable.ts
export class Observable<T> {
    // ...
}

// map.ts
import { Observable } from "./observable";
Observable.prototype.map = function (f) {
    // ...
};
```

## 下一步

- [资源推荐](./15-resources.md)
- [社区贡献](./16-community-contribution.md)
