# XMLHttpRequest

## XMLHttpRequest 对象

XMLHttpRequest 对象用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

### 创建 XMLHttpRequest 对象

XMLHttpRequest 对象用于与服务器交换数据。您可以通过 XMLHttpRequest 对象向服务器发送请求，并获取服务器响应，而不重新加载页面。

```javascript
var xhttp = new XMLHttpRequest();
```

### 向服务器发送请求

```javascript
xhttp.open(method, url, async, user, password);
```

| 参数       | 描述                                                                                   |
| ---------- | -------------------------------------------------------------------------------------- |
| method     | 必需。请求的类型；GET 或 POST                                                             |
| url        | 必需。服务器上的文件位置                                                                |
| async      | 可选。true（异步）或 false（同步）                                                     |
| user       | 可选。用于认证的用户名                                                                 |
| password   | 可选。用于认证的密码                                                                   |

```javascript
xhttp.open("GET", "demo_get.asp", true);
```

### 发送请求

```javascript
xhttp.send();
```

### 请求状态

| 状态 | 描述                                                                                     |
| ---- | ---------------------------------------------------------------------------------------- |
| 0    | 请求未初始化（请求还未发送）                                                             |
| 1    | 服务器连接已建立（正在发送请求）                                                         |
| 2    | 请求已接收（正在处理请求）                                                               |
| 3    | 请求处理中（通常现在可以从响应中获取部分数据）                                           |
| 4    | 请求已完成，且响应已就绪（响应已接收完毕）                                               |

```javascript
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML =
      this.responseText;
  }
};
```

### XMLHttpRequest 对象属性

| 属性             | 描述                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| [onreadystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readystatechange_event) | 定义当 readyState 属性发生变化时被调用的函数                                             |
| [readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) | 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪 |
| [response](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/response) | 返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体（response entity body） |
| [responseType](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType) | 一个用于定义响应类型的枚举值（enumerated value） |
| [responseText](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText) | 以字符串返回响应数据 |
| [responseXML](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseXML) | 以 XML 数据返回响应数据 |
| [responseURL](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseURL) | 返回经过序列化（serialized）的响应 URL，如果该 URL 为空，则返回空字符串 |
| [status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status) | 200: "OK" 404: 未找到页面 |
| [statusText](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/statusText) | 返回状态文本（比如 "OK" 或 "Not Found"）|

### XMLHttpRequest 对象方法

| 方法             | 描述                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| [abort()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort) | 取消当前请求 |
| [getAllResponseHeaders()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders) | 返回头部信息 |
| [getResponseHeader()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader) | 返回特定的头部信息 |
| [open()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) | 规定请求的类型、URL 以及是否异步处理请求 |
| [overrideMimeType()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType) | 强制指定 MIME 类型 |
| [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send) | 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回 |
| [setRequestHeader()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader) | 向请求添加 HTTP 头 |

### XMLHttpRequest 对象事件

| 事件             | 描述                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| [abort](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event) | 当请求操作被中止时触发 |
| [error](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event) | 当请求遇到错误时触发 |
| [load](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event) | 当请求成功完成时触发 |
| [loadend](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/loadend_event) | 当请求完成时触发，无论成功或失败 |
| [loadstart](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/loadstart_event) | 当请求开始时触发 |
| [progress](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/progress_event) | 当请求接收到数据时触发 |
| [timeout](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout_event) | 当请求超时时触发 |
| [readystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readystatechange_event) | 当 `readyState` 属性发生变化时触发 |

## 应用

### ajax

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/github');
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```
