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

## 注意事项

1. bind 方法返回一个新函数，不会立即执行
2. call 和 apply 会立即执行函数
3. bind 创建的函数不能再次使用 bind 改变 this 指向
4. 在严格模式下，函数调用时的 this 默认为 undefined
5. 箭头函数不能使用 bind、call 和 apply 方法

## 性能考虑

1. bind 创建新函数会占用内存，如果频繁使用，建议缓存绑定后的函数
2. call 和 apply 的性能差异很小，但 call 通常更易读
3. 在循环中创建绑定函数要特别注意内存使用

## 最佳实践

1. 优先使用 bind 而不是箭头函数来保持 this 上下文
2. 使用 call 或 apply 时，确保参数类型正确
3. 在类方法中，在构造函数中绑定 this 而不是在渲染时
4. 使用 bind 时考虑使用部分应用（partial application）来创建更灵活的函数
