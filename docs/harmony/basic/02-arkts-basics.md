# ArkTS 语言基础

## 什么是 ArkTS？

ArkTS 是 Harmony 开发的主要编程语言，它基于 TypeScript 扩展而来，增加了声明式 UI、状态管理等特性。

## 基本语法

### 1. 变量声明

```ts
// 变量声明
let name: string = "Harmony"
const age: number = 25

// 类型推断
let message = "Hello"  // 类型为 string
let count = 42        // 类型为 number

// 联合类型
let value: string | number = "Hello"
value = 42  // 合法

// 类型别名
type UserID = string | number
let id: UserID = "user123"
```

### 2. 函数定义

```ts
// 基本函数
function greet(name: string): string {
  return `Hello, ${name}!`
}

// 箭头函数
const add = (a: number, b: number): number => a + b

// 可选参数
function createUser(name: string, age?: number): object {
  return {
    name,
    age: age ?? 18
  }
}

// 默认参数
function multiply(a: number, b: number = 2): number {
  return a * b
}
```

### 3. 类定义

```ts
// 基本类
class Person {
  private name: string
  private age: number
  
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  
  sayHello(): void {
    console.log(`Hello, I'm ${this.name}`)
  }
  
  getAge(): number {
    return this.age
  }
}

// 继承
class Student extends Person {
  private grade: number
  
  constructor(name: string, age: number, grade: number) {
    super(name, age)
    this.grade = grade
  }
  
  study(): void {
    console.log(`${this.name} is studying in grade ${this.grade}`)
  }
}
```

## 装饰器

### 1. 组件装饰器

```ts
// @Component 装饰器
@Component
struct MyComponent {
  @State message: string = 'Hello'
  
  build() {
    Column() {
      Text(this.message)
        .fontSize(20)
    }
  }
}

// @Entry 装饰器
@Entry
@Component
struct Index {
  build() {
    MyComponent()
  }
}
```

### 2. 状态装饰器

```ts
@Component
struct StateExample {
  @State count: number = 0
  @Prop title: string
  @Link value: number
  
  build() {
    Column() {
      Text(this.title)
      Text(`Count: ${this.count}`)
      Button('Increment')
        .onClick(() => {
          this.count++
        })
    }
  }
}
```

## 接口和类型

### 1. 接口定义

```ts
// 基本接口
interface User {
  name: string
  age: number
  email?: string
}

// 实现接口
class UserImpl implements User {
  name: string
  age: number
  email?: string
  
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

### 2. 类型定义

```ts
// 基本类型
type Point = {
  x: number
  y: number
}

// 联合类型
type Status = 'success' | 'error' | 'pending'

// 交叉类型
type Employee = Person & {
  department: string
  salary: number
}
```

## 泛型

### 1. 泛型函数

```ts
// 基本泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T
}

// 泛型类
class GenericNumber<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T
}
```

### 2. 泛型约束

```ts
// 接口约束
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

## 异步编程

### 1. Promise

```ts
// 创建 Promise
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched')
    }, 1000)
  })
}

// 使用 async/await
async function getData() {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

### 2. 异步迭代

```ts
async function* asyncGenerator() {
  yield await Promise.resolve(1)
  yield await Promise.resolve(2)
  yield await Promise.resolve(3)
}

async function example() {
  for await (const num of asyncGenerator()) {
    console.log(num)
  }
}
```

## 模块系统

### 1. 导入导出

```ts
// 导出
export interface User {
  name: string
  age: number
}

export class UserService {
  getUser(): User {
    return { name: 'John', age: 30 }
  }
}

// 导入
import { User, UserService } from './user'
```

### 2. 命名空间

```ts
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean
  }
  
  export class LettersOnlyValidator implements StringValidator {
    isValid(s: string): boolean {
      return /^[A-Za-z]+$/.test(s)
    }
  }
}
```

## 下一步

- [UI 开发基础](./ui-basics.md)
- [状态管理](./state-management.md)
- [生命周期](./lifecycle.md)
