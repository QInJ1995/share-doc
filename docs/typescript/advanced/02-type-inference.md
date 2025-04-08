# TypeScript 类型推断

类型推断是 TypeScript 的核心特性之一，它允许编译器自动推断变量、函数参数和返回值的类型。

## 基础类型推断

### 变量类型推断

```typescript
let x = 3;        // 推断为 number
let y = "hello";  // 推断为 string
let z = true;     // 推断为 boolean
```

### 函数返回类型推断

```typescript
function add(a: number, b: number) {
    return a + b;  // 推断返回类型为 number
}

function greet(name: string) {
    return `Hello, ${name}!`;  // 推断返回类型为 string
}
```

## 上下文类型推断

### 事件处理函数

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  // 正确，mouseEvent 被推断为 MouseEvent
};
```

### 回调函数

```typescript
const names = ["Alice", "Bob", "Charlie"];
names.forEach(function(name) {
    console.log(name.toUpperCase());  // name 被推断为 string
});
```

## 最佳通用类型推断

当需要从多个类型中推断一个类型时，TypeScript 会寻找最佳通用类型：

```typescript
let x = [0, 1, null];  // 推断为 (number | null)[]
let y = [0, 1, null, "hello"];  // 推断为 (number | string | null)[]
```

## 类型推断的局限性

### 函数参数类型

```typescript
function f(x) {
    return x;  // x 被推断为 any
}
```

### 空数组

```typescript
let x = [];  // 推断为 any[]
```

## 类型断言与类型推断

### 类型断言

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 非空断言

```typescript
function processEntity(e?: Entity) {
    let s = e!.name;  // 断言 e 不为 null 或 undefined
}
```

## 类型推断的高级用法

### 泛型类型推断

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");  // 推断 T 为 string
```

### 条件类型推断

```typescript
type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T0 = Unpacked<string[]>;  // string
type T1 = Unpacked<Promise<string>>;  // string
```

## 类型推断的最佳实践

### 显式类型注解

```typescript
// 推荐
function add(x: number, y: number): number {
    return x + y;
}

// 不推荐
function add(x, y) {
    return x + y;
}
```

### 使用 const 断言

```typescript
// 使用 const 断言
const point = { x: 10, y: 20 } as const;
// point 的类型为 { readonly x: 10; readonly y: 20; }

// 不使用 const 断言
const point = { x: 10, y: 20 };
// point 的类型为 { x: number; y: number; }
```

## 类型推断的调试技巧

### 使用类型查询

```typescript
type T0 = typeof point;  // 查看 point 的类型
type T1 = ReturnType<typeof add>;  // 查看 add 函数的返回类型
```

### 使用 IDE 工具

- 使用 VS Code 的类型提示
- 使用 TypeScript Playground 进行实验
- 使用 `tsc --noEmit` 进行类型检查

## 下一步

- [类型兼容性](./03-type-compatibility.md)
- [装饰器进阶](./04-advanced-decorators.md)
- [高级泛型](./05-advanced-generics.md) 