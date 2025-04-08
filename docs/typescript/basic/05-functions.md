# TypeScript 函数

函数是 TypeScript 中的一等公民，让我们来了解函数的使用和特性。

## 基本函数

```typescript
function add(x: number, y: number): number {
    return x + y;
}
```

## 函数类型

```typescript
let myAdd: (x: number, y: number) => number = 
    function(x: number, y: number): number { return x + y; };
```

## 可选参数

```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```

## 默认参数

```typescript
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
```

## 剩余参数

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
```

## this 和箭头函数

```typescript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
```

## 重载

```typescript
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

## 回调函数

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
```

## 函数类型接口

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

## 构造函数类型

```typescript
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
```

## 下一步

- [泛型](./06-generics.md)
- [高级类型](./07-advanced-types.md)
- [模块和命名空间](./08-modules-namespaces.md)
