# 第九章：高级测试技巧

## 单元测试

### 1. Jest 基础

```typescript
// 简单的加法函数
function add(a: number, b: number): number {
    return a + b;
}

// 测试用例
describe('add function', () => {
    it('should add two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
});

// 异步测试
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}

describe('fetchUser function', () => {
    it('should fetch user successfully', async () => {
        const user = await fetchUser(1);
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name');
    });

    it('should throw error for invalid user', async () => {
        await expect(fetchUser(999)).rejects.toThrow('Failed to fetch user');
    });
});
```

### 2. 测试覆盖率

```typescript
// jest.config.js
module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{ts,tsx}'
    ]
};

// 使用示例
class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add', () => {
        it('should add positive numbers', () => {
            expect(calculator.add(1, 2)).toBe(3);
        });

        it('should add negative numbers', () => {
            expect(calculator.add(-1, -2)).toBe(-3);
        });
    });

    describe('divide', () => {
        it('should divide numbers correctly', () => {
            expect(calculator.divide(6, 2)).toBe(3);
        });

        it('should throw error for division by zero', () => {
            expect(() => calculator.divide(6, 0)).toThrow('Division by zero');
        });
    });
});
```

## 集成测试

### 1. API 测试

```typescript
import request from 'supertest';
import app from './app';

describe('API Tests', () => {
    it('should get user by id', async () => {
        const response = await request(app)
            .get('/api/users/1')
            .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name');
    });

    it('should create new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com'
        };

        const response = await request(app)
            .post('/api/users')
            .send(userData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(userData.name);
    });
});
```

### 2. 数据库测试

```typescript
import { Database } from './database';

describe('Database Tests', () => {
    let db: Database;

    beforeAll(async () => {
        db = new Database();
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    beforeEach(async () => {
        await db.clear();
    });

    it('should save and retrieve user', async () => {
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        };

        await db.saveUser(user);
        const retrieved = await db.getUser(1);

        expect(retrieved).toEqual(user);
    });
});
```

## 测试工具和库

### 1. 测试工具函数

```typescript
class TestUtils {
    static createMockRequest(options: Partial<Request> = {}): Request {
        return {
            method: 'GET',
            url: '/',
            headers: {},
            body: {},
            ...options
        } as Request;
    }

    static createMockResponse(): Response {
        return {
            status: 200,
            headers: new Headers(),
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;
    }

    static createMockUser(overrides: Partial<User> = {}): User {
        return {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            ...overrides
        };
    }
}

// 使用示例
describe('UserController', () => {
    it('should handle user creation', async () => {
        const req = TestUtils.createMockRequest({
            method: 'POST',
            body: { name: 'John Doe', email: 'john@example.com' }
        });
        const res = TestUtils.createMockResponse();

        await UserController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });
});
```

### 2. Mock 和 Stub

```typescript
// 用户服务
class UserService {
    constructor(private database: Database) {}

    async getUser(id: number): Promise<User> {
        return this.database.getUser(id);
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return this.database.createUser(user);
    }
}

// 测试
describe('UserService', () => {
    let service: UserService;
    let mockDatabase: jest.Mocked<Database>;

    beforeEach(() => {
        mockDatabase = {
            getUser: jest.fn(),
            createUser: jest.fn()
        } as unknown as jest.Mocked<Database>;

        service = new UserService(mockDatabase);
    });

    it('should get user from database', async () => {
        const mockUser = { id: 1, name: 'John' };
        mockDatabase.getUser.mockResolvedValue(mockUser);

        const user = await service.getUser(1);

        expect(mockDatabase.getUser).toHaveBeenCalledWith(1);
        expect(user).toEqual(mockUser);
    });
});
```

## 测试最佳实践

### 1. 测试命名

```typescript
describe('UserService', () => {
    // 使用 should 描述预期行为
    it('should create user with valid data', () => {
        // 测试代码
    });

    // 使用 when 描述条件
    it('should throw error when user already exists', () => {
        // 测试代码
    });

    // 使用 given 描述前提条件
    it('given invalid email should return validation error', () => {
        // 测试代码
    });
});
```

### 2. 测试组织

```typescript
describe('UserController', () => {
    // 按功能分组
    describe('authentication', () => {
        it('should login user with valid credentials', () => {
            // 测试代码
        });

        it('should handle invalid credentials', () => {
            // 测试代码
        });
    });

    // 按状态分组
    describe('user management', () => {
        describe('when user is logged in', () => {
            it('should allow profile update', () => {
                // 测试代码
            });
        });

        describe('when user is not logged in', () => {
            it('should redirect to login', () => {
                // 测试代码
            });
        });
    });
});
```

### 3. 测试隔离

```typescript
describe('UserService', () => {
    let service: UserService;
    let database: Database;

    // 每个测试前重置状态
    beforeEach(() => {
        database = new Database();
        service = new UserService(database);
    });

    // 每个测试后清理
    afterEach(async () => {
        await database.clear();
    });

    // 所有测试完成后清理
    afterAll(async () => {
        await database.disconnect();
    });

    it('should not affect other tests', async () => {
        // 测试代码
    });
});
```

## 端到端测试

### 1. Cypress 测试

```typescript
// cypress/integration/user-management.spec.ts
describe('User Management', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should create new user', () => {
        cy.get('[data-testid="create-user-button"]').click();
        cy.get('[data-testid="name-input"]').type('John Doe');
        cy.get('[data-testid="email-input"]').type('john@example.com');
        cy.get('[data-testid="submit-button"]').click();

        cy.get('[data-testid="user-list"]')
            .should('contain', 'John Doe');
    });

    it('should edit existing user', () => {
        cy.get('[data-testid="edit-user-button"]').first().click();
        cy.get('[data-testid="name-input"]')
            .clear()
            .type('Jane Doe');
        cy.get('[data-testid="submit-button"]').click();

        cy.get('[data-testid="user-list"]')
            .should('contain', 'Jane Doe');
    });
});
```

### 2. Playwright 测试

```typescript
// tests/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should create new user', async ({ page }) => {
        await page.click('[data-testid="create-user-button"]');
        await page.fill('[data-testid="name-input"]', 'John Doe');
        await page.fill('[data-testid="email-input"]', 'john@example.com');
        await page.click('[data-testid="submit-button"]');

        await expect(page.locator('[data-testid="user-list"]'))
            .toContainText('John Doe');
    });

    test('should handle form validation', async ({ page }) => {
        await page.click('[data-testid="create-user-button"]');
        await page.click('[data-testid="submit-button"]');

        await expect(page.locator('[data-testid="error-message"]'))
            .toBeVisible();
    });
});
```

## 测试配置

### 1. Jest 配置

```typescript
// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/*.test.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
```

### 2. 测试环境设置

```typescript
// jest.setup.ts
import { Database } from './src/database';

let database: Database;

beforeAll(async () => {
    database = new Database();
    await database.connect();
});

afterAll(async () => {
    await database.disconnect();
});

beforeEach(async () => {
    await database.clear();
});

// 全局测试工具函数
global.createTestUser = async (overrides = {}) => {
    return database.createUser({
        name: 'Test User',
        email: 'test@example.com',
        ...overrides
    });
};
```

### 本章小结

- 学习了单元测试的基础知识和最佳实践
- 掌握了集成测试的实现方法
- 了解了测试工具和库的使用
- 熟悉了测试命名和组织规范
- 学习了端到端测试的实现
- 掌握了测试配置和环境设置

在下一章中，我们将学习 TypeScript 中的高级安全编程。 