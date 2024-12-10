# MutationObserver

## 简介

[MutationObserver](http://127.0.0.1:5174/share-doc/docs/javascript/%E5%B8%B8%E7%94%A8API/MutationObserver) 是一个内置的 JavaScript 对象，用于监视 DOM 树的变化。它允许开发者在 DOM 树发生变化时执行特定的回调函数，从而实现对 DOM 的实时监控和响应。

MutationObserver 的基本用法如下：

```javascript
// 创建一个 MutationObserver 实例
const observer = new MutationObserver(callback);

// 配置观察选项
const config = {
  attributes: true, // 监视属性变化
  childList: true, // 监视子节点变化
  subtree: true, // 监视整个子树的变化
}

// 开始观察目标节点
observer.observe(targetNode, config);

// 停止观察
observer.disconnect();
```

在上面的代码中，我们首先创建了一个 MutationObserver 实例，并传入一个回调函数。然后，我们配置了观察选项，指定了要监视的属性和子节点变化。最后，我们使用 `observe` 方法开始观察目标节点。当目标节点的属性或子节点发生变化时，回调函数将被调用。

## 使用场景

MutationObserver 可以用于多种场景，例如：

- 监视 DOM 树的变化，以便在特定事件发生时执行相应的操作。
- 实现实时搜索功能，当用户输入搜索关键字时，自动更新搜索结果。
- 动态加载内容，当页面加载完成后，自动加载新的内容。

## 示例

下面是一个简单的示例，演示了如何使用 MutationObserver 监视 DOM 树的变化：

```javascript
// 创建一个 MutationObserver 实例
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    }
    else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
});

// 配置观察选项
const config = { attributes: true, childList: true, subtree: true };

// 开始观察目标节点
observer.observe(document.body, config);
```

在上面的代码中，我们创建了一个 MutationObserver 实例，并传入一个回调函数。回调函数会在 DOM 树发生变化时被调用。我们配置了观察选项，指定了要监视的属性和子节点变化。最后，我们使用 `observe` 方法开始观察整个文档的 body 节点。当 body 节点的属性或子节点发生变化时，回调函数将被调用，并输出相应的信息。

## 总结

MutationObserver 是一个强大的工具，可以帮助我们实时监控和响应 DOM 树的变化。通过配置观察选项，我们可以监视特定的属性和子节点变化，并在变化发生时执行相应的操作。MutationObserver 可以用于多种场景，例如实时搜索、动态加载内容等。
