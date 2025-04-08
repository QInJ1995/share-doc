# Web 开发基础

## HTTP 协议

### 1. HTTP 方法

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            handleGet(req, res);
            break;
        case 'POST':
            handlePost(req, res);
            break;
        case 'PUT':
            handlePut(req, res);
            break;
        case 'DELETE':
            handleDelete(req, res);
            break;
        default:
            res.statusCode = 405;
            res.end('Method Not Allowed');
    }
});
```

### 2. 请求处理

```javascript
function handleGet(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET 请求成功' }));
}

function handlePost(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'POST 请求成功', data }));
    });
}
```

## RESTful API

### 1. 路由设计

```javascript
const express = require('express');
const app = express();

// 用户资源
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUser);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// 文章资源
app.get('/api/posts', getPosts);
app.get('/api/posts/:id', getPost);
app.post('/api/posts', createPost);
app.put('/api/posts/:id', updatePost);
app.delete('/api/posts/:id', deletePost);
```

### 2. 状态码

```javascript
// 成功响应
res.status(200).json({ message: '成功' });
res.status(201).json({ message: '创建成功' });
res.status(204).send();

// 客户端错误
res.status(400).json({ error: '请求错误' });
res.status(401).json({ error: '未授权' });
res.status(403).json({ error: '禁止访问' });
res.status(404).json({ error: '未找到' });

// 服务器错误
res.status(500).json({ error: '服务器错误' });
res.status(503).json({ error: '服务不可用' });
```

## WebSocket

### 1. 基本设置

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('新客户端连接');

    ws.on('message', (message) => {
        console.log('收到消息:', message);
        // 广播消息给所有客户端
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('客户端断开连接');
    });
});
```

### 2. 客户端示例

```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('连接成功');
    ws.send('Hello Server!');
};

ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
};

ws.onclose = () => {
    console.log('连接关闭');
};
```

## 中间件机制

### 1. 自定义中间件

```javascript
const express = require('express');
const app = express();

// 日志中间件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 认证中间件
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: '未授权' });
    }
    // 验证 token
    next();
};

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器错误' });
});
```

### 2. 常用中间件

```javascript
const express = require('express');
const app = express();

// 解析 JSON
app.use(express.json());

// 解析 URL 编码
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
```

## 安全最佳实践

### 1. 输入验证

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
], createUser);
```

### 2. XSS 防护

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 3. CSRF 防护

```javascript
const csrf = require('csurf');
app.use(csrf({ cookie: true }));
```

## 练习

1. 实现一个简单的 RESTful API
2. 创建一个实时聊天应用
3. 实现用户认证中间件
