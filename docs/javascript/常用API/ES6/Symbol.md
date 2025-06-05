# Symbol

[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 是ES6引入的一种新的原始数据类型，表示唯一的标识符。Symbol值是通过`Symbol()`函数创建的。

## 基本语法

```javascript
// 创建Symbol
const sym1 = Symbol();
const sym2 = Symbol('description');

// 使用Symbol
const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2'
};
```

## 特性

### 1. 唯一性

```javascript
const sym1 = Symbol('foo');
const sym2 = Symbol('foo');

console.log(sym1 === sym2); // false
```

### 2. 描述符

```javascript
const sym = Symbol('description');
console.log(sym.description); // "description"
```

### 3. 全局Symbol注册表

```javascript
// 创建或获取全局Symbol
const sym1 = Symbol.for('key');
const sym2 = Symbol.for('key');

console.log(sym1 === sym2); // true

// 获取Symbol的key
console.log(Symbol.keyFor(sym1)); // "key"
```

## 内置Symbol

### 1. Symbol.iterator

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 2. Symbol.toStringTag

```javascript
class MyClass {
    get [Symbol.toStringTag]() {
        return 'MyClass';
    }
}

const obj = new MyClass();
console.log(obj.toString()); // "[object MyClass]"
```

### 3. Symbol.toPrimitive

```javascript
const obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
        }
    }
};

console.log(+obj); // 123
console.log(`${obj}`); // "str"
console.log(obj + ''); // "default"
```

## 实际应用场景

### 1. 私有属性

```javascript
const privateProperty = Symbol('privateProperty');

class MyClass {
    constructor() {
        this[privateProperty] = 'private value';
    }

    getPrivateValue() {
        return this[privateProperty];
    }
}
```

### 2. 自定义迭代器

```javascript
class Collection {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    *[Symbol.iterator]() {
        for (const item of this.items) {
            yield item;
        }
    }
}

const collection = new Collection();
collection.add(1);
collection.add(2);
collection.add(3);

for (const item of collection) {
    console.log(item);
}
```

### 3. 类型检查

```javascript
const type = Symbol('type');

class Animal {
    constructor() {
        this[type] = 'animal';
    }

    getType() {
        return this[type];
    }
}
```

## 最佳实践

### 1. 使用Symbol作为对象键

```javascript
const PRIVATE_KEY = Symbol('privateKey');

const obj = {
    [PRIVATE_KEY]: 'private value',
    publicKey: 'public value'
};

console.log(obj[PRIVATE_KEY]); // "private value"
console.log(Object.keys(obj)); // ["publicKey"]
```

### 2. 使用Symbol.for()共享Symbol

```javascript
// 在不同模块中共享Symbol
const sharedSymbol = Symbol.for('shared');

// module1.js
const obj1 = {
    [sharedSymbol]: 'value1'
};

// module2.js
const obj2 = {
    [sharedSymbol]: 'value2'
};
```

### 3. 使用Symbol作为枚举值

```javascript
const Direction = {
    UP: Symbol('UP'),
    DOWN: Symbol('DOWN'),
    LEFT: Symbol('LEFT'),
    RIGHT: Symbol('RIGHT')
};

function move(direction) {
    switch (direction) {
        case Direction.UP:
            console.log('Moving up');
            break;
        case Direction.DOWN:
            console.log('Moving down');
            break;
        // ...
    }
}
```

## 注意事项

1. Symbol不能使用new操作符

    ```javascript
    const sym = new Symbol(); // TypeError
    ```

2. Symbol不能转换为数字

    ```javascript
    const sym = Symbol();
    console.log(+sym); // TypeError
    ```

3. Symbol可以转换为字符串

    ```javascript
    const sym = Symbol('description');
    console.log(String(sym)); // "Symbol(description)"
    ```

4. Symbol不能用于for...in循环

    ```javascript
    const sym = Symbol('key');
    const obj = {
        [sym]: 'value',
        normalKey: 'normal value'
    };

    for (const key in obj) {
        console.log(key); // 只输出 "normalKey"
    }
    ```

5. Symbol不会被自动转换为字符串

    ```javascript
    const sym = Symbol('key');
    const obj = {
        [sym]: 'value'
    };

    console.log(obj[sym]); // "value"
    console.log(obj['Symbol(key)']); // undefined
    ```
