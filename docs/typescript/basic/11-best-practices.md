# 第十一章：最佳实践

## 类型系统最佳实践

### 1. 使用严格的类型检查

```typescript
// 在 tsconfig.json 中启用严格模式
{
    "compilerOptions": {
        "strict": true
    }
}
```

### 2. 避免使用 any 类型

```typescript
// 不推荐
function processData(data: any) {
    // ...
}

// 推荐
interface Data {
    id: number;
    name: string;
}

function processData(data: Data) {
    // ...
}
```

### 3. 使用类型推断

```typescript
// 不推荐
let name: string = "John";
let age: number = 30;

// 推荐
let name = "John";
let age = 30;
```

### 4. 使用类型别名和接口

```typescript
// 使用接口定义对象形状
interface User {
    id: number;
    name: string;
    email: string;
}

// 使用类型别名定义联合类型
type Status = "active" | "inactive" | "pending";
```

## 代码组织最佳实践

### 1. 模块化组织代码

```typescript
// user.service.ts
export class UserService {
    // ...
}

// user.model.ts
export interface User {
    // ...
}

// user.controller.ts
export class UserController {
    // ...
}
```

### 2. 使用命名空间组织相关代码

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    
    export class EmailValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
        }
    }
}
```

### 3. 使用枚举代替魔法字符串

```typescript
// 不推荐
const status = "active";

// 推荐
enum Status {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending"
}

const status = Status.Active;
```

## 错误处理最佳实践

### 1. 使用自定义错误类

```typescript
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateUser(user: User) {
    if (!user.email) {
        throw new ValidationError("Email is required");
    }
}
```

### 2. 使用 try-catch 处理错误

```typescript
try {
    validateUser(user);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error("Validation error:", error.message);
    } else {
        console.error("Unexpected error:", error);
    }
}
```

## 性能优化最佳实践

### 1. 使用 const 和 readonly

```typescript
// 使用 const 声明常量
const MAX_RETRIES = 3;

// 使用 readonly 防止对象属性被修改
interface Config {
    readonly apiUrl: string;
    readonly timeout: number;
}
```

### 2. 避免不必要的类型断言

```typescript
// 不推荐
const element = document.getElementById("myElement") as HTMLElement;

// 推荐
const element = document.getElementById("myElement");
if (element) {
    // 使用 element
}
```

### 3. 使用类型保护

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: unknown) {
    if (isString(value)) {
        // value 在这里被推断为 string 类型
        console.log(value.toUpperCase());
    }
}
```

## 测试最佳实践

### 1. 使用类型安全的测试框架

```typescript
import { describe, it, expect } from "vitest";

describe("UserService", () => {
    it("should create a new user", () => {
        const userService = new UserService();
        const user = userService.createUser({
            name: "John",
            email: "john@example.com"
        });
        
        expect(user).toBeDefined();
        expect(user.name).toBe("John");
    });
});
```

### 2. 使用模拟和存根

```typescript
class MockUserRepository implements UserRepository {
    users: User[] = [];
    
    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
}
```

## 文档最佳实践

### 1. 使用 JSDoc 注释

```typescript
/**
 * 计算两个数字的和
 * @param a 第一个数字
 * @param b 第二个数字
 * @returns 两个数字的和
 */
function add(a: number, b: number): number {
    return a + b;
}
```

### 2. 为复杂类型添加文档

```typescript
/**
 * 用户配置选项
 */
interface UserConfig {
    /** 用户名 */
    username: string;
    /** 是否启用通知 */
    notifications: boolean;
    /** 主题设置 */
    theme: "light" | "dark";
}
```

## 团队协作最佳实践

### 1. 使用 ESLint 和 Prettier

```json
{
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "error"
    }
}
```

### 2. 使用 Git Hooks

```json
{
    "husky": {
        "hooks": {
            "pre-commit": "npm run lint",
            "pre-push": "npm run test"
        }
    }
}
```

### 3. 使用 TypeScript 项目引用

```json
{
    "compilerOptions": {
        // ...
    },
    "references": [
        { "path": "./shared" },
        { "path": "./src" }
    ]
}
```

### 本章小结

- 学习了类型系统的最佳实践
- 了解了代码组织的最佳实践
- 掌握了错误处理的最佳实践
- 理解了性能优化的最佳实践
- 学习了测试和文档的最佳实践
- 了解了团队协作的最佳实践

在下一章中，我们将学习 TypeScript 的常见问题解答。
