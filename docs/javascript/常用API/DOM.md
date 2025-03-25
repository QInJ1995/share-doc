# DOM

DOM（文档对象模型，Document Object Model）是 HTML 和 XML 文档的编程接口，它将文档表示为一个结构化的节点树，开发者可以通过 DOM 操作文档的内容、结构和样式。

DOM 的核心是 document 对象，它表示整个 HTML 或 XML 文档。通过 DOM API，开发者可以动态地添加、删除、修改文档中的内容和元素。

## DOM 核心概念

### DOM 树结构

DOM 将文档表示为一个树状结构，主要包括以下几种节点：

|节点类型|描述|示例|
|---|---|---|
|Document|表示整个文档|document|
|Element|表示文档中的元素|\<div\>、\<p\>|
|Text|表示元素中的文本内容|Hello World|
|Attribute|表示元素的属性|class="container"|
|Comment|表示文档中的注释|\<!-- This is a comment --\>|

### 常见 DOM 属性

|属性名|描述|
|---|---|
|[nodeName](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName)|返回节点名称（如 DIV、P）。|
|[nodeType](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)|返回节点类型（1: 元素节点，3: 文本节点）。|
|[childNodes](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)|返回所有子节点（包括文本和注释）。|
|[firstChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild)|返回第一个子节点。|
|[lastChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild)|返回最后一个子节点。|
|[parentNode](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)|返回父节点。|
|[nextSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling)|返回下一个兄弟节点。|
|[previousSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling)|返回上一个兄弟节点。|

## 节点和元素操作

DOM 操作的核心是 节点 和 元素。

获取文档根节点

```javascript
console.log(document.documentElement); // 获取 <html> 元素
console.log(document.body);           // 获取 <body> 元素
console.log(document.head);           // 获取 <head> 元素
```

## 查找 DOM 元素

DOM 提供了多种方法查找元素。

常用方法

|方法|描述|返回值|
|---|---|---|
|[getElementById()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)|根据 ID 获取元素。|单个元素|
|[getElementsByClassName()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName)|根据类名获取元素。|HTMLCollection（集合）|
|[getElementsByTagName()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)|根据标签名获取元素。|HTMLCollection（集合）|
|[querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)|根据 CSS 选择器获取第一个匹配的元素。|单个元素|
|[querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)|根据 CSS 选择器获取所有匹配的元素。|NodeList（集合）|

示例

```javascript
// ID 查找
const elementById = document.getElementById("myId");
console.log(elementById);

// 类名查找
const elementsByClass = document.getElementsByClassName("myClass");
console.log(elementsByClass);

// 标签名查找
const elementsByTag = document.getElementsByTagName("div");
console.log(elementsByTag);

// CSS 选择器查找
const firstElement = document.querySelector(".myClass"); // 第一个匹配的元素
const allElements = document.querySelectorAll(".myClass"); // 所有匹配的元素
console.log(firstElement, allElements);
```

## 修改 DOM 元素

修改元素内容

|属性名|描述|
|---|---|
|[innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)|设置/获取元素的 HTML 内容。|
|[textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)| 设置/获取元素的文本内容（推荐）。|
|[innerText](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/innerText)|设置/获取元素的纯文本内容（不包含 HTML 标签）。|

示例

```javascript
const element = document.getElementById("myId");

// 修改 HTML 内容
element.innerHTML = "<strong>新内容</strong>";

// 修改纯文本内容
element.innerText = "纯文本内容";

// 修改文本内容（推荐）
element.textContent = "这是新文本内容";
```

## 事件处理

DOM 提供了事件处理机制，用于监听用户交互。

添加事件监听

|方法|描述|
|---|---|
|[addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)|添加事件监听器。|
|[removeEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)|移除事件监听器。|

示例

```javascript
const button = document.getElementById("myButton");

// 添加点击事件监听
button.addEventListener("click", () => {
  console.log("按钮被点击了！");
});

// 移除点击事件监听
button.removeEventListener("click", listener);
```

## 属性操作

设置或获取属性

|方法|描述|
|---|---|
|[getAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute)|获取元素的属性值。|
|[setAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)|设置元素的属性值。|
|[removeAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttribute)|移除元素的属性。|

示例

```javascript
const element = document.getElementById("myId");

// 获取属性
console.log(element.getAttribute("class"));

// 设置属性
element.setAttribute("data-info", "some-data");

// 移除属性
element.removeAttribute("data-info");
```

## 类名操作

classList 是一个操作元素类名的现代接口。

常用方法

|方法|描述|
|---|---|
|[add()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element.classList/add)|添加一个或多个类名。|
|[remove()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element.classList/remove)|移除一个或多个类名。|
|[toggle()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element.classList/toggle)|切换一个类名。|
|[contains()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element.classList/contains)|检查元素是否包含指定的类名。|

示例

```javascript
const element = document.getElementById("myId");

// 添加类名
element.classList.add("new-class");

// 移除类名
element.classList.remove("old-class");

// 切换类名
element.classList.toggle("active");

// 检查类名
console.log(element.classList.contains("active"));
```

## 样式操作

### 修改内联样式

使用 style 属性可以设置元素的内联样式。

```javascript
const element = document.getElementById("myId");

// 设置样式
element.style.color = "red";
element.style.fontSize = "20px";

// 获取样式
console.log(element.style.color);
```

### 获取计算样式

使用 getComputedStyle 方法可以获取元素的计算样式（包括非内联样式）。

```javascript
const element = document.getElementById("myId");
const computedStyles = window.getComputedStyle(element);

// 获取计算样式
console.log(computedStyles.color);
```

## 创建和删除节点

### 创建节点

|方法|描述|
|---|---|
|[createElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)|创建一个新的元素节点。|
|[createTextNode()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTextNode)|创建一个新的文本节点。|
|[cloneNode()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode)|克隆一个节点。|

示例

```javascript
const newElement = document.createElement("div");
const newText = document.createTextNode("Hello, World!");

// 将文本节点添加到新元素中
newElement.appendChild(newText);

// 克隆节点
const clonedElement = newElement.cloneNode(true);
```

### 插入节点

|方法|描述|
|---|---|
|[appendChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)|将一个节点添加到指定节点的子节点列表的末尾。|
|[insertBefore()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)|将一个节点插入到指定节点的子节点列表中的某个位置。|

示例

```javascript
const parentElement = document.getElementById("parent");
const newElement = document.createElement("div");

// 将新元素添加到父元素的子节点列表的末尾
parentElement.appendChild(newElement);

// 将新元素插入到父元素的子节点列表中的某个位置
parentElement.insertBefore(newElement, parentElement.firstChild);
```

### 删除节点

|方法|描述|
|---|---|
|[removeChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild)|从指定节点中删除一个子节点。|

示例

```javascript
const newElement = document.createElement("div");

// 删除节点
parent.removeChild(newElement);
```

## 遍历 DOM 树

|属性/方法|描述|
|---|---|
|[parentNode](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)|获取父节点。|
|[childNodes](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)|获取所有子节点（包括文本和注释）。|
|[children](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/children)|获取所有子元素（不包括文本和注释）。|
|[firstChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild)|获取第一个子节点。|
|[lastChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild)|获取最后一个子节点。|
|[nextSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling)|获取下一个兄弟节点。|
|[previousSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling)|获取上一个兄弟节点。|

示例

```javascript
const parent = document.getElementById("parent");

// 遍历所有子元素
for (const child of parent.children) {
  console.log(child);
}

// 获取第一个和最后一个子节点
console.log(parent.firstChild);
console.log(parent.lastChild);
```
