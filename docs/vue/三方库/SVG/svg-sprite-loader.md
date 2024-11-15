# svg-sprite-loader

## 简介

svg-sprite-loader 是一个 Webpack 加载器（loader），它的主要目的是处理 SVG（可缩放矢量图形）文件，并将它们合并成一个或多个 SVG 精灵图（Sprite）。这个过程简化了SVG图标的管理和使用，提升了网页性能。

## 原理

- 匹配svg，合成一个包含多个&lt;symbol&gt; 原素的SVG文件（原来的SVG替换成了&lt;symbol&gt;）。
- 通过 &lt;use&gt; 使用&lt;symbol&gt; (eg. &lt;use xlink:href="#icon-id"&gt;&lt;/use&gt;)。

## 优点

- 通过ID来控制图标
- 减少HTTP请求
- 动态引用和样式控制
- SVG配置过程自动化

## 缺点

- 兼容性差（Internet Explorer 9 +）
- 无法处理 多色、渐变色 SVG图标 改色

## 使用

### 安装

```bash
npm install svg-sprite-loader --save-dev
```

### Webpack配置

```js
// vue.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'svg-sprite.[hash].svg',
            },
          },
        ],
      },
    ],
  },
};
```

### SvgIcon组件

```vue
<template>
    <svg class="svg-icon" :style="{color: color, width: size + 'px', height: size + 'px'}" aria-hidden="true">
        <use :xlink:href="iconPath" />
    </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: "#417efd"
    }
  },
  computed: {
    iconPath () {
      return `#icon-${this.name}` // 假设SVG图标使用symbol方式定义，ID为`icon-${iconName}`
    },
  },
}
</script>
<style lang="less" scoped>
.svg-icon {
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>
```

### 组件注册

```js
import Vue from 'vue'
import SvgIcon from 'svg-icon.vue'
// 全局注册组件
Vue.component('svg-icon', SvgIcon)
// 定义一个加载目录的函数
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('src/assets/icons', false, /\.svg$/)
// 加载目录下的所有 svg 文件
requireAll(req)
```

### 使用SvgIcon组件

```vue
<template>
  <div>
    <svg-icon name="home" :size="24" color="#417efd"></svg-icon>
  </div>
</template>
```

## 踩坑

### 在集成开源项目时，开源项目中也使用了svg-sprite-loader ，如何解决webpack配置冲突 ？

原项目中的loader配置如下(weboack.config.js)：

```js
const webpackCommonConfig = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("src/assets/icons")],
        options: {
          symbolId: "icon-[name]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset", // asset 资源类型可以根据指定的图片大小来判断是否需要将图片转化为 base64
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024, // 限制于 60kb
          },
        },
        generator: {
          filename: "static/img/[name][ext]",
        },
        exclude： resolve("src/assets/icons")
      },
    ],
  },
};
```

开源项目配置如下(vue.config.js)：

```js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .exclude.add(resolve("packages"))
      // .add(resolve('xxxx'))
      // .add(resolve('xxxx'))
      // .add(resolve('xxxx'))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("packages"))
      // .add(resolve('xxxx'))
      // .add(resolve('xxxx'))
      // .add(resolve('xxxx'))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
```

### 合并思路

- 将packages等需要解析的SVG目录从Webpack5 自带的资源解析loader中排除（exclude）
- 在svg-sprite-loader 中添加packages等需要解析的SVG目录（include）
- 在自动导入SVG的index.js 中添加packages等需要加载的SVG目录

### 最终代码如下：

webpack.config.js：

```js
const webpackCommonConfig = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("src/assets/icons"), resolve("packages")],
        options: {
          symbolId: "icon-[name]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset", // asset 资源类型可以根据指定的图片大小来判断是否需要将图片转化为 base64
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024, // 限制于 60kb
          },
        },
        generator: {
          filename: "static/img/[name][ext]",
        },
        exclude： [resolve("src/assets/icons"), resolve("packages")]
      },
    ],
  },
};
```

index.js

```js
import Vue from 'vue'
import SvgIcon from '/svg-icon.vue'
// 全局注册组件
Vue.component('svg-icon', SvgIcon)
// 定义一个加载目录的函数
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req1 = require.context('@/assets/icons', false, /\.svg$/)
const req2 = require.context('@/packages', false, /\.svg$/)
// 加载目录下的所有 svg 文件
requireAll(req1)
requireAll(req2)

```
