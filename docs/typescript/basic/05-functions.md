# 第五章：函数

## 函数的基本概念

TypeScript 中的函数与 JavaScript 中的函数类似，但增加了类型注解和其他特性。

### 1. 基本函数定义

```typescript
// 命名函数
function add(x: number, y: number): number {
    return x + y;
}

// 函数表达式
const multiply = function(x: number, y: number): number {
    return x * y;
};

// 箭头函数
const divide = (x: number, y: number): number => x / y;
```

### 2. 可选参数

使用 `?` 标记可选参数：

```typescript
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

buildName("Bob"); // OK
buildName("Bob", "Adams"); // OK
```

### 3. 默认参数

```typescript
function buildName(firstName: string, lastName = "Smith"): string {
    return firstName + " " + lastName;
}

buildName("Bob"); // "Bob Smith"
buildName("Bob", "Adams"); // "Bob Adams"
```

### 4. 剩余参数

使用 `...` 语法收集剩余参数：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### 5. 函数重载

TypeScript 允许函数重载：

```typescript
function pickCard(x: {suit: string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x: any): any {
    if (typeof x == "object") {
        return Math.floor(Math.random() * x.length);
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

### 6. this 参数

使用 `this` 参数来指定函数中 `this` 的类型：

```typescript
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
```

### 7. 回调函数

```typescript
function fetchData(callback: (data: string) => void): void {
    // 模拟异步操作
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

fetchData((data) => {
    console.log(data);
});
```

### 8. 函数类型

函数类型包含两部分：参数类型和返回值类型：

```typescript
let myAdd: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y;
};
```

### 9. 泛型函数

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString"); // 类型推断
```

### 10. 约束泛型

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity({length: 10, value: 3});
```

### 11. 函数作为参数

```typescript
function processUserInput(callback: (name: string) => void): void {
    const name = "Alice";
    callback(name);
}

processUserInput((name) => {
    console.log(`Hello, ${name}!`);
});
```

### 12. 高阶函数

```typescript
function add(x: number): (y: number) => number {
    return function(y: number): number {
        return x + y;
    };
}

const addFive = add(5);
console.log(addFive(3)); // 8
```

### 本章小结

- 学习了函数的基本定义和用法
- 了解了可选参数和默认参数
- 掌握了剩余参数的使用
- 理解了函数重载的概念
- 学习了 this 参数的使用
- 了解了回调函数和高阶函数
- 掌握了泛型函数的使用

在下一章中，我们将学习 TypeScript 的泛型。
