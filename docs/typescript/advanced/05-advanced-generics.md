# TypeScript 高级泛型

泛型是 TypeScript 中非常强大的特性，它允许我们创建可重用的组件，这些组件可以处理多种类型而不是单一类型。

## 泛型约束

泛型约束允许我们限制泛型参数的类型范围。

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

## 在泛型约束中使用类型参数

一个类型参数可以被另一个类型参数约束。

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error
```

## 在泛型中使用类类型

在 TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型。

```typescript
function create<T>(c: { new(): T; }): T {
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

## 泛型工具类型

TypeScript 提供了一些内置的泛型工具类型。

### Partial

`Partial<T>` 将类型 T 的所有属性设置为可选。

```typescript
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
```

### Readonly

`Readonly<T>` 将类型 T 的所有属性设置为只读。

```typescript
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users"
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
```

### Record

`Record<K,T>` 构造一个类型，其属性名的类型为 K，属性值的类型为 T。

```typescript
interface PageInfo {
    title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" }
};
```

### Pick

`Pick<T,K>` 从类型 T 中挑选出属性 K。

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false
};
```

### Omit

`Omit<T,K>` 从类型 T 中排除属性 K。

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false
};
```

## 条件类型

条件类型允许我们根据类型关系选择不同的类型。

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;    // "object"
```

## 分布式条件类型

当条件类型作用于联合类型时，它们会变成分布式的。

```typescript
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T0 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T1 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
```

## 类型推断

TypeScript 可以从泛型函数调用中推断类型参数。

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");  // type of output will be 'string'
```

## 泛型最佳实践

1. 使用泛型约束来限制类型参数
2. 使用类型参数来保持类型关系
3. 使用泛型工具类型来简化类型定义
4. 使用条件类型来处理复杂的类型关系
5. 让 TypeScript 推断泛型类型参数

## 下一步

- [类型编程进阶](./06-advanced-type-programming.md)
- [装饰器进阶](./04-advanced-decorators.md)
- [类型兼容性](./03-type-compatibility.md) 