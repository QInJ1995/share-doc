# 待办事项应用

## 项目概述

一个基于 Express.js 和 MongoDB 的待办事项应用，支持用户注册、登录、创建、更新、删除待办事项等功能。

## 技术栈

- 后端框架：Express.js
- 数据库：MongoDB
- 认证：JWT
- 工具：TypeScript, ESLint, Prettier

## 项目结构

```
todo-app/
├── src/
│   ├── config/           # 配置文件
│   ├── controllers/      # 控制器
│   ├── middleware/       # 中间件
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── services/        # 业务逻辑
│   ├── types/           # 类型定义
│   └── utils/           # 工具函数
├── tests/               # 测试文件
├── .env                 # 环境变量
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── package.json        # 项目配置
└── tsconfig.json       # TypeScript 配置
```

## 实现步骤

### 1. 项目初始化

```bash
# 创建项目目录
mkdir todo-app
cd todo-app

# 初始化项目
npm init -y

# 安装依赖
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install -D typescript @types/express @types/node @types/mongoose @types/bcryptjs @types/jsonwebtoken @types/cors ts-node-dev
```

### 2. TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. 环境变量配置

```txt
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-secret-key
```

### 4. 数据模型

```typescript
// src/models/user.model.ts
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);

// src/models/todo.model.ts
import mongoose, { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
```

### 5. 中间件

```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: '请先登录' });
  }
};
```

### 6. 控制器

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: '用户名或邮箱已存在' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: '注册失败' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: '登录失败' });
  }
};

// src/controllers/todo.controller.ts
import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user._id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: '创建待办事项失败' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: '获取待办事项失败' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: '待办事项不存在' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: '更新待办事项失败' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!todo) {
      return res.status(404).json({ error: '待办事项不存在' });
    }
    
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: '删除待办事项失败' });
  }
};
```

### 7. 路由

```typescript
// src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;

// src/routes/todo.routes.ts
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller';

const router = Router();

router.use(auth);

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
```

### 8. 主应用

```typescript
// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';

dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 数据库连接
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('已连接到 MongoDB'))
  .catch(error => console.error('MongoDB 连接失败:', error));

// 错误处理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
```

### 9. 测试用例

```typescript
// tests/auth.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import { User } from '../src/models/user.model';

describe('认证接口测试', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('应该成功注册新用户', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('username', 'testuser');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
    });

    it('应该成功登录', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
```

## 部署

### 1. Docker 配置

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Docker Compose 配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://db:27017/todo-app
      - JWT_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## 性能优化

1. 添加缓存
2. 实现分页
3. 优化查询
4. 添加索引
