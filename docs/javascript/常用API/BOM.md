
# BOM

<br />

BOM（Browser Object Model，浏览器对象模型）提供了与浏览器窗口和页面交互的方法和接口。它允许开发者访问和操纵浏览器窗口、地址栏、导航历史、屏幕信息等。

BOM 的核心对象是 window，几乎所有 BOM 的接口和方法都可以通过 window 对象访问

## 窗口对象（Window）

window 是 BOM 的核心对象。所有全局对象、函数和变量都是 window 对象的属性或方法。

常用属性

|属性名|描述|
|---|---|
|[window.innerWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth)|返回窗口的内部宽度（视口宽度）。|
|[window.innerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight) |返回窗口的内部高度（视口高度）。|
|[window.outerWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/outerWidth) |返回窗口的外部宽度（包括浏览器边框和工具栏）。|
|[window.outerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/outerHeight) |返回窗口的外部高度（包括浏览器边框和工具栏）。|
|[window.screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screen) |返回一个 Screen 对象，提供有关用户屏幕的信息。|
|[window.screenX](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenX) |返回窗口左上角相对于屏幕左侧的 X 坐标。|
|[window.screenY](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenY) |返回窗口左上角相对于屏幕顶部的 Y 坐标。|

常用方法

|方法名|描述|
|---|---|
|[window.alert()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert) |显示一个警告框。|
|[window.confirm()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm) |window.confirm()|
|[window.prompt()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) |显示一个提示框，返回用户输入的值。|
|[window.open()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) |打开一个新的浏览器窗口或标签页。|
|[window.close()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/close) |关闭当前窗口或标签页（通常需要用户触发）。|
|[window.scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo) |滚动窗口到指定的坐标位置。|
|[window.scrollBy()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy) |相对于当前位置滚动窗口。|

示例

```javascript
// 获取窗口的宽高
console.log(window.innerWidth);  // 视口宽度
console.log(window.innerHeight); // 视口高度

// 弹出警告框
window.alert("这是一个警告框！");

// 打开新窗口
window.open("https://www.example.com", "_blank");

// 滚动到页面顶部
window.scrollTo(0, 0);
```

## 导航对象（Navigator）

navigator 对象包含浏览器的信息，比如用户代理、在线状态等。

常用属性

|属性名|描述|
|---|---|
|[navigator.userAgent](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/userAgent) |返回浏览器的用户代理字符串。|
|[navigator.platform](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/platform) |返回浏览器运行的操作系统平台。|
|[navigator.language](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/language) |返回当前浏览器的语言设置（如 en-US）。|
|[navigator.onLine](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/onLine) |返回布尔值，表示浏览器是否处于在线状态。|

示例

```javascript
// 获取用户代理
console.log(navigator.userAgent);

// 检查是否在线
if (navigator.onLine) {
  console.log("当前在线");
} else {
  console.log("当前离线");
}
```

## 屏幕对象（Screen）

screen 对象提供有关用户屏幕的信息。

常用属性

|属性名|描述|
|---|---|
|[screen.width](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/width) |可用的屏幕高度（排除任务栏等）。屏幕的宽度（以像素为单位）。|
|[screen.height](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/height) |可用的屏幕高度（排除任务栏等）。屏幕的高度（以像素为单位）。|
|[screen.availWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availWidth) |可用的屏幕高度（排除任务栏等）。宽度（排除任务栏等）。|
|[screen.availHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availHeight) |可用的屏幕高度（排除任务栏等）。|
|[screen.colorDepth](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/colorDepth) |可用的屏幕高度（排除任务栏等）。返回屏幕的颜色深度（如 24 位）。|

示例

```javascript
// 获取屏幕宽高
console.log(`屏幕宽度: ${screen.width}`);
console.log(`屏幕高度: ${screen.height}`);
```

## 历史对象（History）

history 对象允许操作浏览器的历史记录。

常用方法

|方法名|描述|
|---|---|
|[history.back()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back) |加载历史记录中的前一个页面。|
|[history.forward()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward) |加载历史记录中的下一个页面。|
|[history.go(n)](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go) |加载历史记录中的指定页面（相对位置）。|

示例

```javascript
// 返回上一页
history.back();

// 前进到下一页
history.forward();

// 跳转到历史中的第 n 个页面
history.go(-2); // 后退两页
```

## 位置对象（Location）

location 对象表示当前页面的 URL 信息，并允许操作 URL。

常用属性

|属性名|描述|
|---|---|
|[location.href](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href) |返回或设置完整的 URL。|
|[location.protocol](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/protocol) |返回 URL 的协议（如 http:、https:）。|
|[location.host](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/host) |返回主机名和端口（如 example.com:80）。|
|[location.pathname](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/pathname) |返回路径部分（如 /path/page.html）。|
|[location.search](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search): |返回查询字符串（如 ?id=123）。|
|[location.hash](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash) |返回 URL 的片段标识符（如 #section1）。|

常用方法

|方法名|描述|
|---|---|
|[location.reload()](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload) |重新加载当前页面。|
|[location.assign(url)](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign) |加载新的页面。|
|[location.replace(url)](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/replace) |加载新的页面，并替换当前页面（不会记录到历史中）。|
|[location.toString()](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/toString) |返回完整的 URL 字符串。|

示例

```javascript
// 获取当前 URL
console.log(location.href);

// 跳转到新页面
location.assign("https://www.example.com");

// 重新加载页面
location.reload();
```

## 计时器（Timers）

BOM 提供了计时器方法用于延迟执行代码或定时执行。

常用方法

|方法名|描述|
|---|---|
|[setTimeout(func, delay)](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)|在指定的延迟后执行一次函数。|
|[setInterval(func, delay)](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)|每隔指定的延迟执行一次函数。|
|[clearTimeout(timeoutId)](https://developer.mozilla.org/zh-CN/docs/Web/API/clearTimeout)|取消由 setTimeout 设置的定时器。|
|[clearInterval(intervalId)](https://developer.mozilla.org/zh-CN/docs/Web/API/clearInterval)|取消由 setInterval 设置的定时器。|

示例

```javascript
// 延迟 2 秒打印消息
const timeoutId = setTimeout(() => {
  console.log("2 秒后执行");
}, 2000);

// 清除延迟
clearTimeout(timeoutId);

// 每隔 1 秒打印消息
const intervalId = setInterval(() => {
  console.log("每隔 1 秒执行一次");
}, 1000);

// 清除定时器
clearInterval(intervalId);
```

## 对话框（Dialogs）

BOM 提供了几种常见的对话框方法。

常用方法

|方法名|描述|
|---|---|
|[alert(message)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert) |显示一个带有消息和确定按钮的警告框。|
|[confirm(message)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm) |显示一个带有消息、确定和取消按钮的对话框，并返回用户选择的布尔值。|
|[prompt(message, defaultValue)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) |显示一个带有消息、输入框和确定取消按钮的对话框，并返回用户输入的字符串。|

示例

```javascript
// 警告框
alert("这是一个警告框！");

// 确认框
const isConfirmed = confirm("你确定要继续吗？");
console.log(isConfirmed ? "用户点击了确定" : "用户点击了取消");

// 提示框
const userInput = prompt("请输入你的名字：", "默认值");
console.log(`用户输入：${userInput}`);
```

## 事件监听（Event Listeners）

BOM 提供了事件监听功能，用于监听窗口的各种事件。

常用事件

|事件名|描述|
|---|---|
|[load](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event)|页面加载完成时触发。|
|[resize](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resize_event)|窗口大小改变时触发。|
|[beforeunload](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event) |页面卸载前触发。|
|[online](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/online_event) |页面卸载前触发。|
|[offline](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/offline_event) |页面卸载前触发。|

示例

```javascript
// 监听窗口大小变化
window.addEventListener('resize', () => {
  console.log("窗口大小改变了！");
});

// 监听页面卸载
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = ''; // 某些浏览器需要设置这个值
});
```
