# 第三章：接口和类型别名

## 接口（Interface）

接口是 TypeScript 中一个非常重要的概念，它用于定义对象的形状（shape）。

### 1. 基本接口

```typescript
interface Person {
    name: string;
    age: number;
}

let person: Person = {
    name: "Alice",
    age: 30
};
```

### 2. 可选属性

使用 `?` 标记可选属性：

```typescript
interface Person {
    name: string;
    age?: number;  // 可选属性
}

let person1: Person = {
    name: "Bob"
};

let person2: Person = {
    name: "Alice",
    age: 30
};
```

### 3. 只读属性

使用 `readonly` 关键字标记只读属性：

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 错误！x 是只读的
```

### 4. 函数类型

接口也可以描述函数类型：

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string) {
    return source.search(subString) > -1;
};
```

### 5. 可索引类型

接口可以描述那些能够"通过索引得到"的类型：

```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

### 6. 类类型

接口可以用于描述类的公共部分：

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
}
```

## 类型别名（Type Aliases）

类型别名是给类型起一个新名字，它和接口很相似，但有一些区别。

### 1. 基本类型别名

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

### 2. 接口 vs 类型别名

#### 相似点：
- 都可以描述对象或函数
- 都可以扩展

#### 不同点：
- 接口可以重复声明，会自动合并
- 类型别名不能重复声明
- 类型别名可以使用联合类型和交叉类型
- 接口可以使用 `extends` 和 `implements`

### 3. 联合类型（Union Types）

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

### 4. 交叉类型（Intersection Types）

```typescript
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
    name: "Alice",
    employeeId: 123
};
```

### 5. 类型断言

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
if ((pet as Fish).swim) {
    (pet as Fish).swim();
} else {
    (pet as Bird).fly();
}
```

### 6. 类型保护

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}
```

### 本章小结

- 学习了接口的基本概念和用法
- 了解了类型别名的定义和使用
- 掌握了联合类型和交叉类型
- 理解了类型断言和类型保护
- 了解了接口和类型别名的区别

在下一章中，我们将学习 TypeScript 的类和对象。
