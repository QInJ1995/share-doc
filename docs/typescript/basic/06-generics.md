# TypeScript 泛型

泛型是 TypeScript 中非常重要的特性，它允许我们创建可重用的组件。

## 基本泛型

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
```

## 泛型变量

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}
```

## 泛型类型

```typescript
let myIdentity: <T>(arg: T) => T = identity;
```

## 泛型接口

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型约束

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

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // Error
```

## 在泛型中使用类类型

```typescript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```

## 泛型工具类型

### Partial

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

```typescript
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users",
};

todo.title = "Hello"; // Error
```

### Record

```typescript
interface PageInfo {
    title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" },
};
```

### Pick

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
```

### Omit

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
```

## 下一步

- [高级类型](./07-advanced-types.md)
- [模块和命名空间](./08-modules-namespaces.md)
- [装饰器](./09-decorators.md)
