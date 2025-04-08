export default [
    {
        text: '开始',
        link: '/docs/node/index'
    },
    {
        text: '基础',
        collapsed: true,
        items: [
            {
                text: 'Node.js 简介',
                link: '/docs/node/basics/01-introduction'
            },
            {
                text: 'JavaScript 基础',
                link: '/docs/node/basics/02-javascript'
            },
            {
                text: '核心概念',
                link: '/docs/node/basics/03-core-concepts'
            }
        ]
    },
    {
        text: '进阶',
        collapsed: true,
        items: [
            {
                text: 'Web 开发',
                link: '/docs/node/advanced/01-web-development'
            },
            {
                text: '数据库操作',
                link: '/docs/node/advanced/02-database'
            },
            {
                text: '安全性',
                link: '/docs/node/advanced/03-security'
            }
        ]
    },
    {
        text: '框架',
        collapsed: true,
        items: [
            {
                text: 'Express 框架',
                link: '/docs/node/frameworks/01-express'
            },
            {
                text: 'NestJS 框架',
                link: '/docs/node/frameworks/02-nestjs'
            },
            {
                text: 'Koa 框架',
                link: '/docs/node/frameworks/03-koa'
            }
        ]
    },
    {
        text: '工程化',
        collapsed: true,
        items: [
            {
                text: 'TypeScript 开发',
                link: '/docs/node/engineering/01-typescript'
            },
            {
                text: '测试与部署',
                link: '/docs/node/engineering/02-testing-deployment'
            },
            {
                text: '性能优化',
                link: '/docs/node/engineering/03-performance'
            },
            {
                text: '微服务架构',
                link: '/docs/node/engineering/04-microservices'
            },
            {
                text: '容器化部署',
                link: '/docs/node/engineering/05-containerization'
            }
        ]
    },
    {
        text: '项目实战',
        collapsed: true,
        items: [
            {
                text: '待办事项应用',
                link: '/docs/node/projects/01-todo-app'
            },
            {
                text: '聊天应用',
                link: '/docs/node/projects/02-chat-app'
            }
        ]
    }
]