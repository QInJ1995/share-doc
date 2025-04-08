# 第六章：高级设计模式

## 创建型模式

### 1. 工厂模式

```typescript
interface Product {
    name: string;
    price: number;
    description: string;
}

class ProductFactory {
    static createProduct(type: 'book' | 'electronics' | 'clothing'): Product {
        switch (type) {
            case 'book':
                return {
                    name: 'Book',
                    price: 29.99,
                    description: 'A great book'
                };
            case 'electronics':
                return {
                    name: 'Electronics',
                    price: 999.99,
                    description: 'Latest gadget'
                };
            case 'clothing':
                return {
                    name: 'Clothing',
                    price: 49.99,
                    description: 'Fashionable item'
                };
        }
    }
}

// 使用泛型工厂
class GenericFactory<T> {
    private creators: Map<string, () => T> = new Map();

    register(type: string, creator: () => T): void {
        this.creators.set(type, creator);
    }

    create(type: string): T {
        const creator = this.creators.get(type);
        if (!creator) {
            throw new Error(`No creator registered for type: ${type}`);
        }
        return creator();
    }
}

// 使用示例
const factory = new GenericFactory<Product>();
factory.register('book', () => ({
    name: 'Book',
    price: 29.99,
    description: 'A great book'
}));
const book = factory.create('book');
```

### 2. 单例模式

```typescript
class Database {
    private static instance: Database;
    private connections: number = 0;

    private constructor() {}

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    connect(): void {
        this.connections++;
        console.log(`Connected. Total connections: ${this.connections}`);
    }

    disconnect(): void {
        this.connections--;
        console.log(`Disconnected. Remaining connections: ${this.connections}`);
    }
}

// 使用装饰器实现单例
function Singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    let instance: T;
    
    return class extends constructor {
        static getInstance(...args: any[]): T {
            if (!instance) {
                instance = new constructor(...args);
            }
            return instance;
        }
    };
}

@Singleton
class Logger {
    private logs: string[] = [];

    log(message: string): void {
        this.logs.push(message);
        console.log(message);
    }

    getLogs(): string[] {
        return this.logs;
    }
}
```

## 结构型模式

### 1. 适配器模式

```typescript
interface OldAPI {
    getData(): string;
}

interface NewAPI {
    fetchData(): Promise<string>;
}

class OldAPIImpl implements OldAPI {
    getData(): string {
        return 'Old data format';
    }
}

class NewAPIImpl implements NewAPI {
    async fetchData(): Promise<string> {
        return 'New data format';
    }
}

class APAdapter implements NewAPI {
    constructor(private oldAPI: OldAPI) {}

    async fetchData(): Promise<string> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.oldAPI.getData());
            }, 1000);
        });
    }
}

// 使用示例
const oldAPI = new OldAPIImpl();
const adapter = new APAdapter(oldAPI);
adapter.fetchData().then(console.log);
```

### 2. 装饰器模式

```typescript
interface Component {
    operation(): string;
}

class ConcreteComponent implements Component {
    operation(): string {
        return 'ConcreteComponent';
    }
}

class Decorator implements Component {
    constructor(protected component: Component) {}

    operation(): string {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

// 使用示例
const component = new ConcreteComponent();
const decoratorA = new ConcreteDecoratorA(component);
const decoratorB = new ConcreteDecoratorB(decoratorA);
console.log(decoratorB.operation());
```

## 行为型模式

### 1. 观察者模式

```typescript
interface Observer<T> {
    update(data: T): void;
}

interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(): void;
}

class NewsSubject implements Subject<string> {
    private observers: Observer<string>[] = [];
    private news: string = '';

    attach(observer: Observer<string>): void {
        this.observers.push(observer);
    }

    detach(observer: Observer<string>): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    notify(): void {
        this.observers.forEach(observer => observer.update(this.news));
    }

    setNews(news: string): void {
        this.news = news;
        this.notify();
    }
}

class NewsObserver implements Observer<string> {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(`${this.name} received news: ${news}`);
    }
}

// 使用示例
const subject = new NewsSubject();
const observer1 = new NewsObserver('Observer 1');
const observer2 = new NewsObserver('Observer 2');

subject.attach(observer1);
subject.attach(observer2);
subject.setNews('Breaking news!');
```

### 2. 策略模式

```typescript
interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardStrategy implements PaymentStrategy {
    constructor(private cardNumber: string) {}

    pay(amount: number): void {
        console.log(`Paid ${amount} using credit card ${this.cardNumber}`);
    }
}

class PayPalStrategy implements PaymentStrategy {
    constructor(private email: string) {}

    pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal account ${this.email}`);
    }
}

class ShoppingCart {
    constructor(private paymentStrategy: PaymentStrategy) {}

    setPaymentStrategy(strategy: PaymentStrategy): void {
        this.paymentStrategy = strategy;
    }

    checkout(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

// 使用示例
const cart = new ShoppingCart(new CreditCardStrategy('1234-5678'));
cart.checkout(100);
cart.setPaymentStrategy(new PayPalStrategy('user@example.com'));
cart.checkout(200);
```

## 架构模式

### 1. 依赖注入

```typescript
interface Database {
    query(sql: string): Promise<any>;
}

class MySQLDatabase implements Database {
    async query(sql: string): Promise<any> {
        console.log(`Executing MySQL query: ${sql}`);
        return [];
    }
}

class PostgreSQLDatabase implements Database {
    async query(sql: string): Promise<any> {
        console.log(`Executing PostgreSQL query: ${sql}`);
        return [];
    }
}

class UserService {
    constructor(private database: Database) {}

    async getUsers(): Promise<any[]> {
        return this.database.query('SELECT * FROM users');
    }
}

// 使用依赖注入容器
class Container {
    private dependencies = new Map<string, any>();

    register(key: string, dependency: any): void {
        this.dependencies.set(key, dependency);
    }

    resolve(key: string): any {
        const dependency = this.dependencies.get(key);
        if (!dependency) {
            throw new Error(`No dependency registered for key: ${key}`);
        }
        return dependency;
    }
}

// 使用示例
const container = new Container();
container.register('database', new MySQLDatabase());
container.register('userService', new UserService(container.resolve('database')));
```

### 2. 中间件模式

```typescript
type Middleware = (next: () => Promise<any>) => () => Promise<any>;

class MiddlewareManager {
    private middlewares: Middleware[] = [];

    use(middleware: Middleware): void {
        this.middlewares.push(middleware);
    }

    execute(handler: () => Promise<any>): () => Promise<any> {
        return this.middlewares.reduceRight(
            (next, middleware) => middleware(next),
            handler
        );
    }
}

// 中间件示例
const loggerMiddleware: Middleware = next => async () => {
    console.log('Request started');
    const result = await next();
    console.log('Request completed');
    return result;
};

const errorHandlerMiddleware: Middleware = next => async () => {
    try {
        return await next();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// 使用示例
const manager = new MiddlewareManager();
manager.use(loggerMiddleware);
manager.use(errorHandlerMiddleware);

const handler = () => Promise.resolve('Success');
const wrappedHandler = manager.execute(handler);
wrappedHandler().then(console.log);
```

### 本章小结

- 学习了创建型模式（工厂模式、单例模式）
- 掌握了结构型模式（适配器模式、装饰器模式）
- 了解了行为型模式（观察者模式、策略模式）
- 熟悉了架构模式（依赖注入、中间件模式）
- 学习了各种设计模式的实际应用场景
- 掌握了在 TypeScript 中实现设计模式的最佳实践

在下一章中，我们将学习 TypeScript 中的高级性能优化。 