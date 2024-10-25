import { defineConfig } from 'vitepress'
import { sidebar } from './constant/sidebarList'

export default defineConfig({
  title: '知识星球', // 标题
  description: '知识星球', // 描述
  base: '/share-doc/', // 根路径
  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/share-doc/svg/logo.svg' }], // svg格式
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }], // ico格式
  ],
  appearance: true, // 是否启用暗黑模式 
  cleanUrls: true, // 是否启用清理URL
  themeConfig: {
    logo: '/svg/logo.svg', // 导航栏站点logo
    siteTitle: '知识星球', // 导航栏站点标题
    search: { // 搜索配置
      provider: 'local'
    },
    nav: [ // 导航栏
      {
        text: 'API导航',
        items: [
          {
            text: '全部',
            link: '/docs/api/front-end-frame',
            activeMatch: '/api/'
          },
          {
            text: 'React',
            link: 'https://react.docschina.org/'
          },
          {
            text: 'Vue3',
            link: 'https://cn.vuejs.org/'
          },
          {
            text: 'Vue2',
            link: 'https://v2.cn.vuejs.org/'
          },
        ],

      },
    ],
    sidebar, // 侧边栏
    outline: { // 侧边栏标题
      level: [2, 4],
      label: '当前页'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present 秦佬湿'
    }
  }
})
