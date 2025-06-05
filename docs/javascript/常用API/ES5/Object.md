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

## 注意事项

1. Object.create 是创建对象继承的推荐方式
2. 属性描述符中的 writable、enumerable、configurable 默认为 false
3. Object.freeze 是浅冻结，嵌套对象仍然可以修改
4. 使用 Object.defineProperty 可以创建不可枚举的属性
5. 这些方法都是 ES5 标准的一部分，在现代浏览器中都有很好的支持
