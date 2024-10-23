import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '技术星球', // 标题
  description: '技术星球', // 描述
  base: '/', // 根路径
  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/svg/logo.svg' }], // svg格式
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }], // ico格式
  ],
  appearance: true, // 是否启用暗黑模式 
  themeConfig: {
    logo: '/svg/logo.svg', // 导航栏站点logo
    siteTitle: '技术星球', // 导航栏站点标题
    search: { // 搜索配置
      provider: 'local'
    },
    nav: [ // 导航栏
      {
        text: 'API',
        link: '/docs/api/vue'
      },
      {
        text: '实用插件推荐',
        link: '/docs/plugin/index'
      },
    ],
    sidebar: [ // 侧边栏
      {
        text: 'API',
        items: [
          { text: 'Vue', link: '/docs/api/vue' },
          { text: 'React', link: '/docs/api/react' }
        ]
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present 秦佬湿'
    }
  }
})
