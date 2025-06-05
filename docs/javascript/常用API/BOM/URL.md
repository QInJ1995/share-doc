# URL API

[URL API](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 提供了解析、构造、规范化和编码 URL 的功能。它是处理 URL 的标准 Web API。

## 基本用法

### 创建 URL 对象

```javascript
// 创建 URL 对象
const url = new URL('https://example.com:8080/path?query=value#hash');

// 使用相对 URL
const baseUrl = 'https://example.com';
const relativeUrl = new URL('/path', baseUrl);
```

## URL 对象属性

URL 对象包含以下主要属性：

- `href`: 完整的 URL 字符串
- `protocol`: URL 协议（如 'http:' 或 'https:'）
- `host`: 主机名和端口号
- `hostname`: 主机名
- `port`: 端口号
- `pathname`: URL 路径
- `search`: 查询字符串（包含 '?'）
- `searchParams`: URLSearchParams 对象，用于处理查询参数
- `hash`: URL 片段标识符（包含 '#'）

### 示例

```javascript
const url = new URL('https://example.com:8080/path?name=value#section');

console.log(url.href);        // 'https://example.com:8080/path?name=value#section'
console.log(url.protocol);    // 'https:'
console.log(url.host);        // 'example.com:8080'
console.log(url.hostname);    // 'example.com'
console.log(url.port);        // '8080'
console.log(url.pathname);    // '/path'
console.log(url.search);      // '?name=value'
console.log(url.hash);        // '#section'
```

## 处理查询参数

URL 对象的 `searchParams` 属性提供了处理查询参数的便捷方法：

```javascript
const url = new URL('https://example.com?name=value&age=25');

// 获取参数
console.log(url.searchParams.get('name'));  // 'value'
console.log(url.searchParams.get('age'));   // '25'

// 设置参数
url.searchParams.set('name', 'newValue');

// 添加参数
url.searchParams.append('city', 'Beijing');

// 删除参数
url.searchParams.delete('age');

// 检查参数是否存在
console.log(url.searchParams.has('name'));  // true

// 获取所有参数
for (const [key, value] of url.searchParams) {
    console.log(`${key}: ${value}`);
}
```

## 实际应用场景

### 1. 构建 API 请求 URL

```javascript
function buildApiUrl(baseUrl, endpoint, params) {
    const url = new URL(endpoint, baseUrl);
    
    // 添加查询参数
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    
    return url.toString();
}

// 使用示例
const apiUrl = buildApiUrl(
    'https://api.example.com',
    '/users',
    { page: 1, limit: 10, sort: 'name' }
);
```

### 2. 解析当前页面 URL

```javascript
// 获取当前页面 URL 信息
const currentUrl = new URL(window.location.href);

// 获取特定参数
const pageId = currentUrl.searchParams.get('pageId');
const category = currentUrl.searchParams.get('category');
```

### 3. 构建分页链接

```javascript
function buildPaginationUrl(currentUrl, page) {
    const url = new URL(currentUrl);
    url.searchParams.set('page', page);
    return url.toString();
}
```

### 4. 处理文件 URL

```javascript
function getFileUrl(file) {
    return URL.createObjectURL(file);
}

// 使用示例
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const fileUrl = getFileUrl(file);
    // 使用 fileUrl 显示预览等
});
```

## 注意事项

1. URL 对象会自动对特殊字符进行编码和解码
2. 使用 `URL.createObjectURL()` 创建的对象 URL 在不需要时应该使用 `URL.revokeObjectURL()` 释放
3. 在处理相对 URL 时，必须提供 base URL
4. 某些浏览器可能不支持所有 URL API 特性，建议进行兼容性检查

## 浏览器兼容性

URL API 在现代浏览器中得到了广泛支持，包括：

- Chrome 32+
- Firefox 19+
- Safari 10.1+
- Edge 12+

对于不支持 URL API 的旧版浏览器，可以使用 polyfill 或替代方案。
