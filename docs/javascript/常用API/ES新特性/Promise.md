# Promise

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是ES6引入的异步编程解决方案，用于处理异步操作。它代表一个异步操作的最终完成（或失败）及其结果值。

## 基本概念

Promise有三种状态：

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

## 基本语法

```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    if (/* 操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
});
```

## 基本用法

### 1. 创建Promise

```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: 'John' };
            resolve(data);
            // 或者
            // reject(new Error('Failed to fetch data'));
        }, 1000);
    });
};
```

### 2. 使用Promise

```javascript
fetchData()
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Completed');
    });
```

## Promise方法

### 1. Promise.all()

并行执行多个Promise，所有Promise都成功时返回结果数组，任何一个失败则返回第一个失败的结果。

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log(values); // [1, 2, 3]
    })
    .catch(error => {
        console.error(error);
    });
```

### 2. Promise.race()

返回最快完成的Promise的结果（无论成功或失败）。

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 500));
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 100));

Promise.race([promise1, promise2])
    .then(value => {
        console.log(value); // 2
    });
```

### 3. Promise.allSettled()

等待所有Promise完成（无论成功或失败），返回所有Promise的结果。

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('error');

Promise.allSettled([promise1, promise2])
    .then(results => {
        console.log(results);
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: 'error' }
        // ]
    });
```

## 实际应用场景

### 1. 异步请求

```javascript
function fetchUser(id) {
    return fetch(`https://api.example.com/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));
```

### 2. 图片加载

```javascript
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
    });
}

loadImage('https://example.com/image.jpg')
    .then(img => document.body.appendChild(img))
    .catch(error => console.error(error));
```

### 3. 超时处理

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

Promise.race([
    fetch('https://api.example.com/data'),
    timeout(5000)
])
    .then(response => response.json())
    .catch(error => console.error(error));
```

## 最佳实践

1. 总是处理Promise的错误

    ```javascript
    fetchData()
        .then(handleData)
        .catch(handleError); // 不要忘记错误处理
    ```

2. 避免Promise嵌套

    ```javascript
    // 不好的写法
    fetchData()
        .then(data => {
            processData(data)
                .then(result => {
                    // 嵌套的Promise
                });
        });

    // 好的写法
    fetchData()
        .then(data => processData(data))
        .then(result => {
            // 扁平化的Promise链
        });
    ```

3. 使用async/await简化代码

    ```javascript
    async function getData() {
        try {
            const data = await fetchData();
            const result = await processData(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    ```

## 注意事项

1. Promise一旦状态改变，就不能再变

    ```javascript
    const promise = new Promise((resolve, reject) => {
        resolve(1);
        reject(new Error('error')); // 无效
    });
    ```

2. Promise的错误会一直传递到被捕获为止

    ```javascript
    Promise.reject(new Error('error'))
        .then(() => {}) // 跳过
        .then(() => {}) // 跳过
        .catch(error => console.error(error)); // 在这里捕获
    ```

3. Promise.all()和Promise.race()的区别

   - Promise.all()：等待所有Promise完成
   - Promise.race()：只等待第一个完成的Promise
