# 高级 ArkTS 特性

## 目录

- [泛型编程](#泛型编程)
- [装饰器](#装饰器)
- [反射和元编程](#反射和元编程)
- [异步编程进阶](#异步编程进阶)
- [类型系统进阶](#类型系统进阶)

## 泛型编程

### 泛型类和接口

```ts
class Container<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}

interface Comparable<T> {
  compareTo(other: T): number;
}
```

### 泛型约束

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 装饰器

### 类装饰器

```ts
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
  
  constructor(m: string) {
    this.hello = m;
  }
}
```

### 方法装饰器

```ts
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
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

## 反射和元编程

### 类型反射

```ts
class Example {
  @Prop()
  name: string = '';
  
  @State()
  count: number = 0;
}

function getMetadata(target: any) {
  return Reflect.getMetadataKeys(target);
}
```

### 动态类型创建

```ts
function createType<T>(properties: Record<string, any>) {
  return class {
    constructor() {
      Object.assign(this, properties);
    }
  } as any;
}
```

## 异步编程进阶

### Promise 链式调用

```ts
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return await processData(data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 并发控制

```ts
async function processBatch(items: any[]) {
  const batchSize = 3;
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

## 类型系统进阶

### 条件类型

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;
```

### 映射类型

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### 类型守卫

```ts
function isString(value: any): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

## 最佳实践

1. 使用泛型提高代码复用性
2. 合理使用装饰器增强代码功能
3. 利用反射实现动态功能
4. 正确处理异步操作和错误
5. 充分利用类型系统提供类型安全

## 总结

本章介绍了 ArkTS 的高级特性，包括泛型编程、装饰器、反射、异步编程和类型系统进阶。这些特性能够帮助我们编写更加灵活、可维护和类型安全的代码。在实际开发中，我们应该根据具体需求合理使用这些特性，避免过度使用导致代码复杂度增加。
