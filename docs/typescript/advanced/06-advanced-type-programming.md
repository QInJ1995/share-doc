# TypeScript 类型编程进阶

类型编程是 TypeScript 中非常强大的特性，它允许我们在类型级别进行编程，创建复杂的类型系统。

## 类型操作符

### keyof 操作符

`keyof` 操作符可以获取一个类型的所有键。

```typescript
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```

### typeof 操作符

`typeof` 操作符可以获取一个值的类型。

```typescript
const person = {
    name: "Alice",
    age: 30
};

type Person = typeof person;
// type Person = {
//     name: string;
//     age: number;
// }
```

### 索引访问类型

我们可以使用索引访问类型来获取一个类型的属性类型。

```typescript
interface Person {
    name: string;
    age: number;
}

type NameType = Person["name"]; // string
type AgeType = Person["age"];   // number
```

## 映射类型

映射类型允许我们基于旧类型创建新类型。

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

## 条件类型

条件类型允许我们根据类型关系选择不同的类型。

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
```

## 分布式条件类型

当条件类型作用于联合类型时，它们会变成分布式的。

```typescript
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T0 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T1 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
```

## 类型推断

TypeScript 可以从泛型函数调用中推断类型参数。

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");  // type of output will be 'string'
```

## 类型守卫

类型守卫允许我们在运行时检查类型。

```typescript
function isString(x: any): x is string {
    return typeof x === "string";
}

function example(x: string | number) {
    if (isString(x)) {
        // x is string
        return x.length;
    } else {
        // x is number
        return x.toFixed(2);
    }
}
```

## 类型编程最佳实践

1. 使用类型操作符来操作类型
2. 使用映射类型来创建新类型
3. 使用条件类型来处理复杂的类型关系
4. 使用类型守卫来检查类型
5. 让 TypeScript 推断类型参数

## 下一步

- [高级泛型](./05-advanced-generics.md)
- [装饰器进阶](./04-advanced-decorators.md)
- [类型兼容性](./03-type-compatibility.md) 