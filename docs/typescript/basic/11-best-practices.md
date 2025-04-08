# TypeScript 最佳实践

让我们来了解 TypeScript 开发中的一些最佳实践。

## 类型系统最佳实践

### 避免使用 any 类型

```typescript
// 不推荐
function processData(data: any) {
    // ...
}

// 推荐
function processData(data: unknown) {
    if (typeof data === 'string') {
        // ...
    }
}
```

### 使用类型推断

```typescript
// 不推荐
let x: number = 10;

// 推荐
let x = 10;
```

### 使用接口而不是类型别名

```typescript
// 不推荐
type Point = {
    x: number;
    y: number;
};

// 推荐
interface Point {
    x: number;
    y: number;
}
```

## 代码组织最佳实践

### 使用模块化

```typescript
// utils/math.ts
export function add(a: number, b: number): number {
    return a + b;
}

// index.ts
import { add } from './utils/math';
```

### 使用命名空间

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

## 错误处理最佳实践

### 使用自定义错误类型

```typescript
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateInput(input: string): void {
    if (!input) {
        throw new ValidationError('Input cannot be empty');
    }
}
```

### 使用 try-catch 块

```typescript
try {
    validateInput('');
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation error:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}
```

## 性能最佳实践

### 避免不必要的类型断言

```typescript
// 不推荐
const element = document.getElementById('my-element') as HTMLElement;

// 推荐
const element = document.getElementById('my-element');
if (element) {
    // 使用 element
}
```

### 使用 const 声明

```typescript
// 不推荐
let PI = 3.14;

// 推荐
const PI = 3.14;
```

## 测试最佳实践

### 使用类型安全的测试框架

```typescript
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Math functions', () => {
    it('should add two numbers correctly', () => {
        expect(add(1, 2)).to.equal(3);
    });
});
```

### 编写类型声明测试

```typescript
// types.test.ts
import { expectType } from 'tsd';

expectType<string>(add(1, 2)); // 错误：类型不匹配
```

## 文档最佳实践

### 使用 JSDoc 注释

```typescript
/**
 * 计算两个数字的和
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两个数字的和
 */
function add(a: number, b: number): number {
    return a + b;
}
```

### 编写类型声明文件

```typescript
// types.d.ts
declare module 'my-module' {
    export function doSomething(): void;
}
```

## 安全性最佳实践

### 使用 readonly 修饰符

```typescript
interface Config {
    readonly apiKey: string;
    readonly endpoint: string;
}
```

### 使用类型保护

```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function processValue(value: unknown) {
    if (isString(value)) {
        // value 现在是 string 类型
    }
}
```

## 下一步

- [常见问题](./12-faq.md)
- [实战项目](./13-practical-projects.md)
- [高级主题](./14-advanced-topics.md)
