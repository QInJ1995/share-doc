# TypeScript 接口和类型

接口和类型是 TypeScript 中非常重要的概念，它们帮助我们定义数据的结构和约束。

## 接口 (Interface)

### 基本接口

```typescript
interface Person {
    name: string;
    age: number;
}

function greet(person: Person) {
    return `Hello, ${person.name}!`;
}
```

### 可选属性

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}
```

### 只读属性

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

### 函数类型

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) > -1;
}
```

### 可索引类型

```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

## 类型别名 (Type)

### 基本类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

### 联合类型

```typescript
type Status = "success" | "error" | "warning";
type Result = string | number;
```

### 交叉类型

```typescript
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
```

## 接口 vs 类型

### 相同点

1. 都可以用来描述对象或函数的形状
2. 都可以扩展

### 不同点

1. 接口可以声明合并，类型不能
2. 类型可以声明联合类型和元组类型
3. 类型可以使用 typeof 获取实例类型

## 接口继承

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
```

## 类型断言

```typescript
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
if ((pet as Fish).swim) {
    (pet as Fish).swim();
}
```

## 下一步

- [类和对象](./04-classes-objects.md)
- [泛型](./06-generics.md)
- [高级类型](./07-advanced-types.md)
