# 高级状态管理

## 目录

- [状态管理架构](#状态管理架构)
- [响应式编程](#响应式编程)
- [状态持久化](#状态持久化)
- [状态同步](#状态同步)
- [状态测试](#状态测试)

## 状态管理架构

### 状态管理模式

```ts
// 状态接口定义
interface AppState {
  user: UserState;
  settings: SettingsState;
  theme: ThemeState;
}

// 状态切片
class UserState {
  @State private userInfo: UserInfo = null;
  @State private isLoggedIn: boolean = false;
  
  setUserInfo(info: UserInfo) {
    this.userInfo = info;
    this.isLoggedIn = true;
  }
  
  logout() {
    this.userInfo = null;
    this.isLoggedIn = false;
  }
}

// 状态管理器
class AppStore {
  private static instance: AppStore;
  private state: AppState;
  
  private constructor() {
    this.state = {
      user: new UserState(),
      settings: new SettingsState(),
      theme: new ThemeState()
    };
  }
  
  static getInstance(): AppStore {
    if (!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }
  
  getState(): AppState {
    return this.state;
  }
}
```

### 状态订阅

```ts
class StateObserver {
  private subscribers: Map<string, Set<Function>> = new Map();
  
  subscribe(stateKey: string, callback: Function) {
    if (!this.subscribers.has(stateKey)) {
      this.subscribers.set(stateKey, new Set());
    }
    this.subscribers.get(stateKey).add(callback);
    
    return () => {
      this.subscribers.get(stateKey).delete(callback);
    };
  }
  
  notify(stateKey: string, data: any) {
    const callbacks = this.subscribers.get(stateKey);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}
```

## 响应式编程

### 响应式状态

```ts
class ReactiveState<T> {
  private value: T;
  private observers: Set<(value: T) => void> = new Set();
  
  constructor(initialValue: T) {
    this.value = initialValue;
  }
  
  get(): T {
    return this.value;
  }
  
  set(newValue: T) {
    if (this.value !== newValue) {
      this.value = newValue;
      this.notifyObservers();
    }
  }
  
  subscribe(observer: (value: T) => void) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
  
  private notifyObservers() {
    this.observers.forEach(observer => observer(this.value));
  }
}
```

### 计算属性

```ts
class ComputedState<T> {
  private compute: () => T;
  private dependencies: ReactiveState<any>[];
  private value: T;
  
  constructor(compute: () => T, dependencies: ReactiveState<any>[]) {
    this.compute = compute;
    this.dependencies = dependencies;
    this.value = this.compute();
    
    this.dependencies.forEach(dep => {
      dep.subscribe(() => {
        this.value = this.compute();
      });
    });
  }
  
  get(): T {
    return this.value;
  }
}
```

## 状态持久化

### 本地存储

```ts
class PersistentState<T> {
  private key: string;
  private state: ReactiveState<T>;
  
  constructor(key: string, initialValue: T) {
    this.key = key;
    this.state = new ReactiveState<T>(initialValue);
    this.loadFromStorage();
  }
  
  private async loadFromStorage() {
    try {
      const stored = await storage.get(this.key);
      if (stored) {
        this.state.set(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  }
  
  private async saveToStorage() {
    try {
      await storage.set(this.key, JSON.stringify(this.state.get()));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }
  
  get(): T {
    return this.state.get();
  }
  
  set(value: T) {
    this.state.set(value);
    this.saveToStorage();
  }
}
```

### 状态迁移

```ts
interface StateMigration {
  version: number;
  migrate: (state: any) => any;
}

class StateMigrator {
  private migrations: StateMigration[] = [];
  
  addMigration(migration: StateMigration) {
    this.migrations.push(migration);
  }
  
  async migrate(state: any, currentVersion: number): Promise<any> {
    let migratedState = state;
    
    for (const migration of this.migrations) {
      if (migration.version > currentVersion) {
        migratedState = migration.migrate(migratedState);
      }
    }
    
    return migratedState;
  }
}
```

## 状态同步

### 状态同步器

```ts
class StateSynchronizer<T> {
  private localState: ReactiveState<T>;
  private remoteState: ReactiveState<T>;
  private syncInProgress: boolean = false;
  
  constructor(localState: ReactiveState<T>, remoteState: ReactiveState<T>) {
    this.localState = localState;
    this.remoteState = remoteState;
    this.setupSync();
  }
  
  private setupSync() {
    this.localState.subscribe(() => this.syncToRemote());
    this.remoteState.subscribe(() => this.syncFromRemote());
  }
  
  private async syncToRemote() {
    if (this.syncInProgress) return;
    this.syncInProgress = true;
    
    try {
      await this.remoteState.set(this.localState.get());
    } finally {
      this.syncInProgress = false;
    }
  }
  
  private async syncFromRemote() {
    if (this.syncInProgress) return;
    this.syncInProgress = true;
    
    try {
      await this.localState.set(this.remoteState.get());
    } finally {
      this.syncInProgress = false;
    }
  }
}
```

### 冲突解决

```ts
interface ConflictResolution<T> {
  resolve(local: T, remote: T): T;
}

class ConflictResolver<T> {
  private resolutionStrategy: ConflictResolution<T>;
  
  constructor(resolutionStrategy: ConflictResolution<T>) {
    this.resolutionStrategy = resolutionStrategy;
  }
  
  resolve(local: T, remote: T): T {
    return this.resolutionStrategy.resolve(local, remote);
  }
}
```

## 状态测试

### 状态测试工具

```ts
class StateTester<T> {
  private state: ReactiveState<T>;
  private history: T[] = [];
  
  constructor(state: ReactiveState<T>) {
    this.state = state;
    this.state.subscribe(value => this.history.push(value));
  }
  
  getHistory(): T[] {
    return [...this.history];
  }
  
  assertValue(expected: T) {
    expect(this.state.get()).toEqual(expected);
  }
  
  assertHistory(expected: T[]) {
    expect(this.history).toEqual(expected);
  }
}
```

### 状态快照

```ts
class StateSnapshot<T> {
  private state: ReactiveState<T>;
  private snapshots: Map<string, T> = new Map();
  
  constructor(state: ReactiveState<T>) {
    this.state = state;
  }
  
  takeSnapshot(name: string) {
    this.snapshots.set(name, this.state.get());
  }
  
  restoreSnapshot(name: string) {
    const snapshot = this.snapshots.get(name);
    if (snapshot) {
      this.state.set(snapshot);
    }
  }
}
```

## 最佳实践

1. 使用状态管理架构组织代码
2. 实现响应式状态管理
3. 合理使用状态持久化
4. 处理状态同步和冲突
5. 编写状态测试用例

## 总结

本章介绍了 HarmonyOS 高级状态管理的相关内容，包括状态管理架构、响应式编程、状态持久化、状态同步和状态测试等方面。这些知识能够帮助我们更好地管理应用状态，提高代码的可维护性和可测试性。在实际开发中，我们应该根据应用需求选择合适的状态管理方案，并注意状态同步和持久化的实现。
