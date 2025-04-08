# 第七章：高级性能优化

## 编译优化

### 1. 项目引用

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true
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
        "outDir": "../dist/core"
    },
    "include": ["src"]
}

// utils/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "../dist/utils"
    },
    "include": ["src"]
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

// 使用命令行
tsc --incremental
```

## 类型检查优化

### 1. 类型检查范围

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "skipLibCheck": true,
        "typeRoots": ["./node_modules/@types", "./src/types"],
        "types": ["node", "jest"]
    },
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// 使用类型断言优化
function processData<T>(data: unknown): T {
    return data as T;
}

// 使用类型守卫优化
function isString(value: unknown): value is string {
    return typeof value === 'string';
}
```

### 2. 类型缓存

```typescript
// 使用类型缓存
const typeCache = new Map<string, any>();

function getType<T>(key: string): T {
    if (typeCache.has(key)) {
        return typeCache.get(key);
    }
    const type = {} as T;
    typeCache.set(key, type);
    return type;
}

// 使用类型池
class TypePool<T> {
    private pool: T[] = [];
    private factory: () => T;

    constructor(factory: () => T) {
        this.factory = factory;
    }

    acquire(): T {
        return this.pool.pop() || this.factory();
    }

    release(item: T): void {
        this.pool.push(item);
    }
}
```

## 运行时性能优化

### 1. 内存优化

```typescript
// 使用对象池
class ObjectPool<T> {
    private pool: T[] = [];
    private factory: () => T;
    private maxSize: number;

    constructor(factory: () => T, maxSize: number = 100) {
        this.factory = factory;
        this.maxSize = maxSize;
    }

    acquire(): T {
        return this.pool.pop() || this.factory();
    }

    release(item: T): void {
        if (this.pool.length < this.maxSize) {
            this.pool.push(item);
        }
    }
}

// 使用 WeakMap 避免内存泄漏
const cache = new WeakMap<object, any>();

function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
    return function (...args: any[]): T {
        const key = args[0];
        if (typeof key === 'object' && key !== null) {
            if (!cache.has(key)) {
                cache.set(key, fn.apply(this, args));
            }
            return cache.get(key);
        }
        return fn.apply(this, args);
    };
}
```

### 2. 计算优化

```typescript
// 使用防抖
function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 使用节流
function throttle<T extends (...args: any[]) => any>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
```

## 代码分割

### 1. 动态导入

```typescript
// 使用动态导入
async function loadModule(moduleName: string) {
    try {
        const module = await import(`./modules/${moduleName}`);
        return module;
    } catch (error) {
        console.error(`Failed to load module: ${moduleName}`, error);
        throw error;
    }
}

// 使用路由级别的代码分割
const routes = {
    home: () => import('./pages/Home'),
    about: () => import('./pages/About'),
    contact: () => import('./pages/Contact')
};

async function navigate(route: keyof typeof routes) {
    const module = await routes[route]();
    return module.default;
}
```

### 2. 预加载

```typescript
// 使用预加载
function preloadModule(moduleName: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = `/modules/${moduleName}.js`;
    document.head.appendChild(link);
}

// 使用预获取
function prefetchModule(moduleName: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/modules/${moduleName}.js`;
    document.head.appendChild(link);
}
```

## 构建优化

### 1. Tree Shaking

```typescript
// 使用导出优化
export { default as Component } from './Component';
export type { Props } from './Component';

// 使用 side effects 标记
// package.json
{
    "sideEffects": [
        "*.css",
        "*.scss"
    ]
}
```

### 2. 代码压缩

```typescript
// 使用 terser 配置
// terser.config.js
module.exports = {
    compress: {
        drop_console: true,
        pure_funcs: ['console.log']
    },
    mangle: {
        properties: {
            regex: /^_/
        }
    }
};
```

## 性能监控

### 1. 性能指标收集

```typescript
class PerformanceMonitor {
    private metrics: Map<string, number[]> = new Map();

    startMeasure(name: string): void {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name)!.push(performance.now());
    }

    endMeasure(name: string): number {
        const times = this.metrics.get(name);
        if (!times || times.length === 0) {
            throw new Error(`No measurement started for ${name}`);
        }
        const startTime = times.pop()!;
        return performance.now() - startTime;
    }

    getAverage(name: string): number {
        const times = this.metrics.get(name);
        if (!times || times.length === 0) {
            return 0;
        }
        return times.reduce((a, b) => a + b, 0) / times.length;
    }
}
```

### 2. 内存监控

```typescript
class MemoryMonitor {
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

### 本章小结

- 学习了编译优化技术（项目引用、增量编译）
- 掌握了类型检查优化方法（类型检查范围、类型缓存）
- 了解了运行时性能优化（内存优化、计算优化）
- 熟悉了代码分割技术（动态导入、预加载）
- 学习了构建优化方法（Tree Shaking、代码压缩）
- 掌握了性能监控技术（性能指标收集、内存监控）

在下一章中，我们将学习 TypeScript 中的高级调试技巧。 