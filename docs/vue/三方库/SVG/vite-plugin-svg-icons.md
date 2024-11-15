# vite-plugin-svg-icons

## 简介

vite-plugin-svg-icons 是一个非常实用的工具，适合需要使用多个 SVG 图标的 Vue 项目。通过简单的配置和使用方式，可以高效地管理和展示 SVG 图标，提升开发效率和应用性能。

## 安装

```bash
npm install vite-plugin-svg-icons -D
```

## 配置

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定 SVG 图标的文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 的格式
      symbolId: 'icon-[name]',
    }),
  ],
});
```

## 使用

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

### 全局注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

import SvgIcon from 'svg-icon.vue'
// 全局注册组件
Vue.component('svg-icon', SvgIcon)

createApp(App).mount('#app')
```

### 使用SvgIcon组件

```vue
<template>
  <div>
    <svg-icon name="home" :size="24" color="#417efd"></svg-icon>
  </div>
</template>
```
