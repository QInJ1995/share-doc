# useLayoutEffect

useLayoutEffect 是 React 16.8 引入的一个 Hook，它的工作原理和 useEffect 类似，但是有一些重要的区别。

useLayoutEffect 会在所有 DOM 变更之后同步调用 effect。这确保了 DOM 已经更新，并且可以在 effect 中读取最新的 DOM 值。这对于需要在 DOM 更新后立即读取布局信息的情况非常有用，例如测量元素的大小或位置。

useLayoutEffect 的使用方式与 useEffect 类似，它接受一个 effect 函数和一个依赖数组作为参数。effect 函数会在组件渲染后同步调用，并且可以在其中读取最新的 DOM 值。如果依赖数组中的值发生变化，effect 函数将会重新执行。

## 基本使用

```jsx
import React, { useLayoutEffect, useState } from 'react';

function MyComponent() {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = document.getElementById('my-element');
    setHeight(element.offsetHeight);
  }, []);

  return (
    <div>
      <div id="my-element">Hello, world!</div>
      <div>Element height: {height}px</div>
    </div>
  );
}
```

在上面的例子中，useLayoutEffect 会在组件渲染后同步调用，并且读取了元素的高度。这个高度将会立即更新，并且可以在组件中立即使用。

需要注意的是，由于 useLayoutEffect 是同步调用的，因此它可能会阻塞浏览器的渲染。因此，应该谨慎使用 useLayoutEffect，并且只在必要时使用它。

## 与 useEffect 的区别

useLayoutEffect 和 useEffect 的主要区别在于它们调用 effect 的时机。useEffect 是在组件渲染后异步调用，而 useLayoutEffect 是在组件渲染后同步调用。

useEffect 是在浏览器完成布局和绘制之后异步调用的，因此它不会阻塞浏览器的渲染。这对于需要在 DOM 更新后读取布局信息的情况非常有用，但是它可能会在浏览器完成绘制之前执行，因此可能会导致一些性能问题。

useLayoutEffect 是在浏览器完成布局和绘制之前同步调用的，因此它可以在 DOM 更新后立即读取最新的布局信息。这对于需要在 DOM 更新后立即读取布局信息的情况非常有用，但是它可能会阻塞浏览器的渲染，因此应该谨慎使用。

## 应用场景

- 需要同步读取最新的 DOM 布局信息，例如测量元素的大小或位置。
- 需要在 DOM 更新后立即读取最新的布局信息，例如需要在 DOM 更新后立即读取元素的高度或宽度。
- 防止闪烁，例如需要在 DOM 更新后立即读取最新的布局信息，并且需要在 DOM 更新后立即更新组件的状态。
- 模拟 componentDidMount、componentDidUpdate、componentWillUnmount 例如需要在组件挂载或更新后执行一些副作用操作。

总的来说，useLayoutEffect 是一个非常有用的 Hook，它可以在 DOM 更新后立即读取最新的布局信息。但是，由于它是同步调用的，因此应该谨慎使用，并且只在必要时使用它。
