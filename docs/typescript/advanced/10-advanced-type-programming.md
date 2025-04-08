# TypeScript 高级类型编程

TypeScript 提供了强大的类型系统，允许我们进行复杂的类型编程。

## 条件类型

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
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;    // "object"
```

## 分布式条件类型

```typescript
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

type T1 = Boxed<string>;  // BoxedValue<string>;
type T2 = Boxed<number[]>;  // BoxedArray<number>;
type T3 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;
```

## 类型推断

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<(s: string) => void>;  // void
type T2 = ReturnType<<T>() => T>;  // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;  // number[]
```

## 映射类型

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

type Record<K extends string, T> = {
    [P in K]: T;
};
```

## 类型编程最佳实践

1. 使用条件类型进行类型选择
2. 使用分布式条件类型处理联合类型
3. 使用类型推断获取类型信息
4. 使用映射类型创建新类型
5. 避免过度复杂的类型编程

## 下一步

- [类型守卫](./09-type-guards.md)
- [类型推断](./08-type-inference.md)
- [类型兼容性](./07-type-compatibility.md) 