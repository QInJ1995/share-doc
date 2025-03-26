# Filter

## 什么是 Filter？

Filter（过滤器）是 Vue 2 中的一种功能，主要用于文本格式化。它可以在模板表达式中对数据进行简单的格式化处理。

## 定义 Filter

Filter 可以在 Vue 实例中通过 `filters` 选项定义，也可以全局定义。

### 局部定义

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'hello world'
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});
```

### 全局定义

```javascript
Vue.filter('capitalize', function(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
});
```

## 使用 Filter

Filter 通常在模板中使用，通过管道符 `|` 调用。

```html
<div id="app">
  <p>{{ message | capitalize }}</p>
</div>
```

输出结果为：`Hello world`

## 多个 Filter 的链式调用

可以通过管道符 `|` 链式调用多个过滤器。

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'hello world'
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    reverse(value) {
      if (!value) return '';
      return value.split('').reverse().join('');
    }
  }
});
```

```html
<div id="app">
  <p>{{ message | capitalize | reverse }}</p>
</div>
```

输出结果为：`dlroW olleH`

## 注意事项

1. **仅用于模板**：Filter 只能在模板中使用，不能在 JavaScript 逻辑中直接调用。
2. **性能问题**：Filter 会在每次渲染时调用，复杂的过滤器可能会影响性能。
3. **Vue 3 不再支持**：需要注意的是，Vue 3 中已经移除了 Filter 功能，推荐使用方法或计算属性代替。

## 常见用例

### 日期格式化

```javascript
Vue.filter('formatDate', function(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString();
});
```

```html
<p>{{ timestamp | formatDate }}</p>
```

### 字符串截取

```javascript
Vue.filter('truncate', function(value, length) {
  if (!value) return '';
  if (value.length <= length) return value;
  return value.substring(0, length) + '...';
});
```

```html
<p>{{ longText | truncate(10) }}</p>
```

## 总结

Filter 是 Vue 2 中一个非常实用的功能，适合用于简单的文本格式化操作。但在 Vue 3 中已经被移除，因此在新项目中建议使用方法或计算属性来实现类似功能。

## 参考

- [Vue.js 2.x - Filters](https://v2.cn.vuejs.org/v2/guide/filters.html)
