# 实时聊天应用

## 项目概述

一个基于 Socket.IO 和 Redis 的实时聊天应用，支持多房间、私聊、在线状态等功能。

## 技术栈

- 后端框架：Express.js
- 实时通信：Socket.IO
- 消息队列：Redis
- 数据库：MongoDB
- 工具：TypeScript, ESLint, Prettier

## 项目结构

```
chat-app/
├── src/
│   ├── config/           # 配置文件
│   ├── controllers/      # 控制器
│   ├── middleware/       # 中间件
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── services/        # 业务逻辑
│   ├── socket/          # Socket.IO 处理
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
mkdir chat-app
cd chat-app

# 初始化项目
npm init -y

# 安装依赖
npm install express socket.io redis mongoose dotenv bcryptjs jsonwebtoken cors
npm install -D typescript @types/express @types/node @types/mongoose @types/bcryptjs @types/jsonwebtoken @types/cors @types/socket.io ts-node-dev
```

### 2. 数据模型

```typescript
// src/models/user.model.ts
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen: Date;
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
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  lastSeen: {
    type: Date,
    default: Date.now
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

// src/models/room.model.ts
import mongoose, { Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  description?: string;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  isPrivate: boolean;
}

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPrivate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Room = mongoose.model<IRoom>('Room', roomSchema);

// src/models/message.model.ts
import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  sender: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  type: 'text' | 'image' | 'file';
  metadata?: any;
}

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);
```

### 3. Redis 服务

```typescript
// src/services/redis.service.ts
import Redis from 'redis';
import { promisify } from 'util';

export class RedisService {
    private static instance: RedisService;
    private client: Redis.RedisClient;

    private constructor() {
        this.client = Redis.createClient({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379')
        });

        this.client.on('error', (error) => {
            console.error('Redis 连接错误:', error);
        });
    }

    static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        const setAsync = promisify(this.client.set).bind(this.client);
        await setAsync(key, value);
        if (ttl) {
            const expireAsync = promisify(this.client.expire).bind(this.client);
            await expireAsync(key, ttl);
        }
    }

    async get(key: string): Promise<string | null> {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    async del(key: string): Promise<void> {
        const delAsync = promisify(this.client.del).bind(this.client);
        await delAsync(key);
    }

    async publish(channel: string, message: string): Promise<void> {
        const publishAsync = promisify(this.client.publish).bind(this.client);
        await publishAsync(channel, message);
    }

    async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
        this.client.subscribe(channel);
        this.client.on('message', (ch, message) => {
            if (ch === channel) {
                callback(message);
            }
        });
    }
}
```

### 4. Socket.IO 服务

```typescript
// src/socket/socket.service.ts
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { RedisService } from '../services/redis.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

export class SocketService {
    private static instance: SocketService;
    private io: Server;
    private redis: RedisService;

    private constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: process.env.CLIENT_URL || 'http://localhost:3000',
                methods: ['GET', 'POST']
            }
        });
        this.redis = RedisService.getInstance();
        this.setupSocketHandlers();
    }

    static getInstance(httpServer: HttpServer): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService(httpServer);
        }
        return SocketService.instance;
    }

    private setupSocketHandlers(): void {
        this.io.use(async (socket: Socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                if (!token) {
                    return next(new Error('认证失败'));
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
                const user = await User.findById(decoded.id);
                if (!user) {
                    return next(new Error('用户不存在'));
                }

                socket.data.user = user;
                next();
            } catch (error) {
                next(new Error('认证失败'));
            }
        });

        this.io.on('connection', (socket: Socket) => {
            const user = socket.data.user;
            console.log(`用户 ${user.username} 已连接`);

            // 加入房间
            socket.on('join_room', async (roomId: string) => {
                socket.join(roomId);
                await this.redis.set(`user:${user._id}:room`, roomId);
                this.io.to(roomId).emit('user_joined', {
                    userId: user._id,
                    username: user.username
                });
            });

            // 发送消息
            socket.on('send_message', async (data: {
                roomId: string;
                content: string;
                type: 'text' | 'image' | 'file';
                metadata?: any;
            }) => {
                const message = new Message({
                    content: data.content,
                    sender: user._id,
                    room: data.roomId,
                    type: data.type,
                    metadata: data.metadata
                });
                await message.save();

                this.io.to(data.roomId).emit('new_message', {
                    message,
                    sender: {
                        id: user._id,
                        username: user.username,
                        avatar: user.avatar
                    }
                });
            });

            // 私聊消息
            socket.on('private_message', async (data: {
                recipientId: string;
                content: string;
                type: 'text' | 'image' | 'file';
                metadata?: any;
            }) => {
                const recipientSocket = await this.redis.get(`user:${data.recipientId}:socket`);
                if (recipientSocket) {
                    const message = new Message({
                        content: data.content,
                        sender: user._id,
                        room: null,
                        type: data.type,
                        metadata: data.metadata
                    });
                    await message.save();

                    this.io.to(recipientSocket).emit('private_message', {
                        message,
                        sender: {
                            id: user._id,
                            username: user.username,
                            avatar: user.avatar
                        }
                    });
                }
            });

            // 断开连接
            socket.on('disconnect', async () => {
                const roomId = await this.redis.get(`user:${user._id}:room`);
                if (roomId) {
                    this.io.to(roomId).emit('user_left', {
                        userId: user._id,
                        username: user.username
                    });
                    await this.redis.del(`user:${user._id}:room`);
                }
                await this.redis.del(`user:${user._id}:socket`);
            });
        });
    }

    getIO(): Server {
        return this.io;
    }
}
```

### 5. 控制器

```typescript
// src/controllers/room.controller.ts
import { Request, Response } from 'express';
import { Room } from '../models/room.model';

export const createRoom = async (req: Request, res: Response) => {
    try {
        const room = new Room({
            name: req.body.name,
            description: req.body.description,
            creator: req.user._id,
            members: [req.user._id],
            isPrivate: req.body.isPrivate || false
        });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: '创建房间失败' });
    }
};

export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find({
            $or: [
                { isPrivate: false },
                { members: req.user._id }
            ]
        }).populate('creator', 'username avatar');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: '获取房间列表失败' });
    }
};

export const joinRoom = async (req: Request, res: Response) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: '房间不存在' });
        }

        if (room.isPrivate && !room.members.includes(req.user._id)) {
            return res.status(403).json({ error: '无权加入此房间' });
        }

        if (!room.members.includes(req.user._id)) {
            room.members.push(req.user._id);
            await room.save();
        }

        res.json(room);
    } catch (error) {
        res.status(400).json({ error: '加入房间失败' });
    }
};

// src/controllers/message.controller.ts
import { Request, Response } from 'express';
import { Message } from '../models/message.model';

export const getRoomMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ room: req.params.roomId })
            .populate('sender', 'username avatar')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: '获取消息历史失败' });
    }
};

export const getPrivateMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({
            room: null,
            $or: [
                { sender: req.user._id },
                { 'metadata.recipient': req.user._id }
            ]
        })
            .populate('sender', 'username avatar')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: '获取私聊消息失败' });
    }
};
```

### 6. 路由

```typescript
// src/routes/room.routes.ts
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
    createRoom,
    getRooms,
    joinRoom
} from '../controllers/room.controller';

const router = Router();

router.use(auth);

router.post('/', createRoom);
router.get('/', getRooms);
router.post('/:id/join', joinRoom);

export default router;

// src/routes/message.routes.ts
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
    getRoomMessages,
    getPrivateMessages
} from '../controllers/message.controller';

const router = Router();

router.use(auth);

router.get('/room/:roomId', getRoomMessages);
router.get('/private', getPrivateMessages);

export default router;
```

### 7. 主应用

```typescript
// src/app.ts
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { SocketService } from './socket/socket.service';
import roomRoutes from './routes/room.routes';
import messageRoutes from './routes/message.routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

// 数据库连接
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('已连接到 MongoDB'))
    .catch(error => console.error('MongoDB 连接失败:', error));

// Socket.IO 服务
SocketService.getInstance(httpServer);

// 错误处理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
```

### 8. 测试用例

```typescript
// tests/socket.test.ts
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { io as Client } from 'socket.io-client';
import { app } from '../src/app';
import { SocketService } from '../src/socket/socket.service';
import { User } from '../src/models/user.model';
import jwt from 'jsonwebtoken';

describe('Socket.IO 测试', () => {
    let httpServer: any;
    let socketService: SocketService;
    let clientSocket: any;
    let port: number;

    beforeAll((done) => {
        httpServer = createServer(app);
        socketService = SocketService.getInstance(httpServer);
        httpServer.listen(() => {
            port = (httpServer.address() as AddressInfo).port;
            done();
        });
    });

    afterAll(() => {
        httpServer.close();
    });

    beforeEach((done) => {
        const token = jwt.sign(
            { id: 'test-user-id' },
            process.env.JWT_SECRET!
        );
        clientSocket = Client(`http://localhost:${port}`, {
            auth: { token }
        });
        clientSocket.on('connect', done);
    });

    afterEach(() => {
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }
    });

    it('应该成功连接', () => {
        expect(clientSocket.connected).toBe(true);
    });

    it('应该成功加入房间', (done) => {
        const roomId = 'test-room';
        clientSocket.emit('join_room', roomId);
        
        clientSocket.on('user_joined', (data: any) => {
            expect(data.userId).toBe('test-user-id');
            done();
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
      - MONGODB_URI=mongodb://db:27017/chat-app
      - REDIS_HOST=redis
      - JWT_SECRET=your-secret-key
    depends_on:
      - db
      - redis

  db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:latest
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

## 性能优化

1. 消息分页加载
2. Redis 缓存
3. 消息压缩
4. 连接池优化

## 下一步

- 添加文件上传
- 实现消息撤回
- 添加表情支持
- 集成第三方服务 