# Express.js

## 基础概念

### 1. 应用创建

```javascript
const express = require('express');
const app = express();

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
```

### 2. 路由处理

```javascript
// 基本路由
app.get('/', (req, res) => {
    res.send('首页');
});

app.post('/api/users', (req, res) => {
    res.json({ message: '创建用户' });
});

// 路由参数
app.get('/users/:id', (req, res) => {
    res.send(`用户 ID: ${req.params.id}`);
});

// 查询参数
app.get('/search', (req, res) => {
    res.send(`搜索关键词: ${req.query.q}`);
});
```

## 路由系统

### 1. 路由模块化

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('用户列表');
});

router.post('/', (req, res) => {
    res.send('创建用户');
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

### 2. 路由中间件

```javascript
// 路由级中间件
router.use((req, res, next) => {
    console.log('路由中间件');
    next();
});

// 特定路由中间件
router.get('/admin', (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('未授权');
    }
    next();
}, (req, res) => {
    res.send('管理页面');
});
```

## 中间件

### 1. 自定义中间件

```javascript
// 日志中间件
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误');
};

// 使用中间件
app.use(logger);
app.use(errorHandler);
```

### 2. 常用中间件

```javascript
// 跨域中间件
const cors = require('cors');
app.use(cors());

// 压缩中间件
const compression = require('compression');
app.use(compression());

// 安全中间件
const helmet = require('helmet');
app.use(helmet());

// 请求限制
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
```

## 错误处理

### 1. 错误处理中间件

```javascript
// 404 处理
app.use((req, res, next) => {
    res.status(404).send('页面未找到');
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误');
});

// 异步错误处理
app.get('/async', async (req, res, next) => {
    try {
        await someAsyncOperation();
        res.send('成功');
    } catch (err) {
        next(err);
    }
});
```

### 2. 错误类

```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// 使用错误类
app.get('/error', (req, res, next) => {
    next(new AppError('自定义错误', 400));
});
```

## 模板引擎

### 1. EJS 配置

```javascript
const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');

// 渲染视图
app.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        users: ['张三', '李四', '王五']
    });
});
```

### 2. 视图模板

```txt
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <ul>
        <% users.forEach(user => { %>
            <li><%= user %></li>
        <% }); %>
    </ul>
</body>
</html>
```

## 文件上传

### 1. Multer 配置

```javascript
const multer = require('multer');
const path = require('path');

// 配置文件存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('不支持的文件类型'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});
```

### 2. 上传处理

```javascript
// 单文件上传
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('文件上传成功');
});

// 多文件上传
app.post('/upload-multiple', upload.array('images', 5), (req, res) => {
    res.send('多个文件上传成功');
});
```

## 练习

1. 创建 RESTful API
2. 实现文件上传功能
3. 构建用户认证系统
