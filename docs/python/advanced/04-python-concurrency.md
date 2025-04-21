# Python 并发编程

## 多线程编程

### 基本线程操作
```python
import threading
import time

def worker():
    print(f"线程 {threading.current_thread().name} 开始")
    time.sleep(2)
    print(f"线程 {threading.current_thread().name} 结束")

# 创建线程
thread = threading.Thread(target=worker, name="WorkerThread")
thread.start()
thread.join()  # 等待线程结束
```

### 线程同步
```python
import threading

class Counter:
    def __init__(self):
        self.value = 0
        self.lock = threading.Lock()

    def increment(self):
        with self.lock:
            self.value += 1

def worker(counter):
    for _ in range(1000):
        counter.increment()

# 创建多个线程
counter = Counter()
threads = []
for _ in range(10):
    thread = threading.Thread(target=worker, args=(counter,))
    threads.append(thread)
    thread.start()

# 等待所有线程完成
for thread in threads:
    thread.join()

print(f"最终计数: {counter.value}")
```

### 线程间通信
```python
import threading
import queue
import time

def producer(q):
    for i in range(5):
        print(f"生产: {i}")
        q.put(i)
        time.sleep(1)
    q.put(None)  # 发送结束信号

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"消费: {item}")
        q.task_done()

# 创建队列
q = queue.Queue()

# 创建线程
producer_thread = threading.Thread(target=producer, args=(q,))
consumer_thread = threading.Thread(target=consumer, args=(q,))

# 启动线程
producer_thread.start()
consumer_thread.start()

# 等待线程结束
producer_thread.join()
consumer_thread.join()
```

## 多进程编程

### 基本进程操作
```python
import multiprocessing
import time

def worker():
    print(f"进程 {multiprocessing.current_process().name} 开始")
    time.sleep(2)
    print(f"进程 {multiprocessing.current_process().name} 结束")

# 创建进程
process = multiprocessing.Process(target=worker, name="WorkerProcess")
process.start()
process.join()  # 等待进程结束
```

### 进程间通信
```python
import multiprocessing

def sender(conn):
    conn.send("Hello from sender")
    conn.close()

def receiver(conn):
    msg = conn.recv()
    print(f"收到消息: {msg}")
    conn.close()

# 创建管道
parent_conn, child_conn = multiprocessing.Pipe()

# 创建进程
p1 = multiprocessing.Process(target=sender, args=(parent_conn,))
p2 = multiprocessing.Process(target=receiver, args=(child_conn,))

# 启动进程
p1.start()
p2.start()

# 等待进程结束
p1.join()
p2.join()
```

### 进程池
```python
import multiprocessing
import time

def worker(x):
    print(f"处理 {x}")
    time.sleep(1)
    return x * x

# 创建进程池
with multiprocessing.Pool(processes=4) as pool:
    # 使用 map
    results = pool.map(worker, range(10))
    print(results)

    # 使用 apply_async
    results = [pool.apply_async(worker, (x,)) for x in range(10)]
    print([r.get() for r in results])
```

## 异步编程

### 协程基础
```python
import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

# 运行协程
asyncio.run(say_hello())
```

### 并发任务
```python
import asyncio

async def task(name, delay):
    print(f"任务 {name} 开始")
    await asyncio.sleep(delay)
    print(f"任务 {name} 完成")
    return f"任务 {name} 结果"

async def main():
    # 创建任务
    tasks = [
        task("A", 2),
        task("B", 1),
        task("C", 3)
    ]
    
    # 并发执行
    results = await asyncio.gather(*tasks)
    print(results)

# 运行
asyncio.run(main())
```

### 异步上下文管理器
```python
import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def async_file_manager(filename, mode):
    file = open(filename, mode)
    try:
        yield file
    finally:
        file.close()

async def main():
    async with async_file_manager("example.txt", "w") as f:
        f.write("Hello, World!")

asyncio.run(main())
```

## 并发工具

### 线程池执行器
```python
from concurrent.futures import ThreadPoolExecutor
import time

def task(n):
    print(f"处理任务 {n}")
    time.sleep(1)
    return n * n

# 使用线程池
with ThreadPoolExecutor(max_workers=4) as executor:
    # 提交任务
    futures = [executor.submit(task, i) for i in range(10)]
    
    # 获取结果
    results = [f.result() for f in futures]
    print(results)
```

### 进程池执行器
```python
from concurrent.futures import ProcessPoolExecutor
import time

def task(n):
    print(f"处理任务 {n}")
    time.sleep(1)
    return n * n

# 使用进程池
with ProcessPoolExecutor(max_workers=4) as executor:
    # 提交任务
    futures = [executor.submit(task, i) for i in range(10)]
    
    # 获取结果
    results = [f.result() for f in futures]
    print(results)
```

### 异步队列
```python
import asyncio

async def producer(queue):
    for i in range(5):
        print(f"生产: {i}")
        await queue.put(i)
        await asyncio.sleep(1)
    await queue.put(None)

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"消费: {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    
    # 创建任务
    producer_task = asyncio.create_task(producer(queue))
    consumer_task = asyncio.create_task(consumer(queue))
    
    # 等待任务完成
    await producer_task
    await consumer_task

# 运行
asyncio.run(main())
```

## 并发模式

### 生产者-消费者模式
```python
import asyncio
import random

async def producer(queue):
    for i in range(10):
        item = random.randint(1, 100)
        print(f"生产者生产: {item}")
        await queue.put(item)
        await asyncio.sleep(random.random())
    await queue.put(None)

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"消费者消费: {item}")
        await asyncio.sleep(random.random())
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    
    # 创建任务
    producer_task = asyncio.create_task(producer(queue))
    consumer_task = asyncio.create_task(consumer(queue))
    
    # 等待任务完成
    await producer_task
    await consumer_task

# 运行
asyncio.run(main())
```

### 工作池模式
```python
import asyncio
import random

async def worker(name, queue):
    while True:
        task = await queue.get()
        if task is None:
            break
        print(f"工人 {name} 处理任务: {task}")
        await asyncio.sleep(random.random())
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    
    # 添加任务
    for i in range(20):
        await queue.put(i)
    
    # 添加结束信号
    for _ in range(4):
        await queue.put(None)
    
    # 创建工作池
    workers = [
        asyncio.create_task(worker(f"Worker-{i}", queue))
        for i in range(4)
    ]
    
    # 等待所有任务完成
    await queue.join()
    
    # 等待所有工人完成
    await asyncio.gather(*workers)

# 运行
asyncio.run(main())
```

### 发布-订阅模式
```python
import asyncio
from typing import Dict, Set, Callable

class EventBus:
    def __init__(self):
        self._subscribers: Dict[str, Set[Callable]] = {}

    def subscribe(self, event: str, callback: Callable):
        if event not in self._subscribers:
            self._subscribers[event] = set()
        self._subscribers[event].add(callback)

    def unsubscribe(self, event: str, callback: Callable):
        if event in self._subscribers:
            self._subscribers[event].discard(callback)

    async def publish(self, event: str, *args, **kwargs):
        if event in self._subscribers:
            for callback in self._subscribers[event]:
                await callback(*args, **kwargs)

async def main():
    bus = EventBus()
    
    async def on_message(message):
        print(f"收到消息: {message}")
    
    # 订阅
    bus.subscribe("message", on_message)
    
    # 发布
    await bus.publish("message", "Hello, World!")
    
    # 取消订阅
    bus.unsubscribe("message", on_message)

# 运行
asyncio.run(main())
``` 