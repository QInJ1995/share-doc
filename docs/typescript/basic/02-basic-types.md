# 第二章：TypeScript 基本类型

## 基本类型介绍

TypeScript 提供了丰富的基本类型，让我们可以在代码中明确指定变量的类型。这有助于提高代码的可读性和可维护性。

### 1. 布尔类型 (boolean)

```typescript
let isDone: boolean = false;
let isActive: boolean = true;
```

### 2. 数字类型 (number)

TypeScript 中的所有数字都是浮点数，支持二进制、八进制、十进制和十六进制字面量。

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### 3. 字符串类型 (string)

```typescript
let color: string = "blue";
color = 'red';

// 模板字符串
let fullName: string = `Bob`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;
```

### 4. 数组类型 (array)

TypeScript 有两种方式定义数组：

```typescript
// 方式一：元素类型后接 []
let list1: number[] = [1, 2, 3];

// 方式二：使用数组泛型
let list2: Array<number> = [1, 2, 3];
```

### 5. 元组类型 (tuple)

元组类型允许表示一个已知元素数量和类型的数组。

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

### 6. 枚举类型 (enum)

枚举类型是对 JavaScript 标准数据类型的一个补充。

```typescript
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;

// 也可以手动指定枚举值
enum Color {
    Red = 1,
    Green = 2,
    Blue = 4
}
```

### 7. Any 类型

当我们不确定变量的类型时，可以使用 any 类型。

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

### 8. Void 类型

void 类型表示没有任何类型，通常用于函数返回值。

```typescript
function warnUser(): void {
    console.log("This is a warning message");
}
```

### 9. Null 和 Undefined

TypeScript 中，`null` 和 `undefined` 有各自的类型。

```typescript
let u: undefined = undefined;
let n: null = null;
```

### 10. Never 类型

never 类型表示那些永不存在的值的类型。

```typescript
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}
```

### 11. 类型断言

类型断言可以用来告诉编译器"相信我，我知道自己在干什么"。

```typescript
// 方式一：尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 方式二：as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 类型推断

TypeScript 具有类型推断机制，可以根据上下文自动推断变量的类型。

```typescript
let x = 3; // TypeScript 会推断 x 的类型为 number
let y = "hello"; // TypeScript 会推断 y 的类型为 string
```

### 本章小结

- 学习了 TypeScript 的基本类型系统
- 了解了各种类型的用法和特点
- 掌握了类型断言的使用方法
- 理解了类型推断的概念

在下一章中，我们将学习 TypeScript 的接口和类型别名。
