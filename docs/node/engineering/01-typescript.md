# TypeScript

## 类型系统

### 1. 基本类型

```typescript
// 基本类型
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// 枚举
enum Color {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF"
}

// 任意类型
let notSure: any = 4;
notSure = "maybe a string";

// 空值
let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;
```

### 2. 接口

```typescript
// 接口定义
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // 可选属性
    readonly createdAt: Date; // 只读属性
}

// 接口实现
class UserImpl implements User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
}

// 函数接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

## 装饰器

### 1. 类装饰器

```typescript
// 类装饰器
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}

@classDecorator
class Example {
    property = "property";
    hello: string;
}

// 方法装饰器
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`调用方法: ${propertyKey}`);
        const result = originalMethod.apply(this, args);
        console.log(`方法返回: ${result}`);
        return result;
    };

    return descriptor;
}

class Example {
    @log
    multiply(a: number, b: number) {
        return a * b;
    }
}
```

### 2. 属性装饰器

```typescript
// 属性装饰器
function readonly(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        writable: false
    });
}

class Example {
    @readonly
    name: string = "example";
}

// 参数装饰器
function validate(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数 ${parameterIndex} 的验证`);
}

class Example {
    greet(@validate name: string) {
        return `Hello ${name}`;
    }
}
```

## 项目配置

### 1. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": ["es2018", "dom"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2. 类型声明文件

```typescript
// types/custom.d.ts
declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

// 全局类型
declare global {
    interface Window {
        customProperty: string;
    }
}
```

## 泛型

### 1. 泛型函数

```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

### 2. 泛型工具类型

```typescript
// Partial<T>
interface User {
    name: string;
    age: number;
}

type PartialUser = Partial<User>;
// 等同于
// type PartialUser = {
//     name?: string;
//     age?: number;
// }

// Pick<T, K>
type UserName = Pick<User, 'name'>;
// 等同于
// type UserName = {
//     name: string;
// }

// Record<K, T>
type CatInfo = Record<string, number>;
// 等同于
// type CatInfo = {
//     [key: string]: number;
// }
```

## 高级类型

### 1. 联合类型和类型别名

```typescript
// 联合类型
type StringOrNumber = string | number;

// 类型别名
type Point = {
    x: number;
    y: number;
};

// 字面量类型
type Direction = 'North' | 'South' | 'East' | 'West';

// 可辨识联合
interface Square {
    kind: 'square';
    size: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function area(s: Shape) {
    switch (s.kind) {
        case 'square':
            return s.size * s.size;
        case 'rectangle':
            return s.width * s.height;
    }
}
```

### 2. 映射类型

```typescript
// 映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 条件类型
type TypeName<T> = T extends string ? 'string' :
                   T extends number ? 'number' :
                   T extends boolean ? 'boolean' :
                   T extends undefined ? 'undefined' :
                   T extends Function ? 'function' : 'object';
```

## 练习

1. 创建类型安全的 API 客户端
2. 实现泛型数据存储类
3. 构建类型安全的表单验证器

## 下一步

- 学习测试与部署
- 了解单元测试
- 掌握集成测试
- 学习 CI/CD 