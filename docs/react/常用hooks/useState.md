# useState

## 作用

在函数组件中添加状态

## 使用

### 基本数据类型

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个新的状态变量，我们将其称为“count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 数组

每次渲染时，`useState` 都返回相同的引用，所以每次渲染时，`setArr` 都会拿到相同的引用，所以不会触发重新渲染。

```jsx
const [arr, setArr] = useState([1,2,3]);

// 错误
setArr(arr.push(4)); 

// 正确
setArr([...arr, 4]);
```

### 对象

每次渲染时，`useState` 都返回相同的引用，所以每次渲染时，`setObj` 都会拿到相同的引用，所以不会触发重新渲染。

```jsx
const [obj, setObj] = useState({name: 'Tom'});

// 错误
setObj(obj.name = 'Jerry');

// 正确
setObj({...obj, name: 'Jerry'});
```

### 函数

如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数仅在初始渲染时被调用：

```jsx
const [obj, setObj] = useState(() => {
    return {name: 'Tom'}
});

```

### useState 更新机制

- `useState` 返回一个 state，以及更新这个 state 的函数。在初始渲染期间，返回的状态 (state) 与传入的初始 state 值相同。
- `useState` 不会将新的 state 与旧的 state 进行合并。而是直接替换它。如果新的 state 需要通过使用先前的 state 计算得出，可以使用函数式的 `setState` 方式。
- React 会保证在渲染期间调用 setState 的函数调用顺序是稳定的。然而，当更新状态时，React 将不会保证状态更新会同步触发 UI 的重新渲染。因此，在调用 `setState` 后立即读取 this.state 可能会得到之前的状态值。
- `setState` 函数会使用最新 state 更新组件。这确保了状态更新始终与渲染同步。
- `setState` 函数不会立即更新 state，而是调度一个更新。React 将在稍后某个时刻（当组件的渲染方法被调用时）应用更新。

## 注意事项

1. **惰性初始 state**

   如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数仅在初始渲染时被调用：

   ```jsx
   const [state, setState] = useState(() => {
     const initialState = someExpensiveComputation(props);
     return initialState;
   });
   ```

2. **更新 state**

   ```jsx
   setCount(count + 1);
   ```

   与 class 组件中的 `this.setState` 方法不同，`useState` 不会将新的 state 与旧的 state 进行合并。而是直接替换它。如果新的 state 需要通过使用先前的 state 计算得出，可以使用函数式的 `setState` 方式。

   ```jsx
   setCount((count) => count + 1);
   ```

3. **异步更新**
   React 会保证在渲染期间调用 setState 的函数调用顺序是稳定的。然而，当更新状态时，React 将不会保证状态更新会同步触发 UI 的重新渲染。因此，在调用 `setState` 后立即读取 this.state 可能会得到之前的状态值。

   ```jsx
   // 错误
   this.setState({counter: this.state.counter + 1});
   console.log(this.state.counter); // 0

   // 正确
   this.setState((prevState, props) => {
     console.log(prevState.counter); // 0
     return {counter: prevState.counter + 1};
   });
   console.log(this.state.counter); // 0
   ```

4. **多个状态**

   ```jsx
   const [age, setAge] = useState(42);
   const [fruit, setFruit] = useState('banana');
   const [todos, setTodos] = useState([{ text: 'Learn React' }]);
   ```

5. **状态提升**

   如果多个组件需要反映相同的数据变化，建议将共享状态提升到它们共同的父组件中去。然后，父组件可以通过 `props` 将状态传递到子组件中。

## 参考

[useState](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)
[React Hooks: useState](https://www.freecodecamp.org/news/react-hooks-usestate/)
