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
    '/docs/vue/': [],
    '/docs/react/': [],
    '/docs/java/': [],
    '/docs/javascript/': [],
    '/docs/typescript/': [],
    '/docs/node/': [
        {
            text: '概览',
            // link: 'docs/node/overview/basic/index'
            collapsed: true,
            items: [
                { text: '架构', items: [
                    { text: '概览', link: 'docs/node/overview/basic/index' },
                    { text: '运行机制', link: 'docs/node/overview/basic/execution' },
                    { text: '内存控制', link: 'docs/node/overview/basic/memory' },
                ] },
                { text: '模块机制', items: [] },
                { text: '生态', items: [] },
            ]
        },
        {
            text: '引擎',
            collapsed: true,
            items: [
                { text: 'Node.js', link: '/docs/node/nodejs' },
            ]
        },
    ],
    '/docs/flutter/': [],
    '/docs/harmony/': [],
    '/docs/css/': [],
    '/docs/engineering/': [],
    '/docs/tools/': [],
    '/docs/plugin/': [],
}