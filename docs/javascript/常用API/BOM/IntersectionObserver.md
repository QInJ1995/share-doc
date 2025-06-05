# IntersectionObserver

[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) 是一个现代的 Web API，用于监测元素是否进入视口（viewport）或与其他元素相交。它提供了一种高效的方式来检测元素的可见性，而不需要监听滚动事件或使用其他性能较差的方法。

## 基本用法

### 创建观察者

```javascript
const observer = new IntersectionObserver(callback, options);
```

### 配置选项

```javascript
const options = {
  root: null,        // 观察的根元素，默认为视口
  rootMargin: '0px', // 根元素的外边距
  threshold: 0.5     // 触发回调的阈值，可以是单个值或数组
};
```

### 开始观察元素

```javascript
const target = document.querySelector('.target-element');
observer.observe(target);
```

### 回调函数

```javascript
const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 元素进入视口
      console.log('元素可见');
    } else {
      // 元素离开视口
      console.log('元素不可见');
    }
  });
};
```

## 实际应用场景

### 1. 图片懒加载

```javascript
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

### 2. 无限滚动

```javascript
const loadMoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 加载更多内容
      loadMoreContent();
    }
  });
});

const loadMoreTrigger = document.querySelector('#load-more-trigger');
loadMoreObserver.observe(loadMoreTrigger);
```

### 3. 动画触发

```javascript
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  animateObserver.observe(element);
});
```

## 注意事项

1. 浏览器兼容性：现代浏览器都支持 IntersectionObserver，但 IE 不支持。
2. 性能考虑：相比传统的滚动事件监听，IntersectionObserver 性能更好。
3. 内存管理：不再需要观察元素时，记得调用 `unobserve()` 或 `disconnect()`。

## 最佳实践

1. 合理设置 threshold 值，避免过于频繁的回调。
2. 在不需要观察时及时断开连接。
3. 考虑使用 polyfill 以支持旧版浏览器。
4. 对于大量元素，考虑批量处理回调。

## 示例：完整的图片懒加载实现

```html
<img data-src="image1.jpg" alt="Lazy loaded image">
<img data-src="image2.jpg" alt="Lazy loaded image">
```

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => {
          img.classList.add('loaded');
        };
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => imageObserver.observe(img));
});
```

## 主要用途

1. 懒加载（Lazy Loading） ：当图片或组件进入视口时才加载，提高性能。
2. 无限滚动（Infinite Scroll） ：监测滚动到底部，自动加载新内容。
3. 动画触发：当元素进入视口时，触发 CSS 动画或 JavaScript 事件。
4. 广告曝光统计：检测广告是否被用户看到，以进行数据分析。

## 相关资源

- [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
- [Intersection Observer API 规范](https://w3c.github.io/IntersectionObserver/)
- [Intersection Observer Polyfill](https://github.com/w3c/IntersectionObserver/tree/main/polyfill)
