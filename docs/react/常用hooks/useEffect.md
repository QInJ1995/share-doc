# useEffect

useEffect 是一个副作用钩子，用于在函数组件中执行副作用操作。副作用操作包括但不限于数据获取、订阅事件、手动更改 DOM 等。

## 基本用法

useEffect 的基本语法如下：

```jsx
useEffect(() => {
  // 副作用操作
  return () => {
    // 清理操作
  };
}, [依赖项]);
```

useEffect 接受两个参数：一个是副作用操作函数，另一个是依赖项数组。副作用操作函数会在组件渲染后执行，而清理操作函数会在组件卸载或依赖项发生变化时执行。依赖项数组用于指定副作用操作函数的依赖项，当依赖项发生变化时，副作用操作函数会重新执行。

下面是一个使用 useEffect 的示例：

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
```

在这个示例中，我们使用 useEffect 来更新页面标题。每次点击按钮时，count 的值会增加，useEffect 会重新执行，并更新页面标题。当组件卸载时，useEffect 也会执行清理操作，将页面标题恢复为默认值。

需要注意的是，useEffect 的依赖项数组是一个可选参数，如果不提供依赖项数组，副作用操作函数会在每次组件渲染后执行。如果提供了依赖项数组，副作用操作函数只会在依赖项发生变化时执行。这样可以避免不必要的副作用操作，提高组件的性能。

另外，useEffect 还可以返回一个清理操作函数，用于在组件卸载或依赖项发生变化时执行清理操作。例如，如果我们在 useEffect 中订阅了一个事件，可以在清理操作函数中取消订阅，以避免内存泄漏。

```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
});
```

在这个示例中，我们订阅了一个事件，并在清理操作函数中取消订阅。这样可以确保在组件卸载或依赖项发生变化时，事件订阅会被正确地取消，避免内存泄漏。

总结来说，useEffect 是一个非常有用的钩子，可以帮助我们在函数组件中执行副作用操作。通过合理使用 useEffect，我们可以提高组件的性能，避免内存泄漏，并实现更复杂的交互效果。

## 触发时机

useEffect 的触发时机与类组件中的生命周期函数类似，但有一些区别。useEffect 会在组件渲染后执行，并且会在依赖项发生变化时重新执行。如果依赖项数组为空，useEffect 只会在组件首次渲染后执行一次。

卸载组件时，useEffect 执行的清理操作函数会被调用，用于清理副作用操作产生的副作用。例如，如果我们在 useEffect 中订阅了一个事件，可以在清理操作函数中取消订阅，以避免内存泄漏。

## 清理操作

useEffect 可以返回一个清理操作函数，用于在组件卸载或依赖项发生变化时执行清理操作。清理操作函数会在副作用操作函数执行前执行，用于清理副作用操作产生的副作用。例如，如果我们在 useEffect 中订阅了一个事件，可以在清理操作函数中取消订阅，以避免内存泄漏。

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;

    return () => {
      document.title = 'React App';
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
```

在这个示例中，我们使用 useEffect 来更新页面标题。每次点击按钮时，count 的值会增加，useEffect 会重新执行，并更新页面标题。当组件卸载时，useEffect 也会执行清理操作，将页面标题恢复为默认值。

需要注意的是，清理操作函数只会在组件卸载或依赖项发生变化时执行，不会在每次副作用操作函数执行时执行。这样可以避免不必要的清理操作，提高组件的性能。

## 进阶用法

useEffect 还有一些高级用法，可以帮助我们更好地管理副作用操作。

1. 使用多个 useEffect

    我们可以使用多个 useEffect 来管理不同的副作用操作。例如，我们可以使用一个 useEffect 来订阅事件，另一个 useEffect 来取消订阅。

    ```jsx
        useEffect(() => {
            const subscription = props.source.subscribe();
            return () => {
                subscription.unsubscribe();
            };
        });

        useEffect(() => {
            document.title = `You clicked ${count} times`;
        });
    ```

2. 使用空依赖项数组

    如果我们不想在依赖项发生变化时执行副作用操作，可以将依赖项数组设置为空数组。这样副作用操作函数只会在组件渲染后执行一次。

    ```jsx
            useEffect(() => {
            // 副作用操作
        }, []);
    ```

3. 使用 async/await

    如果我们在副作用操作函数中执行异步操作，可以使用 async/await 来简化代码。

    ```jsx
        useEffect(async () => {
            const data = await fetchData();
        // 处理数据
        }, []);
    ```

4. 使用 cleanup 函数

    如果我们在副作用操作函数中执行异步操作，可以使用 cleanup 函数来取消操作。

    ```jsx
        useEffect(() => {
            const subscription = props.source.subscribe();
            return () => {
                subscription.unsubscribe();
            };
        }, [props.source]);

        useEffect(() => {
            const timer = setInterval(() => {
                // 执行操作
            }, 1000);

        return () => {
            clearInterval(timer);
        };
        }, []);
    ```

    在这个示例中，我们使用 cleanup 函数来取消订阅和定时器。这样可以确保在组件卸载或依赖项发生变化时，操作会被正确地取消，避免内存泄漏。

## 注意事项

1. useEffect 的依赖项数组是一个可选参数，如果不提供依赖项数组，副作用操作函数会在每次组件渲染后执行。
2. useEffect 的清理操作函数会在组件卸载或依赖项发生变化时执行，用于执行清理操作，例如取消订阅、清除定时器等。
3. useEffect 的依赖项数组中的依赖项必须是组件的 state 或 props，不能是其他变量。如果需要依赖其他变量，可以将该变量作为 useEffect 的参数。
4. useEffect 的副作用操作函数应该是一个纯函数，不能修改组件的 state 或 props。如果需要修改组件的 state 或 props，应该使用 setState 或 useState 等钩子函数。
5. useEffect 的副作用操作函数应该尽量简单，避免执行复杂的操作，例如网络请求、文件读写等。如果需要执行复杂的操作，应该将操作放在组件外部，例如使用 async/await 或 Promise 等。
6. useEffect 的副作用操作函数应该尽量幂等，即多次执行副作用操作函数的结果应该相同。如果副作用操作函数不是幂等的，可能会导致组件状态不一致或性能问题。
7. useEffect 的副作用操作函数应该尽量在组件渲染后执行，避免阻塞组件渲染。如果需要执行异步操作，应该使用 async/await 或 Promise 等，并在操作完成后更新组件的 state 或 props。
8. useEffect 的副作用操作函数应该尽量在组件卸载前执行，避免执行清理操作时出现错误。如果需要在组件卸载后执行清理操作，应该使用 componentWillUnmount 生命周期方法。

## 参考

- [React 官方文档 - useEffect](https://reactjs.org/docs/hooks-effect.html)
- [React Hooks: useEffect](https://daveceddia.com/react-hooks/)
