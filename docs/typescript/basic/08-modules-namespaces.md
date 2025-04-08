# TypeScript 模块和命名空间

让我们来了解 TypeScript 中的模块系统和命名空间。

## 模块

### 导出声明

```typescript
// StringValidator.ts
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

// ZipCodeValidator.ts
import { StringValidator } from "./StringValidator";

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
```

### 导入声明

```typescript
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```

### 默认导出

```typescript
// ZipCodeValidator.ts
export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}

// Test.ts
import ZipCodeValidator from "./ZipCodeValidator";
let validator = new ZipCodeValidator();
```

### 重新导出

```typescript
// AllValidators.ts
import { ZipCodeValidator } from "./ZipCodeValidator";
import { LettersOnlyValidator } from "./LettersOnlyValidator";

export { ZipCodeValidator };
export { LettersOnlyValidator };
```

## 命名空间

### 基本命名空间

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

### 多文件命名空间

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

### 别名

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

### 模块的优势

1. 更好的代码组织
2. 更好的依赖管理
3. 更好的代码复用
4. 更好的工具支持

### 命名空间的优势

1. 简单的代码组织
2. 避免全局命名空间污染
3. 向后兼容性

## 下一步

- [装饰器](./09-decorators.md)
- [工程配置](./10-project-configuration.md)
- [最佳实践](./11-best-practices.md)
