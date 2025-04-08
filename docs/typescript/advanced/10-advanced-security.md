# 第十章：高级安全编程

## 输入验证

### 1. 类型验证

```typescript
// 类型验证工具
class TypeValidator {
    static isString(value: unknown): value is string {
        return typeof value === 'string';
    }

    static isNumber(value: unknown): value is number {
        return typeof value === 'number' && !isNaN(value);
    }

    static isBoolean(value: unknown): value is boolean {
        return typeof value === 'boolean';
    }

    static isArray<T>(value: unknown, itemValidator: (item: unknown) => item is T): value is T[] {
        return Array.isArray(value) && value.every(itemValidator);
    }

    static isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null;
    }
}

// 使用示例
interface UserInput {
    name: string;
    age: number;
    hobbies: string[];
}

function validateUserInput(input: unknown): input is UserInput {
    if (!TypeValidator.isObject(input)) {
        return false;
    }

    return (
        TypeValidator.isString(input.name) &&
        TypeValidator.isNumber(input.age) &&
        TypeValidator.isArray(input.hobbies, TypeValidator.isString)
    );
}
```

### 2. 数据验证

```typescript
// 数据验证装饰器
function ValidateEmail() {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];

        const getter = () => value;
        const setter = (newValue: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newValue)) {
                throw new Error('Invalid email format');
            }
            value = newValue;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

// 使用示例
class User {
    @ValidateEmail()
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}
```

## 数据加密

### 1. 密码加密

```typescript
import * as bcrypt from 'bcrypt';

class PasswordService {
    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}

// 使用示例
class UserService {
    async createUser(userData: CreateUserDto): Promise<User> {
        const hashedPassword = await PasswordService.hashPassword(userData.password);
        return this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        const isValid = await PasswordService.verifyPassword(password, user.password);
        return isValid ? user : null;
    }
}
```

### 2. 数据加密

```typescript
import * as crypto from 'crypto';

class EncryptionService {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly KEY_LENGTH = 32;
    private static readonly IV_LENGTH = 16;

    static encrypt(data: string, key: Buffer): { encrypted: string; iv: string; tag: string } {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return {
            encrypted,
            iv: iv.toString('hex'),
            tag: cipher.getAuthTag().toString('hex')
        };
    }

    static decrypt(encrypted: string, key: Buffer, iv: string, tag: string): string {
        const decipher = crypto.createDecipheriv(
            this.ALGORITHM,
            key,
            Buffer.from(iv, 'hex')
        );
        decipher.setAuthTag(Buffer.from(tag, 'hex'));

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}
```

## 安全配置

### 1. 环境变量

```typescript
// config.ts
import * as dotenv from 'dotenv';
import { z } from 'zod';

// 加载环境变量
dotenv.config();

// 环境变量模式
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().transform(Number),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
    API_KEY: z.string().min(32)
});

// 验证环境变量
const parseEnvVars = () => {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Invalid environment variables:', error.errors);
        }
        process.exit(1);
    }
};

export const config = parseEnvVars();
```

### 2. 安全中间件

```typescript
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// 安全中间件配置
const securityMiddleware = {
    // 基本安全头
    helmet: helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'", 'https://api.example.com']
            }
        },
        crossOriginEmbedderPolicy: false
    }),

    // 速率限制
    rateLimit: rateLimit({
        windowMs: 15 * 60 * 1000, // 15分钟
        max: 100, // 限制每个IP 100次请求
        message: 'Too many requests from this IP, please try again later.'
    }),

    // CORS配置
    cors: cors({
        origin: process.env.NODE_ENV === 'production'
            ? 'https://example.com'
            : 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
};

// 使用示例
app.use(securityMiddleware.helmet);
app.use(securityMiddleware.rateLimit);
app.use(securityMiddleware.cors);
```

## 认证和授权

### 1. JWT 认证

```typescript
import * as jwt from 'jsonwebtoken';
import { config } from './config';

class JWTService {
    static generateToken(payload: any): string {
        return jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: '24h'
        });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, config.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

// JWT中间件
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = JWTService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
```

### 2. 角色基础访问控制

```typescript
enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR'
}

// 角色装饰器
function RequireRole(role: Role) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const req = args[0];
            if (!req.user || req.user.role !== role) {
                throw new Error('Unauthorized');
            }
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

// 使用示例
class UserController {
    @RequireRole(Role.ADMIN)
    async deleteUser(req: Request, res: Response) {
        // 只有管理员可以删除用户
        const userId = req.params.id;
        await this.userService.deleteUser(userId);
        res.status(204).send();
    }

    @RequireRole(Role.MODERATOR)
    async updateUser(req: Request, res: Response) {
        // 管理员和版主可以更新用户
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await this.userService.updateUser(userId, userData);
        res.json(updatedUser);
    }
}
```

## 安全最佳实践

### 1. 输入清理

```typescript
import * as sanitizeHtml from 'sanitize-html';

class InputSanitizer {
    static sanitizeHtml(html: string): string {
        return sanitizeHtml(html, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                'a': ['href']
            }
        });
    }

    static sanitizeObject<T extends Record<string, any>>(obj: T): T {
        const sanitized: Partial<T> = {};
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key as keyof T] = this.sanitizeHtml(value) as T[keyof T];
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key as keyof T] = this.sanitizeObject(value) as T[keyof T];
            } else {
                sanitized[key as keyof T] = value as T[keyof T];
            }
        }

        return sanitized as T;
    }
}
```

### 2. 错误处理

```typescript
class SecurityError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number = 403
    ) {
        super(message);
        this.name = 'SecurityError';
    }
}

// 错误处理中间件
const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof SecurityError) {
        return res.status(error.status).json({
            error: error.code,
            message: error.message
        });
    }

    // 生产环境中不暴露内部错误
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
            error: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred'
        });
    }

    return res.status(500).json({
        error: error.name,
        message: error.message,
        stack: error.stack
    });
};
```

### 本章小结

- 学习了输入验证和类型检查
- 掌握了数据加密和密码处理
- 了解了安全配置和环境变量管理
- 熟悉了认证和授权机制
- 学习了安全最佳实践和错误处理

在下一章中，我们将学习 TypeScript 中的高级性能优化。 