# TypeScript 类型兼容性

TypeScript 的类型兼容性基于结构子类型（structural typing），这是一种基于类型的成员来关联类型的方式，而不是基于类型的声明。

## 基本类型兼容性

### 数字类型兼容性

```typescript
let x: number = 1;
let y: number = x;  // 兼容
let z: any = x;     // 兼容
```

### 字符串类型兼容性

```typescript
let s1: string = "hello";
let s2: string = s1;  // 兼容
let s3: any = s1;     // 兼容
```

## 对象类型兼容性

### 属性兼容性

```typescript
interface Named {
    name: string;
}

let x: Named;
let y = { name: "Alice", location: "Seattle" };
x = y;  // 兼容，因为 y 包含 name 属性
```

### 可选属性

```typescript
interface Optional {
    name?: string;
    age?: number;
}

let x: Optional;
let y = { name: "Bob" };
x = y;  // 兼容，因为可选属性可以不存在
```

## 函数类型兼容性

### 参数兼容性

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x;  // 兼容，因为 x 的参数是 y 参数的一个子集
x = y;  // 不兼容，因为 y 需要两个参数
```

### 返回值兼容性

```typescript
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y;  // 兼容，因为 y 的返回值包含 x 返回值的所有属性
y = x;  // 不兼容，因为 x 的返回值缺少 location 属性
```

## 枚举类型兼容性

```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Red;  // 不兼容，不同枚举类型之间不兼容
```

## 类类型兼容性

### 实例兼容性

```typescript
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // 兼容，因为结构相同
s = a;  // 兼容，因为结构相同
```

### 私有成员

```typescript
class Animal {
    private feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    private feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // 不兼容，因为私有成员来自不同的声明
```

## 泛型类型兼容性

### 基本泛型兼容性

```typescript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // 兼容，因为 Empty 接口没有使用类型参数
```

### 使用类型参数的泛型兼容性

```typescript
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // 不兼容，因为类型参数被使用
```

## 类型兼容性规则总结

1. 结构子类型：基于类型的结构而不是声明
2. 属性兼容性：目标类型必须包含源类型的所有必需属性
3. 函数兼容性：
   - 参数：目标函数的参数必须是源函数参数的一个子集
   - 返回值：源函数的返回值必须包含目标函数返回值的所有属性
4. 枚举类型：不同枚举类型之间不兼容
5. 类类型：实例兼容性基于结构，私有成员影响兼容性
6. 泛型类型：未使用类型参数的泛型类型兼容，使用类型参数的泛型类型不兼容

## 类型兼容性的实际应用

### 函数重载

```typescript
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number): Date {
    if (day !== undefined && year !== undefined) {
        return new Date(year, monthOrTimestamp, day);
    } else {
        return new Date(monthOrTimestamp);
    }
}
```

### 接口扩展

```typescript
interface Point {
    x: number;
    y: number;
}

interface Point3D extends Point {
    z: number;
}

let point: Point = { x: 0, y: 0 };
let point3D: Point3D = { x: 0, y: 0, z: 0 };

point = point3D;  // 兼容
point3D = point;  // 不兼容
```

## 下一步

- [装饰器进阶](./04-advanced-decorators.md)
- [高级泛型](./05-advanced-generics.md)
- [类型编程进阶](./06-advanced-type-programming.md) 