# ResizeObserver

[ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 是一个用于监听元素尺寸变化的 Web API。它可以在元素大小发生变化时提供回调，这对于响应式设计和动态布局非常有用。

## 基本用法

```javascript
// 创建 ResizeObserver 实例
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    // entry.target 是被观察的元素
    // entry.contentRect 包含元素的新尺寸信息
    console.log('元素尺寸变化：', entry.contentRect);
  }
});

// 开始观察元素
const element = document.querySelector('.my-element');
resizeObserver.observe(element);

// 停止观察元素
resizeObserver.unobserve(element);

// 停止所有观察
resizeObserver.disconnect();
```

## 主要特性

1. **观察多个元素**：一个 ResizeObserver 实例可以同时观察多个元素
2. **性能优化**：比传统的 resize 事件更高效，不会影响页面性能
3. **精确的尺寸信息**：提供详细的尺寸变化信息，包括：
   - width：元素宽度
   - height：元素高度
   - top：元素顶部位置
   - left：元素左侧位置
   - right：元素右侧位置
   - bottom：元素底部位置

## 实际应用示例

### 1. 响应式布局调整

```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width } = entry.contentRect;
    
    // 根据宽度调整布局
    if (width < 600) {
      entry.target.classList.add('mobile-layout');
    } else {
      entry.target.classList.remove('mobile-layout');
    }
  }
});

// 观察容器元素
const container = document.querySelector('.container');
resizeObserver.observe(container);
```

### 2. 图表自适应

```javascript
const chartObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    // 重新渲染图表以适应新尺寸
    updateChartSize(width, height);
  }
});

const chartContainer = document.querySelector('.chart-container');
chartObserver.observe(chartContainer);
```

### 3. 图片懒加载优化

```javascript
const imageObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const img = entry.target;
    const { width } = entry.contentRect;
    
    // 根据容器宽度加载不同尺寸的图片
    const imageUrl = width > 800 ? 'large.jpg' : 'small.jpg';
    img.src = imageUrl;
  }
});

const imageContainer = document.querySelector('.image-container');
imageObserver.observe(imageContainer);
```

## 常见用途

1. 响应式布局：当元素大小变化时，调整 UI。
2. 动态文本溢出检测：监听文本容器大小变化，动态调整样式。
3. Canvas / SVG 适配：根据容器大小调整绘制区域。
4. Web3 / DApp 开发：适用于自适应的 NFT 画廊、区块链数据可视化等。

## 注意事项

1. **浏览器兼容性**：检查浏览器支持情况
2. **性能考虑**：避免在回调中执行过于复杂的操作
3. **内存管理**：不再需要时记得调用 disconnect() 方法
4. **防抖处理**：对于频繁触发的回调，考虑添加防抖处理

## 浏览器支持

- Chrome 64+
- Firefox 69+
- Safari 13.1+
- Edge 79+

## 相关资源

- [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)
- [W3C 规范](https://www.w3.org/TR/resize-observer/)
