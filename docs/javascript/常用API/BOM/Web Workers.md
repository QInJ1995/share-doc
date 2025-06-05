# Web Workers

[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 是 HTML5 提供的一个多线程解决方案，允许在后台线程中运行脚本，而不会影响主线程的性能。

## 基本概念

- Web Workers 运行在独立的线程中，不会影响主线程的 UI 渲染
- 不能直接访问 DOM
- 通过消息传递机制与主线程通信
- 适合处理计算密集型任务

## 类型

1. **Dedicated Workers（专用 Worker）**
   - 只能被创建它的脚本访问
   - 使用 `new Worker()` 创建

2. **Shared Workers（共享 Worker）**
   - 可以被多个脚本访问
   - 使用 `new SharedWorker()` 创建

3. **Service Workers**
   - 主要用于离线缓存和推送通知
   - 使用 `navigator.serviceWorker.register()` 注册

## 基本使用

### 创建 Worker

```javascript
// 主线程
const worker = new Worker('worker.js');
```

### 通信方式

```javascript
// 主线程发送消息
worker.postMessage('Hello Worker');

// 主线程接收消息
worker.onmessage = function(e) {
    console.log('收到 Worker 消息：', e.data);
};

// 错误处理
worker.onerror = function(e) {
    console.error('Worker 错误：', e.message);
};
```

```javascript
// worker.js
// Worker 线程接收消息
self.onmessage = function(e) {
    console.log('收到主线程消息：', e.data);
    
    // 处理数据
    const result = heavyComputation(e.data);
    
    // 发送结果回主线程
    self.postMessage(result);
};

// 错误处理
self.onerror = function(e) {
    console.error('Worker 内部错误：', e.message);
};
```

## 实际应用场景

### 1. 大数据处理

```javascript
// 主线程
const worker = new Worker('data-processor.js');
const largeData = generateLargeData();

worker.postMessage(largeData);
worker.onmessage = function(e) {
    updateUI(e.data);
};
```

### 2. 图片处理

```javascript
// 主线程
const imageWorker = new Worker('image-processor.js');

function processImage(imageData) {
    imageWorker.postMessage({
        imageData: imageData,
        filter: 'grayscale'
    });
}

imageWorker.onmessage = function(e) {
    const processedImage = e.data;
    displayImage(processedImage);
};
```

### 3. 实时数据计算

```javascript
// 主线程
const calculationWorker = new Worker('calculator.js');

function startRealTimeCalculation() {
    calculationWorker.postMessage({
        type: 'start',
        interval: 1000
    });
}

calculationWorker.onmessage = function(e) {
    updateCalculationResults(e.data);
};
```

## 注意事项

1. **数据传输**
   - 使用 `postMessage()` 传递的数据会被复制，而不是共享
   - 大数据传输可能影响性能
   - 可以使用 `Transferable` 对象优化性能

2. **错误处理**
   - 始终实现错误处理机制
   - 使用 `try-catch` 捕获可能的异常

3. **资源管理**
   - 使用完毕后及时终止 Worker
   - 调用 `worker.terminate()` 释放资源

4. **兼容性**
   - 检查浏览器是否支持 Web Workers

   ```javascript
   if (typeof Worker !== 'undefined') {
       // 支持 Web Workers
   } else {
       // 不支持 Web Workers
   }
   ```

## 最佳实践

1. 将计算密集型任务放在 Worker 中
2. 避免频繁创建和销毁 Worker
3. 合理设计消息传递机制
4. 实现优雅的降级方案
5. 注意内存管理

## 调试技巧

1. 使用 `console.log()` 在 Worker 中输出调试信息
2. 在 Chrome DevTools 的 Sources 面板中调试 Worker
3. 使用 `debugger` 语句设置断点

## 性能优化

1. 使用 `Transferable` 对象

    ```javascript
    // 主线程
    const buffer = new ArrayBuffer(1024);
    worker.postMessage(buffer, [buffer]);
    ```

2. 批量处理数据

    ```javascript
    // Worker 线程
    self.onmessage = function(e) {
        const batch = e.data;
        const results = batch.map(processItem);
        self.postMessage(results);
    };
    ```

3. 使用 `requestAnimationFrame` 优化 UI 更新

    ```javascript
    // 主线程
    worker.onmessage = function(e) {
        requestAnimationFrame(() => {
            updateUI(e.data);
        });
    };
    ```
