# Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 [proxy handler](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) 的方法相同。`Reflect` 不是一个函数对象，因此它是不可构造的。

## 函数相关

### [Reflect.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

Reflect.apply() 通过指定的参数列表发起对目标 (target) 函数的调用。

```javascript
Reflect.apply(Math.floor, undefined, [1.75]);
// 1;

Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]);
// "hello"

Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index;
// 4

Reflect.apply("".charAt, "ponies", [3]);
// "i"
```

### [Reflect.construct()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)

Reflect.construct() 方法的行为有点像 [new 操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 构造函数，相当于运行 new target(...args)

```javascript
var d = Reflect.construct(Date, [1776, 6, 4]);
d instanceof Date; // true
d.getFullYear(); // 1776
```

## 原型相关

### [Reflect.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)

静态方法 `Reflect.getPrototypeOf()` 与 [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 方法是一样的。都是返回指定对象的原型（即内部的 [[Prototype]] 属性的值）。几乎是一样的。都是返回指定对象的原型（即内部的 `[[Prototype]]` 属性的值）。

```javascript
const object1 = {
  property1: 42,
};

const proto1 = Reflect.getPrototypeOf(object1);

console.log(proto1);
// Expected output: Object {  }

console.log(Reflect.getPrototypeOf(proto1));
// Expected output: null
```

### [Reflect.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)

除了返回类型以外，静态方法 `Reflect.setPrototypeOf()` 与 [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 方法是一样的。它可设置对象的原型（即内部的 `[[Prototype]]` 属性）为另一个对象或 `null`，如果操作成功返回 true，否则返回 false。

```javascript
Reflect.setPrototypeOf({}, Object.prototype); // true

// It can change an object's [[Prototype]] to null.
Reflect.setPrototypeOf({}, null); // true

// Returns false if target is not extensible.
Reflect.setPrototypeOf(Object.freeze({}), null); // false

// Returns false if it cause a prototype chain cycle.
var target = {};
var proto = Object.create(target);
Reflect.setPrototypeOf(target, proto); // false

```

## 对象相关

### [Reflect.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)

静态方法 `Reflect.defineProperty()` 基本等同于 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，唯一不同是返回 `Boolean` 值。

```javascript
let obj = {}
Reflect.defineProperty(obj, 'x', {value: 7})  // true
obj.x                                         // 7
```

### [Reflect.deleteProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)

静态方法 `Reflect.deleteProperty()` 允许用于删除属性。它很像 [delete operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) ，但它是一个函数。

```javascript
var obj = { x: 1, y: 2 };
Reflect.deleteProperty(obj, "x"); // true
obj; // { y: 2 }

var arr = [1, 2, 3, 4, 5];
Reflect.deleteProperty(arr, "3"); // true
arr; // [1, 2, 3, , 5]

// 如果属性不存在，返回 true
Reflect.deleteProperty({}, "foo"); // true

// 如果属性不可配置，返回 false
Reflect.deleteProperty(Object.freeze({ foo: 1 }), "foo"); // false
```

### [Reflect.get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)

`Reflect.get()` 方法与从 对象 (`target[propertyKey]`) 中读取属性类似，但它是通过一个函数执行来操作的。

```javascript
// Object
var obj = { x: 1, y: 2 };
Reflect.get(obj, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1); // "one"

// Proxy with a get handler
var x = { p: 1 };
var obj = new Proxy(x, {
  get(t, k, r) {
    return k + "bar";
  },
});
Reflect.get(obj, "foo"); // "foobar"
```

### [Reflect.set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)

静态方法 `Reflect.set()` 工作方式就像在一个对象上设置一个属性。

```javascript
// Object
var obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
var arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"

// It can truncate an array.
Reflect.set(arr, "length", 1); // true
arr; // ["duck"];

// With just one argument, propertyKey and value are "undefined".
var obj = {};
Reflect.set(obj); // true
Reflect.getOwnPropertyDescriptor(obj, "undefined");
// { value: undefined, writable: true, enumerable: true, configurable: true }
```

### [Reflect.has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)

静态方法 `Reflect.has()` 作用与 [in 操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 相同。

```javascript
Reflect.has({ x: 0 }, "x"); // true
Reflect.has({ x: 0 }, "y"); // false

// 如果该属性存在于原型链中，返回 true
Reflect.has({ x: 0 }, "toString");

// Proxy 对象的 .has() 句柄方法
obj = new Proxy(
  {},
  {
    has(t, k) {
      return k.startsWith("door");
    },
  },
);
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false
```

### [Reflect.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)

静态方法 `Reflect.getOwnPropertyDescriptor()` 与 [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 方法相似。如果在对象中存在，则返回给定的属性的属性描述符。否则返回 `undefined`。

```javascript
Reflect.getOwnPropertyDescriptor({ x: "hello" }, "x");
// {value: "hello", writable: true, enumerable: true, configurable: true}

Reflect.getOwnPropertyDescriptor({ x: "hello" }, "y");
// undefined

Reflect.getOwnPropertyDescriptor([], "length");
// {value: 0, writable: true, enumerable: false, configurable: false}
```

### [Reflect.ownKeys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

静态方法 `Reflect.ownKeys()` 返回一个由目标对象自身的属性键组成的数组。

```javascript
Reflect.ownKeys({ z: 3, y: 2, x: 1 }); // [ "z", "y", "x" ]
Reflect.ownKeys([]); // ["length"]

var sym = Symbol.for("comet");
var sym2 = Symbol.for("meteor");
var obj = {
  [sym]: 0,
  str: 0,
  773: 0,
  0: 0,
  [sym2]: 0,
  "-1": 0,
  8: 0,
  "second str": 0,
};
Reflect.ownKeys(obj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// Indexes in numeric order,
// strings in insertion order,
// symbols in insertion order
```

### [Reflect.isExtensible()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)

静态方法 `Reflect.isExtensible()` 判断一个对象是否可扩展（即是否能够添加新的属性）。与它 [Object.isExtensible()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 方法相似，但有一些不同。

```javascript
// New objects are extensible.
var empty = {};
Reflect.isExtensible(empty); // === true

// ...but that can be changed.
Reflect.preventExtensions(empty);
Reflect.isExtensible(empty); // === false

// Sealed objects are by definition non-extensible.
var sealed = Object.seal({});
Reflect.isExtensible(sealed); // === false

// Frozen objects are also by definition non-extensible.
var frozen = Object.freeze({});
Reflect.isExtensible(frozen); // === false
```

### [Reflect.preventExtensions()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions)

静态方法 `Reflect.preventExtensions()` 方法阻止新属性添加到对象 (例如：防止将来对对象的扩展被添加到对象中)。该方法与 [Object.preventExtensions()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)相似，但有一些不同点。详情可见 [differences](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions#%E4%B8%8E_object.preventextensions_%E7%9A%84%E4%B8%8D%E5%90%8C%E7%82%B9)。

```javascript
// Objects are extensible by default.
var empty = {};
Reflect.isExtensible(empty); // === true

// ...but that can be changed.
Reflect.preventExtensions(empty);
Reflect.isExtensible(empty); // === false
```

## Reflect vs Object

`Reflect` && `Object`的某些方法是相似甚至相同的，可能有的同学会问，为什么不直接把Reflect的方法放在Object上呢？何必新加一个对象？两者到底有什么区别？

1. Reflect上不光有对象的相关操作方法还有函数相关的方法 这和Object本身代表的含义不符 因此不能放在Object上。同时Reflect为未来语言的扩展提供了一套可能的API，如果将来JavaScript想要添加新的底层操作对象的方法，它们可以被加入到Reflect上，而不是继续增加Object的静态方法，这样有助于保持Object构造函数的简洁性。

2. 在Reflect出现之前，JavaScript操作对象的一些方法散布在Object构造函数上，比如Object.defineProperty。但是，这些方法的返回值和错误处理机制并不一致（例如，如果操作失败，一些方法会抛出错误，而其他一些方法则返回false）。Reflect提供了一套具有一致返回值的API，使得这些操作更加统一和可预测。

3. Reflect的方法与Proxy的方法一一对应，也就是说，一个Proxy对象的方法，基本上就是调用对应的Reflect方法，保证原生行为能够正常执行。它有一个巨大的好处，就是允许控制对象的默认行为，实现自定义的行为。

所以 `当Reflect和Object方法能实现同样效果时 我们建议优先使用Reflect`

## 配合proxy实现代理等元编程操作

元编程是指编写可以操作或改变其他程序的程序。元编程可以改变 JavaScript 的一些基本操作的行为。
主要与这三个对象有关。

- `Symbol`：通过内置Symbol值复写 js语言中的基本操作。
- `Reflect`：可以获取语言内部的基本操作。
- `Proxy`：通过钩子函数 拦截&改变 js语言的基本操作。

```javascript
const obj = {};
const proxyObj = new Proxy(obj,{
    get(target, property, receiver){
        console.log(`get ${property}`, target[property])
        return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver){
        console.log(`set ${property}`, value)
        return Reflect.set(target, property, value, receiver);
    },
    deleteProperty(target, property){ // 拦截属性删除
        console.log(`delete ${property}`)
        return Reflect.deleteProperty(target, property);
    }
})

proxyObj.name = 'test'
console.log(proxyObj.name)
delete proxyObj.name;
console.log(proxyObj.name)

// 结果
set name test
get name test
test
delete name
get name undefined
undefined
```

### 为什么proxy里一定要使用reflect？

先看下不使用reflect的例子

```javascript
const obj = {
    _name: 'test',
    get name(){
        return this._name;
    }
};
const proxyObj = new Proxy(obj,{
    get(target, property, receiver){
        return target[property];
    },
});

const child = {
    _name: 'child'
};
Reflect.setPrototypeOf(child, proxyObj);

child.name // test
proxyObj.name // test
```

因为代理对象的get拦截中固定返回的`target[property]`; target永远指向obj 所以拿到的永远是obj的_name属性值。

```javascript
const obj = {
    _name: 'test',
    get name(){
        return this._name;
    }
};
const proxyObj = new Proxy(obj,{
    get(target, property, receiver){
        return Reflect.get(target, property, receiver)
    },
});

const child = {
    _name: 'child'
};
Reflect.setPrototypeOf(child, proxyObj);

child.name // child 
proxyObj.name // test
```

当我们使用Reflect时可以正确转发运行时上下文; 其实主要就是`receiver`这个参数，receiver 代表的是代理对象本身或者继承自代理对象的对象，它表示触发陷阱时`正确的上下文`。
