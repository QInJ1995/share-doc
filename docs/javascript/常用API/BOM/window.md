# Window 对象

[Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象是浏览器窗口的顶层对象，代表浏览器窗口本身。

## 常用属性

### window.innerWidth 和 window.innerHeight

获取浏览器窗口的内部宽度和高度（不包括工具栏和滚动条）。

```javascript
console.log(window.innerWidth);  // 浏览器窗口的内部宽度
console.log(window.innerHeight); // 浏览器窗口的内部高度
```

### window.outerWidth 和 window.outerHeight

获取浏览器窗口的外部宽度和高度（包括工具栏和滚动条）。

```javascript
console.log(window.outerWidth);  // 浏览器窗口的外部宽度
console.log(window.outerHeight); // 浏览器窗口的外部高度
```

## 常用方法

### window.open()

打开一个新的浏览器窗口。

```javascript
// 基本用法
window.open('https://www.example.com');

// 带参数的用法
window.open('https://www.example.com', '_blank', 'width=500,height=500');
```

### window.close()

关闭当前窗口。

```javascript
window.close();
```

### window.scrollTo()

滚动到指定位置。

```javascript
// 滚动到指定坐标
window.scrollTo(0, 500);

// 平滑滚动
window.scrollTo({
    top: 500,
    behavior: 'smooth'
});
```

### window.setTimeout() 和 window.clearTimeout()

设置和清除定时器。

```javascript
// 设置定时器
const timer = window.setTimeout(() => {
    console.log('3秒后执行');
}, 3000);

// 清除定时器
window.clearTimeout(timer);
```

### window.setInterval() 和 window.clearInterval()

设置和清除循环定时器。

```javascript
// 设置循环定时器
const interval = window.setInterval(() => {
    console.log('每秒执行一次');
}, 1000);

// 清除循环定时器
window.clearInterval(interval);
```

## 事件

### window.onload

页面加载完成后触发。

```javascript
window.onload = function() {
    console.log('页面加载完成');
};
```

### window.onresize

窗口大小改变时触发。

```javascript
window.onresize = function() {
    console.log('窗口大小改变');
};
```

### window.onscroll

页面滚动时触发。

```javascript
window.onscroll = function() {
    console.log('页面滚动');
};
```

## 实际应用示例

### 1. 检测窗口大小变化并调整布局

```javascript
window.onresize = function() {
    if (window.innerWidth < 768) {
        // 移动端布局
        document.body.classList.add('mobile-layout');
    } else {
        // 桌面端布局
        document.body.classList.remove('mobile-layout');
    }
};
```

### 2. 平滑滚动到顶部

```javascript
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
```

### 3. 防抖函数实现

```javascript
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 使用示例
window.onscroll = debounce(function() {
    console.log('滚动停止后执行');
}, 200);
```
