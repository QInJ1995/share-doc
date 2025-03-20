# useRef

`useRef` 是 React 提供的一个 Hook，用于创建一个可以在组件的整个生命周期内保持不变的引用。它通常用于访问 DOM 元素或存储任何可变值，而不会触发组件重新渲染。

## 基本用法

### 访问 DOM 元素

`useRef` 最常见的用法是访问 DOM 元素。以下是一个简单的例子：

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

在这个例子中，我们使用 `useRef` 创建了一个 `inputEl` 引用，并将其赋值给 `<input>` 元素的 `ref` 属性。点击按钮时，我们可以通过 `inputEl.current` 访问到这个 DOM 元素并调用其 `focus` 方法。

### 保存可变值

`useRef` 也可以用于保存任何可变值，而不会触发组件重新渲染。例如：

```jsx
import React, { useRef, useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Count:', countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

在这个例子中，我们使用 `useRef` 创建了一个 `countRef` 引用，并在 `useEffect` 中同步它的值。这样，我们可以在定时器回调中访问最新的 `count` 值，而不会因为 `count` 的变化而重新创建定时器。

## 高级用法

### 与 useEffect 结合使用

`useRef` 可以与 `useEffect` 结合使用来实现更复杂的逻辑。例如，我们可以使用 `useRef` 来保存前一个渲染周期的值：

```jsx
import React, { useRef, useEffect } from 'react';

function PreviousValueExample({ value }) {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const prevValue = prevValueRef.current;

  return (
    <div>
      <p>Current Value: {value}</p>
      <p>Previous Value: {prevValue}</p>
    </div>
  );
}
```

在这个例子中，我们使用 `useRef` 保存了前一个渲染周期的 `value` 值，并在组件中显示当前值和前一个值。

## 注意事项

- `useRef` 返回的对象在组件的整个生命周期内保持不变。
- 修改 `useRef` 返回的对象不会触发组件重新渲染。
- `useRef` 适用于需要保持引用的场景，例如访问 DOM 元素或保存可变值。

## 总结

- `useRef` 可以用于访问 DOM 元素。
- `useRef` 可以用于保存任何可变值，而不会触发组件重新渲染。
- `useRef` 创建的引用在组件的整个生命周期内保持不变。

通过 `useRef`，我们可以更方便地处理需要保持引用的场景，而不必担心组件的重新渲染问题。

## 参考

- [React Docs - useRef](https://react.dev/reference/react/useRef)
- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
