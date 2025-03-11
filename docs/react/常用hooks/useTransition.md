# useTransition

`useTransition` 是 React 18 引入的一个新的 Hook，用于在渲染大量数据时提高性能。

`useTransition` 可以让你将某些更新标记为非紧急更新，从而在主线程繁忙时延迟这些更新，以避免阻塞用户界面。

## 语法

```jsx
const [isPending, startTransition] = useTransition();
```

## 参数

- `timeout`: 可选参数，用于指定非紧急更新的超时时间（以毫秒为单位）。默认为 5000 毫秒。

## 返回值

- `isPending`: 一个布尔值，表示是否有非紧急更新正在进行。
- `startTransition`: 一个函数，用于将某个更新标记为非紧急更新。

## 示例

```jsx
import React, { useState, useTransition } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 10000; i++) {
        newList.push(`Item ${i}`);
      }
      setList(newList);
    });
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Add Items</button>
      {isPending ? <div>Loading...</div> : null}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

在上面的示例中，当用户点击 "Add Items" 按钮时，会触发 `handleClick` 函数，该函数会使用 `startTransition` 函数将 `setList` 更新标记为非紧急更新。这样，在渲染大量数据时，React 会优先处理其他紧急更新，从而避免阻塞用户界面。同时，`isPending` 值会根据非紧急更新的状态进行更新，以显示加载状态。

## 注意事项

- `useTransition` 只能用于标记非紧急更新，不能用于标记紧急更新。
- `useTransition` 只能用于标记组件内部的更新，不能用于标记外部组件的更新。
- `useTransition` 只能用于标记组件内部的更新，不能用于标记组件外部的更新。

总之，`useTransition` 是一个非常有用的 Hook，可以帮助我们在渲染大量数据时提高性能，避免阻塞用户界面。
