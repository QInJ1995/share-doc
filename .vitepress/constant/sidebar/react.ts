export default [
    {
        text: '文档',
        link: 'docs/react/index'
    },
    {
        text: 'React',
        collapsed: true,
        items: [
            {
                text: '基础教程',
                link: 'docs/react/React/基础教程'
            },
            {
                text: '进阶教程',
                link: 'docs/react/React/进阶教程'
            }
        ],
    },
    {
        text: '常用hooks',
        collapsed: true,
        items: [
            {
                text: 'useState',
                link: 'docs/react/常用hooks/useState'
            },
            {
                text: 'useEffect',
                link: 'docs/react/常用hooks/useEffect'
            },
            {
                text: 'useLayoutEffect',
                link: 'docs/react/常用hooks/useLayoutEffect'
            },
            {
                text: 'useReducer',
                link: 'docs/react/常用hooks/useReducer'
            },
            {
                text: 'useSyncExternalStore',
                link: 'docs/react/常用hooks/useSyncExternalStore'
            },
            {
                text: 'useTransition',
                link: 'docs/react/常用hooks/useTransition'
            },
            {
                text: 'useDeferredValue',
                link: 'docs/react/常用hooks/useDeferredValue'
            },
            {
                text: 'useRef',
                link: 'docs/react/常用hooks/useRef'
            },
            {
                text: 'useImperativeHandle',
                link: 'docs/react/常用hooks/useImperativeHandle'
            },
            {
                text: 'useContext',
                link: 'docs/react/常用hooks/useContext'
            },
        ],
    },
    {
        text: '知识点',
        collapsed: true,
        items: [
            {
                text: '父子组件通讯',
                link: 'docs/react/知识点/父子组件通讯'
            },
        ],
    },
    {
        text: '源码分析',
        collapsed: true,
        items: [
            {
                text: '虚拟DOM',
                link: 'docs/react/源码分析/虚拟DOM'
            },
        ],
    },
]