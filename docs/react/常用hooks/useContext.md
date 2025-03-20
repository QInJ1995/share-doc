# useContext

`useContext` 是 React 提供的一个 Hook，用于在函数组件中订阅 React 上下文（Context）。它使我们能够在组件树中传递数据，而不必通过每一级组件手动传递 props。

## 基本用法

首先，我们需要创建一个 Context：

```jsx
import React, { createContext, useContext } from 'react';

// 创建一个 Context
const MyContext = createContext();

function MyProvider({ children }) {
  const value = "Hello, World!";
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

function MyComponent() {
  // 使用 useContext Hook 订阅 Context
  const value = useContext(MyContext);
  return <div>{value}</div>;
}

function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}

export default App;
```

在这个例子中，我们创建了一个 `MyContext`，并在 `MyProvider` 组件中使用 `MyContext.Provider` 提供了一个值。然后，在 `MyComponent` 组件中，我们使用 `useContext` Hook 订阅了 `MyContext`，并访问了提供的值。

## 复杂用法

`useContext` 也可以与更复杂的状态管理结合使用，例如使用 `useReducer`：

```jsx
import React, { createContext, useContext, useReducer } from 'react';

const CountContext = createContext();

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}

function Counter() {
  const { state, dispatch } = useContext(CountContext);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;
```

在这个例子中，我们使用 `useReducer` 管理计数器的状态，并通过 `CountContext` 提供给子组件。`Counter` 组件使用 `useContext` 订阅 `CountContext`，并能够访问和更新计数器的状态。

## 注意事项

- `useContext` 只能用于函数组件或自定义 Hook 中。
- 确保 `useContext` 订阅的 Context 在组件树中有对应的 `Provider`。

## 总结

- `useContext` 用于在函数组件中订阅 React 上下文。
- 它使我们能够在组件树中传递数据，而不必通过每一级组件手动传递 props。
- `useContext` 可以与其他 Hook（如 `useReducer`）结合使用，实现更复杂的状态管理。

通过 `useContext`，我们可以更方便地在组件树中共享数据，从而简化组件间的通信。

## 参考

- [React Docs - useContext](https://react.dev/reference/react/useContext)
- [React Docs - Context](https://react.dev/reference/react/Context)
