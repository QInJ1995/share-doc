# TypeScript 高级类型

让我们深入了解 TypeScript 中的一些高级类型特性。

## 交叉类型

```typescript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}
```

## 联合类型

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## 类型保护

### typeof 类型保护

```typescript
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}
```

### instanceof 类型保护

```typescript
class Bird {
    fly() {
        console.log("bird fly");
    }
    layEggs() {
        console.log("bird lay eggs");
    }
}

class Fish {
    swim() {
        console.log("fish swim");
    }
    layEggs() {
        console.log("fish lay eggs");
    }
}

function getRandomPet(): Fish | Bird {
    return Math.random() > 0.5 ? new Fish() : new Bird();
}

let pet = getRandomPet();

if (pet instanceof Fish) {
    pet.swim();
}
if (pet instanceof Bird) {
    pet.fly();
}
```

## 可以为 null 的类型

```typescript
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
```

## 类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

## 字符串字面量类型

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```

## 数字字面量类型

```typescript
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}
```

## 可辨识联合

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

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

## 索引类型

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

## 映射类型

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```

## 条件类型

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
```

## 下一步

- [模块和命名空间](./08-modules-namespaces.md)
- [装饰器](./09-decorators.md)
- [工程配置](./10-project-configuration.md)
