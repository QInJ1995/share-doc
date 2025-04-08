# 第四章：高级异步编程

## Promise 高级特性

### 1. Promise 链式调用

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

class UserService {
    async getUser(id: number): Promise<User> {
        const response = await fetch(`/api/users/${id}`);
        return response.json();
    }

    async getUserPosts(userId: number): Promise<Post[]> {
        const response = await fetch(`/api/users/${userId}/posts`);
        return response.json();
    }
}

const userService = new UserService();

// 链式调用
userService.getUser(1)
    .then(user => userService.getUserPosts(user.id))
    .then(posts => console.log(posts))
    .catch(error => console.error(error));
```

### 2. Promise 组合

```typescript
// Promise.all
async function fetchAllData() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);
    return { users, posts, comments };
}

// Promise.race
async function fetchWithTimeout(url: string, timeout: number) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        return response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

// Promise.allSettled
async function fetchMultiple(urls: string[]) {
    const results = await Promise.allSettled(
        urls.map(url => fetch(url).then(r => r.json()))
    );
    return results;
}
```

### 3. Promise 错误处理

```typescript
class ApiError extends Error {
    constructor(
        public status: number,
        public code: string,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

async function fetchWithErrorHandling(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new ApiError(
                response.status,
                'API_ERROR',
                `HTTP error! status: ${response.status}`
            );
        }
        return response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            console.error(`API Error: ${error.status} - ${error.message}`);
        } else {
            console.error('Network error:', error);
        }
        throw error;
    }
}
```

## 异步迭代器

### 1. 异步迭代器基础

```typescript
class AsyncDataStream {
    private data: number[] = [1, 2, 3, 4, 5];
    private delay = 1000;

    async *[Symbol.asyncIterator]() {
        for (const item of this.data) {
            await new Promise(resolve => setTimeout(resolve, this.delay));
            yield item;
        }
    }
}

async function processStream() {
    const stream = new AsyncDataStream();
    for await (const item of stream) {
        console.log(item);
    }
}
```

### 2. 异步生成器

```typescript
async function* generateFibonacci(n: number) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function printFibonacci() {
    for await (const num of generateFibonacci(5)) {
        console.log(num);
    }
}
```

## 异步函数优化

### 1. 并发控制

```typescript
class ConcurrencyManager {
    private queue: Array<() => Promise<any>> = [];
    private running = 0;
    private maxConcurrent: number;

    constructor(maxConcurrent: number) {
        this.maxConcurrent = maxConcurrent;
    }

    async add<T>(fn: () => Promise<T>): Promise<T> {
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }

        this.running++;
        try {
            return await fn();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                next?.();
            }
        }
    }
}

const manager = new ConcurrencyManager(3);
const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];

async function fetchUrls() {
    const results = await Promise.all(
        urls.map(url => 
            manager.add(() => fetch(url).then(r => r.json()))
        )
    );
    return results;
}
```

### 2. 重试机制

```typescript
interface RetryOptions {
    maxAttempts: number;
    delay: number;
}

async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions
): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (attempt === options.maxAttempts) {
                throw lastError;
            }
            await new Promise(resolve => 
                setTimeout(resolve, options.delay * attempt)
            );
        }
    }
    
    throw lastError!;
}

// 使用示例
const result = await withRetry(
    () => fetch('https://api.example.com/data'),
    { maxAttempts: 3, delay: 1000 }
);
```

## 异步流处理

### 1. 流转换器

```typescript
class AsyncStreamTransformer<T, R> {
    constructor(private transform: (value: T) => Promise<R>) {}

    async *transform(stream: AsyncIterable<T>): AsyncIterable<R> {
        for await (const item of stream) {
            yield await this.transform(item);
        }
    }
}

async function* numberStream() {
    for (let i = 0; i < 5; i++) {
        yield i;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

const transformer = new AsyncStreamTransformer<number, string>(
    async n => `Number: ${n}`
);

async function processStream() {
    for await (const item of transformer.transform(numberStream())) {
        console.log(item);
    }
}
```

### 2. 流过滤器

```typescript
class AsyncStreamFilter<T> {
    constructor(private predicate: (value: T) => Promise<boolean>) {}

    async *filter(stream: AsyncIterable<T>): AsyncIterable<T> {
        for await (const item of stream) {
            if (await this.predicate(item)) {
                yield item;
            }
        }
    }
}

const filter = new AsyncStreamFilter<number>(
    async n => n % 2 === 0
);

async function processFilteredStream() {
    for await (const item of filter.filter(numberStream())) {
        console.log(item);
    }
}
```

## 异步缓存

### 1. 内存缓存

```typescript
class AsyncCache<T> {
    private cache = new Map<string, {
        value: T;
        timestamp: number;
    }>();
    private ttl: number;

    constructor(ttl: number) {
        this.ttl = ttl;
    }

    async get(key: string, fetchFn: () => Promise<T>): Promise<T> {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.value;
        }

        const value = await fetchFn();
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
        return value;
    }

    clear(): void {
        this.cache.clear();
    }
}

const cache = new AsyncCache<User>(5 * 60 * 1000); // 5分钟缓存

async function getUser(id: number): Promise<User> {
    return cache.get(`user-${id}`, () => 
        fetch(`/api/users/${id}`).then(r => r.json())
    );
}
```

### 2. 分布式缓存

```typescript
interface CacheOptions {
    ttl: number;
    namespace: string;
}

class DistributedCache {
    constructor(private redis: Redis, private options: CacheOptions) {}

    async get<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
        const fullKey = `${this.options.namespace}:${key}`;
        const cached = await this.redis.get(fullKey);
        
        if (cached) {
            return JSON.parse(cached);
        }

        const value = await fetchFn();
        await this.redis.setex(
            fullKey,
            this.options.ttl,
            JSON.stringify(value)
        );
        return value;
    }

    async invalidate(key: string): Promise<void> {
        const fullKey = `${this.options.namespace}:${key}`;
        await this.redis.del(fullKey);
    }
}
```

### 本章小结

- 学习了 Promise 的高级特性和组合方法
- 掌握了异步迭代器和生成器的使用
- 了解了异步函数的优化技巧
- 熟悉了异步流处理的实现
- 学习了异步缓存的应用
- 掌握了错误处理和重试机制

在下一章中，我们将学习 TypeScript 中的高级元编程。 