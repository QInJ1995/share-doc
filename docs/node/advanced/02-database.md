# 数据库集成

## MongoDB

### 1. 连接设置

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', () => {
    console.log('数据库连接成功');
});
```

### 2. 模型定义

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

### 3. CRUD 操作

```javascript
// 创建
const user = new User({
    name: '张三',
    email: 'zhangsan@example.com',
    age: 25
});
await user.save();

// 查询
const users = await User.find({ age: { $gt: 20 } });

// 更新
await User.updateOne(
    { email: 'zhangsan@example.com' },
    { $set: { age: 26 } }
);

// 删除
await User.deleteOne({ email: 'zhangsan@example.com' });
```

## MySQL

### 1. 连接设置

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```

### 2. 查询操作

```javascript
// 创建表
const createTable = `
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

// 插入数据
const insertUser = `
    INSERT INTO users (name, email, age)
    VALUES (?, ?, ?)
`;

// 查询数据
const getUsers = `
    SELECT * FROM users WHERE age > ?
`;

// 更新数据
const updateUser = `
    UPDATE users SET age = ? WHERE email = ?
`;

// 删除数据
const deleteUser = `
    DELETE FROM users WHERE email = ?
`;
```

### 3. 事务处理

```javascript
const connection = await pool.getConnection();
try {
    await connection.beginTransaction();
    
    await connection.execute(insertUser, ['张三', 'zhangsan@example.com', 25]);
    await connection.execute(insertUser, ['李四', 'lisi@example.com', 30]);
    
    await connection.commit();
} catch (err) {
    await connection.rollback();
    throw err;
} finally {
    connection.release();
}
```

## Redis

### 1. 连接设置

```javascript
const Redis = require('ioredis');
const redis = new Redis({
    host: 'localhost',
    port: 6379,
    password: 'password'
});

redis.on('connect', () => {
    console.log('Redis 连接成功');
});
```

### 2. 基本操作

```javascript
// 字符串操作
await redis.set('key', 'value');
const value = await redis.get('key');

// 哈希操作
await redis.hset('user:1', {
    name: '张三',
    age: '25',
    email: 'zhangsan@example.com'
});
const user = await redis.hgetall('user:1');

// 列表操作
await redis.lpush('list', 'item1', 'item2');
const items = await redis.lrange('list', 0, -1);

// 集合操作
await redis.sadd('set', 'member1', 'member2');
const members = await redis.smembers('set');
```

### 3. 缓存策略

```javascript
// 设置缓存
async function setCache(key, value, ttl = 3600) {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
}

// 获取缓存
async function getCache(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
}

// 删除缓存
async function deleteCache(key) {
    await redis.del(key);
}
```

## 数据库设计

### 1. 关系设计

```javascript
// 一对多关系
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// 多对多关系
const userSchema = new mongoose.Schema({
    name: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});
```

### 2. 索引优化

```javascript
// MongoDB 索引
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ age: 1, createdAt: -1 });

// MySQL 索引
const createIndex = `
    CREATE INDEX idx_email ON users(email);
    CREATE INDEX idx_age_created ON users(age, created_at);
`;
```

### 3. 查询优化

```javascript
// MongoDB 查询优化
const users = await User.find()
    .select('name email')
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

// MySQL 查询优化
const optimizedQuery = `
    SELECT name, email
    FROM users
    ORDER BY created_at DESC
    LIMIT 10
`;
```

## 练习

1. 实现用户认证系统
2. 创建博客文章系统
3. 实现实时数据缓存
