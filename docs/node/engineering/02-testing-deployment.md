# 测试与部署

## 单元测试

### 1. Jest 配置

```javascript
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/__tests__/**',
    ],
};
```

### 2. 测试用例

```typescript
// src/services/user.service.ts
export class UserService {
    async createUser(userData: CreateUserDto): Promise<User> {
        // 实现创建用户的逻辑
    }

    async getUserById(id: number): Promise<User> {
        // 实现获取用户的逻辑
    }
}

// src/services/__tests__/user.service.spec.ts
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: CreateUserDto = {
                name: '张三',
                email: 'zhangsan@example.com',
                password: 'password123'
            };

            const user = await userService.createUser(userData);

            expect(user).toBeDefined();
            expect(user.name).toBe(userData.name);
            expect(user.email).toBe(userData.email);
        });
    });

    describe('getUserById', () => {
        it('should return user by id', async () => {
            const userId = 1;
            const user = await userService.getUserById(userId);

            expect(user).toBeDefined();
            expect(user.id).toBe(userId);
        });
    });
});
```

## 集成测试

### 1. 测试设置

```typescript
// test/setup.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

export class TestApp {
    private app: INestApplication;

    async init() {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        this.app = moduleFixture.createNestApplication();
        await this.app.init();
        return this;
    }

    async close() {
        await this.app.close();
    }

    getHttpServer() {
        return this.app.getHttpServer();
    }
}
```

### 2. API 测试

```typescript
// test/api/users.e2e-spec.ts
import { TestApp } from './setup';
import * as request from 'supertest';

describe('Users API', () => {
    let testApp: TestApp;

    beforeAll(async () => {
        testApp = await new TestApp().init();
    });

    afterAll(async () => {
        await testApp.close();
    });

    describe('POST /api/users', () => {
        it('should create a new user', () => {
            const userData = {
                name: '张三',
                email: 'zhangsan@example.com',
                password: 'password123'
            };

            return request(testApp.getHttpServer())
                .post('/api/users')
                .send(userData)
                .expect(201)
                .expect(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body.name).toBe(userData.name);
                    expect(res.body.email).toBe(userData.email);
                });
        });
    });
});
```

## CI/CD

### 1. GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Run linting
      run: npm run lint
      
    - name: Upload coverage
      uses: codecov/codecov-action@v1
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
```

### 2. Docker 部署

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

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    depends_on:
      - db

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 部署策略

### 1. 环境配置

```typescript
// src/config/configuration.ts
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
});
```

### 2. 部署脚本

```bash
#!/bin/bash
# deploy.sh

# 拉取最新代码
git pull origin main

# 安装依赖
npm ci

# 构建应用
npm run build

# 运行数据库迁移
npm run migration:run

# 重启应用
pm2 restart app
```

## 监控和日志

### 1. 日志配置

```typescript
// src/config/logger.config.ts
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig: WinstonModuleOptions = {
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ],
};
```

### 2. 性能监控

```typescript
// src/monitoring/performance.monitor.ts
import { Injectable } from '@nestjs/common';
import * as promClient from 'prom-client';

@Injectable()
export class PerformanceMonitor {
    private httpRequestDuration: promClient.Histogram;
    private activeConnections: promClient.Gauge;

    constructor() {
        this.httpRequestDuration = new promClient.Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
        });

        this.activeConnections = new promClient.Gauge({
            name: 'active_connections',
            help: 'Number of active connections',
        });
    }

    recordRequestDuration(method: string, route: string, statusCode: number, duration: number) {
        this.httpRequestDuration.observe(
            { method, route, status_code: statusCode },
            duration
        );
    }

    updateActiveConnections(count: number) {
        this.activeConnections.set(count);
    }
}
```

## 练习

1. 编写单元测试
2. 配置 CI/CD 流程
3. 实现 Docker 部署
