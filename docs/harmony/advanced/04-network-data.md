# 网络和数据处理

## 目录

- [网络请求](#网络请求)
- [数据缓存](#数据缓存)
- [数据转换](#数据转换)
- [错误处理](#错误处理)
- [性能优化](#性能优化)

## 网络请求

### HTTP 客户端

```ts
class HttpClient {
  private baseURL: string;
  private headers: Record<string, string>;
  
  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }
  
  async request<T>(config: RequestConfig): Promise<T> {
    const { method, url, data, params } = config;
    
    const requestUrl = this.buildUrl(url, params);
    const requestHeaders = this.buildHeaders(config.headers);
    
    try {
      const response = await http.createHttp().request(
        requestUrl,
        {
          method,
          header: requestHeaders,
          extraData: data
        }
      );
      
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  private buildUrl(url: string, params?: Record<string, any>): string {
    const baseUrl = `${this.baseURL}${url}`;
    if (!params) return baseUrl;
    
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
      
    return `${baseUrl}?${queryString}`;
  }
  
  private buildHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    return {
      ...this.headers,
      ...additionalHeaders
    };
  }
  
  private handleResponse<T>(response: http.HttpResponse): T {
    if (response.responseCode === 200) {
      return JSON.parse(response.result as string);
    }
    throw new HttpError(response.responseCode, response.result as string);
  }
  
  private handleError(error: Error): never {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new NetworkError(error.message);
  }
}
```

### 请求拦截器

```ts
interface RequestInterceptor {
  onRequest(config: RequestConfig): RequestConfig;
  onResponse<T>(response: T): T;
  onError(error: Error): Error;
}

class InterceptorManager {
  private interceptors: RequestInterceptor[] = [];
  
  add(interceptor: RequestInterceptor) {
    this.interceptors.push(interceptor);
  }
  
  remove(interceptor: RequestInterceptor) {
    const index = this.interceptors.indexOf(interceptor);
    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }
  
  async executeRequest<T>(config: RequestConfig): Promise<T> {
    let currentConfig = config;
    
    // 执行请求拦截器
    for (const interceptor of this.interceptors) {
      currentConfig = interceptor.onRequest(currentConfig);
    }
    
    try {
      const response = await this.httpClient.request<T>(currentConfig);
      
      // 执行响应拦截器
      let currentResponse = response;
      for (const interceptor of this.interceptors) {
        currentResponse = interceptor.onResponse(currentResponse);
      }
      
      return currentResponse;
    } catch (error) {
      // 执行错误拦截器
      let currentError = error;
      for (const interceptor of this.interceptors) {
        currentError = interceptor.onError(currentError);
      }
      
      throw currentError;
    }
  }
}
```

## 数据缓存

### 缓存管理器

```ts
class CacheManager {
  private cache: Map<string, CacheItem> = new Map();
  private maxSize: number;
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }
  
  set(key: string, value: any, ttl: number = 3600) {
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }
  
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  private isExpired(item: CacheItem): boolean {
    return Date.now() - item.timestamp > item.ttl * 1000;
  }
  
  private evictOldest() {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTimestamp) {
        oldestKey = key;
        oldestTimestamp = item.timestamp;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}
```

### 持久化缓存

```ts
class PersistentCache {
  private storage: Storage;
  private cache: CacheManager;
  
  constructor(storage: Storage, maxSize: number = 100) {
    this.storage = storage;
    this.cache = new CacheManager(maxSize);
    this.loadFromStorage();
  }
  
  private async loadFromStorage() {
    try {
      const data = await this.storage.get('cache');
      if (data) {
        const items = JSON.parse(data);
        for (const [key, item] of Object.entries(items)) {
          this.cache.set(key, item.value, item.ttl);
        }
      }
    } catch (error) {
      console.error('Failed to load cache from storage:', error);
    }
  }
  
  private async saveToStorage() {
    try {
      const items = {};
      for (const [key, item] of this.cache.entries()) {
        items[key] = {
          value: item.value,
          ttl: item.ttl
        };
      }
      await this.storage.set('cache', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cache to storage:', error);
    }
  }
}
```

## 数据转换

### 数据序列化

```ts
class DataSerializer {
  static serialize<T>(data: T): string {
    return JSON.stringify(data, (key, value) => {
      if (value instanceof Date) {
        return {
          type: 'Date',
          value: value.toISOString()
        };
      }
      if (value instanceof Map) {
        return {
          type: 'Map',
          value: Array.from(value.entries())
        };
      }
      return value;
    });
  }
  
  static deserialize<T>(json: string): T {
    return JSON.parse(json, (key, value) => {
      if (value && typeof value === 'object') {
        if (value.type === 'Date') {
          return new Date(value.value);
        }
        if (value.type === 'Map') {
          return new Map(value.value);
        }
      }
      return value;
    });
  }
}
```

### 数据验证

```ts
class DataValidator {
  static validate<T>(data: any, schema: ValidationSchema): ValidationResult {
    const errors: ValidationError[] = [];
    
    for (const [key, rules] of Object.entries(schema)) {
      const value = data[key];
      
      for (const rule of rules) {
        if (!rule.validate(value)) {
          errors.push({
            field: key,
            message: rule.message
          });
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
```

## 错误处理

### 错误类型

```ts
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

class NetworkError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}
```

### 错误处理中间件

```ts
class ErrorHandler {
  private handlers: Map<string, ErrorHandlerFunction> = new Map();
  
  register(type: string, handler: ErrorHandlerFunction) {
    this.handlers.set(type, handler);
  }
  
  handle(error: Error) {
    if (error instanceof AppError) {
      const handler = this.handlers.get(error.code);
      if (handler) {
        return handler(error);
      }
    }
    
    // 默认错误处理
    console.error('Unhandled error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}
```

## 性能优化

### 请求队列

```ts
class RequestQueue {
  private queue: Request[] = [];
  private processing: boolean = false;
  private maxConcurrent: number;
  
  constructor(maxConcurrent: number = 3) {
    this.maxConcurrent = maxConcurrent;
  }
  
  async add(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        request,
        resolve,
        reject
      });
      
      if (!this.processing) {
        this.process();
      }
    });
  }
  
  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    const batch = this.queue.splice(0, this.maxConcurrent);
    
    try {
      const results = await Promise.all(
        batch.map(item => this.executeRequest(item.request))
      );
      
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      batch.forEach(item => {
        item.reject(error);
      });
    } finally {
      this.processing = false;
      if (this.queue.length > 0) {
        this.process();
      }
    }
  }
}
```

### 数据预加载

```ts
class DataPreloader {
  private cache: CacheManager;
  private preloadQueue: string[] = [];
  
  constructor(cache: CacheManager) {
    this.cache = cache;
  }
  
  preload(keys: string[]) {
    this.preloadQueue.push(...keys);
    this.processPreloadQueue();
  }
  
  private async processPreloadQueue() {
    while (this.preloadQueue.length > 0) {
      const key = this.preloadQueue.shift();
      if (!key) continue;
      
      try {
        const data = await this.fetchData(key);
        this.cache.set(key, data);
      } catch (error) {
        console.error(`Failed to preload data for key ${key}:`, error);
      }
    }
  }
}
```

## 最佳实践

1. 使用 HTTP 客户端处理网络请求
2. 实现请求拦截器处理通用逻辑
3. 使用缓存管理器优化数据访问
4. 实现数据序列化和验证
5. 统一错误处理
6. 优化网络请求性能

## 总结

本章介绍了 HarmonyOS 网络和数据处理的相关内容，包括网络请求、数据缓存、数据转换、错误处理和性能优化等方面。这些知识能够帮助我们更好地处理网络请求和数据，提高应用的性能和用户体验。在实际开发中，我们应该根据应用需求选择合适的实现方式，并注意错误处理和性能优化。
