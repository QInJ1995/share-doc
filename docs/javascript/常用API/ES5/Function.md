# ES5 Function 方法

ES5 为函数提供了一些重要的方法，这些方法可以帮助我们更好地控制函数的执行上下文和参数。以下是常用的函数方法：

## 1. [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

创建一个新的函数，在调用时设置 this 关键字为提供的值，并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

```javascript
const person = {
    name: 'John',
    sayHello: function() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

const sayHello = person.sayHello.bind(person);
sayHello(); // "Hello, I'm John"
```

## 2. [Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

调用一个函数，其具有一个指定的 this 值和分别提供的参数。

```javascript
function greet(greeting) {
    console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: 'John' };
greet.call(person, 'Hello'); // "Hello, I'm John"
```

## 3. [Function.prototype.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

调用一个函数，其具有一个指定的 this 值，以及作为一个数组（或类似数组对象）提供的参数。

```javascript
function greet(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };
greet.apply(person, ['Hello', '!']); // "Hello, I'm John!"
```

## 4. Function.prototype.toString()

返回表示函数源代码的字符串。

```javascript
function add(a, b) {
    return a + b;
}

console.log(add.toString());
// 输出: "function add(a, b) { return a + b; }"
```

## 5. Function.prototype.length

返回函数期望的参数数量。

```javascript
function add(a, b) {
    return a + b;
}

console.log(add.length); // 2

function noArgs() {}
console.log(noArgs.length); // 0

function rest(...args) {}
console.log(rest.length); // 0
```

## 6. Function.prototype.name

返回函数的名称。

```javascript
function add(a, b) {
    return a + b;
}

console.log(add.name); // "add"

const multiply = function(a, b) {
    return a * b;
};
console.log(multiply.name); // "multiply"
```

## 实际应用场景

1. **函数柯里化**：

    ```javascript
    function curry(fn) {
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn.apply(this, args);
            }
            return function(...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        };
    }

    function add(a, b, c) {
        return a + b + c;
    }

    const curriedAdd = curry(add);
    console.log(curriedAdd(1)(2)(3)); // 6
    ```

2. **方法借用**：

    ```javascript
    const arrayLike = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };

    const array = Array.prototype.slice.call(arrayLike);
    console.log(array); // ['a', 'b', 'c']
    ```

3. **构造函数继承**：

    ```javascript
    function Animal(name) {
        this.name = name;
    }

    function Dog(name, breed) {
        Animal.call(this, name);
        this.breed = breed;
    }

    const dog = new Dog('Rex', 'German Shepherd');
    console.log(dog.name); // "Rex"
    ```

4. **事件处理器的 this 绑定**：

    ```javascript
    class Button {
        constructor() {
            this.clicked = false;
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.clicked = true;
            console.log('Button clicked!');
        }
    }

    const button = new Button();
    document.querySelector('button').addEventListener('click', button.handleClick);
    ```

5. **函数组合**：

    ```javascript
    function compose(...fns) {
        return function(x) {
            return fns.reduceRight((y, f) => f(y), x);
        };
    }

    const addOne = x => x + 1;
    const double = x => x * 2;
    const addOneAndDouble = compose(double, addOne);
    console.log(addOneAndDouble(3)); // 8
    ```

6. **防抖和节流**：

    ```javascript
    // 防抖
    function debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    // 节流
    function throttle(fn, limit) {
        let inThrottle = false;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 使用示例
    const handleScroll = throttle(() => {
        console.log('Scroll event throttled');
    }, 1000);
    ```

7. **异步函数包装器**：

    ```javascript
    function asyncHandler(fn) {
        return function(req, res, next) {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        };
    }

    // 使用示例
    const asyncFunction = asyncHandler(async (req, res) => {
        const data = await fetchData();
        res.json(data);
    });
    ```

8. **函数重试机制**：

    ```javascript
    function retry(fn, times = 3, delay = 1000) {
        return async function(...args) {
            let lastError;
            for (let i = 0; i < times; i++) {
                try {
                    return await fn.apply(this, args);
                } catch (error) {
                    lastError = error;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            throw lastError;
        };
    }

    // 使用示例
    const fetchWithRetry = retry(fetch, 3);
    ```

## 注意事项

1. bind 方法返回一个新函数，不会立即执行
2. call 和 apply 会立即执行函数
3. bind 创建的函数不能再次使用 bind 改变 this 指向
4. 在严格模式下，函数调用时的 this 默认为 undefined
5. 箭头函数不能使用 bind、call 和 apply 方法
6. 使用 bind 时要注意内存泄漏问题，特别是在事件监听器中
7. 在循环中创建绑定函数要特别注意性能问题
8. 使用 call 和 apply 时要注意参数类型和顺序

## 性能考虑

1. bind 创建新函数会占用内存，如果频繁使用，建议缓存绑定后的函数
2. call 和 apply 的性能差异很小，但 call 通常更易读
3. 在循环中创建绑定函数要特别注意内存使用
4. 使用闭包时要注意内存泄漏问题
5. 大量使用函数装饰器可能会影响性能
6. 在高频调用的场景下，要考虑使用节流或防抖

## 最佳实践

1. 优先使用 bind 而不是箭头函数来保持 this 上下文
2. 使用 call 或 apply 时，确保参数类型正确
3. 在类方法中，在构造函数中绑定 this 而不是在渲染时
4. 使用 bind 时考虑使用部分应用（partial application）来创建更灵活的函数
5. 合理使用函数组合来构建复杂功能
6. 使用防抖和节流来优化性能
7. 在异步操作中使用适当的错误处理机制
8. 使用函数装饰器来增强代码的可维护性
9. 在需要重试的场景下使用重试机制
10. 合理使用函数缓存来优化性能

## 常见陷阱和解决方案

1. **this 指向问题**：

    ```javascript
    // 错误示例
    const obj = {
        name: 'test',
        method: function() {
            setTimeout(function() {
                console.log(this.name); // undefined
            }, 100);
        }
    };

    // 解决方案 1：使用 bind
    const obj = {
        name: 'test',
        method: function() {
            setTimeout(function() {
                console.log(this.name);
            }.bind(this), 100);
        }
    };

    // 解决方案 2：使用箭头函数
    const obj = {
        name: 'test',
        method: function() {
            setTimeout(() => {
                console.log(this.name);
            }, 100);
        }
    };
    ```

2. **参数传递问题**：

    ```javascript
    // 错误示例
    function log() {
        console.log(arguments);
    }
    const args = [1, 2, 3];
    log(args); // 输出: [[1, 2, 3]]

    // 解决方案：使用 apply
    function log() {
        console.log(arguments);
    }
    const args = [1, 2, 3];
    log.apply(null, args); // 输出: [1, 2, 3]
    ```

3. **内存泄漏问题**：

    ```javascript
    // 错误示例
    class EventEmitter {
        constructor() {
            this.handlers = [];
        }
        addHandler(handler) {
            this.handlers.push(handler);
        }
    }

    // 解决方案：提供移除方法
    class EventEmitter {
        constructor() {
            this.handlers = new Set();
        }
        addHandler(handler) {
            this.handlers.add(handler);
            return () => this.handlers.delete(handler);
        }
    }
    ```

## 函数属性使用示例

1. **函数检查**：

    ```javascript
    function isFunction(fn) {
        return typeof fn === 'function' && fn.toString().startsWith('function');
    }

    console.log(isFunction(add)); // true
    console.log(isFunction({})); // false
    ```

2. **参数验证**：

    ```javascript
    function validateArgs(fn, args) {
        if (args.length < fn.length) {
            throw new Error(`Expected ${fn.length} arguments, but got ${args.length}`);
        }
    }

    function add(a, b) {
        validateArgs(add, arguments);
        return a + b;
    }

    add(1); // Error: Expected 2 arguments, but got 1
    ```

3. **函数装饰器**：

    ```javascript
    function log(fn) {
        return function(...args) {
            console.log(`Calling ${fn.name} with args:`, args);
            const result = fn.apply(this, args);
            console.log(`${fn.name} returned:`, result);
            return result;
        };
    }

    const loggedAdd = log(add);
    loggedAdd(1, 2); // 输出调用信息和结果
    ```

4. **函数缓存**：

    ```javascript
    function memoize(fn) {
        const cache = new Map();
        return function(...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }

    const memoizedAdd = memoize(add);
    console.log(memoizedAdd(1, 2)); // 计算并缓存
    console.log(memoizedAdd(1, 2)); // 从缓存返回
    ```
