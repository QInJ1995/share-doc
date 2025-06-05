# ES5 Array 方法

ES5 为数组提供了许多实用的方法，这些方法大大简化了数组操作。以下是常用的数组方法：

## 1. [forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

遍历数组的每个元素，执行回调函数。

```javascript
const arr = [1, 2, 3];
arr.forEach(function(item, index, array) {
    console.log(item, index);
});
// 输出：
// 1 0
// 2 1
// 3 2
```

## 2. [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

创建一个新数组，其结果是该数组中的每个元素调用回调函数后的返回值。

```javascript
const arr = [1, 2, 3];
const doubled = arr.map(function(item) {
    return item * 2;
});
console.log(doubled); // [2, 4, 6]
```

## 3. [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

创建一个新数组，包含通过回调函数测试的所有元素。

```javascript
const arr = [1, 2, 3, 4, 5];
const evenNumbers = arr.filter(function(item) {
    return item % 2 === 0;
});
console.log(evenNumbers); // [2, 4]
```

## 4. [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

对数组中的每个元素执行回调函数，将其减少为单个值。

```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce(function(accumulator, current) {
    return accumulator + current;
}, 0);
console.log(sum); // 10
```

## 5. [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

测试数组中是否至少有一个元素通过了回调函数的测试。

```javascript
const arr = [1, 2, 3, 4, 5];
const hasEven = arr.some(function(item) {
    return item % 2 === 0;
});
console.log(hasEven); // true
```

## 6. [every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

测试数组中的所有元素是否都通过了回调函数的测试。

```javascript
const arr = [2, 4, 6, 8];
const allEven = arr.every(function(item) {
    return item % 2 === 0;
});
console.log(allEven); // true
```

## 7. [indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

返回在数组中可以找到给定元素的第一个索引，如果不存在则返回 -1。

```javascript
const arr = ['apple', 'banana', 'orange'];
console.log(arr.indexOf('banana')); // 1
console.log(arr.indexOf('grape')); // -1
```

## 8. [lastIndexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

返回在数组中可以找到给定元素的最后一个索引，如果不存在则返回 -1。

```javascript
const arr = ['apple', 'banana', 'orange', 'banana'];
console.log(arr.lastIndexOf('banana')); // 3
```

## 实际应用场景

1. **数据处理**：

    ```javascript
    const users = [
        { name: 'Alice', age: 20 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 }
    ];

    // 获取所有用户的名字
    const names = users.map(user => user.name);

    // 筛选成年用户
    const adults = users.filter(user => user.age >= 18);

    // 计算平均年龄
    const averageAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
    ```

2. **数组去重**：

    ```javascript
    const arr = [1, 2, 2, 3, 3, 4];
    const unique = arr.filter((item, index) => arr.indexOf(item) === index);
    ```

3. **数组扁平化**：

    ```javascript
    const arr = [1, [2, 3], [4, [5, 6]]];
    const flatten = arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
    ```

## 注意事项

1. 这些方法都不会修改原数组（除了 reduce 的初始值）
2. 回调函数中的 this 指向可以通过第二个参数指定
3. 这些方法都是 ES5 标准的一部分，在现代浏览器中都有很好的支持
