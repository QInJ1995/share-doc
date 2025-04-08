# 性能优化和调试

## 目录

- [性能分析](#性能分析)
- [内存管理](#内存管理)
- [渲染优化](#渲染优化)
- [调试工具](#调试工具)
- [日志管理](#日志管理)

## 性能分析

### 性能监控

```ts
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  
  startMeasure(name: string) {
    this.metrics.set(name, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }
  
  endMeasure(name: string) {
    const metric = this.metrics.get(name);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
    }
  }
  
  getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }
  
  clearMetrics() {
    this.metrics.clear();
  }
}
```

### 性能追踪

```ts
class PerformanceTracer {
  private traces: Map<string, Trace[]> = new Map();
  
  startTrace(name: string) {
    if (!this.traces.has(name)) {
      this.traces.set(name, []);
    }
    
    const trace: Trace = {
      startTime: performance.now(),
      endTime: null,
      duration: null,
      children: []
    };
    
    this.traces.get(name).push(trace);
    return trace;
  }
  
  endTrace(name: string, trace: Trace) {
    trace.endTime = performance.now();
    trace.duration = trace.endTime - trace.startTime;
  }
  
  getTraces(name: string): Trace[] {
    return this.traces.get(name) || [];
  }
  
  clearTraces(name: string) {
    this.traces.delete(name);
  }
}
```

## 内存管理

### 内存监控

```ts
class MemoryMonitor {
  private memoryUsage: MemoryUsage[] = [];
  
  startMonitoring(interval: number = 1000) {
    setInterval(() => {
      this.collectMemoryUsage();
    }, interval);
  }
  
  private collectMemoryUsage() {
    const usage = {
      timestamp: Date.now(),
      totalMemory: system.getTotalMemory(),
      usedMemory: system.getUsedMemory(),
      freeMemory: system.getFreeMemory()
    };
    
    this.memoryUsage.push(usage);
    
    // 保持最近1000条记录
    if (this.memoryUsage.length > 1000) {
      this.memoryUsage.shift();
    }
  }
  
  getMemoryUsage(): MemoryUsage[] {
    return [...this.memoryUsage];
  }
  
  clearMemoryUsage() {
    this.memoryUsage = [];
  }
}
```

### 内存优化

```ts
class MemoryOptimizer {
  private cache: Map<string, WeakRef<any>> = new Map();
  
  setCache(key: string, value: any) {
    this.cache.set(key, new WeakRef(value));
  }
  
  getCache(key: string): any {
    const ref = this.cache.get(key);
    if (ref) {
      const value = ref.deref();
      if (value) {
        return value;
      }
      this.cache.delete(key);
    }
    return null;
  }
  
  clearCache() {
    this.cache.clear();
  }
  
  optimizeMemory() {
    // 清理未使用的资源
    this.clearCache();
    
    // 触发垃圾回收
    if (global.gc) {
      global.gc();
    }
  }
}
```

## 渲染优化

### 渲染性能监控

```ts
class RenderMonitor {
  private frameTimes: number[] = [];
  private lastFrameTime: number = 0;
  
  startMonitoring() {
    this.lastFrameTime = performance.now();
    
    // 监听每一帧的渲染
    this.monitorFrame();
  }
  
  private monitorFrame() {
    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    
    this.frameTimes.push(frameTime);
    this.lastFrameTime = currentTime;
    
    // 保持最近100帧的记录
    if (this.frameTimes.length > 100) {
      this.frameTimes.shift();
    }
    
    // 继续监控下一帧
    requestAnimationFrame(() => this.monitorFrame());
  }
  
  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
  }
  
  getFrameTimeHistory(): number[] {
    return [...this.frameTimes];
  }
}
```

### 渲染优化策略

```ts
class RenderOptimizer {
  private observer: IntersectionObserver;
  private lazyLoadComponents: Map<string, boolean> = new Map();
  
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
  }
  
  observeComponent(id: string, component: HTMLElement) {
    this.observer.observe(component);
    this.lazyLoadComponents.set(id, false);
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-component-id');
        if (id && !this.lazyLoadComponents.get(id)) {
          this.lazyLoadComponents.set(id, true);
          this.loadComponent(id);
        }
      }
    });
  }
  
  private loadComponent(id: string) {
    // 实现组件的延迟加载
    const component = document.getElementById(id);
    if (component) {
      component.classList.add('loaded');
    }
  }
  
  optimizeRendering() {
    // 实现渲染优化策略
    this.useVirtualScrolling();
    this.implementLazyLoading();
    this.optimizeImages();
  }
  
  private useVirtualScrolling() {
    // 实现虚拟滚动
  }
  
  private implementLazyLoading() {
    // 实现延迟加载
  }
  
  private optimizeImages() {
    // 优化图片加载
  }
}
```

## 调试工具

### 调试器

```ts
class Debugger {
  private breakpoints: Map<string, Set<number>> = new Map();
  private isEnabled: boolean = false;
  
  enable() {
    this.isEnabled = true;
  }
  
  disable() {
    this.isEnabled = false;
  }
  
  setBreakpoint(file: string, line: number) {
    if (!this.breakpoints.has(file)) {
      this.breakpoints.set(file, new Set());
    }
    this.breakpoints.get(file).add(line);
  }
  
  removeBreakpoint(file: string, line: number) {
    const lines = this.breakpoints.get(file);
    if (lines) {
      lines.delete(line);
    }
  }
  
  isBreakpoint(file: string, line: number): boolean {
    const lines = this.breakpoints.get(file);
    return lines ? lines.has(line) : false;
  }
  
  inspect(variable: any): string {
    return JSON.stringify(variable, null, 2);
  }
}
```

### 调试助手

```ts
class DebugHelper {
  private debugMode: boolean = false;
  private logLevel: LogLevel = LogLevel.INFO;
  
  enableDebugMode() {
    this.debugMode = true;
  }
  
  disableDebugMode() {
    this.debugMode = false;
  }
  
  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }
  
  debug(message: string, ...args: any[]) {
    if (this.debugMode && this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
  
  inspectObject(obj: any): string {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'function') {
        return '[Function]';
      }
      return value;
    }, 2);
  }
  
  getStackTrace(): string {
    return new Error().stack;
  }
}
```

## 日志管理

### 日志系统

```ts
class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  
  log(level: LogLevel, message: string, ...args: any[]) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      args,
      stack: new Error().stack
    };
    
    this.logs.push(entry);
    
    // 保持日志数量在限制内
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
    
    // 输出到控制台
    this.outputToConsole(entry);
  }
  
  private outputToConsole(entry: LogEntry) {
    const timestamp = entry.timestamp.toISOString();
    const level = LogLevel[entry.level];
    console.log(`[${timestamp}] [${level}] ${entry.message}`, ...entry.args);
  }
  
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }
  
  clearLogs() {
    this.logs = [];
  }
  
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}
```

### 日志分析

```ts
class LogAnalyzer {
  private logs: LogEntry[];
  
  constructor(logs: LogEntry[]) {
    this.logs = logs;
  }
  
  analyzeErrors(): ErrorAnalysis[] {
    const errors = this.logs.filter(log => log.level === LogLevel.ERROR);
    return errors.map(error => ({
      message: error.message,
      timestamp: error.timestamp,
      frequency: this.getErrorFrequency(error.message),
      stack: error.stack
    }));
  }
  
  private getErrorFrequency(message: string): number {
    return this.logs.filter(log => 
      log.level === LogLevel.ERROR && 
      log.message === message
    ).length;
  }
  
  getPerformanceMetrics(): PerformanceMetrics {
    const performanceLogs = this.logs.filter(log => 
      log.level === LogLevel.PERFORMANCE
    );
    
    return {
      averageResponseTime: this.calculateAverageResponseTime(performanceLogs),
      maxResponseTime: this.getMaxResponseTime(performanceLogs),
      errorRate: this.calculateErrorRate(),
      requestCount: this.getRequestCount()
    };
  }
}
```

## 最佳实践

1. 使用性能监控工具
2. 优化内存使用
3. 实现渲染优化
4. 合理使用调试工具
5. 完善日志系统

## 总结

本章介绍了 HarmonyOS 性能优化和调试的相关内容，包括性能分析、内存管理、渲染优化、调试工具和日志管理等方面。这些知识能够帮助我们更好地优化应用性能，提高用户体验，并在开发过程中快速定位和解决问题。在实际开发中，我们应该根据应用需求选择合适的优化策略，并注意性能监控和问题排查。
