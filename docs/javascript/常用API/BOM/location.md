# Location 对象

[Location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 对象包含当前URL的信息，提供了操作URL的方法。

## 常用属性

### location.href

获取或设置完整的URL。

```javascript
// 获取当前URL
console.log(location.href);

// 跳转到新页面
location.href = 'https://www.example.com';
```

### location.protocol

获取URL的协议（如 http: 或 https:）。

```javascript
console.log(location.protocol); // "https:"
```

### location.host

获取主机名和端口号。

```javascript
console.log(location.host); // "www.example.com:8080"
```

### location.hostname

获取主机名。

```javascript
console.log(location.hostname); // "www.example.com"
```

### location.port

获取端口号。

```javascript
console.log(location.port); // "8080"
```

### location.pathname

获取URL的路径部分。

```javascript
console.log(location.pathname); // "/path/to/page"
```

### location.search

获取URL的查询字符串部分。

```javascript
console.log(location.search); // "?name=value&age=25"
```

### location.hash

获取URL的锚点部分。

```javascript
console.log(location.hash); // "#section1"
```

## 常用方法

### location.assign()

加载新的文档。

```javascript
location.assign('https://www.example.com');
```

### location.replace()

用新的文档替换当前文档（不会在历史记录中留下记录）。

```javascript
location.replace('https://www.example.com');
```

### location.reload()

重新加载当前页面。

```javascript
// 普通重新加载
location.reload();

// 强制从服务器重新加载
location.reload(true);
```

## 实际应用示例

### 1. 解析URL参数

```javascript
function getUrlParams() {
    const params = {};
    const searchParams = new URLSearchParams(location.search);
    
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    
    return params;
}

// 使用示例
const params = getUrlParams();
console.log(params.name); // 获取name参数的值
```

### 2. 页面跳转前确认

```javascript
function confirmNavigation(url) {
    if (confirm('确定要离开当前页面吗？')) {
        location.href = url;
    }
}

// 使用示例
confirmNavigation('https://www.example.com');
```

### 3. 检测URL变化

```javascript
// 监听hash变化
window.addEventListener('hashchange', function() {
    console.log('URL的hash部分发生变化');
    console.log('新的hash值：', location.hash);
});

// 监听URL变化（现代浏览器）
const observer = new MutationObserver(function(mutations) {
    console.log('URL发生变化');
});
observer.observe(document, { subtree: true, childList: true });
```

### 4. 构建URL

```javascript
function buildUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    
    return url.toString();
}

// 使用示例
const url = buildUrl('https://www.example.com', {
    name: 'John',
    age: '25'
});
console.log(url); // "https://www.example.com?name=John&age=25"
```
