export default [
    {
        text: '文档',
        link: 'docs/vue/index'
    },
    {
        text: 'Vue',
        collapsed: true,
        items: [
            {
                text: 'v2.x',
                collapsed: false,
                items: [
                    {
                        text: '基础教程',
                        link: 'docs/vue/Vue/v2.x/基础教程.md'
                    },
                    {
                        text: '进阶教程',
                        link: 'docs/vue/Vue/v2.x/进阶教程.md'
                    }
                ],
            },
            {
                text: 'v3.x',
                collapsed: false,
                items: [
                    {
                        text: '基础教程',
                        link: 'docs/vue/Vue/v3.x/基础教程.md'
                    },
                    {
                        text: '进阶教程',
                        link: 'docs/vue/Vue/v3.x/进阶教程.md'
                    },
                    {
                        text: '知识讲解',
                        collapsed: true,
                        items: [
                            {
                                text: '效率的提升',
                                link: 'docs/vue/Vue/v3.x/知识讲解/效率的提升'
                            },
                            {
                                text: 'API和数据响应式的变化',
                                link: 'docs/vue/Vue/v3.x/知识讲解/API和数据响应式的变化'
                            },
                            {
                                text: '模板中的变化',
                                link: 'docs/vue/Vue/v3.x/知识讲解/模板中的变化'
                            },
                            {
                                text: 'ReactivityApi',
                                link: 'docs/vue/Vue/v3.x/知识讲解/ReactivityApi'
                            },
                            {
                                text: 'CompositionApi',
                                link: 'docs/vue/Vue/v3.x/知识讲解/CompositionApi'
                            },
                            {
                                text: '共享数据',
                                link: 'docs/vue/Vue/v3.x/知识讲解/共享数据'
                            },
                        ]
                    },
                ],
            },
        ]
    },
    {
        text: 'Vuex',
        collapsed: true,
        items: [
            {
                text: 'v3.x',
                collapsed: false,
                items: [
                    {
                        text: '基本使用',
                        link: 'docs/vue/Vuex/v3.x/基本使用'
                    },
                    {
                        text: '源码分析',
                        link: 'docs/vue/Vuex/v3.x/源码分析'
                    },
                ]
            },
            {
                text: 'v4.x',
                collapsed: false,
                items: [
                    {
                        text: '基本使用',
                        link: 'docs/vue/Vuex/v4.x/基本使用'
                    },

                    {
                        text: '源码分析',
                        link: 'docs/vue/Vuex/v4.x/源码分析'
                    },
                ]
            },
        ]
    },
    {
        text: 'Vue Router',
        collapsed: true,
        items: [
            {
                text: 'v3.x',
                collapsed: false,
                items: [
                    {
                        text: '基本使用',
                        link: 'docs/vue/Vue Router/v3.x/基本使用'
                    },
                    {
                        text: '源码分析',
                        link: 'docs/vue/Vue Router/v3.x/源码分析'
                    },
                ]
            },
            {
                text: 'v4.x',
                collapsed: false,
                items: [
                    {
                        text: '基本使用',
                        link: 'docs/vue/Vue Router/v4.x/基本使用'
                    },
                    {
                        text: '源码分析',
                        link: 'docs/vue/Vue Router/v4.x/源码分析'
                    },
                ]
            },
        ]
    },
    {
        text: 'Pinia',
        collapsed: true,
        items: [
            {
                text: 'Pinia基本概念',
                link: 'docs/vue/Pinia/Pinia基本概念'
            },
            {
                text: 'Pinia快速入门',
                link: 'docs/vue/Pinia/Pinia快速入门'
            },
            {
                text: '添加插件',
                link: 'docs/vue/Pinia/添加插件'
            },
            {
                text: '最佳实践与补充内容',
                link: 'docs/vue/Pinia/最佳实践与补充内容'
            },
            {
                text: 'Pinia部分源码解析',
                link: 'docs/vue/Pinia/Pinia部分源码解析'
            },
        ]
    },
    {
        text: '知识点',
        collapsed: true,
        items: [
            {
                text: '自定义指令',
                link: 'docs/vue/知识点/自定义指令'
            },
            {
                text: 'filter(过滤器)',
                link: 'docs/vue/知识点/filter(过滤器)'
            },
            {
                text: '修饰符',
                link: 'docs/vue/知识点/修饰符'
            },
            {
                text: 'keep-alive',
                link: 'docs/vue/知识点/keep-alive'
            },
            {
                text: '样式穿透',
                link: 'docs/vue/知识点/样式穿透'
            },
        ]
    },
    {
        text: '开发技巧',
        collapsed: true,
        items: [
            {
                text: '动态Watch',
                link: 'docs/vue/开发技巧/动态Watch'
            },
            {
                text: '@hook',
                link: 'docs/vue/开发技巧/@hook'
            },
            {
                text: 'Vue.mixin 全局混入',
                link: 'docs/vue/开发技巧/Vue.mixin 全局混入'
            },
            {
                text: 'Vue.util.defineReactive',
                link: 'docs/vue/开发技巧/Vue.util.defineReactive'
            },
        ],
    },
    {
        text: '测试',
        collapsed: true,
        items: [
            {
                text: '单元测试',
                link: 'docs/vue/测试/单元测试'
            },
            {
                text: '端到端测试',
                link: 'docs/vue/测试/端到端测试'
            },
            {
                text: '样式测试',
                link: 'docs/vue/测试/样式测试'
            },
        ]
    },
    {
        text: '三方库',
        collapsed: true,
        items: [
            {
                text: 'SVG',
                collapsed: true,
                items: [
                    {
                        text: 'svg-sprite-loader',
                        link: 'docs/vue/三方库/SVG/svg-sprite-loader'
                    },
                    {
                        text: 'vite-plugin-svg-icons',
                        link: 'docs/vue/三方库/SVG/vite-plugin-svg-icons'
                    },
                ]
            }
        ]
    },
    {
        text: '性能优化',
        collapsed: true,
        items: [
            {
                text: 'vue3对比vue2的效率提升',
                link: 'docs/vue/性能优化/vue3对比vue2的效率提升'
            },
        ]
    },
    {
        text: '自定义组件',
        collapsed: true,
        items: [
            {
                text: 'IconButtonList',
                link: 'docs/vue/自定义组件/IconButtonList'
            },
        ]
    },
]