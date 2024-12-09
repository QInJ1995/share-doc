# Object

## 构造函数

[Object()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) 构造函数将输入转换为一个对象。它的行为取决于输入的类型。

```javascript
new Object(value)
Object(value)
```

## 静态方法

### [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<br />

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

<br />

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
