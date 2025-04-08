# Node.js 核心概念

## 事件驱动

### 1. EventEmitter

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 监听事件
myEmitter.on('event', () => {
    console.log('事件触发！');
});

// 触发事件
myEmitter.emit('event');
```

### 2. 事件监听器

```javascript
// 一次性监听器
myEmitter.once('event', () => {
    console.log('只触发一次');
});

// 移除监听器
const callback = () => console.log('B');
myEmitter.on('event', callback);
myEmitter.removeListener('event', callback);
```

## 流和缓冲区

### 1. 流类型

```javascript
const fs = require('fs');

// 可读流
const readStream = fs.createReadStream('input.txt');

// 可写流
const writeStream = fs.createWriteStream('output.txt');

// 管道操作
readStream.pipe(writeStream);
```

### 2. 缓冲区

```javascript
const buf = Buffer.from('Hello World');
console.log(buf.toString()); // Hello World
console.log(buf.length);     // 11
```

### 3. 流事件

```javascript
readStream.on('data', (chunk) => {
    console.log('收到数据:', chunk);
});

readStream.on('end', () => {
    console.log('数据接收完成');
});

readStream.on('error', (err) => {
    console.error('错误:', err);
});
```

## 文件系统

### 1. 同步操作

```javascript
const fs = require('fs');

// 读取文件
const data = fs.readFileSync('file.txt', 'utf8');

// 写入文件
fs.writeFileSync('output.txt', 'Hello World');

// 检查文件是否存在
if (fs.existsSync('file.txt')) {
    console.log('文件存在');
}
```

### 2. 异步操作

```javascript
// 读取文件
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// 写入文件
fs.writeFile('output.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log('文件已保存');
});
```

## 进程管理

### 1. 进程信息

```javascript
console.log(process.pid);      // 进程 ID
console.log(process.version);  // Node.js 版本
console.log(process.platform); // 操作系统平台
```

### 2. 环境变量

```javascript
// 设置环境变量
process.env.NODE_ENV = 'production';

// 获取环境变量
console.log(process.env.NODE_ENV);
```

### 3. 子进程

```javascript
const { spawn } = require('child_process');

// 创建子进程
const child = spawn('ls', ['-l']);

// 监听输出
child.stdout.on('data', (data) => {
    console.log(`输出: ${data}`);
});

// 监听错误
child.stderr.on('data', (data) => {
    console.error(`错误: ${data}`);
});

// 监听进程结束
child.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
});
```

## 内存管理

### 1. 垃圾回收

```javascript
// 手动触发垃圾回收
if (global.gc) {
    global.gc();
}
```

### 2. 内存泄漏检测

```javascript
const heapdump = require('heapdump');

// 生成堆快照
heapdump.writeSnapshot(`./heap-${Date.now()}.heapsnapshot`);
```

## 性能优化

### 1. 缓存

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache();

// 设置缓存
cache.set('key', 'value', 600); // 10分钟过期

// 获取缓存
const value = cache.get('key');
```

### 2. 集群

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 启动工作进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    console.log(`工作进程 ${process.pid} 已启动`);
}
```

## 练习

1. 实现一个简单的事件发射器
2. 创建一个文件复制程序，使用流
3. 实现一个简单的进程监控工具
