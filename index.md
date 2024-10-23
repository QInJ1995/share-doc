---
layout: home

title: 知识星球
titleTemplate: Library

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
    details: 快速复制示例代码
    link: /guide/started
  - icon: {src: '/svg/features/react.svg', width: 32, height: 32}
    title: React
    details: 包含丰富的工具函数
    link: /guide/started
  - icon: {src: '/svg/features/java.svg', width: 32, height: 32}
    title: Java
    details: 支持自定义扩展
    link: /guide/started
  - icon: {src: '/svg/features/ts.svg', width: 32, height: 32}
    title: TypScript
    details: 简单易用，上手快
    link: /guide/started
  - icon: {src: '/svg/features/node.svg', width: 32, height: 32}
    title: Node.js
    details: 简单易用，上手快
    link: /guide/started
  - icon: {src: '/svg/features/flutter.svg', width: 32, height: 32}
    title: Flutter
    details: 快速复制示例代码
    link: /guide/started
  - icon: {src: '/svg/features/harmony.svg', width: 32, height: 32}
    title: 鸿蒙
    details: 包含丰富的工具函数
    link: /guide/started
  - icon: {src: '/svg/features/engineering.svg', width: 32, height: 32}
    title: 前端工程化
    details: 支持自定义扩展
    link: /guide/started
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from '.vitepress/utils/fetchVersion.ts'

onMounted(() => {
  fetchVersion()
})
</script>
