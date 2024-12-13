# 动态Watch

<br/>

在vue中，watch可以监听数据的变化后重新执行函数，平常一般是这样定义Watch的。

```javascript
 export default {
     data() {
         return {
           name: '坤坤',
         }
     },
     watch: {
         name(newVal, oldVal) {
           console.log('watch重新执行', oldVal, newVal);
         }
     }
 }
```

上面监听了name的值，在变化时会执行Watch，这个叫做静态Watch，不过vue其实是支持动态watch的，使用this.$watch API 可以实现对一个值的动态监听，用法如下：

```javascript
 export default {
     data() {
         return {
            name: 1,
            unWatchName: null,
         }
     },
     mounted() {
         this. unWatchName = this.$watch('name', (newVal, oldVal) => {
           console.log('watch执行', oldVal, newVal);
         }, {
           immediate: true,
         })
     }
     beforeDestroy() {
         if (this. unWatchName) {
             // 主动销毁watch
             this.unWatchName();
             this.unWatchName = null;
         }
     }
 }
```

这里在组件中使用`$watch`对name进行监听，第一个参数可以传一个`Function`或者`String`，第二个参数是函数，第三个参数是`WatchOptions`，里面包括`immediate`、`deep`这些，然后返回一个销毁此watch的函数`unWatchName`。

这里要注意，对于静态watch来说，vue会组件初始化时会帮你初始化watch，在组件销毁时帮你销毁掉watch。

而对于动态watch则需要自己主动调用`unWatchName`销毁，否则组件被销毁后会一直存在内存中，造成内存泄漏，而且下次初始化这个组件时，又会创建一个新的watch，这样就会造成watch越来越多，内存泄漏越来越严重。
