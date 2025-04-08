# Koa.js

## 核心概念

### 1. 应用创建

```javascript
const Koa = require('koa');
const app = new Koa();

// 中间件配置
app.use(async (ctx, next) => {
    await next();
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
```

### 2. 上下文对象

```javascript
app.use(async (ctx) => {
    // 请求信息
    console.log(ctx.request.method);
    console.log(ctx.request.url);
    console.log(ctx.request.query);
    console.log(ctx.request.body);

    // 响应信息
    ctx.status = 200;
    ctx.body = {
        message: '成功',
        data: ctx.request.body
    };
});
```

## 中间件机制

### 1. 中间件链

```javascript
// 日志中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
});

// 响应中间件
app.use(async (ctx, next) => {
    await next();
    if (ctx.body) {
        ctx.body = {
            code: 0,
            data: ctx.body,
            message: '成功'
        };
    }
});
```

### 2. 常用中间件

```javascript
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const logger = require('koa-logger');

// 请求体解析
app.use(bodyParser());

// 跨域
app.use(cors());

// 安全头
app.use(helmet());

// 日志
app.use(logger());
```

## 异步流程

### 1. 异步处理

```javascript
// 异步中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message
        };
    }
});

// 异步路由处理
router.get('/users', async (ctx) => {
    const users = await User.find();
    ctx.body = users;
});
```

### 2. 错误处理

```javascript
// 错误类
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'AppError';
    }
}

// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof AppError) {
            ctx.status = err.status;
            ctx.body = {
                error: err.message
            };
        } else {
            ctx.status = 500;
            ctx.body = {
                error: '服务器错误'
            };
        }
    }
});
```

## 路由系统

### 1. 路由配置

```javascript
const Router = require('koa-router');
const router = new Router();

// 基本路由
router.get('/', async (ctx) => {
    ctx.body = '首页';
});

router.post('/api/users', async (ctx) => {
    const user = await User.create(ctx.request.body);
    ctx.body = user;
});

// 路由参数
router.get('/users/:id', async (ctx) => {
    const user = await User.findById(ctx.params.id);
    ctx.body = user;
});

// 路由前缀
const api = new Router({ prefix: '/api' });
api.use(router.routes());
```

### 2. 路由中间件

```javascript
// 认证中间件
const auth = async (ctx, next) => {
    const token = ctx.headers.authorization;
    if (!token) {
        ctx.throw(401, '未授权');
    }
    await next();
};

// 使用中间件
router.use('/protected', auth);
router.get('/protected/data', async (ctx) => {
    ctx.body = '受保护的数据';
});
```

## 模板引擎

### 1. 视图渲染

```javascript
const views = require('koa-views');
const path = require('path');

// 配置视图
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 渲染视图
router.get('/', async (ctx) => {
    await ctx.render('index', {
        title: '首页',
        users: ['张三', '李四', '王五']
    });
});
```

### 2. 静态文件

```javascript
const serve = require('koa-static');

// 静态文件服务
app.use(serve(path.join(__dirname, 'public')));

// 多个静态目录
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, 'uploads')));
```

## 数据库集成

### 1. MongoDB 集成

```javascript
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 用户模型
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

// 用户路由
router.post('/users', async (ctx) => {
    const user = await User.create(ctx.request.body);
    ctx.body = user;
});
```

### 2. MySQL 集成

```javascript
const mysql = require('mysql2/promise');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
});

// 查询示例
router.get('/users', async (ctx) => {
    const [rows] = await pool.query('SELECT * FROM users');
    ctx.body = rows;
});
```

## 练习

1. 创建 RESTful API
2. 实现用户认证
3. 构建文件上传系统
