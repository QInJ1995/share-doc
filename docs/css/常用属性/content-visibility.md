# content-visibility

[`content-visibility`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content-visibility) 是一个 CSS 属性，用于控制元素是否渲染其内容，从而优化页面的渲染性能。

## 语法

```css
content-visibility: auto | hidden | visible;
```

## 属性值

- `auto`: 默认值。浏览器会根据元素是否在视口内来决定是否渲染其内容。
- `hidden`: 元素内容不会被渲染，但会保留其布局空间。
- `visible`: 元素内容始终会被渲染。

## 使用场景

1. **长列表优化**
   - 适用于包含大量内容的列表
   - 只渲染可视区域内的内容，提高页面性能

2. **大型文档**
   - 适用于长文章或文档页面
   - 可以显著提升首屏加载速度

3. **复杂组件**
   - 适用于包含复杂子组件的页面
   - 减少不必要的渲染开销

## 示例

```css
/* 长列表优化 */
.long-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* 设置预估高度 */
}

/* 隐藏特定内容 */
.hidden-content {
  content-visibility: hidden;
}

/* 始终显示的内容 */
.visible-content {
  content-visibility: visible;
}
```

## 注意事项

1. 需要配合 `contain-intrinsic-size` 属性使用，以提供元素的预估尺寸
2. 仅支持现代浏览器，需要检查兼容性
3. 不适合用于频繁更新的动态内容
4. 建议在性能关键的大型页面中使用

## 浏览器支持

- Chrome 85+
- Edge 85+
- Opera 71+
- 不支持 Firefox 和 Safari

## 性能影响

使用 `content-visibility: auto` 可以显著提升页面性能：

- 减少渲染时间
- 降低内存使用
- 提升滚动性能
- 改善首次内容绘制（FCP）时间
