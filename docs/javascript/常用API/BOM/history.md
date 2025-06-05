# History 对象

[History](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 对象提供了操作浏览器历史记录的方法，允许在同一个文档的不同状态之间进行导航。

## 常用属性

### history.length

获取历史记录中的页面数量。

```javascript
console.log(history.length); // 当前历史记录中的页面数量
```

## 常用方法

### history.back()

返回上一页，相当于点击浏览器的后退按钮。

```javascript
history.back();
```

### history.forward()

前进到下一页，相当于点击浏览器的前进按钮。

```javascript
history.forward();
```

### history.go()

加载历史记录中的特定页面。

```javascript
// 前进一页
history.go(1);

// 后退一页
history.go(-1);

// 后退两页
history.go(-2);
```

### history.pushState()

向历史记录添加新记录。

```javascript
// 基本用法
history.pushState(state, title, url);

// 实际示例
history.pushState(
    { page: 1 }, 
    'Page 1', 
    '/page1'
);
```

### history.replaceState()

替换当前历史记录。

```javascript
// 基本用法
history.replaceState(state, title, url);

// 实际示例
history.replaceState(
    { page: 2 }, 
    'Page 2', 
    '/page2'
);
```

## 事件

### popstate

当用户点击浏览器的前进或后退按钮时触发。

```javascript
window.addEventListener('popstate', function(event) {
    console.log('历史记录状态改变');
    console.log('状态数据：', event.state);
});
```

### hashchange

当 URL 的 hash 值改变时触发。

```javascript
window.addEventListener('hashchange', function(event) {
    console.log('URL hash值改变');
    console.log('URL hash值：', event.newURL);
    console.log('URL hash值：', event.oldURL);
})
```

## 实际应用示例

### 1. 实现单页应用路由

```javascript
class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        // 监听popstate事件
        window.addEventListener('popstate', this.handleRoute.bind(this));
        
        // 处理初始路由
        this.handleRoute();
    }

    handleRoute() {
        const path = location.pathname;
        const route = this.routes[path];
        
        if (route) {
            route();
        } else {
            // 处理404
            console.log('页面不存在');
        }
    }

    navigate(path) {
        history.pushState(null, '', path);
        this.handleRoute();
    }
}

// 使用示例
const router = new Router({
    '/': () => console.log('首页'),
    '/about': () => console.log('关于页面'),
    '/contact': () => console.log('联系页面')
});

// 导航到新页面
router.navigate('/about');
```

### 2. 保存页面状态

```javascript
// 保存页面状态
function savePageState(state) {
    history.pushState(
        state,
        document.title,
        location.href
    );
}

// 恢复页面状态
window.addEventListener('popstate', function(event) {
    if (event.state) {
        // 恢复页面状态
        restorePageState(event.state);
    }
});

// 使用示例
savePageState({
    scrollPosition: window.scrollY,
    formData: {
        name: 'John',
        email: 'john@example.com'
    }
});
```

### 3. 实现前进/后退导航

```javascript
class NavigationManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
    }

    addPage(page) {
        // 如果当前不在最新状态，删除当前位置之后的所有记录
        this.history = this.history.slice(0, this.currentIndex + 1);
        
        // 添加新页面
        this.history.push(page);
        this.currentIndex++;
    }

    canGoBack() {
        return this.currentIndex > 0;
    }

    canGoForward() {
        return this.currentIndex < this.history.length - 1;
    }

    goBack() {
        if (this.canGoBack()) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    goForward() {
        if (this.canGoForward()) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }
}

// 使用示例
const nav = new NavigationManager();
nav.addPage('page1');
nav.addPage('page2');
nav.addPage('page3');

console.log(nav.goBack());  // 返回 'page2'
console.log(nav.goForward()); // 返回 'page3'
```
