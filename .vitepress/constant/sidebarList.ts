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
            text: '开始',
            link: 'docs/vue/index'
        },
        {
            text: 'Vuex',
            collapsed: true,
            items: []
        },
        {
            text: 'Vue Router',
            collapsed: true,
            items: []
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
    ],
    '/docs/react/': [],
    '/docs/java/': [],
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