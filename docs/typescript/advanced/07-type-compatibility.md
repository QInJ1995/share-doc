# TypeScript 类型兼容性

类型兼容性是 TypeScript 类型系统中的一个重要概念，它决定了哪些类型可以赋值给其他类型。

## 基本类型兼容性

### 数字类型兼容性

```typescript
let num: number;
let num1: number = 1;
let num2: number = 2;

num = num1; // OK
num = num2; // OK
```

### 字符串类型兼容性

```typescript
let str: string;
let str1: string = "hello";
let str2: string = "world";

str = str1; // OK
str = str2; // OK
```

### 布尔类型兼容性

```typescript
let bool: boolean;
let bool1: boolean = true;
let bool2: boolean = false;

bool = bool1; // OK
bool = bool2; // OK
```

## 对象类型兼容性

### 属性兼容性

```typescript
interface Named {
    name: string;
}

let x: Named;
let y = { name: "Alice", location: "Seattle" };

x = y; // OK
```

### 函数兼容性

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

### 枚举兼容性

```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Red; // Error
```

## 泛型兼容性

### 泛型类型兼容性

```typescript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y; // OK
```

### 泛型函数兼容性

```typescript
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse; // OK
```

## 类型兼容性规则

1. 结构类型：TypeScript 使用结构类型系统，只要类型结构兼容，就可以赋值。
2. 函数参数：目标函数的参数类型必须兼容源函数的参数类型。
3. 返回值：目标函数的返回值类型必须兼容源函数的返回值类型。
4. 可选参数：可选参数和剩余参数不会影响类型兼容性。
5. 函数重载：重载函数的每个重载签名必须兼容。

## 类型兼容性最佳实践

1. 使用接口定义类型
2. 使用类型别名简化复杂类型
3. 使用泛型增加类型灵活性
4. 使用类型断言处理特殊情况
5. 使用类型守卫确保类型安全

## 下一步

- [类型编程进阶](./06-advanced-type-programming.md)
- [高级泛型](./05-advanced-generics.md)
- [装饰器进阶](./04-advanced-decorators.md) 