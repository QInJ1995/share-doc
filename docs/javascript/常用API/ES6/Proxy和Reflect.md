# Proxy和Reflect

ES6引入了Proxy和Reflect，用于拦截和自定义对象的基本操作。

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Proxy用于创建一个对象的代理，从而可以拦截和自定义该对象的基本操作。

### 基本语法

```javascript
const proxy = new Proxy(target, handler);
```

### 基本用法

```javascript
const target = {
    name: 'John',
    age: 30
};

const handler = {
    get(target, prop) {
        console.log(`Getting property: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`Setting property: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // "Getting property: name" "John"
proxy.age = 31; // "Setting property: age = 31"
```

### 常用的拦截操作

```javascript
const handler = {
    // 拦截属性读取
    get(target, prop, receiver) {
        return target[prop];
    },

    // 拦截属性设置
    set(target, prop, value, receiver) {
        target[prop] = value;
        return true;
    },

    // 拦截属性删除
    deleteProperty(target, prop) {
        delete target[prop];
        return true;
    },

    // 拦截属性检查
    has(target, prop) {
        return prop in target;
    },

    // 拦截函数调用
    apply(target, thisArg, args) {
        return target.apply(thisArg, args);
    },

    // 拦截new操作符
    construct(target, args) {
        return new target(...args);
    }
};
```

### 实际应用场景

#### 1. 数据验证

```javascript
const validator = {
    set(target, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('Age must be an integer');
            }
            if (value < 0 || value > 150) {
                throw new RangeError('Age must be between 0 and 150');
            }
        }
        target[prop] = value;
        return true;
    }
};

const person = new Proxy({}, validator);
person.age = 30; // 正常
person.age = 'young'; // TypeError
person.age = 200; // RangeError
```

#### 2. 属性访问控制

```javascript
const handler = {
    get(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error('Access denied');
        }
        return target[prop];
    }
};

const obj = new Proxy({
    name: 'John',
    _secret: 'secret'
}, handler);

console.log(obj.name); // "John"
console.log(obj._secret); // Error: Access denied
```

#### 3. 函数参数验证

```javascript
function createProxy(fn, validator) {
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            if (validator(args)) {
                return target.apply(thisArg, args);
            }
            throw new Error('Invalid arguments');
        }
    });
}

const sum = createProxy((a, b) => a + b, args => args.length === 2);
console.log(sum(1, 2)); // 3
console.log(sum(1)); // Error: Invalid arguments
```

## [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

Reflect是一个内置对象，提供拦截JavaScript操作的方法。

### 基本用法

```javascript
const obj = {
    name: 'John',
    age: 30
};

// 获取属性
console.log(Reflect.get(obj, 'name')); // "John"

// 设置属性
Reflect.set(obj, 'age', 31);

// 检查属性是否存在
console.log(Reflect.has(obj, 'name')); // true

// 删除属性
Reflect.deleteProperty(obj, 'age');

// 获取对象的所有属性
console.log(Reflect.ownKeys(obj)); // ["name"]
```

### 实际应用场景

#### 1. 函数调用

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

// 使用Reflect.apply调用函数
console.log(Reflect.apply(greet, null, ['John'])); // "Hello, John!"
```

#### 2. 构造函数调用

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
}

// 使用Reflect.construct创建实例
const person = Reflect.construct(Person, ['John']);
console.log(person.name); // "John"
```

#### 3. 属性定义

```javascript
const obj = {};

// 使用Reflect.defineProperty定义属性
Reflect.defineProperty(obj, 'name', {
    value: 'John',
    writable: false,
    enumerable: true
});

console.log(obj.name); // "John"
obj.name = 'Jane'; // 严格模式下会报错
```

## Proxy和Reflect结合使用

```javascript
const handler = {
    get(target, prop, receiver) {
        console.log(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        console.log(`Setting property: ${prop} = ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy({}, handler);
proxy.name = 'John';
console.log(proxy.name);
```

## 最佳实践

### 1. 使用Proxy实现观察者模式

```javascript
function createObservable(target) {
    const observers = new Set();
    
    return new Proxy(target, {
        set(target, prop, value) {
            const oldValue = target[prop];
            const result = Reflect.set(target, prop, value);
            if (oldValue !== value) {
                observers.forEach(observer => observer(prop, oldValue, value));
            }
            return result;
        }
    });
}
```

### 2. 使用Reflect实现默认行为

```javascript
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        }
        return 'default value';
    }
};
```

### 3. 使用Proxy实现缓存

```javascript
function createCachedFunction(fn) {
    const cache = new Map();
    
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });
}
```

## 注意事项

1. Proxy的handler必须是一个对象

    ```javascript
    const proxy = new Proxy({}, null); // TypeError
    ```

2. Proxy的handler方法必须返回正确的值

    ```javascript
    const handler = {
        set(target, prop, value) {
            target[prop] = value;
            // 必须返回true或false
        }
    };
    ```

3. Reflect的方法与Proxy的handler方法一一对应

    ```javascript
    // 这些方法是对应的
    Reflect.get() <-> handler.get()
    Reflect.set() <-> handler.set()
    Reflect.has() <-> handler.has()
    ```

4. Proxy可以代理任何对象，包括函数

    ```javascript
    const fn = new Proxy(function() {}, {
        apply(target, thisArg, args) {
            console.log('Function called');
            return Reflect.apply(target, thisArg, args);
        }
    });
    ```

5. Proxy的handler方法中的this指向handler对象

    ```javascript
    const handler = {
        get(target, prop) {
            console.log(this === handler); // true
            return target[prop];
        }
    };
    ```
