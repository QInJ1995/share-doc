# Fetch API

[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 提供了一个简单而强大的接口来获取资源（包括跨网络）。它是 XMLHttpRequest 的现代替代方案。

## 基本用法

### 发起请求

```javascript
// 基本 GET 请求
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用 async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 请求配置

```javascript
// POST 请求示例
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'John',
    age: 30
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 常用配置选项

- `method`: 请求方法（GET, POST, PUT, DELETE 等）
- `headers`: 请求头信息
- `body`: 请求体数据
- `mode`: 请求模式（cors, no-cors, same-origin）
- `credentials`: 是否发送 cookies（include, same-origin, omit）
- `cache`: 缓存模式
- `redirect`: 重定向模式

## 响应处理

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 获取响应头
    const contentType = response.headers.get('content-type');
    
    // 根据内容类型处理响应
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  })
  .then(data => console.log(data));
```

## 常见应用场景

### 1. 文件上传

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log('Upload success:', data));
```

### 2. 带超时的请求

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}
```

### 3. 并发请求

```javascript
Promise.all([
  fetch('https://api.example.com/users'),
  fetch('https://api.example.com/posts')
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(([users, posts]) => {
  console.log('Users:', users);
  console.log('Posts:', posts);
});
```

### Fetch API + Streams

Fetch API 可以与 [Streams API](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API) 一起使用，以处理大型数据流。

```javascript
fetch('/large-file').then(response => {
  const reader = response.body.getReader();
  reader.read().then(({ done, value }) => {
    console.log("流式加载部分数据:", value);
  });
});
```

## 最佳实践

1. **错误处理**
   - 始终检查 `response.ok`
   - 使用 try/catch 处理网络错误
   - 实现适当的重试机制

2. **请求取消**
   - 使用 AbortController 实现请求取消

   ```javascript
   const controller = new AbortController();
   const signal = controller.signal;

   fetch(url, { signal })
     .then(response => response.json())
     .catch(err => {
       if (err.name === 'AbortError') {
         console.log('Fetch aborted');
       }
     });

   // 取消请求
   controller.abort();
   ```

3. **性能优化**
   - 使用适当的缓存策略
   - 实现请求去重
   - 考虑使用请求队列

4. **安全性**
   - 始终验证响应数据
   - 使用 HTTPS
   - 实现适当的 CORS 策略

## 注意事项

1. Fetch 不会自动发送 cookies，需要设置 `credentials: 'include'`
2. Fetch 不会自动转换 JSON 数据，需要手动调用 `response.json()`
3. Fetch 不会自动处理 HTTP 错误状态，需要检查 `response.ok`
4. 某些浏览器可能不支持某些 Fetch 特性，需要添加 polyfill

## 浏览器兼容性

- 现代浏览器都支持 Fetch API
- 对于旧版浏览器，可以使用 [whatwg-fetch](https://github.com/github/fetch) polyfill
