# Object

## 构造函数

[Object()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) 构造函数将输入转换为一个对象。它的行为取决于输入的类型。

```javascript
new Object(value)
Object(value)
```

## 静态方法

### [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)



Object.assign() 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。

::: tip 备注

1. Object.assign() 不会在源对象值为 null 或 undefined 时抛出错误。
2. [合并具有相同属性的对象，属性会被后续参数中具有相同属性的其他对象覆盖](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#%E5%90%88%E5%B9%B6%E5%85%B7%E6%9C%89%E7%9B%B8%E5%90%8C%E5%B1%9E%E6%80%A7%E7%9A%84%E5%AF%B9%E8%B1%A1)
3. [原型链上的属性和不可枚举的属性不能被复制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#%E5%8E%9F%E5%9E%8B%E9%93%BE%E4%B8%8A%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E4%B8%8D%E5%8F%AF%E6%9E%9A%E4%B8%BE%E7%9A%84%E5%B1%9E%E6%80%A7%E4%B8%8D%E8%83%BD%E8%A2%AB%E5%A4%8D%E5%88%B6)
4. [基本类型会被封装为对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B%E4%BC%9A%E8%A2%AB%E5%B0%81%E8%A3%85%E4%B8%BA%E5%AF%B9%E8%B1%A1)
5. [异常会中断后续的复制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#%E5%BC%82%E5%B8%B8%E4%BC%9A%E4%B8%AD%E6%96%AD%E5%90%8E%E7%BB%AD%E7%9A%84%E5%A4%8D%E5%88%B6)
:::

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

### [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)



Object.create() 方法用于创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

::: tip 应用

1. [用 Object.create() 实现类式继承](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#%E7%94%A8_object.create_%E5%AE%9E%E7%8E%B0%E7%B1%BB%E5%BC%8F%E7%BB%A7%E6%89%BF)
2. [使用 Object.create() 的 propertyObject 参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#%E4%BD%BF%E7%94%A8_object.create_%E7%9A%84_propertyobject_%E5%8F%82%E6%95%B0)

:::

```javascript
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"
```

### [Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)



Object.defineProperties() 静态方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```javascript
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42
```

### [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)



Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42
```

### [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)



Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```

### [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)



Object.values() 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for...in 循环还会枚举其原型链中的属性）。

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.values(object1)); // Expected output: Array ["somestring", 42, false]
```

### [Object.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)



Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for...in 循环还会枚举其原型链中的属性）。

```javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

### [Object.fromEntries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)



Object.fromEntries() 方法把键值对列表转换为一个对象。

```javascript
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: { foo: 'bar', baz: 42 }
```

### [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)



Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上查找的属性）

```javascript
const object1 = {
  property1: 42,
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1); // Expected output: { value: 42, writable: true, enumerable: true, configurable: true }
```

### [Object.getOwnPropertyDescriptors()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)



Object.getOwnPropertyDescriptors() 方法返回指定对象所有自身属性的描述符。

```javascript
const obj = {
  prop1: 42,
};

const descriptors = Object.getOwnPropertyDescriptors(obj);

console.log(descriptors);
// Expected output:
// {
//   prop1: {
//     value: 42,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
```

### [Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)



Object.getOwnPropertyNames() 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

```javascript
const arr = ['a', 'b', 'c'];
const arrNames = Object.getOwnPropertyNames(arr);

console.log(arrNames);
// Expected output: ["0", "1", "2", "length"]

const obj = { 0: 'a', 1: 'b', 2: 'c' };
const objNames = Object.getOwnPropertyNames(obj);

console.log(objNames); // Expected output: ["0", "1", "2"]
```

### [Object.getOwnPropertySymbols()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)



Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。

```javascript
const object1 = {};
const symbol1 = Symbol('foo');
const symbol2 = Symbol('bar');

Object.defineProperty(object1, symbol1, {
  value: 'Hello',
});

Object.defineProperty(object1, symbol2, {
  value: 'World',
});

const objectSymbols = Object.getOwnPropertySymbols(object1);

console.log(objectSymbols.length);
// Expected output: 2

console.log(objectSymbols);
// Expected output: [Symbol(foo), Symbol(bar)]
```

### [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)



Object.getPrototypeOf() 方法返回指定对象的原型（即，内部的 [[Prototype]] 属性的值）。

```javascript
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// Expected output: true
```

### [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)



Object.is() 方法判断两个值是否为同一个值。

```javascript
Object.is('foo', 'foo'); // true
Object.is(window, window); // true

Object.is('foo', 'bar'); // false
Object.is([], []); // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

Object.is(null, null); // true

// 特例
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true
Object.is(NaN, NaN); // true
```

### [Object.isExtensible()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)



Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

```javascript
const emptyObject = {};

console.log(Object.isExtensible(emptyObject));
// Expected output: true

Object.preventExtensions(emptyObject);

console.log(Object.isExtensible(emptyObject));
// Expected output: false
```

### [Object.isFrozen()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)



Object.isFrozen() 方法判断一个对象是否被冻结。如果参数对象的可配置性，可枚举性，或可写性任一属性被修改，或者新增了属性，那么对象将被认为不是冻结的，否则就是冻结的。

```javascript
const obj1 = { prop: 42 };
Object.freeze(obj1);

console.log(Object.isFrozen(obj1));
// Expected output: true

const obj2 = { prop: 42 };
Object.preventExtensions(obj2);

console.log(Object.isFrozen(obj2));
// Expected output: false

const obj3 = { prop: 42 };
Object.seal(obj3);

console.log(Object.isFrozen(obj3));
// Expected output: false
```

### [Object.isSealed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)



Object.isSealed() 方法判断一个对象是否被密封。如果参数对象的所有属性都是不可配置的，则返回 true；否则返回 false。

```javascript
const obj = {};
Object.seal(obj);

console.log(Object.isSealed(obj));
// Expected output: true

const obj1 = {};
Object.preventExtensions(obj1); // also returns true

console.log(Object.isSealed(obj1));
// Expected output: true

const obj2 = { prop: 42 };
Object.seal(obj2);

console.log(Object.isSealed(obj2));
// Expected output: true

const obj3 = { prop: 42 };
Object.preventExtensions(obj3);
obj3.prop = 33;
console.log(obj3.prop); // Expected output: 33

console.log(Object.isSealed(obj3));
// Expected output: false
```

### [Object.freeze()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)



Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze 返回和传入的参数相同的对象。

```javascript
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop); // Expected output: 42
```

### [Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)



Object.seal() 静态方法密封一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置。密封对象有一组固定的属性：不能添加新属性、不能删除现有属性或更改其可枚举性和可配置性、不能重新分配其原型。只要现有属性的值是可写的，它们仍然可以更改。seal() 返回传入的同一对象。

```javascript
const obj = {
  prop: 42,
};

Object.seal(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop); // Expected output: 33

delete obj.prop; // Throws an error in strict mode

console.log(obj.prop); // Expected output: 33
```

### [Object.preventExtensions()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)



Object.preventExtensions() 静态方法可以防止新属性被添加到对象中（即防止该对象被扩展）。它还可以防止对象的原型被重新指定。

```javascript
const obj = {
  prop: 42,
};

Object.preventExtensions(obj);

obj.prop2 = 33;
// Throws an error in strict mode

console.log(obj.prop2); // undefined
```

### [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)



Object.setPrototypeOf() 静态方法可以将一个指定对象的原型（即内部的 [[Prototype]] 属性）设置为另一个对象或者 null。

```javascript
const obj = {};
const proto = { x: 10 };

Object.setPrototypeOf(obj, proto);

console.log(obj.x); // Expected output: 10
```

### [Object.hasOwn()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)



如果指定的对象自身有指定的属性，则静态方法 Object.hasOwn() 返回 true。如果属性是继承的或者不存在，该方法返回 false。

```javascript
const obj = { prop: 42 };

console.log(Object.hasOwn(obj, 'prop')); // true  
console.log(Object.hasOwn(obj, 'toString')); // false (toString 是原型上的属性)
console.log(Object.hasOwn(obj, 'hasOwnProperty')); // false (hasOwnProperty 是原型上的属性)
```

### [Object.groupBy()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)



Object.groupBy() 静态方法根据提供的回调函数返回的字符串值对给定可迭代对象中的元素进行分组。返回的对象具有每个组的单独属性，其中包含组中的元素的数组。

当分组名称可以用字符串表示时，应使用此方法。如果你需要使用某个任意值作为键来对元素进行分组，请改用 Map.groupBy() 方法。

```javascript
const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];

const result = Object.groupBy(inventory, ({ type }) => type);

/* 结果是：
{
  蔬菜: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
  ],
  水果: [
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  肉: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/

function myCallback({ quantity }) {
  return quantity > 5 ? "ok" : "restock";
}

const result2 = Object.groupBy(inventory, myCallback);

/* 结果是：
{
  restock: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  ok: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/

```

## 实例方法

### [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)



hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，不会去查找原型链）。

::: tip 备注
在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。
:::

```javascript
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// Expected output: true

console.log(object1.hasOwnProperty('toString'));
// Expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// Expected output: false
```

### [Object.prototype.isPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)



isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。

```javascript
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

### [Object.prototype.propertyIsEnumerable()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)



propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性名是否是当前对象的可枚举属性。

```javascript
const obj = Object.create({}, {
  property1: {
    value: 42,
    enumerable: true
  },
  property2: {
    value: 13,
    enumerable: false
  }
});

console.log(obj.propertyIsEnumerable('property1'));
// Expected output: true

console.log(obj.propertyIsEnumerable('property2'));
// Expected output: false

console.log(obj.propertyIsEnumerable('toString'));
// Expected output: false
```

### [Object.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)



toLocaleString() 方法返回一个表示对象的字符串。该方法旨在由派生对象重写，以达到其特定于语言环境的目的。

```javascript
const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(date1.toLocaleString('ar-EG'));
// Expected output: "٢٠‏/١٢‏/٢٠١٢ ٤:٠٠:٠٠ ص"

const number1 = 123456.789;

console.log(number1.toLocaleString('de-DE'));
// Expected output: "123.456,789"
```

### [Object.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)



toString() 方法返回一个表示该对象的字符串。该方法旨在重写（自定义）派生类对象的类型转换的逻辑。

```javascript
function Dog(name) {
  this.name = name;
}

const dog1 = new Dog('Gabby');

Dog.prototype.toString = function dogToString() {
  return `${this.name}`;
};

console.log(dog1.toString());
// Expected output: "Gabby"
```

### [Object.prototype.valueOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)



Object 实例的 valueOf() 方法将 this 值转换成对象。该方法旨在被派生对象重写，以实现自定义类型转换逻辑。

```javascript
const obj = {a: 1};
console.log(obj.valueOf()); // {a: 1}

const arr = [1, 2, 3];
console.log(arr.valueOf()); // [1, 2, 3]

const date = new Date();
console.log(date.valueOf()); // 1577836800000

function MyNumberType(n) {
  this.number = n;
}

MyNumberType.prototype.valueOf = function () {
  return this.number;
};

const object1 = new MyNumberType(4);

console.log(object1 + 3);
// Expected output: 7
```
