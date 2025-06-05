# requestAnimationFrame

[`requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 是一个用于执行动画的 Web API，它告诉浏览器您希望执行动画，并请求浏览器在下一次重绘之前调用指定的函数来更新动画。

## 基本语法

```javascript
const animationId = requestAnimationFrame(callback);
```

- `callback`: 在下次重绘之前调用的函数
- 返回值: 一个长整型整数，请求 ID，是回调列表中唯一的标识

## 主要特点

1. 与显示器的刷新率同步
2. 在后台标签页或隐藏的 `<iframe>` 中会自动暂停
3. 更节省资源，比 `setTimeout` 和 `setInterval` 更适合做动画
4. 提供更流畅的动画效果

## 基本使用示例

```javascript
function animate() {
  // 执行动画逻辑
  element.style.left = (parseFloat(element.style.left) + 1) + 'px';
  
  // 继续下一帧动画
  requestAnimationFrame(animate);
}

// 开始动画
requestAnimationFrame(animate);
```

## 取消动画

使用 `cancelAnimationFrame` 可以取消动画：

```javascript
const animationId = requestAnimationFrame(animate);
// 取消动画
cancelAnimationFrame(animationId);
```

## 常见应用场景

### 1. 平滑滚动

```javascript
function smoothScroll(target) {
  const start = window.pageYOffset;
  const distance = target - start;
  const duration = 1000; // 动画持续时间（毫秒）
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    window.scrollTo(0, start + distance * progress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
```

### 2. 性能监控

```javascript
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
  const currentTime = performance.now();
  frames++;
  
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(checkFPS);
}

requestAnimationFrame(checkFPS);
```

### 3. 动画过渡

```javascript
function fadeIn(element, duration) {
  let start = null;
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    element.style.opacity = Math.min(progress / duration, 1);
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}
```

## 最佳实践

1. 避免在回调函数中进行耗时操作
2. 使用 `cancelAnimationFrame` 及时清理不需要的动画
3. 考虑使用 `transform` 和 `opacity` 属性进行动画，这些属性不会触发重排
4. 在动画开始前检查元素是否可见，避免不必要的计算
5. 使用 `performance.now()` 计算动画时间，而不是 `Date.now()`

## 兼容性处理

```javascript
window.requestAnimationFrame = window.requestAnimationFrame || 
                             window.mozRequestAnimationFrame || 
                             window.webkitRequestAnimationFrame || 
                             window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || 
                             window.mozCancelAnimationFrame || 
                             window.webkitCancelAnimationFrame || 
                             window.msCancelAnimationFrame;
```

## 注意事项

1. 回调函数执行时间不应超过 16.7ms（60fps）
2. 在移动设备上要注意性能问题
3. 考虑使用 `will-change` 属性提示浏览器优化
4. 避免同时运行太多动画
5. 在页面不可见时暂停动画
