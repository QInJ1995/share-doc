# async/await

async/await是ES8引入的异步编程语法，它基于Promise，让异步代码的写法更接近同步代码，使代码更易读和维护。

## 基本语法

### [async函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

```javascript
async function functionName() {
    // 函数体
}
```

### [await表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

```javascript
async function example() {
    const result = await promise;
    return result;
}
```

## 基本用法

### 1. 基本示例

```javascript
async function fetchUser() {
    try {
        const response = await fetch('https://api.example.com/user');
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. 错误处理

```javascript
async function getData() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 重新抛出错误
    }
}
```

## 实际应用场景

### 1. 串行请求

```javascript
async function getSequentialData() {
    const user = await fetchUser();
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    return { user, posts, comments };
}
```

### 2. 并行请求

```javascript
async function getParallelData() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(),
        fetchPosts(),
        fetchComments()
    ]);
    return { user, posts, comments };
}
```

### 3. 条件执行

```javascript
async function getData(shouldFetchComments) {
    const user = await fetchUser();
    const posts = await fetchPosts();
    
    if (shouldFetchComments) {
        const comments = await fetchComments();
        return { user, posts, comments };
    }
    
    return { user, posts };
}
```

## 高级用法

### 1. 异步迭代器

```javascript
async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

async function example() {
    for await (const num of asyncGenerator()) {
        console.log(num);
    }
}
```

### 2. 超时处理

```javascript
async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
```

### 3. 重试机制

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

## 最佳实践

### 1. 避免不必要的await

```javascript
// 不好的写法
async function example() {
    const a = await 1;
    const b = await 2;
    return a + b;
}

// 好的写法
async function example() {
    const [a, b] = await Promise.all([1, 2]);
    return a + b;
}
```

### 2. 错误处理

```javascript
async function example() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // 处理错误
        console.error('Operation failed:', error);
        // 可以返回默认值
        return defaultValue;
    }
}
```

### 3. 避免回调地狱

```javascript
// 不好的写法
async function example() {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
}

// 好的写法
async function example() {
    const user = await fetchUser();
    const [posts, comments] = await Promise.all([
        fetchPosts(user.id),
        fetchComments(user.id)
    ]);
    return { user, posts, comments };
}
```

## 注意事项

1. async函数总是返回Promise

    ```javascript
    async function example() {
        return 1;
    }
    // 等价于
    function example() {
        return Promise.resolve(1);
    }
    ```

2. await只能在async函数内使用

    ```javascript
    // 错误
    function example() {
        const result = await fetchData(); // SyntaxError
    }

    // 正确
    async function example() {
        const result = await fetchData();
    }
    ```

3. 错误处理

    ```javascript
    async function example() {
        try {
            await riskyOperation();
        } catch (error) {
            // 必须处理错误，否则可能导致未捕获的Promise rejection
            console.error(error);
        }
    }
    ```
