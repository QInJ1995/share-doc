# TypeScript 基础类型

TypeScript 提供了多种基本数据类型，让我们来一一了解它们。

## 布尔类型 (boolean)

```typescript
let isDone: boolean = false;
```

## 数字类型 (number)

TypeScript 中的所有数字都是浮点数，支持二进制、八进制和十六进制：

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## 字符串类型 (string)

```typescript
let color: string = "blue";
color = 'red';

// 模板字符串
let fullName: string = `Bob`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;
```

## 数组类型 (array)

有两种方式定义数组：

```typescript
// 方式一：元素类型后接 []
let list: number[] = [1, 2, 3];

// 方式二：使用数组泛型
let list: Array<number> = [1, 2, 3];
```

## 元组类型 (tuple)

元组类型允许表示一个已知元素数量和类型的数组：

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

## 枚举类型 (enum)

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 可以手动设置枚举值
enum Color {Red = 1, Green = 2, Blue = 4}
```

## Any 类型

当不确定变量类型时，可以使用 any 类型：

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

## Void 类型

表示没有任何类型，通常用于函数返回值：

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

## Null 和 Undefined

```typescript
let u: undefined = undefined;
let n: null = null;
```

## Never 类型

表示永不存在的值的类型：

```typescript
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}
```

## 类型断言

类型断言有两种形式：

```typescript
// 方式一：尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 方式二：as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 下一步

- [接口和类型](./03-interfaces-types.md)
- [类和对象](./04-classes-objects.md)
- [函数](./05-functions.md)
