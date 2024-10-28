---
layout: home

title: 知识星球
titleTemplate: 秦佬湿

hero:
  name: 知识星球
  text: ''
  tagline: '探索知识星球，共享编程新知。'
  image:
    src: /svg/logo.svg
    alt: 知识星球
  actions:
    - theme: brand
      text: 文档查看
      link: /guide/started

features:
  - icon: {src: '/svg/features/vue.svg', width: 32, height: 32}
    title: Vue
    details: 轻量灵活，组件化开发，易上手
    link: /docs/vue/index
  - icon: {src: '/svg/features/react.svg', width: 32, height: 32}
    title: React
    details: 组件驱动，虚拟DOM，高效灵活
    link: /docs/react/index
  - icon: {src: '/svg/features/java.svg', width: 32, height: 32}
    title: Java
    details: 跨平台，强类型，稳健无比
    link: /guide/started
  - icon: {src: '/svg/features/ts.svg', width: 32, height: 32}
    title: TypScript
    details: 强类型，提升代码质量，便于维护
    link: docs/typescript/index
  - icon: {src: '/svg/features/node.svg', width: 32, height: 32}
    title: Node.js
    details: 非阻塞I/O，高效服务器，实时应用
    link: docs/node/index
  - icon: {src: '/svg/features/flutter.svg', width: 32, height: 32}
    title: Flutter
    details: 跨平台开发，快速构建，美观流畅
    link: /guide/started
  - icon: {src: '/svg/features/harmony.svg', width: 32, height: 32}
    title: 鸿蒙
    details: 跨设备互联，智能生态，未来可期
    link: /guide/started
  - icon: {src: '/svg/features/engineering.svg', width: 32, height: 32}
    title: 前端工程化
    details: 提升效率，规范管理，协同开发
    link: /docs/engineering/代码规范
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from '.vitepress/utils/fetchVersion.ts'

onMounted(() => {
  fetchVersion()
})
</script>
