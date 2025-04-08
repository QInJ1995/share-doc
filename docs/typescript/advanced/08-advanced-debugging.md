# 第八章：高级调试技巧

## 调试工具配置

### 1. VS Code 调试配置

```json
// .vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "调试 TypeScript",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/src/index.ts",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"],
            "sourceMaps": true
        },
        {
            "type": "chrome",
            "request": "launch",
            "name": "调试前端应用",
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
// 配置 source map
// webpack.config.js
module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};

// 配置断点
function debugFunction() {
    debugger; // 自动断点
    console.log('Debug point');
}
```

## 断点调试

### 1. 条件断点

```typescript
class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        // 设置条件断点：user.age > 18
        if (user.age > 18) {
            this.users.push(user);
        }
    }

    removeUser(id: string): void {
        // 设置条件断点：this.users.length > 0
        if (this.users.length > 0) {
            this.users = this.users.filter(u => u.id !== id);
        }
    }
}
```

### 2. 日志断点

```typescript
class Logger {
    private static instance: Logger;
    private logs: string[] = [];

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string): void {
        // 设置日志断点
        console.log(`[${new Date().toISOString()}] ${message}`);
        this.logs.push(message);
    }

    error(message: string): void {
        // 设置错误日志断点
        console.error(`[ERROR] ${message}`);
        this.logs.push(`ERROR: ${message}`);
    }
}
```

## 错误处理

### 1. 错误捕获

```typescript
class ErrorBoundary {
    private static instance: ErrorBoundary;
    private errorHandlers: Map<string, (error: Error) => void> = new Map();

    static getInstance(): ErrorBoundary {
        if (!ErrorBoundary.instance) {
            ErrorBoundary.instance = new ErrorBoundary();
        }
        return ErrorBoundary.instance;
    }

    registerHandler(type: string, handler: (error: Error) => void): void {
        this.errorHandlers.set(type, handler);
    }

    handleError(error: Error, type: string = 'default'): void {
        const handler = this.errorHandlers.get(type);
        if (handler) {
            handler(error);
        } else {
            console.error('Unhandled error:', error);
        }
    }
}

// 使用示例
const errorBoundary = ErrorBoundary.getInstance();
errorBoundary.registerHandler('network', (error) => {
    console.error('Network error:', error);
});
```

### 2. 自定义错误类

```typescript
class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
    }
}

class NetworkError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 'NETWORK_ERROR', details);
        this.name = 'NetworkError';
    }
}

// 使用示例
try {
    throw new ValidationError('Invalid input', { field: 'email' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation failed:', error.details);
    }
}
```

## 性能分析

### 1. 性能测量

```typescript
class PerformanceProfiler {
    private measurements: Map<string, number[]> = new Map();

    startMeasure(name: string): void {
        if (!this.measurements.has(name)) {
            this.measurements.set(name, []);
        }
        this.measurements.get(name)!.push(performance.now());
    }

    endMeasure(name: string): number {
        const times = this.measurements.get(name);
        if (!times || times.length === 0) {
            throw new Error(`No measurement started for ${name}`);
        }
        const startTime = times.pop()!;
        return performance.now() - startTime;
    }

    getAverage(name: string): number {
        const times = this.measurements.get(name);
        if (!times || times.length === 0) {
            return 0;
        }
        return times.reduce((a, b) => a + b, 0) / times.length;
    }
}

// 使用示例
const profiler = new PerformanceProfiler();
profiler.startMeasure('operation');
// 执行操作
const duration = profiler.endMeasure('operation');
```

### 2. 内存分析

```typescript
class MemoryProfiler {
    private snapshots: number[] = [];

    takeSnapshot(): void {
        if (global.gc) {
            global.gc();
            const used = process.memoryUsage().heapUsed;
            this.snapshots.push(used);
        }
    }

    getAverageMemoryUsage(): number {
        if (this.snapshots.length === 0) {
            return 0;
        }
        return this.snapshots.reduce((a, b) => a + b, 0) / this.snapshots.length;
    }

    getMemoryLeak(): number {
        if (this.snapshots.length < 2) {
            return 0;
        }
        const first = this.snapshots[0];
        const last = this.snapshots[this.snapshots.length - 1];
        return last - first;
    }
}
```

## 调试技巧

### 1. 类型断言调试

```typescript
function debugType<T>(value: unknown): T {
    // 使用类型断言进行调试
    console.log('Type:', typeof value);
    console.log('Value:', value);
    return value as T;
}

// 使用示例
const result = debugType<string>('test');
const number = debugType<number>(42);
```

### 2. 调试工具函数

```typescript
class DebugUtils {
    static inspect<T>(value: T, label: string = 'Value'): T {
        console.log(`${label}:`, value);
        return value;
    }

    static trace<T>(value: T, label: string = 'Trace'): T {
        console.trace(`${label}:`, value);
        return value;
    }

    static time<T>(label: string, fn: () => T): T {
        console.time(label);
        const result = fn();
        console.timeEnd(label);
        return result;
    }
}

// 使用示例
const data = DebugUtils.inspect({ name: 'test' }, 'User Data');
const result = DebugUtils.time('Operation', () => {
    return Math.random() * 100;
});
```

## 调试最佳实践

### 1. 结构化日志

```typescript
interface LogEntry {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    data?: any;
}

class StructuredLogger {
    private logs: LogEntry[] = [];

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
        return this.logs;
    }
}

// 使用示例
const logger = new StructuredLogger();
logger.log('info', 'User logged in', { userId: 123 });
logger.log('error', 'Failed to fetch data', { error: 'Network timeout' });
```

### 2. 调试配置

```typescript
interface DebugConfig {
    enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    traceEnabled: boolean;
    performanceEnabled: boolean;
}

class DebugManager {
    private static instance: DebugManager;
    private config: DebugConfig = {
        enabled: false,
        logLevel: 'info',
        traceEnabled: false,
        performanceEnabled: false
    };

    static getInstance(): DebugManager {
        if (!DebugManager.instance) {
            DebugManager.instance = new DebugManager();
        }
        return DebugManager.instance;
    }

    setConfig(config: Partial<DebugConfig>): void {
        this.config = { ...this.config, ...config };
    }

    isEnabled(): boolean {
        return this.config.enabled;
    }

    shouldTrace(): boolean {
        return this.config.traceEnabled;
    }

    shouldMeasurePerformance(): boolean {
        return this.config.performanceEnabled;
    }
}

// 使用示例
const debugManager = DebugManager.getInstance();
debugManager.setConfig({
    enabled: true,
    logLevel: 'debug',
    traceEnabled: true
});
```

### 本章小结

- 学习了调试工具的配置（VS Code、Chrome DevTools）
- 掌握了断点调试技巧（条件断点、日志断点）
- 了解了错误处理方法（错误捕获、自定义错误类）
- 熟悉了性能分析工具（性能测量、内存分析）
- 学习了调试技巧（类型断言调试、调试工具函数）
- 掌握了调试最佳实践（结构化日志、调试配置）

在下一章中，我们将学习 TypeScript 中的高级测试技巧。 