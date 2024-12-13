# @hook

<br/>

在vue中可以通过`@hook`监听vue的生命周期钩子，来举个例子：

```vue
 // 父组件 Parent.vue
 <template>
   <div>
        <Child @hook:mounted="childMounted" />
     </div>
 </template>
 ​
 <script>
 export default {
     methods: {
        childMounted() {
             console.log('listen child mounted'); // 后打印
         }
     }
 }
 </script>
 ​
 // 子组件 Child.vue
 ​
 <script>
 export default {
     mounted() {
       console.log('child mounted'); // 先打印
     }
 }
 </script>

```

这里在父组件`Parent.vue`中用`@hook:mounted`给子组件增加监听，然后在子组件`Child.vue`的`mounted`钩子调用完后，会调用`@hook:mounted`的监听函数`childMounted`，这时候你就可以通过`$ref.childComponent.$el`拿到子组件的DOM。

不仅如此，`@hook`还可以实现动态监听，实现程序化的监听器。

就拿$watch动态监听来说，有没有发现我们销毁watch的流程存在一点问题？

1. 需要把创建出来的watch保存在组件的一个变量`unWatch`上，最好只有生命周期钩子可以访问到它。
2. 创建watch的代码独立于销毁watch的代码，维护性差，比如我们需要删除这个watch，还需要把unWatch，以及beforeDestroy里面的代码一起删除，最好创建和销毁的代码能放在一起。

@hook就能轻松解决这两个问题，来看如下代码：

```javascript
 export default {
    data: () {
        return {
            name: '坤坤'
            unWatchName: null
        }
    },
     mounted() {
         const unWatchName = this.$watch('name', (newVal, oldVal) => {
           console.log('watch执行', oldVal, newVal);
         }, {
           immediate: true,
         })
         // 这里使用 $once，当回调执行后便释放监听
         this.$once('hook:beforeDestroy', function () {
          unWatchName();
         })
     },
}
```

直接用程序监听当前组件的`beforeDestroy`钩子，既省去了`unWatchName`变量，又讲创建和清理的代码聚合在一起，方便维护。
