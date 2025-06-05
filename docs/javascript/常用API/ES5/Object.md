# ES5 Object 方法

ES5 为 Object 对象提供了一些重要的静态方法，这些方法可以帮助我们更好地操作对象。以下是常用的 Object 方法：

## 1. [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

创建一个新对象，使用现有的对象作为新创建对象的原型。

```javascript
const person = {
    sayHello: function() {
        console.log('Hello!');
    }
};

const john = Object.create(person);
john.sayHello(); // "Hello!"
```

## 2. [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

直接在对象上定义新属性，或修改现有属性，并返回该对象。

```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,
    enumerable: true,
    configurable: true
});

console.log(obj.name); // "John"
```

## 3. [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

直接在对象上定义多个新属性，或修改现有属性，并返回该对象。

```javascript
const obj = {};

Object.defineProperties(obj, {
    name: {
        value: 'John',
        writable: true
    },
    age: {
        value: 30,
        writable: false
    }
});
```

## 4. [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

返回指定对象上一个自有属性对应的属性描述符。

```javascript
const obj = { name: 'John' };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor);
// {
//     value: 'John',
//     writable: true,
//     enumerable: true,
//     configurable: true
// }
```

## 5. [Object.keys]

返回一个由给定对象的所有可枚举属性的字符串数组。

```javascript
const obj = {
    name: 'John',
    age: 30
};
console.log(Object.keys(obj)); // ["name", "age"]
```

## 6. [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。

```javascript
const obj = {
    name: 'John',
    age: 30
};
Object.defineProperty(obj, 'id', {
    value: 1,
    enumerable: false
});
console.log(Object.getOwnPropertyNames(obj)); // ["name", "age", "id"]
```

## 7. [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

冻结一个对象，使其不能被修改。

```javascript
const obj = { name: 'John' };
Object.freeze(obj);
obj.name = 'Jane'; // 在严格模式下会抛出错误
console.log(obj.name); // "John"
```

## 8. [Object.seal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。

```javascript
const obj = { name: 'John' };
Object.seal(obj);
obj.age = 30; // 在严格模式下会抛出错误
obj.name = 'Jane'; // 可以修改现有属性
```

## 9. [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

阻止向对象添加新属性。

```javascript
const obj = { name: 'John' };
Object.preventExtensions(obj);
obj.age = 30; // 在严格模式下会抛出错误
console.log(obj.age); // undefined
```

## 10. [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)

判断一个对象是否可扩展（是否可以添加新属性）。

```javascript
const obj = { name: 'John' };
console.log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false
```

## 11. [Object.isSealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)

判断一个对象是否被密封。

```javascript
const obj = { name: 'John' };
console.log(Object.isSealed(obj)); // false
Object.seal(obj);
console.log(Object.isSealed(obj)); // true
```

## 12. [Object.isFrozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)

判断一个对象是否被冻结。

```javascript
const obj = { name: 'John' };
console.log(Object.isFrozen(obj)); // false
Object.freeze(obj);
console.log(Object.isFrozen(obj)); // true
```

## 13. [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

返回指定对象的原型。

```javascript
const proto = { x: 10 };
const obj = Object.create(proto);
console.log(Object.getPrototypeOf(obj) === proto); // true
```

## 14. [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)

返回一个给定对象自身的所有 Symbol 属性的数组。

```javascript
const sym = Symbol('description');
const obj = {
    [sym]: 'value'
};
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(description)]
```

## 实际应用场景

1. **创建不可变对象**：

    ```javascript
    function createImmutableObject(obj) {
        return Object.freeze(Object.create(null, Object.getOwnPropertyDescriptors(obj)));
    }

    const immutable = createImmutableObject({ name: 'John', age: 30 });
    ```

2. **属性访问器**：

    ```javascript
    const person = {
        _name: 'John',
        _age: 30
    };

    Object.defineProperty(person, 'name', {
        get: function() {
            return this._name;
        },
        set: function(value) {
            this._name = value;
        }
    });
    ```

3. **对象属性验证**：

    ```javascript
    function createValidatedObject(obj, validators) {
        const validated = {};
        
        Object.keys(obj).forEach(key => {
            if (validators[key] && !validators[key](obj[key])) {
                throw new Error(`Invalid value for ${key}`);
            }
            Object.defineProperty(validated, key, {
                value: obj[key],
                writable: false
            });
        });
        
        return Object.freeze(validated);
    }
    ```

4. **对象状态检查**：

    ```javascript
    function checkObjectState(obj) {
        return {
            isExtensible: Object.isExtensible(obj),
            isSealed: Object.isSealed(obj),
            isFrozen: Object.isFrozen(obj)
        };
    }
    ```

5. **原型链操作**：

    ```javascript
    function createInheritanceChain(...prototypes) {
        return prototypes.reduce((obj, proto) => {
            return Object.create(obj, Object.getOwnPropertyDescriptors(proto));
        }, {});
    }
    ```

6. **数据验证和响应式**：

    ```javascript
    function createReactiveObject(obj, onChange) {
        const reactive = {};
        
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            
            Object.defineProperty(reactive, key, {
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    const oldValue = value;
                    value = newValue;
                    onChange(key, oldValue, newValue);
                },
                enumerable: true,
                configurable: true
            });
        });
        
        return reactive;
    }

    // 使用示例
    const user = createReactiveObject(
        { name: 'John', age: 30 },
        (key, oldValue, newValue) => {
            console.log(`${key} changed from ${oldValue} to ${newValue}`);
        }
    );
    ```

7. **不可变数据结构**：

    ```javascript
    function createImmutableObject(obj) {
        const immutable = {};
        
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            
            Object.defineProperty(immutable, key, {
                value: typeof value === 'object' && value !== null
                    ? createImmutableObject(value)
                    : value,
                writable: false,
                enumerable: true,
                configurable: false
            });
        });
        
        return Object.freeze(immutable);
    }

    // 使用示例
    const config = createImmutableObject({
        api: {
            baseUrl: 'https://api.example.com',
            timeout: 5000
        },
        features: {
            darkMode: true
        }
    });
    ```

8. **属性访问控制**：

    ```javascript
    function createPrivateProperties(obj, privateProps) {
        const privateData = new WeakMap();
        privateData.set(obj, {});
        
        Object.keys(privateProps).forEach(key => {
            privateData.get(obj)[key] = privateProps[key];
            
            Object.defineProperty(obj, key, {
                get: function() {
                    return privateData.get(this)[key];
                },
                set: function(value) {
                    privateData.get(this)[key] = value;
                },
                enumerable: false,
                configurable: false
            });
        });
        
        return obj;
    }

    // 使用示例
    const person = createPrivateProperties({}, {
        _salary: 5000,
        _bonus: 1000
    });
    ```

9. **对象状态管理**：

    ```javascript
    function createStateManager(initialState) {
        const state = Object.freeze({ ...initialState });
        const listeners = new Set();
        
        return {
            getState: () => state,
            subscribe: (listener) => {
                listeners.add(listener);
                return () => listeners.delete(listener);
            },
            setState: (newState) => {
                Object.keys(newState).forEach(key => {
                    if (Object.isFrozen(state)) {
                        throw new Error('Cannot modify frozen state');
                    }
                    Object.defineProperty(state, key, {
                        value: newState[key],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                });
                listeners.forEach(listener => listener(state));
            }
        };
    }

    // 使用示例
    const store = createStateManager({ count: 0 });
    store.subscribe(state => console.log('State updated:', state));
    ```

## 最佳实践

1. **属性描述符的使用**：

    ```javascript
    // 推荐：明确指定所有属性描述符
    Object.defineProperty(obj, 'property', {
        value: 'value',
        writable: true,
        enumerable: true,
        configurable: false
    });

    // 不推荐：依赖默认值
    Object.defineProperty(obj, 'property', {
        value: 'value'
    });
    ```

2. **对象冻结的层次**：

    ```javascript
    // 推荐：深冻结对象
    function deepFreeze(obj) {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                deepFreeze(value);
            }
        });
        return Object.freeze(obj);
    }

    // 使用示例
    const config = deepFreeze({
        api: {
            endpoints: {
                users: '/api/users'
            }
        }
    });
    ```

3. **原型继承的安全使用**：

    ```javascript
    // 推荐：使用 Object.create 创建原型链
    const base = {
        method() {
            console.log('base method');
        }
    };

    const derived = Object.create(base, {
        method: {
            value: function() {
                Object.getPrototypeOf(this).method.call(this);
                console.log('derived method');
            },
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    ```

## 注意事项

1. Object.create 是创建对象继承的推荐方式
2. 属性描述符中的 writable、enumerable、configurable 默认为 false
3. Object.freeze 是浅冻结，嵌套对象仍然可以修改
4. 使用 Object.defineProperty 可以创建不可枚举的属性
5. 这些方法都是 ES5 标准的一部分，在现代浏览器中都有很好的支持
6. Object.preventExtensions 只阻止添加新属性，不影响现有属性的修改
7. Object.isSealed 和 Object.isFrozen 都会检查对象是否可扩展
8. Object.getPrototypeOf 是获取对象原型的标准方法，替代了非标准的 **proto** 属性
9. 这些方法都是不可逆的，一旦应用就无法撤销
10. 在处理不可变数据时，这些方法特别有用
11. 使用 Object.defineProperty 时，建议明确指定所有属性描述符，避免依赖默认值
12. 在处理复杂对象时，考虑使用深冻结来确保完全不可变性
13. 使用 WeakMap 来存储私有数据，避免内存泄漏
14. 在创建响应式对象时，注意性能影响，避免过度使用 getter/setter
15. 使用 Object.create 创建原型链时，注意正确设置 this 上下文
