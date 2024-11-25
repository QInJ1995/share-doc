# keep-alive

<br />
keep-alive 是 Vue 的一个内置抽象组件，通常用于缓存动态组件或路由组件。被 keep-alive 包裹的组件在切换时不会被销毁，而是会被缓存下来，下一次切换回这个组件时，会直接复用之前的实例，保持其状态。

## 示例

```vue
<template>
  <keep-alive>
    <component :is="curComponent"></component>
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      curComponent: 'testComponent'
    };
  }
};
</script>
```

在这个例子中，testComponent 在被切换时不会被销毁，而是会被缓存，当再次展示时，状态和数据都保持不变。

## 配置选项

keep-alive 提供了几个有用的属性和钩子：

1. include 和 exclude： 用于控制哪些组件需要缓存，支持字符串、正则表达式或数组。

```javascript
<keep-alive include="ComponentA, ComponentB" exclude="ComponentC">
  <router-view></router-view>
</keep-alive>
```

2. max： 用于指定缓存的组件数量，当超出这个数量时，最久未使用的组件实例将被销毁。

```javascript
<keep-alive :max="10">
  <router-view></router-view>
</keep-alive>
```

## 生命周期钩子

keep-alive 还引入了两个新的组件生命周期钩子，用于处理缓存组件：

- activated：当组件被激活时触发（即从缓存中恢复时）。
- deactivated：当组件被停用时触发（即被缓存时）。

```javascript
export default {
  activated() {
    console.log('组件被激活了');
  },
  deactivated() {
    console.log('组件被缓存了');
  }
};
```

## 适用场景

1. 多页签（Tab）切换：在复杂的表单或多步操作场景中，用户可能会频繁切换页面。如果使用 keep-alive，切换回来的页面能保留之前输入的数据或操作的状态。
2. 路由缓存：在 Vue 项目中，常常会在路由切换时希望保持组件状态，如商品详情页、搜索结果页等。

::: tip 说明

1. 我们需要适度使用，虽然 keep-alive 可以提升性能，但并不是所有组件都适合缓存。如果组件需要频繁更新数据或依赖实时性，缓存反而会导致不必要的复杂性。
2. 最好是配合路由使用，在 Vue Router 中，使用 keep-alive 可以避免在切换路由时重新加载组件数据，提升用户体验。
3. 如果项目中有大量需要缓存的页面或组件，可以结合 max 和 exclude 来更好地管理缓存。
:::

## 原理

简单来说，keep-alive 是通过缓存组件实例来避免组件重复创建和销毁，达到性能优化的目的。它通过将已缓存的组件存储在内存中，当组件被重新激活时，直接复用之前缓存的实例，而不是重新创建。

核心原理步骤：

1. 缓存实例：当组件被第一次加载时，keep-alive 会将组件的实例缓存起来。
2. 组件复用：当你切换到一个已经被缓存的组件时，keep-alive 会从缓存中提取该组件的实例，而不是重新创建。
3. 生命周期管理：为了处理组件的激活和停用，keep-alive 引入了 activated 和 deactivated 钩子，在组件进入或离开缓存时触发。

## 源码分析

关键代码和原理解析：

```javascript
export default {
  name: 'KeepAlive',
  abstract: true, // 这是一个抽象组件，表示它不会直接渲染到 DOM 上

  props: {
    include: patternTypes, // 要缓存的组件
    exclude: patternTypes, // 不缓存的组件
    max: [String, Number] // 最大缓存数
  },

  created () {
    this.cache = Object.create(null); // 缓存对象
    this.keys = []; // 用来记录缓存的顺序
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  watch: {
    include (val) {
      pruneCache(this, name => matches(val, name));
    },
    exclude (val) {
      pruneCache(this, name => !matches(val, name));
    }
  },

  render () {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot); // 获取第一个子组件

    if (vnode) {
      const componentOptions = vnode.componentOptions;
      const name = getComponentName(componentOptions);
      
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode; // 如果不匹配 include/exclude，直接返回，不缓存
      }

      const key = vnode.key == null
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key;

      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance; // 从缓存中取出实例
        remove(this.keys, key); // 移除旧的位置
        this.keys.push(key); // 重新放到最后，更新 LRU 位置
      } else {
        this.cache[key] = vnode; // 缓存新实例
        this.keys.push(key);

        // 如果超过最大缓存数，移除最早的实例
        if (this.max && this.keys.length > parseInt(this.max)) {
          pruneCacheEntry(this.cache, this.keys[0], this.keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true; // 标记组件为 keep-alive
    }

    return vnode || (slot && slot[0]); // 返回 vnode
  }
};
```

### 缓存机制

this.cache 是一个对象，用于存储已经缓存的组件实例。

this.keys 是一个数组，用来记录缓存组件的顺序（实现 LRU 缓存策略，具体见下方）。

### 组件的缓存和激活

在 render 函数中，Vue 判断当前组件是否在 include 和 exclude 的范围内。如果匹配不到，则不进行缓存。

通过 key 标识组件，并将其与缓存实例关联。如果组件已经在缓存中，直接取出缓存的组件实例并复用。

### LRU 缓存策略

::: tip 说明
LRU 缓存策略维持了一个有序的数据结构，记录了缓存项的使用顺序。当缓存达到容量限制时，它会移除最近最少使用的项，以便为新的数据腾出空间。常见的实现方式包括使用双向链表和哈希表的组合，来保持缓存项的顺序和快速访问。
:::

当 this.keys 的长度超过 max 时，删除最早的缓存组件（即 this.keys[0]）。

### 生命周期的管理

activated 和 deactivated 生命周期钩子与 keep-alive 紧密相关，它们在组件被从缓存中激活和停用时触发。

activated 和 deactivated 钩子用于管理组件的激活和停用。
