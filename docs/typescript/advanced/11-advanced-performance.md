# 第十一章：高级性能优化

## 编译优化

### 1. 项目引用

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "incremental": true
    },
    "references": [
        { "path": "./core" },
        { "path": "./utils" }
    ]
}

// core/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}

// utils/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
```

### 2. 增量编译

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "incremental": true,
        "tsBuildInfoFile": "./buildcache/tsconfig.tsbuildinfo"
    }
}

// 构建脚本
// build.ts
import { execSync } from 'child_process';
import * as fs from 'fs';

function build() {
    try {
        // 检查是否有缓存文件
        const hasCache = fs.existsSync('./buildcache/tsconfig.tsbuildinfo');
        
        // 使用增量编译
        execSync('tsc --incremental', { stdio: 'inherit' });
        
        console.log(`Build completed ${hasCache ? '(incremental)' : '(full)'}`);
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
```

## 类型检查优化

### 1. 类型检查范围

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "skipLibCheck": true,
        "typeRoots": ["./node_modules/@types", "./src/types"],
        "types": ["node", "jest"],
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}

// 类型声明文件
// src/types/custom.d.ts
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}
```

### 2. 类型缓存

```typescript
// 类型缓存实现
class TypeCache {
    private static instance: TypeCache;
    private cache: Map<string, any> = new Map();
    private maxSize: number = 1000;

    private constructor() {}

    static getInstance(): TypeCache {
        if (!TypeCache.instance) {
            TypeCache.instance = new TypeCache();
        }
        return TypeCache.instance;
    }

    get<T>(key: string): T | undefined {
        return this.cache.get(key);
    }

    set<T>(key: string, value: T): void {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    clear(): void {
        this.cache.clear();
    }
}

// 类型池
class TypePool {
    private static instance: TypePool;
    private pool: WeakMap<object, any> = new WeakMap();

    private constructor() {}

    static getInstance(): TypePool {
        if (!TypePool.instance) {
            TypePool.instance = new TypePool();
        }
        return TypePool.instance;
    }

    get<T>(obj: object): T | undefined {
        return this.pool.get(obj);
    }

    set<T>(obj: object, value: T): void {
        this.pool.set(obj, value);
    }

    delete(obj: object): void {
        this.pool.delete(obj);
    }
}
```

## 运行时性能优化

### 1. 内存优化

```typescript
// 对象池
class ObjectPool<T> {
    private pool: T[] = [];
    private factory: () => T;
    private maxSize: number;

    constructor(factory: () => T, maxSize: number = 1000) {
        this.factory = factory;
        this.maxSize = maxSize;
    }

    acquire(): T {
        return this.pool.pop() || this.factory();
    }

    release(obj: T): void {
        if (this.pool.length < this.maxSize) {
            this.pool.push(obj);
        }
    }

    clear(): void {
        this.pool = [];
    }
}

// 使用示例
const stringPool = new ObjectPool<string>(() => '');
const numberPool = new ObjectPool<number>(() => 0);

// 内存优化装饰器
function Memoize() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const cache = new WeakMap();

        descriptor.value = function (...args: any[]) {
            const key = args[0];
            if (!cache.has(key)) {
                const result = originalMethod.apply(this, args);
                cache.set(key, result);
            }
            return cache.get(key);
        };

        return descriptor;
    };
}
```

### 2. 计算优化

```typescript
// 防抖函数
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 节流函数
function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// 使用示例
class SearchService {
    @debounce(300)
    search(query: string): void {
        // 执行搜索
    }

    @throttle(1000)
    updateResults(results: any[]): void {
        // 更新结果
    }
}
```

## 代码分割

### 1. 动态导入

```typescript
// 动态导入工具
class DynamicImporter {
    static async import<T>(path: string): Promise<T> {
        try {
            const module = await import(path);
            return module.default || module;
        } catch (error) {
            console.error(`Failed to import ${path}:`, error);
            throw error;
        }
    }

    static async importWithRetry<T>(
        path: string,
        maxRetries: number = 3
    ): Promise<T> {
        let lastError: Error;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await this.import<T>(path);
            } catch (error) {
                lastError = error as Error;
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
        
        throw lastError!;
    }
}

// 路由级代码分割
const routes = {
    home: () => import('./pages/Home'),
    about: () => import('./pages/About'),
    contact: () => import('./pages/Contact')
};

// 使用示例
async function loadPage(route: keyof typeof routes) {
    const Page = await routes[route]();
    return new Page.default();
}
```

### 2. 预加载和预获取

```typescript
// 预加载工具
class Preloader {
    private static instance: Preloader;
    private preloadedModules: Set<string> = new Set();

    private constructor() {}

    static getInstance(): Preloader {
        if (!Preloader.instance) {
            Preloader.instance = new Preloader();
        }
        return Preloader.instance;
    }

    preload(modulePath: string): void {
        if (this.preloadedModules.has(modulePath)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = modulePath;
        document.head.appendChild(link);

        this.preloadedModules.add(modulePath);
    }

    prefetch(modulePath: string): void {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = modulePath;
        document.head.appendChild(link);
    }
}
```

## 构建优化

### 1. 树摇优化

```typescript
// 优化导出
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as Select } from './components/Select';

// 标记副作用
// package.json
{
    "sideEffects": [
        "*.css",
        "*.scss",
        "*.less"
    ]
}

// 优化导入
import { Button, Input } from './components';
// 而不是
import Button from './components/Button';
import Input from './components/Input';
```

### 2. 代码压缩

```typescript
// terser.config.js
module.exports = {
    compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
    },
    mangle: {
        properties: {
            regex: /^_/
        }
    },
    output: {
        comments: false
    }
};

// 构建配置
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: require('./terser.config.js')
            })
        ]
    }
};
```

## 性能监控

### 1. 性能指标收集

```typescript
class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private metrics: Map<string, number[]> = new Map();
    private thresholds: Map<string, number> = new Map();

    private constructor() {}

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    startMeasure(name: string): void {
        performance.mark(`${name}-start`);
    }

    endMeasure(name: string): void {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const entries = performance.getEntriesByName(name);
        const duration = entries[entries.length - 1].duration;
        
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name)!.push(duration);
        
        this.checkThreshold(name, duration);
    }

    private checkThreshold(name: string, duration: number): void {
        const threshold = this.thresholds.get(name);
        if (threshold && duration > threshold) {
            console.warn(`Performance warning: ${name} took ${duration}ms`);
        }
    }

    setThreshold(name: string, threshold: number): void {
        this.thresholds.set(name, threshold);
    }

    getMetrics(): Record<string, number[]> {
        return Object.fromEntries(this.metrics);
    }
}
```

### 2. 内存监控

```typescript
class MemoryMonitor {
    private static instance: MemoryMonitor;
    private snapshots: Map<string, number> = new Map();
    private listeners: Set<(snapshot: number) => void> = new Set();

    private constructor() {
        this.startMonitoring();
    }

    static getInstance(): MemoryMonitor {
        if (!MemoryMonitor.instance) {
            MemoryMonitor.instance = new MemoryMonitor();
        }
        return MemoryMonitor.instance;
    }

    private startMonitoring(): void {
        setInterval(() => {
            const snapshot = this.takeSnapshot();
            this.notifyListeners(snapshot);
        }, 5000);
    }

    takeSnapshot(): number {
        if (global.gc) {
            global.gc();
        }
        const used = process.memoryUsage().heapUsed;
        this.snapshots.set(new Date().toISOString(), used);
        return used;
    }

    addListener(listener: (snapshot: number) => void): void {
        this.listeners.add(listener);
    }

    removeListener(listener: (snapshot: number) => void): void {
        this.listeners.delete(listener);
    }

    private notifyListeners(snapshot: number): void {
        this.listeners.forEach(listener => listener(snapshot));
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

### 本章小结

- 学习了编译优化和项目引用
- 掌握了类型检查优化方法
- 了解了运行时性能优化技术
- 熟悉了代码分割和动态导入
- 学习了构建优化和代码压缩
- 掌握了性能监控和内存管理

在下一章中，我们将学习 TypeScript 中的高级调试技巧。 