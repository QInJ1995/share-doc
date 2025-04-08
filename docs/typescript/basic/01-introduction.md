# TypeScript 入门教程

## 第一章：TypeScript 简介

### 什么是 TypeScript？

TypeScript 是 JavaScript 的一个超集，由微软开发并维护。它在 JavaScript 的基础上添加了静态类型系统，使得我们可以在开发阶段就发现潜在的错误，提高代码的可维护性和可读性。

### TypeScript 的主要特点

1. **静态类型检查**
   - 在编译时进行类型检查
   - 提供更好的代码提示和自动完成
   - 减少运行时错误

2. **面向对象编程支持**
   - 类（Class）
   - 接口（Interface）
   - 继承（Inheritance）
   - 封装（Encapsulation）

3. **现代 JavaScript 特性**
   - 支持 ES6+ 的所有特性
   - 装饰器（Decorators）
   - 泛型（Generics）

4. **工具支持**
   - 强大的 IDE 支持
   - 代码重构
   - 智能提示

### 为什么选择 TypeScript？

1. **提高代码质量**
   - 类型检查可以在编译时发现错误
   - 更好的代码可维护性
   - 更容易进行代码重构

2. **提升开发效率**
   - 更好的 IDE 支持
   - 更准确的代码提示
   - 更快的错误定位

3. **更好的团队协作**
   - 代码更容易理解
   - 接口定义更清晰
   - 减少沟通成本

### TypeScript 与 JavaScript 的关系

- TypeScript 是 JavaScript 的超集
- 所有的 JavaScript 代码都是合法的 TypeScript 代码
- TypeScript 最终会被编译成 JavaScript
- TypeScript 提供了额外的类型系统和面向对象特性

### 安装 TypeScript

```bash
# 全局安装 TypeScript
npm install -g typescript

# 检查安装是否成功
tsc --version
```

### 第一个 TypeScript 程序

让我们创建一个简单的 TypeScript 程序：

```typescript
// hello.ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet('TypeScript'));
```

编译并运行：

```bash
# 编译 TypeScript 文件
tsc hello.ts

# 运行生成的 JavaScript 文件
node hello.js
```

### 本章小结

- 了解了 TypeScript 的基本概念和特点
- 理解了 TypeScript 与 JavaScript 的关系
- 学会了如何安装 TypeScript
- 编写并运行了第一个 TypeScript 程序

在下一章中，我们将学习 TypeScript 的基本类型系统。
