export const sidebar = {
    '/docs/api/': [
        {
            text: 'API导航',
            collapsed: true,
            items: [
                // { text: '', link: '/docs/api/index' },
                { text: '前端框架', link: '/docs/api/front-end-frame' },
                { text: 'Vue', link: '/docs/api/vue' },
                { text: 'React', link: '/docs/api/react' },
                { text: 'Node.js & Deno', link: '/docs/api/node-deno' },
                { text: 'React 组件库', link: '/docs/api/react-component-library' },
                { text: 'CSS', link: '/docs/api/css' },
                { text: '编译构建', link: '/docs/api/compile-build' },
                { text: '代码检查', link: '/docs/api/code-check' },
                { text: '小程序', link: '/docs/api/mini-program' },
                { text: '语言文档和规范', link: '/docs/api/language-doc-norm' },
                { text: '测试工具', link: '/docs/api/test-tool' },
                { text: '可视化工具', link: '/docs/api/visual-tool' },
            ]
        },
    ],
    '/docs/vue/': [
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
                        }
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
            text: '知识点',
            collapsed: true,
            items: [
                {
                    text: '自定义指令',
                    link: 'docs/vue/知识点/自定义指令'
                },
                {
                    text: 'keep-alive',
                    link: 'docs/vue/知识点/keep-alive'
                },
                {
                    text: '样式穿透',
                    link: 'docs/vue/知识点/样式穿透'
                }
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
            text: '自定义组件',
            collapsed: true,
            items: [
                {
                    text: 'IconButtonList',
                    link: 'docs/vue/自定义组件/IconButtonList'
                },
            ]
        },
    ],
    '/docs/react/': [],
    '/docs/java/': [
        {
            text: '文档',
            link: 'docs/java/index'
        },
        {
            text: 'JavaSE',
            collapsed: true,
            items: [
                {
                    text: '基础',
                    collapsed: true,
                    items: [
                        {
                            text: '基础语法',
                            link: 'docs/java/JavaSE/基础/基础语法'
                        },
                        {
                            text: '运算符',
                            link: 'docs/java/JavaSE/基础/运算符'
                        },
                        {
                            text: '循环控制',
                            link: 'docs/java/JavaSE/基础/循环控制'
                        },
                        {
                            text: '数组',
                            link: 'docs/java/JavaSE/基础/数组'
                        },
                        {
                            text: '方法',
                            link: 'docs/java/JavaSE/基础/方法'
                        },
                        {
                            text: '面向对象基础',
                            link: 'docs/java/JavaSE/基础/面向对象基础'
                        },
                        {
                            text: '常用API',
                            link: 'docs/java/JavaSE/基础/常用API'
                        },
                        {
                            text: '案例',
                            collapsed: true,
                            items: [
                                {
                                    text: '编程案例（专题）',
                                    link: 'docs/java/JavaSE/基础/案例/编程案例（专题）'
                                },
                                {
                                    text: '基础综合项目（ATM系统）',
                                    link: 'docs/java/JavaSE/基础/案例/基础综合项目（ATM系统）'
                                },
                            ]
                        },
                    ]
                },
                {
                    text: '进阶',
                    collapsed: true,
                    items: [
                        {
                            text: '面向对象进阶(一)',
                            link: 'docs/java/JavaSE/进阶/面向对象进阶(一)'
                        },
                        {
                            text: '面向对象进阶(二)',
                            link: 'docs/java/JavaSE/进阶/面向对象进阶(二)'
                        },
                        {
                            text: '面向对象进阶(三)、常见API',
                            link: 'docs/java/JavaSE/进阶/面向对象进阶(三)、常见API'
                        },
                        {
                            text: '常见API',
                            link: 'docs/java/JavaSE/进阶/常见API'
                        },
                        {
                            text: '常见API、Lambda、算法、正则',
                            link: 'docs/java/JavaSE/进阶/常见API、Lambda、算法、正则'
                        },
                        {
                            text: '异常、集合、List集合',
                            link: 'docs/java/JavaSE/进阶/异常、集合、List集合'
                        },
                        {
                            text: 'Set集合、Map集合',
                            link: 'docs/java/JavaSE/进阶/Set集合、Map集合'
                        },
                        {
                            text: 'Map集合、Stream、File',
                            link: 'docs/java/JavaSE/进阶/Map集合、Stream、File'
                        },
                        {
                            text: '字符集、IO流(一)',
                            link: 'docs/java/JavaSE/进阶/字符集、IO流(一)'
                        },
                        {
                            text: 'IO流(二)',
                            link: 'docs/java/JavaSE/进阶/IO流(二)'
                        },
                        {
                            text: '特殊文件、日志技术、多线程',
                            link: 'docs/java/JavaSE/进阶/特殊文件、日志技术、多线程'
                        },
                        {
                            text: '多线程',
                            link: 'docs/java/JavaSE/进阶/多线程'
                        },
                        {
                            text: '网络编程',
                            link: 'docs/java/JavaSE/进阶/网络编程'
                        },
                        {
                            text: '单元测试、反射、注解、动态代理',
                            link: 'docs/java/JavaSE/进阶/单元测试、反射、注解、动态代理'
                        },
                    ]
                },
            ]
        },
        {
            text: 'JavaWeb',
            collapsed: true,
            items: [
                {
                    text: 'MySQL',
                    collapsed: true,
                    items: [
                        {
                            text: '基础操作',
                            link: 'docs/java/JavaWeb/MySQL/基础操作'
                        },
                        {
                            text: '数据库设计和多表操作',
                            link: 'docs/java/JavaWeb/MySQL/数据库设计和多表操作'
                        },
                    ]
                },
                {
                    text: 'JDBC',
                    link: 'docs/java/JavaWeb/JDBC'
                },
                {
                    text: 'Maven',
                    collapsed: true,
                    items: [
                        {
                            text: '基础',
                            link: 'docs/java/JavaWeb/Maven/基础'
                        }
                    ]
                },
                {
                    text: 'MyBatis',
                    link: ''
                },
            ]
        },
    ],
    '/docs/javascript/': [
        {
            text: '文档',
            link: 'docs/javascript/index',
        },
        {
            text: '常用API',
            collapsed: true,
            items: [
                {
                    text: 'Object',
                    link: 'docs/javascript/常用API/Object',
                },
                {
                    text: 'Array',
                    link: 'docs/javascript/常用API/Array',
                },
                {
                    text: 'Reflect',
                    link: 'docs/javascript/常用API/Reflect',
                },
                {
                    text: 'MutationObserver',
                    link: 'docs/javascript/常用API/MutationObserver',
                },
                {
                    text: 'XMLHttpRequest',
                    link: 'docs/javascript/常用API/XMLHttpRequest',
                },
                {
                    text: 'DOM',
                    link: 'docs/javascript/常用API/DOM',
                },
                {
                    text: 'BOM',
                    link: 'docs/javascript/常用API/BOM'
                },
            ]
        },
        {
            text: '知识点',
            collapsed: true,
            items: []
        },
        {
            text: '解决方案',
            collapsed: true,
            items: [
                {
                    text: '文件上传下载百分比',
                    link: 'docs/javascript/解决方案/文件上传下载百分比'
                },
                {
                    text: '大量接口请求并发控制',
                    link: 'docs/javascript/解决方案/大量接口请求并发控制'
                },
            ]
        },

    ],
    '/docs/typescript/': [
        {
            text: '开始',
            link: 'docs/typescript/index'
        },
    ],
    '/docs/node/': [
        {
            text: '开始',
            link: 'docs/node/index'
        },
    ],
    '/docs/engineering/': [
        {
            text: '前端',
            collapsed: true,
            items: [
                {
                    text: 'Monorepo 项目搭建',
                    link: 'docs/engineering/前端/Monorepo 项目搭建'
                },
                {
                    text: 'TS+Vite 搭建插件库',
                    link: 'docs/engineering/前端/TS+Vite 搭建插件库'
                },
                {
                    text: '代码规范',
                    link: 'docs/engineering/前端/代码规范'
                },
            ]
        },
        {
            text: '后端',
            collapsed: true,
            items: [
            ]
        },
        {
            text: 'Git',
            collapsed: true,
            items: [
                {
                    text: '基础',
                    link: 'docs/engineering/git/基础'
                },
                {
                    text: '进阶',
                    link: 'docs/engineering/git/进阶'
                },
                {
                    text: '工作流',
                    link: 'docs/engineering/git/工作流'
                }
            ]
        }

    ],
    '/docs/flutter/': [],
    '/docs/harmony/': [],
    '/docs/css/': [
        {
            text: '学习资源',
            link: 'docs/css/index'
        },
    ],
    '/docs/tools/': [],
    '/docs/plugin/': [],
}