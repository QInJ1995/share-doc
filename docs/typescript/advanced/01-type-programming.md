# TypeScript 类型编程

类型编程是 TypeScript 中强大的特性，允许我们在类型级别进行编程和操作。

## 条件类型

条件类型允许我们根据条件选择不同的类型：

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<number>;  // "number"
type T2 = TypeName<boolean>; // "boolean"
```

### 分布式条件类型

当条件类型作用于联合类型时，会进行分布式计算：

```typescript
type ToArray<T> = T extends any ? T[] : never;
type T0 = ToArray<string | number>; // string[] | number[]
```

### 类型推断

在条件类型中可以使用 `infer` 关键字进行类型推断：

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<() => number>;  // number
```

## 映射类型

映射类型允许我们基于旧类型创建新类型：

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

### 映射修饰符

可以在映射类型中使用 `+` 和 `-` 修饰符：

```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
}

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
}
```

## 递归类型

TypeScript 支持递归类型定义：

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

## 类型操作符

### keyof 操作符

`keyof` 操作符获取类型的所有键：

```typescript
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```

### typeof 操作符

`typeof` 操作符获取值的类型：

```typescript
const person = {
    name: "Alice",
    age: 30
};

type Person = typeof person; // { name: string; age: number; }
```

### 索引访问类型

使用索引访问类型可以获取类型的属性类型：

```typescript
interface Person {
    name: string;
    age: number;
}

type NameType = Person["name"]; // string
type AgeType = Person["age"];   // number
```

## 类型工具

### 内置工具类型

TypeScript 提供了一些内置的工具类型：

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T2 = NonNullable<string | null | undefined>; // string
type T3 = ReturnType<() => string>; // string
type T4 = InstanceType<typeof Date>; // Date
```

### 自定义工具类型

我们可以创建自己的工具类型：

```typescript
type Nullable<T> = T | null;
type Promisify<T> = {
    [P in keyof T]: Promise<T[P]>;
};
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## 类型编程应用

### 类型安全的 API 调用

```typescript
type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    const data = await response.json();
    return {
        data,
        status: response.status,
        message: response.statusText
    };
}
```

### 类型安全的表单验证

```typescript
type ValidationResult<T> = {
    [P in keyof T]: {
        isValid: boolean;
        message: string;
    }
}

function validateForm<T>(data: T, rules: ValidationRules<T>): ValidationResult<T> {
    // 实现验证逻辑
}
```

## 下一步

- [类型推断](./02-type-inference.md)
- [类型兼容性](./03-type-compatibility.md)
- [装饰器进阶](./04-advanced-decorators.md) 