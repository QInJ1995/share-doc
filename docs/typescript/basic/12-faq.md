# TypeScript 常见问题

这里收集了一些 TypeScript 开发中常见的问题和解决方案。

## 类型系统相关问题

### 如何处理第三方库没有类型声明文件？

1. 使用 `@types` 包：

```bash
npm install --save-dev @types/lodash
```

2. 创建自定义类型声明文件：

```typescript
// types.d.ts
declare module 'my-module' {
    export function doSomething(): void;
}
```

### 如何处理 any 类型？

1. 使用 unknown 类型：

```typescript
function processData(data: unknown) {
    if (typeof data === 'string') {
        // 处理字符串
    }
}
```

2. 使用类型断言：

```typescript
const value = someFunction() as string;
```

### 如何处理可选属性？

```typescript
interface User {
    name: string;
    age?: number;
}

function processUser(user: User) {
    if (user.age !== undefined) {
        // 处理 age
    }
}
```

## 编译相关问题

### 如何处理编译错误？

1. 检查 tsconfig.json 配置
2. 使用 `--noEmitOnError` 选项
3. 使用 `skipLibCheck` 跳过声明文件检查

### 如何处理模块解析问题？

1. 配置 baseUrl 和 paths：

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

2. 使用模块别名：

```typescript
import { Component } from '@/components/Component';
```

## 工具相关问题

### 如何配置 ESLint？

```json
{
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"]
}
```

### 如何配置 Prettier？

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 4
}
```

## 性能相关问题

### 如何提高编译速度？

1. 使用 `incremental` 选项
2. 使用项目引用
3. 使用 `tsc --watch`

### 如何减少打包体积？

1. 使用 tree-shaking
2. 使用代码分割
3. 使用 `import type` 语法

## 框架相关问题

### 如何在 React 中使用 TypeScript？

```typescript
import React, { useState } from 'react';

interface Props {
    name: string;
}

const MyComponent: React.FC<Props> = ({ name }) => {
    const [count, setCount] = useState<number>(0);
    
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Count: {count}</p>
        </div>
    );
};
```

### 如何在 Vue 中使用 TypeScript？

```typescript
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MyComponent extends Vue {
    private count: number = 0;
    
    private increment(): void {
        this.count++;
    }
}
```

## 调试相关问题

### 如何调试 TypeScript 代码？

1. 使用 source maps
2. 配置 VS Code 调试
3. 使用 Chrome DevTools

### 如何生成类型声明文件？

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationDir": "./types"
    }
}
```

## 下一步

- [实战项目](./13-practical-projects.md)
- [高级主题](./14-advanced-topics.md)
- [资源推荐](./15-resources.md)
