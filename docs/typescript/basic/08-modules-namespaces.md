# 第八章：模块和命名空间

## 模块（Modules）

TypeScript 中的模块概念与 ES6 模块类似，用于组织和封装代码。

### 1. 导出声明

```typescript
// 导出变量
export const name = "TypeScript";

// 导出函数
export function sum(x: number, y: number): number {
    return x + y;
}

// 导出类
export class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}

// 导出接口
export interface Person {
    name: string;
    age: number;
}
```

### 2. 导入声明

```typescript
// 导入单个导出
import { sum } from "./math";

// 导入多个导出
import { sum, Calculator } from "./math";

// 重命名导入
import { sum as add } from "./math";

// 导入所有导出
import * as math from "./math";
```

### 3. 默认导出

```typescript
// 默认导出
export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}

// 导入默认导出
import Calculator from "./Calculator";
```

### 4. 重新导出

```typescript
// 重新导出
export { sum } from "./math";
export { Calculator } from "./calculator";
export * from "./utils";
```

## 命名空间（Namespaces）

命名空间是 TypeScript 特有的组织代码的方式，用于避免命名冲突。

### 1. 基本命名空间

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

### 2. 命名空间的使用

```typescript
// 使用命名空间中的类型
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```

### 3. 多文件命名空间

```typescript
// Validation.ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}

// LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}

// ZipCodeValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

### 4. 别名

```typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square();
```

## 模块 vs 命名空间

### 1. 模块的优势

- 更好的代码组织
- 更好的依赖管理
- 更好的代码分割
- 更好的工具支持

### 2. 命名空间的优势

- 避免全局命名空间污染
- 逻辑分组
- 向后兼容

### 3. 使用建议

- 新项目优先使用模块
- 大型项目可以考虑使用命名空间
- 可以混合使用模块和命名空间

## 模块解析

### 1. 相对路径和非相对路径

```typescript
// 相对路径
import { sum } from "./math";

// 非相对路径
import { sum } from "math";
```

### 2. 模块解析策略

TypeScript 支持两种模块解析策略：

- Classic：TypeScript 传统的解析策略
- Node：Node.js 风格的解析策略

```json
{
    "compilerOptions": {
        "moduleResolution": "node"
    }
}
```

### 3. 路径映射

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": [
                "*",
                "generated/*"
            ]
        }
    }
}
```

## 模块的编译输出

### 1. 输出格式

TypeScript 支持多种模块输出格式：

```json
{
    "compilerOptions": {
        "module": "commonjs", // 可选值：none, commonjs, amd, system, umd, es6, es2015, esnext
        "target": "es5"
    }
}
```

### 2. 输出文件

```json
{
    "compilerOptions": {
        "outFile": "./dist/bundle.js"
    }
}
```

### 本章小结

- 学习了模块的基本概念和用法
- 了解了命名空间的定义和使用
- 掌握了模块和命名空间的区别
- 理解了模块解析策略
- 学习了模块的编译输出

在下一章中，我们将学习 TypeScript 的装饰器。
