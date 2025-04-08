# 第十二章：常见问题解答

## 类型系统相关问题

### 1. TypeScript 和 JavaScript 有什么区别？

TypeScript 是 JavaScript 的超集，主要区别在于：

- TypeScript 添加了静态类型系统
- TypeScript 支持最新的 ECMAScript 特性
- TypeScript 提供了更好的开发工具支持
- TypeScript 代码需要编译成 JavaScript 才能运行

### 2. 什么时候使用 interface，什么时候使用 type？

- 使用 `interface` 的情况：
  - 定义对象形状
  - 需要扩展或实现
  - 需要声明合并

```typescript
interface User {
    name: string;
    age: number;
}

interface Admin extends User {
    role: string;
}
```

- 使用 `type` 的情况：
  - 定义联合类型
  - 定义元组类型
  - 定义映射类型

```typescript
type Status = "active" | "inactive";
type Point = [number, number];
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### 3. 如何处理第三方库没有类型定义的情况？

1. 创建声明文件：

```typescript
// types/my-module.d.ts
declare module "my-module" {
    export function doSomething(): void;
    export const value: number;
}
```

2. 使用 DefinitelyTyped：

```bash
npm install --save-dev @types/lodash
```

3. 使用 `any` 类型（不推荐）：

```typescript
declare module "my-module";
```

## 编译和配置问题

### 1. 如何处理编译错误？

常见编译错误及解决方案：

```typescript
// 错误：类型不匹配
const num: number = "123"; // 错误

// 解决方案：使用类型断言或类型转换
const num: number = Number("123");
const num = "123" as unknown as number;

// 错误：属性不存在
interface User {
    name: string;
}
const user: User = { name: "John", age: 30 }; // 错误

// 解决方案：扩展接口或使用索引签名
interface User {
    name: string;
    [key: string]: any;
}
```

### 2. 如何配置 tsconfig.json？

常见配置问题：

```json
{
    "compilerOptions": {
        // 目标版本
        "target": "es2018",
        
        // 模块系统
        "module": "commonjs",
        
        // 严格模式
        "strict": true,
        
        // 路径别名
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        
        // 输出目录
        "outDir": "./dist",
        
        // 源映射
        "sourceMap": true
    },
    
    // 包含的文件
    "include": ["src/**/*"],
    
    // 排除的文件
    "exclude": ["node_modules", "dist"]
}
```

## 开发工具问题

### 1. 如何在 VS Code 中获得更好的 TypeScript 支持？

1. 安装扩展：
   - TypeScript and JavaScript Language Features
   - ESLint
   - Prettier

2. 配置 settings.json：

```json
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### 2. 如何调试 TypeScript 代码？

1. 配置 launch.json：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug TypeScript",
            "program": "${workspaceFolder}/src/index.ts",
            "preLaunchTask": "tsc: build",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"],
            "sourceMaps": true
        }
    ]
}
```

2. 配置 tasks.json：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "problemMatcher": ["$tsc"],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

## 性能问题

### 1. 如何提高 TypeScript 编译速度？

1. 使用项目引用：

```json
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./shared" }
    ]
}
```

2. 使用增量编译：

```bash
tsc --incremental
```

3. 使用 `skipLibCheck`：

```json
{
    "compilerOptions": {
        "skipLibCheck": true
    }
}
```

### 2. 如何处理大型项目的类型检查？

1. 使用 `isolatedModules`：

```json
{
    "compilerOptions": {
        "isolatedModules": true
    }
}
```

2. 使用 `transpileOnly` 模式：

```bash
ts-node --transpile-only
```

## 常见错误和解决方案

### 1. "Cannot find module" 错误

解决方案：

1. 检查模块路径是否正确
2. 确保安装了依赖
3. 创建类型声明文件
4. 配置 `paths` 和 `baseUrl`

### 2. "Type 'X' is not assignable to type 'Y'" 错误

解决方案：

1. 使用类型断言
2. 修改类型定义
3. 使用类型保护
4. 使用泛型约束

### 3. "Property 'X' does not exist on type 'Y'" 错误

解决方案：

1. 使用可选属性
2. 使用索引签名
3. 使用类型断言
4. 修改类型定义

## 最佳实践问题

### 1. 如何处理异步代码？

使用 async/await：

```typescript
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
```

### 2. 如何处理空值和未定义？

1. 使用可选链：

```typescript
const name = user?.profile?.name ?? "Unknown";
```

2. 使用非空断言：

```typescript
const name = user!.name;
```

3. 使用类型保护：

```typescript
if (user && user.name) {
    console.log(user.name);
}
```

### 本章小结

- 了解了 TypeScript 与 JavaScript 的主要区别
- 掌握了 interface 和 type 的使用场景
- 学习了如何处理第三方库的类型定义
- 了解了常见的编译和配置问题
- 掌握了开发工具的配置和使用
- 学习了性能优化的方法
- 了解了常见错误的解决方案
- 掌握了异步代码和空值处理的最佳实践

在下一章中，我们将通过实战项目来巩固所学的知识。
