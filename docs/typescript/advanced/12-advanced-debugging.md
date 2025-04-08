# 第十二章：高级调试技巧

## 调试工具配置

### 1. VS Code 调试配置

```typescript
// .vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug TypeScript",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/src/index.ts",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"],
            "sourceMaps": true
        },
        {
            "type": "chrome",
            "request": "launch",
            "name": "Debug Frontend",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}",
            "sourceMapPathOverrides": {
                "webpack:///src/*": "${webRoot}/src/*"
            }
        }
    ]
}
```

### 2. Chrome DevTools 配置

```typescript
// 启用源码映射
// tsconfig.json
{
    "compilerOptions": {
        "sourceMap": true,
        "inlineSourceMap": false,
        "inlineSources": true
    }
}

// 调试工具函数
class DebugTools {
    static enableSourceMaps(): void {
        if (process.env.NODE_ENV === 'development') {
            process.env.NODE_OPTIONS = '--inspect';
        }
    }

    static setBreakpoint(file: string, line: number): void {
        if (process.env.NODE_ENV === 'development') {
            debugger;
        }
    }
}
```

## 断点调试

### 1. 条件断点

```typescript
class UserService {
    async getUser(id: number): Promise<User> {
        // 条件断点：只在用户年龄大于18时触发
        if (process.env.NODE_ENV === 'development') {
            const user = await this.userRepository.findById(id);
            if (user.age > 18) {
                debugger;
            }
        }
        return this.userRepository.findById(id);
    }

    async getUsers(): Promise<User[]> {
        // 条件断点：只在用户列表长度大于100时触发
        const users = await this.userRepository.findAll();
        if (process.env.NODE_ENV === 'development' && users.length > 100) {
            debugger;
        }
        return users;
    }
}
```

### 2. 日志断点

```typescript
class Logger {
    private static instance: Logger;
    private logs: string[] = [];

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    getLogs(): string[] {
        return [...this.logs];
    }

    clear(): void {
        this.logs = [];
    }
}

// 使用示例
class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body);
            Logger.getInstance().log(`User created: ${user.id}`);
            res.status(201).json(user);
        } catch (error) {
            Logger.getInstance().log(error.message, 'error');
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
}
```

## 错误处理

### 1. 错误捕获

```typescript
class ErrorBoundary {
    private static instance: ErrorBoundary;
    private handlers: Map<string, (error: Error) => void> = new Map();

    private constructor() {}

    static getInstance(): ErrorBoundary {
        if (!ErrorBoundary.instance) {
            ErrorBoundary.instance = new ErrorBoundary();
        }
        return ErrorBoundary.instance;
    }

    registerHandler(type: string, handler: (error: Error) => void): void {
        this.handlers.set(type, handler);
    }

    handleError(error: Error): void {
        const handler = this.handlers.get(error.name);
        if (handler) {
            handler(error);
        } else {
            console.error('Unhandled error:', error);
        }
    }
}

// 使用示例
class App {
    constructor() {
        const errorBoundary = ErrorBoundary.getInstance();
        
        errorBoundary.registerHandler('ValidationError', (error) => {
            console.error('Validation failed:', error.message);
        });

        errorBoundary.registerHandler('NetworkError', (error) => {
            console.error('Network error:', error.message);
        });
    }
}
```

### 2. 自定义错误类

```typescript
class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}

class NetworkError extends AppError {
    constructor(message: string) {
        super(message, 'NETWORK_ERROR', 503);
        this.name = 'NetworkError';
    }
}

// 使用示例
class UserService {
    async createUser(data: CreateUserDto): Promise<User> {
        if (!data.email) {
            throw new ValidationError('Email is required');
        }

        try {
            return await this.userRepository.create(data);
        } catch (error) {
            if (error instanceof NetworkError) {
                throw new NetworkError('Failed to connect to database');
            }
            throw error;
        }
    }
}
```

## 性能分析

### 1. 性能测量

```typescript
class PerformanceProfiler {
    private static instance: PerformanceProfiler;
    private measurements: Map<string, number[]> = new Map();

    private constructor() {}

    static getInstance(): PerformanceProfiler {
        if (!PerformanceProfiler.instance) {
            PerformanceProfiler.instance = new PerformanceProfiler();
        }
        return PerformanceProfiler.instance;
    }

    startMeasure(name: string): void {
        performance.mark(`${name}-start`);
    }

    endMeasure(name: string): void {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const entries = performance.getEntriesByName(name);
        const duration = entries[entries.length - 1].duration;
        
        if (!this.measurements.has(name)) {
            this.measurements.set(name, []);
        }
        this.measurements.get(name)!.push(duration);
    }

    getMeasurements(): Record<string, number[]> {
        return Object.fromEntries(this.measurements);
    }

    clear(): void {
        this.measurements.clear();
    }
}
```

### 2. 内存分析

```typescript
class MemoryProfiler {
    private static instance: MemoryProfiler;
    private snapshots: Map<string, number> = new Map();

    private constructor() {
        this.startMonitoring();
    }

    static getInstance(): MemoryProfiler {
        if (!MemoryProfiler.instance) {
            MemoryProfiler.instance = new MemoryProfiler();
        }
        return MemoryProfiler.instance;
    }

    private startMonitoring(): void {
        setInterval(() => {
            this.takeSnapshot();
        }, 5000);
    }

    takeSnapshot(): void {
        if (global.gc) {
            global.gc();
        }
        const used = process.memoryUsage().heapUsed;
        this.snapshots.set(new Date().toISOString(), used);
    }

    getSnapshots(): Record<string, number> {
        return Object.fromEntries(this.snapshots);
    }

    detectMemoryLeak(): void {
        const snapshots = Array.from(this.snapshots.values());
        if (snapshots.length >= 2) {
            const growth = snapshots[snapshots.length - 1] - snapshots[0];
            if (growth > 100 * 1024 * 1024) { // 100MB
                console.warn('Potential memory leak detected');
            }
        }
    }
}
```

## 调试技巧

### 1. 类型断言调试

```typescript
class TypeDebugger {
    static inspect<T>(value: unknown, type: string): T {
        console.log(`Type: ${type}`);
        console.log('Value:', value);
        return value as T;
    }

    static trace<T>(value: T, label: string = 'Value'): T {
        console.log(`${label}:`, value);
        return value;
    }
}

// 使用示例
class UserService {
    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        return TypeDebugger.inspect<User>(user, 'User');
    }
}
```

### 2. 调试工具函数

```typescript
class DebugUtils {
    static inspect(value: unknown): void {
        console.log('Type:', typeof value);
        console.log('Value:', value);
        if (typeof value === 'object' && value !== null) {
            console.log('Keys:', Object.keys(value));
            console.log('Prototype:', Object.getPrototypeOf(value));
        }
    }

    static trace(label: string): MethodDecorator {
        return function (
            target: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                console.log(`Entering ${label}`);
                console.log('Arguments:', args);
                const result = originalMethod.apply(this, args);
                console.log('Result:', result);
                console.log(`Exiting ${label}`);
                return result;
            };

            return descriptor;
        };
    }

    static time(label: string): MethodDecorator {
        return function (
            target: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                const start = performance.now();
                const result = originalMethod.apply(this, args);
                const end = performance.now();
                console.log(`${label} took ${end - start}ms`);
                return result;
            };

            return descriptor;
        };
    }
}
```

## 调试最佳实践

### 1. 结构化日志

```typescript
interface LogEntry {
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    data?: any;
}

class StructuredLogger {
    private static instance: StructuredLogger;
    private logs: LogEntry[] = [];

    private constructor() {}

    static getInstance(): StructuredLogger {
        if (!StructuredLogger.instance) {
            StructuredLogger.instance = new StructuredLogger();
        }
        return StructuredLogger.instance;
    }

    log(level: LogEntry['level'], message: string, data?: any): void {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data
        };
        this.logs.push(entry);
        console.log(JSON.stringify(entry, null, 2));
    }

    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    clear(): void {
        this.logs = [];
    }
}
```

### 2. 调试配置管理

```typescript
interface DebugConfig {
    enabled: boolean;
    logLevel: 'info' | 'warn' | 'error' | 'debug';
    breakpoints: string[];
    performanceMonitoring: boolean;
    memoryMonitoring: boolean;
}

class DebugConfigManager {
    private static instance: DebugConfigManager;
    private config: DebugConfig = {
        enabled: process.env.NODE_ENV === 'development',
        logLevel: 'info',
        breakpoints: [],
        performanceMonitoring: true,
        memoryMonitoring: true
    };

    private constructor() {}

    static getInstance(): DebugConfigManager {
        if (!DebugConfigManager.instance) {
            DebugConfigManager.instance = new DebugConfigManager();
        }
        return DebugConfigManager.instance;
    }

    getConfig(): DebugConfig {
        return { ...this.config };
    }

    updateConfig(partial: Partial<DebugConfig>): void {
        this.config = { ...this.config, ...partial };
    }

    isEnabled(): boolean {
        return this.config.enabled;
    }

    shouldBreak(label: string): boolean {
        return this.config.enabled && this.config.breakpoints.includes(label);
    }
}
```

### 本章小结

- 学习了调试工具配置和使用
- 掌握了断点调试和日志记录
- 了解了错误处理和自定义错误类
- 熟悉了性能分析和内存监控
- 学习了调试技巧和工具函数
- 掌握了调试最佳实践和配置管理

在下一章中，我们将学习 TypeScript 中的高级测试技巧。 