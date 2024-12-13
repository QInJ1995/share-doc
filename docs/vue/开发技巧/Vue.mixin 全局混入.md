# Vue.mixin 全局混入

<br/>

在平时项目开发中，为了提取一些公共逻辑，会使用到`mixin`进行混入，它可以将一些定义的`method`、`data`、`computed`、生命周期钩子`created`、`mounted`等注入到组件中。

```javascript
 // mixin.js
 export default {
     data() {
         return {
             name: 'zs'
         }
     },
     computed: {
         finalName() {
             return 'final ' + this.name;
         }
     },
     created() {
         console.log('mixin created');
     },
     methods: {
         getName() {
             return this.name;
         }
     }
 }
 // App.vue
 import mixin from './mixin';
 export default {
   mixins: [mixin],
   created() {
     console.log(this.finalName);
     console.log(this.getName());
   },
 }
 ​
 /**
 输出结果：
 mixin created
 final zs
 zs
 */
```

这是组件级别的混入，但其实Vue还提供了`全局混入`的能力，也就是`Vue.mixin`API。它可以向在`Vue注册的所有实例`注入自己自定义的行为，我们知道每个vue组件就是一个vue的实例，也就是说它会向每个vue组件都进行混入。

```javascript
 // main.js
 Vue.mixin({
   beforeCreate() {
     console.log("beforeCreate");
     this.name = '坤坤';
   }
 })
```

这样会向每个组件都注入一个`name`属性，并且其值为`坤坤`。我们在每个组件中都可以使用这个值了。

这个功能在写vue插件的时候非常好用，比如`vuex`用它向每个组件注入了`$store`属性，`vue-router`用它向每个组件注入了`$router`和`$route`实现，我们在写自定义一个vue插件，也可以使用这个方法进行注入。
