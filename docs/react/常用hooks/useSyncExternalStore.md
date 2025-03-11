# useSyncExternalStore

`useSyncExternalStore` 是 React 18 引入的一个新 Hook，用于订阅外部数据源并在数据发生变化时重新渲染组件。

## 使用场景

`useSyncExternalStore` 的主要用途是订阅外部数据源，并在数据发生变化时重新渲染组件。例如，你可以使用它来订阅 Redux store 或其他外部数据源，并在数据发生变化时更新组件的状态。

## 基本用法

```jsx
import { useSyncExternalStore } from 'react';

function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  const value = getSnapshot(); // 获取当前的外部数据源值
  const [state, setState] = useState(value); // 创建一个状态来存储外部数据源值

  useEffect(() => {
    const handleStoreChange = () => {
      setState(getSnapshot()); // 当外部数据源发生变化时，更新状态
    };

    subscribe(handleStoreChange); // 订阅外部数据源的变化
    return () => {
      unsubscribe(handleStoreChange); // 在组件卸载时取消订阅
    };
  }, [subscribe, getSnapshot]);

  return state; // 返回当前的外部数据源值
}
```

## 自定义hook

实现一个自定义 hook，用于订阅 window.history 并在数据发生变化时重新渲染组件：

```jsx
import { useSyncExternalStore } from 'react';

function useHistory() {
  const history = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('popstate', onStoreChange);
      window.addEventListener('hashchange', onStoreChange);
      return () => {
        window.removeEventListener('popstate', onStoreChange);
        window.removeEventListener('hashchange', onStoreChange);
      };
    },
    () => window.location.pathname,
    () => window.location.pathname
  );

  const push = (url) => {
    window.history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate')); // 目的是触发 onStoreChange 函数
  };

  const replace = (url) => {
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event('popstate')); 
  };

  return [history, push, replace];
  
}
```

## 注意事项

- `useSyncExternalStore` 只能在函数组件中使用。
- `useSyncExternalStore` 的 `subscribe` 函数应该返回一个取消订阅的函数。
- `useSyncExternalStore` 的 `getSnapshot` 函数应该返回当前的外部数据源值。
- `getSnapshot` 函数应该是一个纯函数，不应该有任何副作用。
- `useSyncExternalStore` 的 `getServerSnapshot` 函数是可选的，用于在服务器端渲染时获取初始状态。

## 总结

`useSyncExternalStore` 是 React 18 引入的一个新 Hook，用于订阅外部数据源并在数据发生变化时重新渲染组件。它可以用于订阅 Redux store 或其他外部数据源，并在数据发生变化时更新组件的状态。使用 `useSyncExternalStore` 可以简化订阅外部数据源的过程，并确保组件在数据发生变化时正确地重新渲染。
