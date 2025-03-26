# keep-alive

`keep-alive` 是 Vue 提供的内置组件，用于缓存动态组件或路由组件，提升性能并保留组件的状态。

## `keep-alive` 的基本概念

`keep-alive` 通过缓存组件实例，避免组件重复销毁和重建，适用于以下场景：

- 动态组件切换。
- 路由组件切换。

## Vue 2 中的 `keep-alive`

### 基本用法

在 Vue 2 中，`keep-alive` 可以包裹动态组件或路由组件。

#### 动态组件

```vue
<template>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  }
};
</script>
```

#### 路由组件

```vue
<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
```

### 配置属性

1. **`include`**：字符串或正则表达式，匹配需要缓存的组件。
2. **`exclude`**：字符串或正则表达式，匹配不需要缓存的组件。
3. **`max`**：数字，指定最多缓存的组件实例数量。

#### 示例

```vue
<keep-alive include="ComponentA,ComponentB" exclude="ComponentC" max="10">
  <component :is="currentComponent"></component>
</keep-alive>
```

### 生命周期钩子

1. **`activated`**：组件从缓存中激活时调用。
2. **`deactivated`**：组件被缓存时调用。

#### 示例

```javascript
export default {
  activated() {
    console.log('组件已激活');
  },
  deactivated() {
    console.log('组件已缓存');
  }
};
```

## Vue 3 中的 `keep-alive`

### 基本用法

Vue 3 中的 `keep-alive` 用法与 Vue 2 基本一致。

#### 动态组件

```vue
<template>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const currentComponent = ref('ComponentA');
    return { currentComponent };
  }
};
</script>
```

#### 路由组件

```vue
<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
```

### 配置属性

Vue 3 中的 `include`、`exclude` 和 `max` 属性与 Vue 2 相同。

#### 示例

```vue
<keep-alive :include="['ComponentA', 'ComponentB']" :exclude="['ComponentC']" :max="10">
  <component :is="currentComponent"></component>
</keep-alive>
```

### 生命周期钩子

Vue 3 中的 `activated` 和 `deactivated` 钩子与 Vue 2 相同，但需要在 `setup` 中使用。

#### 示例

```javascript
import { onActivated, onDeactivated } from 'vue';

export default {
  setup() {
    onActivated(() => {
      console.log('组件已激活');
    });

    onDeactivated(() => {
      console.log('组件已缓存');
    });
  }
};
```

## Vue 2 和 Vue 3 的差异

1. **响应式 API**：Vue 3 中推荐使用组合式 API（如 `ref` 和 `onActivated`）处理 `keep-alive` 的逻辑。
2. **性能优化**：Vue 3 对 `keep-alive` 的内部实现进行了优化，性能更高。
3. **属性绑定**：Vue 3 中可以使用动态绑定（如 `:include` 和 `:exclude`）。

## `keep-alive` 的最佳实践

1. **合理使用缓存**：仅对需要频繁切换的组件使用 `keep-alive`，避免占用过多内存。
2. **结合路由使用**：在路由组件中使用 `keep-alive`，可以保留页面状态。
3. **控制缓存数量**：通过 `max` 属性限制缓存的组件实例数量，防止内存溢出。

#### 示例：结合路由和缓存控制

```vue
<template>
  <keep-alive :max="5">
    <router-view></router-view>
  </keep-alive>
</template>
```

## 总结

1. `keep-alive` 是 Vue 提供的强大工具，用于缓存组件实例，提升性能。
2. Vue 2 和 Vue 3 的用法基本一致，但 Vue 3 提供了更灵活的组合式 API。
3. 合理使用 `keep-alive` 可以显著提升应用的用户体验和性能。

通过掌握 `keep-alive` 的使用方法，可以更高效地管理组件的状态和性能。

## 参考

- [Vue2 - keep-alive](https://v2.cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive)
- [Vue3 - keep-alive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)
