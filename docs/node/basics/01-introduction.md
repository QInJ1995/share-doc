# Node.js 入门

## Node.js 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它让开发者可以使用 JavaScript 来编写服务器端代码，使得前后端可以使用同一种编程语言。

### Node.js 的特点

1. **非阻塞 I/O**
   - 异步操作
   - 事件驱动
   - 高并发处理

2. **跨平台**
   - Windows
   - macOS
   - Linux

3. **npm 生态系统**
   - 丰富的包管理
   - 大量的开源模块
   - 活跃的社区

## 环境搭建

### 1. 安装 Node.js

访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新的 LTS 版本。

### 2. 验证安装

打开终端，运行以下命令：

```bash
node --version
npm --version
```

### 3. 配置开发环境

1. 安装 VS Code
2. 安装推荐的 Node.js 扩展
3. 配置终端

## 第一个程序

### 1. 创建项目目录

```bash
mkdir my-first-node-app
cd my-first-node-app
```

### 2. 初始化项目

```bash
npm init -y
```

### 3. 创建第一个程序

创建 `app.js` 文件：

```javascript
console.log('Hello, Node.js!');

// 使用 HTTP 模块创建服务器
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

### 4. 运行程序

```bash
node app.js
```

## 模块系统

### 1. 内置模块

- `http`: 创建 HTTP 服务器
- `fs`: 文件系统操作
- `path`: 路径处理
- `os`: 操作系统信息

### 2. 自定义模块

创建 `math.js`:

```javascript
// 导出函数
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```

### 3. 使用模块

```javascript
const math = require('./math');

console.log(math.add(5, 3));      // 8
console.log(math.subtract(5, 3)); // 2
```

### 4. ES 模块

在 `package.json` 中添加 `"type": "module"`，然后使用：

```javascript
import { add, subtract } from './math.js';
```

## 练习

1. 创建一个简单的 HTTP 服务器，返回当前时间
2. 使用 `fs` 模块读取并显示文件内容
3. 创建一个简单的计算器模块
