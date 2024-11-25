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
            items: []
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
                    text: 'keep-alive',
                    link: 'docs/vue/知识点/keep-alive'
                },
                {
                    text: '＞＞＞、::v-deep、::v-deep()、:deep()的区别',
                    link: 'docs/vue/知识点/＞＞＞、::v-deep、::v-deep()、:deep()的区别'
                }
            ]
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
                    items: []
                },
            ]
        },
        {
            text: 'JavaWeb',
            collapsed: true,
            items: [
                {
                    text: 'MySQL',
                    link: ''
                },
                {
                    text: 'JDBC',
                    link: ''
                },
                {
                    text: 'Maven基础',
                    link: ''
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
            text: '开始',
            link: 'docs/javascript/index'
        },
        {
            text: '基础',
            collapsed: false,
            items: [

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
    '/docs/flutter/': [],
    '/docs/harmony/': [],
    '/docs/css/': [
        {
            text: '学习资源',
            link: 'docs/css/index'
        },
    ],
    '/docs/engineering/': [
        {
            text: '代码规范',
            link: 'docs/engineering/代码规范'
        },
    ],
    '/docs/tools/': [],
    '/docs/plugin/': [],
}