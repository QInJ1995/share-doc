# TypeScript 入门介绍

## 什么是 TypeScript？

TypeScript 是 JavaScript 的一个超集，由微软开发并维护。它在 JavaScript 的基础上添加了静态类型系统，使得代码更加健壮和可维护。

## TypeScript 的主要特点

1. **静态类型检查**：在编译时就能发现潜在的错误
2. **类型推断**：自动推断变量类型，减少代码冗余
3. **面向对象特性**：支持类、接口、泛型等特性
4. **ES6+ 特性支持**：支持最新的 JavaScript 特性
5. **工具支持**：提供强大的 IDE 支持和代码补全

## 安装 TypeScript

```bash
# 全局安装 TypeScript
npm install -g typescript

# 检查安装是否成功
tsc --version
```

## 第一个 TypeScript 程序

创建一个简单的 TypeScript 文件 `hello.ts`：

```typescript
function greet(name: string) {
    return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));
```

编译并运行：

```bash
# 编译 TypeScript 文件
tsc hello.ts

# 运行生成的 JavaScript 文件
node hello.js
```

## TypeScript 配置文件

创建 `tsconfig.json` 文件来配置 TypeScript 编译器：

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "outDir": "./dist"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

## 下一步

- [基础类型](./02-basic-types.md)
- [接口和类型](./03-interfaces-types.md)
- [类和对象](./04-classes-objects.md)
