# 性能优化

## 内存管理

### 1. 内存泄漏检测

```typescript
// src/utils/memory-leak-detector.ts
import * as heapdump from 'heapdump';

export class MemoryLeakDetector {
    private static instance: MemoryLeakDetector;
    private snapshots: string[] = [];

    private constructor() {}

    static getInstance(): MemoryLeakDetector {
        if (!MemoryLeakDetector.instance) {
            MemoryLeakDetector.instance = new MemoryLeakDetector();
        }
        return MemoryLeakDetector.instance;
    }

    takeSnapshot(): string {
        const filename = `./heap-${Date.now()}.heapsnapshot`;
        heapdump.writeSnapshot(filename);
        this.snapshots.push(filename);
        return filename;
    }

    compareSnapshots(): void {
        if (this.snapshots.length < 2) {
            console.log('需要至少两个快照才能进行比较');
            return;
        }

        const latest = this.snapshots[this.snapshots.length - 1];
        const previous = this.snapshots[this.snapshots.length - 2];
        
        console.log(`比较快照: ${previous} 和 ${latest}`);
        // 使用 Chrome DevTools 分析快照
    }
}
```

### 2. 垃圾回收优化

```typescript
// src/utils/garbage-collector.ts
export class GarbageCollector {
    private static instance: GarbageCollector;
    private gcInterval: NodeJS.Timeout | null = null;

    private constructor() {}

    static getInstance(): GarbageCollector {
        if (!GarbageCollector.instance) {
            GarbageCollector.instance = new GarbageCollector();
        }
        return GarbageCollector.instance;
    }

    startPeriodicGC(interval: number = 300000): void {
        if (this.gcInterval) {
            clearInterval(this.gcInterval);
        }

        this.gcInterval = setInterval(() => {
            if (global.gc) {
                const before = process.memoryUsage();
                global.gc();
                const after = process.memoryUsage();
                console.log('垃圾回收完成:', {
                    before: before.heapUsed,
                    after: after.heapUsed,
                    freed: before.heapUsed - after.heapUsed
                });
            }
        }, interval);
    }

    stopPeriodicGC(): void {
        if (this.gcInterval) {
            clearInterval(this.gcInterval);
            this.gcInterval = null;
        }
    }
}
```

## 缓存策略

### 1. 内存缓存

```typescript
// src/utils/cache.ts
export class Cache {
    private static instance: Cache;
    private cache: Map<string, { value: any; expires: number }>;

    private constructor() {
        this.cache = new Map();
    }

    static getInstance(): Cache {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

    set(key: string, value: any, ttl: number = 3600): void {
        const expires = Date.now() + ttl * 1000;
        this.cache.set(key, { value, expires });
    }

    get(key: string): any {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}
```

### 2. Redis 缓存

```typescript
// src/utils/redis-cache.ts
import Redis from 'ioredis';

export class RedisCache {
    private static instance: RedisCache;
    private redis: Redis;

    private constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD
        });
    }

    static getInstance(): RedisCache {
        if (!RedisCache.instance) {
            RedisCache.instance = new RedisCache();
        }
        return RedisCache.instance;
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        await this.redis.set(
            key,
            JSON.stringify(value),
            'EX',
            ttl
        );
    }

    async get(key: string): Promise<any> {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async clear(): Promise<void> {
        await this.redis.flushall();
    }
}
```

## 负载均衡

### 1. 集群配置

```typescript
// src/cluster.ts
import cluster from 'cluster';
import os from 'os';

export class ClusterManager {
    private static instance: ClusterManager;
    private workers: cluster.Worker[] = [];

    private constructor() {}

    static getInstance(): ClusterManager {
        if (!ClusterManager.instance) {
            ClusterManager.instance = new ClusterManager();
        }
        return ClusterManager.instance;
    }

    start(): void {
        if (cluster.isMaster) {
            const numCPUs = os.cpus().length;
            console.log(`主进程 ${process.pid} 正在运行`);

            // 启动工作进程
            for (let i = 0; i < numCPUs; i++) {
                this.workers.push(cluster.fork());
            }

            // 监听工作进程退出
            cluster.on('exit', (worker, code, signal) => {
                console.log(`工作进程 ${worker.process.pid} 已退出`);
                this.workers = this.workers.filter(w => w.process.pid !== worker.process.pid);
                
                // 重启工作进程
                if (code !== 0 && !worker.exitedAfterDisconnect) {
                    console.log('重启工作进程');
                    this.workers.push(cluster.fork());
                }
            });
        } else {
            console.log(`工作进程 ${process.pid} 已启动`);
            require('./app');
        }
    }
}
```

### 2. 负载均衡器

```typescript
// src/load-balancer.ts
import { createServer } from 'http';
import { parse } from 'url';

export class LoadBalancer {
    private static instance: LoadBalancer;
    private servers: string[];
    private currentIndex: number = 0;

    private constructor(servers: string[]) {
        this.servers = servers;
    }

    static getInstance(servers: string[]): LoadBalancer {
        if (!LoadBalancer.instance) {
            LoadBalancer.instance = new LoadBalancer(servers);
        }
        return LoadBalancer.instance;
    }

    start(port: number = 3000): void {
        const server = createServer((req, res) => {
            const targetServer = this.getNextServer();
            const parsedUrl = parse(targetServer + req.url!);

            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: req.method,
                headers: req.headers
            };

            const proxyReq = createServer(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode!, proxyRes.headers);
                proxyRes.pipe(res);
            });

            req.pipe(proxyReq);
        });

        server.listen(port, () => {
            console.log(`负载均衡器运行在端口 ${port}`);
        });
    }

    private getNextServer(): string {
        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server;
    }
}
```

## 性能监控

### 1. 性能指标收集

```typescript
// src/monitoring/performance-metrics.ts
import * as promClient from 'prom-client';

export class PerformanceMetrics {
    private static instance: PerformanceMetrics;
    private metrics: Map<string, promClient.Metric>;

    private constructor() {
        this.metrics = new Map();
        this.initializeMetrics();
    }

    static getInstance(): PerformanceMetrics {
        if (!PerformanceMetrics.instance) {
            PerformanceMetrics.instance = new PerformanceMetrics();
        }
        return PerformanceMetrics.instance;
    }

    private initializeMetrics(): void {
        // HTTP 请求持续时间
        this.metrics.set('httpRequestDuration', new promClient.Histogram({
            name: 'http_request_duration_seconds',
            help: 'HTTP 请求持续时间',
            labelNames: ['method', 'route', 'status_code']
        }));

        // 内存使用
        this.metrics.set('memoryUsage', new promClient.Gauge({
            name: 'node_memory_usage_bytes',
            help: 'Node.js 内存使用情况',
            labelNames: ['type']
        }));

        // 事件循环延迟
        this.metrics.set('eventLoopDelay', new promClient.Gauge({
            name: 'node_eventloop_delay_seconds',
            help: '事件循环延迟'
        }));
    }

    recordHttpRequest(method: string, route: string, statusCode: number, duration: number): void {
        const metric = this.metrics.get('httpRequestDuration') as promClient.Histogram;
        metric.observe({ method, route, status_code: statusCode }, duration);
    }

    updateMemoryUsage(): void {
        const usage = process.memoryUsage();
        const metric = this.metrics.get('memoryUsage') as promClient.Gauge;
        
        Object.entries(usage).forEach(([type, value]) => {
            metric.set({ type }, value);
        });
    }

    updateEventLoopDelay(delay: number): void {
        const metric = this.metrics.get('eventLoopDelay') as promClient.Gauge;
        metric.set(delay);
    }
}
```

### 2. 性能分析

```typescript
// src/monitoring/performance-profiler.ts
import * as profiler from 'v8-profiler-next';

export class PerformanceProfiler {
    private static instance: PerformanceProfiler;
    private isProfiling: boolean = false;

    private constructor() {}

    static getInstance(): PerformanceProfiler {
        if (!PerformanceProfiler.instance) {
            PerformanceProfiler.instance = new PerformanceProfiler();
        }
        return PerformanceProfiler.instance;
    }

    startProfiling(title: string = 'profile'): void {
        if (this.isProfiling) {
            console.warn('已经在进行性能分析');
            return;
        }

        this.isProfiling = true;
        profiler.startProfiling(title);
        console.log(`开始性能分析: ${title}`);
    }

    stopProfiling(title: string = 'profile'): void {
        if (!this.isProfiling) {
            console.warn('没有正在进行的性能分析');
            return;
        }

        const profile = profiler.stopProfiling(title);
        profile.export()
            .pipe(require('fs').createWriteStream(`${title}.cpuprofile`));
        
        this.isProfiling = false;
        console.log(`性能分析完成: ${title}`);
    }
}
```

## 练习

1. 实现内存泄漏检测
2. 配置缓存策略
3. 设置负载均衡
