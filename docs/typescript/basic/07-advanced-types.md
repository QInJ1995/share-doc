# 第七章：高级类型

## 高级类型概述

TypeScript 提供了一些高级类型特性，可以帮助我们更好地处理复杂的类型场景。

### 1. 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个类型：

```typescript
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "Alice",
    employeeId: 123
};
```

### 2. 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一：

```typescript
type Status = "success" | "error" | "warning";
type Result = string | number;

function handleResult(result: Result) {
    if (typeof result === "string") {
        return result.toUpperCase();
    } else {
        return result.toFixed(2);
    }
}
```

### 3. 类型保护（Type Guards）

类型保护可以帮助我们在运行时检查类型：

```typescript
function isString(value: any): value is string {
    return typeof value === "string";
}

function processValue(value: string | number) {
    if (isString(value)) {
        return value.toUpperCase();
    } else {
        return value.toFixed(2);
    }
}
```

### 4. 类型别名（Type Aliases）

类型别名可以给类型起一个新名字：

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}
```

### 5. 字符串字面量类型

字符串字面量类型允许我们指定字符串必须的固定值：

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";

function animate(easing: Easing) {
    if (easing === "ease-in") {
        // ...
    } else if (easing === "ease-out") {
        // ...
    } else {
        // ...
    }
}
```

### 6. 数字字面量类型

```typescript
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): Dice {
    return (Math.floor(Math.random() * 6) + 1) as Dice;
}
```

### 7. 可辨识联合（Discriminated Unions）

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape): number {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

### 8. 索引类型（Index Types）

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}

let person: Person = {
    name: "Jarid",
    age: 35
};

let strings: string[] = pluck(person, ["name"]); // ok, string[]
```

### 9. 映射类型（Mapped Types）

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

### 10. 条件类型（Conditional Types）

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

### 11. 预定义的条件类型

```typescript
// Exclude<T, U> - 从 T 中排除可以赋值给 U 的类型
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"

// Extract<T, U> - 从 T 中提取可以赋值给 U 的类型
type T1 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"

// NonNullable<T> - 从 T 中排除 null 和 undefined
type T2 = NonNullable<string | number | undefined>;  // string | number

// ReturnType<T> - 获取函数返回值类型
type T3 = ReturnType<() => string>;  // string

// InstanceType<T> - 获取构造函数类型的实例类型
class C {
    x = 0;
    y = 0;
}
type T4 = InstanceType<typeof C>;  // C
```

### 12. 类型推断

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<(s: string) => void>;  // void
type T2 = ReturnType<<T>() => T>;  // {}
```

### 本章小结

- 学习了交叉类型和联合类型
- 了解了类型保护和类型别名
- 掌握了字符串和数字字面量类型
- 理解了可辨识联合的使用
- 学习了索引类型和映射类型
- 了解了条件类型和类型推断

在下一章中，我们将学习 TypeScript 的模块和命名空间。
