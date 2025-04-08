# 安全与认证

## 用户认证

### 1. 基本认证

```javascript
const express = require('express');
const app = express();

// 基本认证中间件
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('需要认证');
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];

    // 验证用户名和密码
    if (username === 'admin' && password === 'password') {
        next();
    } else {
        res.status(401).send('认证失败');
    }
};

app.use('/protected', basicAuth);
```

### 2. Session 认证

```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/myapp',
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));
```

## JWT

### 1. JWT 生成和验证

```javascript
const jwt = require('jsonwebtoken');

// 生成 JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// 验证 JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: '未提供令牌' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: '无效的令牌' });
    }
};
```

### 2. JWT 刷新令牌

```javascript
const refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const newToken = generateToken({ id: decoded.id, email: decoded.email });
        res.json({ token: newToken });
    } catch (err) {
        res.status(401).json({ error: '无效的刷新令牌' });
    }
};
```

## 密码加密

### 1. 密码哈希

```javascript
const bcrypt = require('bcrypt');

// 密码哈希
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// 密码验证
const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

// 使用示例
const user = {
    email: 'user@example.com',
    password: await hashPassword('password123')
};
```

### 2. 密码策略

```javascript
const passwordValidator = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar
    );
};
```

## 安全最佳实践

### 1. 请求限制

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 限制每个IP 100次请求
    message: '请求过于频繁，请稍后再试'
});

app.use('/api/', limiter);
```

### 2. 安全头部

```javascript
const helmet = require('helmet');

// 设置安全头部
app.use(helmet());

// 自定义 CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
    }
}));
```

### 3. XSS 防护

```javascript
const xss = require('xss');

// 清理用户输入
const sanitizeInput = (input) => {
    return xss(input, {
        whiteList: {
            a: ['href', 'title', 'target'],
            p: [],
            b: [],
            i: [],
            u: []
        }
    });
};

// 使用示例
app.post('/api/comment', (req, res) => {
    const comment = sanitizeInput(req.body.comment);
    // 保存评论
});
```

## 练习

1. 实现完整的用户认证系统
2. 创建安全的 API 端点
3. 实现密码重置功能
