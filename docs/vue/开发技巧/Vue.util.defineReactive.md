# Vue.util.defineReactive

vue提供了一个工具函数defineReactive,可以把一个数据变成响应式的，也就是数据变化了会刷新页面。

```vue
 <template>
   <div>
     {{ name }}
   </div>
 </template>
 ​
 <script>
 import Vue from "vue";
 // APP.vue
 export default {
   created() {
     Vue.util.defineReactive(this, 'name', '张三');
     setTimeout(() => {
       this.name = '坤坤';
     }, 1000)
   },
 }
 </script>
```

页面会先渲染`张三`，1秒后变成`坤坤`，你可能会问，这不就跟`this.$set`一样么？

```javascript
 // util.js
 import Vue from 'vue';
 ​
 export const obj = {
     name: 'zs',
 }
 ​
 // defineReactive重新定义一下
 Vue.util.defineReactive(obj, 'name', '张三');
 ​
 // 1秒后更新 obj.name
 setTimeout(() => {
     obj.nickname = '坤坤';
 }, 1000)
 ​```

```vue
 <template>
   <div>
     {{ name }}
   </div>
 </template>
 ​
 <script>
 // APP.vue
 import Vue from "vue";
 import { obj } from './util'
 ​
 export default {
   computed: {
     name() {
       return obj.name;
     }
   },
 }
 </script>
```

页面上会先渲染张三，1秒后更新成坤坤。这样我们可以就把响应式数据从组件中抽离出去了。

不过这个API不是vue暴露给用户使用的，官方文档上也没有它的说明，要谨慎使用。
