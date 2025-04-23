# vue3对比vue2的效率提升

## 静态提升

- 元素节点
- 没有绑定动态内容

```js
// vue2 的静态节点
render() {
    createVNode('h1', null, 'hello')
}
// ...

// vue3 的静态节点
const hoisted = createVNode('h1', null, 'hello')
render() {
    // 直接使用 hoisted
}
```

静态属性会被提升

```html
<div class="box">
    {{ msg }}
</div>
```

```js
const hoisted = {class: 'box'}
render() {
    createVNode('div', hoisted, msg)
}
```

## 预字符串化

当编译器遇到大量连续的静态节点时，会尝试将它们预字符串化，会直接使用字符串，而不是创建虚拟节点

## 缓存事件处理函数

事件处理函数会被缓存，不会重复创建

```js
// vue2
render(ctx) {
    return createVNode('button', {
        onClick: ($event) => {
            ctx.count++
        }
    })
}

// vue3
render(ctx, _cache) {
    return createVNode('button', {
        onClick: _cache[0] || (_cache[0] = ($event) => {ctx.count++})
    })
}
```

## Block Tree

vue2 在对比新旧树的时候，并不知道哪些是静态节点，哪些是动态节点，因此就会一层一层的比较，这就浪费了大部分时间在对比静态节点上

vue3 在对比新旧树的时候，会先将静态节点和动态节点进行分类，然后进行对比，这样就可以减少一部分时间，提高效率

## PatchFlag

vue3 在对比新旧树的时候，会为每个节点添加一个标记，用来标识节点的静态属性，动态属性，静态子节点，动态子节点等，这样在对比的时候，就可以直接根据标记进行对比，而不需要一层一层的比较，从而提高效率
