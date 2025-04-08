# JavaScript 基础

## 现代 JavaScript 特性

### 1. 变量声明

```javascript
// var (不推荐)
var oldWay = 'old';

// let (推荐)
let newWay = 'new';

// const (推荐)
const constant = 'constant';
```

### 2. 箭头函数

```javascript
// 传统函数
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => a + b;
```

### 3. 解构赋值

```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

const { name, age } = person;
console.log(name, age);
```

### 4. 展开运算符

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]
```

## 异步编程

### 1. 回调函数

```javascript
const fs = require('fs');

fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### 2. Promise

```javascript
const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

readFile('file.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

### 3. async/await

```javascript
async function readFiles() {
    try {
        const data1 = await readFile('file1.txt');
        const data2 = await readFile('file2.txt');
        console.log(data1, data2);
    } catch (err) {
        console.error(err);
    }
}
```

## 错误处理

### 1. try/catch

```javascript
try {
    // 可能出错的代码
    throw new Error('Something went wrong');
} catch (error) {
    console.error('Error:', error.message);
} finally {
    // 总是执行的代码
    console.log('Cleanup');
}
```

### 2. 错误类型

```javascript
// 自定义错误
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

// 使用自定义错误
throw new CustomError('Custom error message');
```

## 调试技巧

### 1. console 方法

```javascript
console.log('普通信息');
console.info('提示信息');
console.warn('警告信息');
console.error('错误信息');
console.debug('调试信息');
```

### 2. 断点调试

```javascript
// 在代码中添加断点
debugger;

// 或使用 VS Code 的断点功能
```

### 3. 性能分析

```javascript
console.time('operation');
// 要测量的代码
console.timeEnd('operation');
```

## 最佳实践

### 1. 代码风格

- 使用 ESLint 进行代码检查
- 遵循 Airbnb JavaScript 风格指南
- 使用 Prettier 进行代码格式化

### 2. 性能优化

- 避免全局变量
- 使用适当的数据结构
- 优化循环和条件判断

### 3. 安全性

- 输入验证
- XSS 防护
- CSRF 防护

## 练习

1. 实现一个 Promise 包装的延时函数
2. 使用 async/await 重写回调函数
3. 实现一个简单的错误处理中间件

## 下一步

- 学习 Node.js 核心概念
- 了解事件驱动编程
- 掌握流和缓冲区
- 学习进程管理 