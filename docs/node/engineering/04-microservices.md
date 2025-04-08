# 微服务架构

## 服务发现

### 1. Consul 服务注册

```typescript
// src/service-discovery/consul-registry.ts
import { Consul } from 'consul';
import { ServiceDefinition } from './types';

export class ConsulRegistry {
    private static instance: ConsulRegistry;
    private consul: Consul;
    private serviceId: string;

    private constructor() {
        this.consul = new Consul({
            host: process.env.CONSUL_HOST || 'localhost',
            port: parseInt(process.env.CONSUL_PORT || '8500')
        });
        this.serviceId = `${process.env.SERVICE_NAME}-${process.pid}`;
    }

    static getInstance(): ConsulRegistry {
        if (!ConsulRegistry.instance) {
            ConsulRegistry.instance = new ConsulRegistry();
        }
        return ConsulRegistry.instance;
    }

    async register(service: ServiceDefinition): Promise<void> {
        const definition = {
            id: this.serviceId,
            name: service.name,
            address: service.address,
            port: service.port,
            check: {
                http: `http://${service.address}:${service.port}/health`,
                interval: '10s',
                timeout: '5s'
            }
        };

        await this.consul.agent.service.register(definition);
        console.log(`服务 ${service.name} 已注册到 Consul`);
    }

    async deregister(): Promise<void> {
        await this.consul.agent.service.deregister(this.serviceId);
        console.log(`服务 ${this.serviceId} 已从 Consul 注销`);
    }

    async getService(name: string): Promise<ServiceDefinition[]> {
        const services = await this.consul.catalog.service.nodes(name);
        return services.map(service => ({
            name,
            address: service.Address,
            port: service.ServicePort
        }));
    }
}
```

### 2. 服务发现客户端

```typescript
// src/service-discovery/service-client.ts
import { ConsulRegistry } from './consul-registry';
import axios from 'axios';

export class ServiceClient {
    private static instance: ServiceClient;
    private registry: ConsulRegistry;
    private cache: Map<string, ServiceDefinition[]>;
    private cacheTimeout: number = 30000;

    private constructor() {
        this.registry = ConsulRegistry.getInstance();
        this.cache = new Map();
        this.startCacheRefresh();
    }

    static getInstance(): ServiceClient {
        if (!ServiceClient.instance) {
            ServiceClient.instance = new ServiceClient();
        }
        return ServiceClient.instance;
    }

    private startCacheRefresh(): void {
        setInterval(() => {
            this.cache.clear();
        }, this.cacheTimeout);
    }

    async getServiceUrl(serviceName: string, path: string): Promise<string> {
        let services = this.cache.get(serviceName);
        
        if (!services) {
            services = await this.registry.getService(serviceName);
            this.cache.set(serviceName, services);
        }

        if (!services || services.length === 0) {
            throw new Error(`服务 ${serviceName} 未找到`);
        }

        const service = services[Math.floor(Math.random() * services.length)];
        return `http://${service.address}:${service.port}${path}`;
    }

    async request<T>(serviceName: string, path: string, options: any = {}): Promise<T> {
        const url = await this.getServiceUrl(serviceName, path);
        const response = await axios.request({
            url,
            ...options
        });
        return response.data;
    }
}
```

## 服务治理

### 1. 熔断器

```typescript
// src/circuit-breaker/circuit-breaker.ts
export class CircuitBreaker {
    private static instance: CircuitBreaker;
    private failures: number = 0;
    private lastFailureTime: number = 0;
    private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
    private readonly failureThreshold: number = 5;
    private readonly resetTimeout: number = 60000;

    private constructor() {}

    static getInstance(): CircuitBreaker {
        if (!CircuitBreaker.instance) {
            CircuitBreaker.instance = new CircuitBreaker();
        }
        return CircuitBreaker.instance;
    }

    async execute<T>(fn: () => Promise<T>): Promise<T> {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('服务暂时不可用');
            }
        }

        try {
            const result = await fn();
            
            if (this.state === 'HALF_OPEN') {
                this.state = 'CLOSED';
                this.failures = 0;
            }
            
            return result;
        } catch (error) {
            this.handleFailure();
            throw error;
        }
    }

    private handleFailure(): void {
        this.failures++;
        this.lastFailureTime = Date.now();

        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            console.log('熔断器已打开');
        }
    }
}
```

### 2. 限流器

```typescript
// src/rate-limiter/rate-limiter.ts
export class RateLimiter {
    private static instance: RateLimiter;
    private tokens: number;
    private lastRefill: number;
    private readonly capacity: number;
    private readonly refillRate: number;

    private constructor(capacity: number = 100, refillRate: number = 10) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }

    static getInstance(capacity?: number, refillRate?: number): RateLimiter {
        if (!RateLimiter.instance) {
            RateLimiter.instance = new RateLimiter(capacity, refillRate);
        }
        return RateLimiter.instance;
    }

    async acquire(tokens: number = 1): Promise<boolean> {
        this.refillTokens();
        
        if (this.tokens >= tokens) {
            this.tokens -= tokens;
            return true;
        }
        
        return false;
    }

    private refillTokens(): void {
        const now = Date.now();
        const timePassed = now - this.lastRefill;
        const tokensToAdd = Math.floor(timePassed / 1000 * this.refillRate);
        
        if (tokensToAdd > 0) {
            this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
            this.lastRefill = now;
        }
    }
}
```

## 服务通信

### 1. gRPC 服务

```typescript
// src/grpc/user.proto
syntax = "proto3";

package user;

service UserService {
    rpc GetUser (GetUserRequest) returns (User) {}
    rpc CreateUser (CreateUserRequest) returns (User) {}
}

message GetUserRequest {
    int32 id = 1;
}

message CreateUserRequest {
    string name = 1;
    string email = 2;
}

message User {
    int32 id = 1;
    string name = 2;
    string email = 3;
}

// src/grpc/user.service.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, 'user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition);

export class UserGrpcService {
    private server: grpc.Server;

    constructor() {
        this.server = new grpc.Server();
    }

    start(port: number = 50051): void {
        this.server.addService(userProto.user.UserService.service, {
            getUser: this.getUser.bind(this),
            createUser: this.createUser.bind(this)
        });

        this.server.bindAsync(
            `0.0.0.0:${port}`,
            grpc.ServerCredentials.createInsecure(),
            (error, port) => {
                if (error) {
                    console.error('gRPC 服务器启动失败:', error);
                    return;
                }
                this.server.start();
                console.log(`gRPC 服务器运行在端口 ${port}`);
            }
        );
    }

    private async getUser(call: any, callback: any): Promise<void> {
        try {
            const user = await this.userService.getUser(call.request.id);
            callback(null, user);
        } catch (error) {
            callback(error);
        }
    }

    private async createUser(call: any, callback: any): Promise<void> {
        try {
            const user = await this.userService.createUser(call.request);
            callback(null, user);
        } catch (error) {
            callback(error);
        }
    }
}
```

### 2. 消息队列

```typescript
// src/message-queue/rabbitmq.ts
import * as amqp from 'amqplib';

export class RabbitMQClient {
    private static instance: RabbitMQClient;
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    private constructor() {}

    static getInstance(): RabbitMQClient {
        if (!RabbitMQClient.instance) {
            RabbitMQClient.instance = new RabbitMQClient();
        }
        return RabbitMQClient.instance;
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect({
                hostname: process.env.RABBITMQ_HOST || 'localhost',
                port: parseInt(process.env.RABBITMQ_PORT || '5672'),
                username: process.env.RABBITMQ_USER || 'guest',
                password: process.env.RABBITMQ_PASS || 'guest'
            });

            this.channel = await this.connection.createChannel();
            console.log('已连接到 RabbitMQ');
        } catch (error) {
            console.error('RabbitMQ 连接失败:', error);
            throw error;
        }
    }

    async publish(exchange: string, routingKey: string, message: any): Promise<void> {
        if (!this.channel) {
            throw new Error('RabbitMQ 未连接');
        }

        await this.channel.assertExchange(exchange, 'topic', { durable: true });
        this.channel.publish(
            exchange,
            routingKey,
            Buffer.from(JSON.stringify(message)),
            { persistent: true }
        );
    }

    async subscribe(
        exchange: string,
        routingKey: string,
        callback: (message: any) => Promise<void>
    ): Promise<void> {
        if (!this.channel) {
            throw new Error('RabbitMQ 未连接');
        }

        await this.channel.assertExchange(exchange, 'topic', { durable: true });
        const { queue } = await this.channel.assertQueue('', { exclusive: true });
        
        await this.channel.bindQueue(queue, exchange, routingKey);
        
        this.channel.consume(queue, async (msg) => {
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    await callback(content);
                    this.channel?.ack(msg);
                } catch (error) {
                    console.error('消息处理失败:', error);
                    this.channel?.nack(msg);
                }
            }
        });
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();
    }
}
```

## 练习

1. 实现服务注册与发现
2. 配置熔断器和限流器
3. 实现 gRPC 服务通信
4. 使用消息队列进行异步通信

## 下一步

- 学习容器化部署
- 了解 Kubernetes
- 掌握服务网格
- 学习云原生架构 