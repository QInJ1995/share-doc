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

## 9. [concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

合并两个或多个数组，返回一个新数组。

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// 合并数组
const combined = arr1.concat(arr2, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 合并数组和值
const result = arr1.concat(4, [5, 6]);
console.log(result); // [1, 2, 3, 4, 5, 6]
```

## 10. [join](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

将数组的所有元素连接成一个字符串。

```javascript
const arr = ['Hello', 'World', '!'];

// 使用默认分隔符（逗号）
console.log(arr.join()); // "Hello,World,!"

// 使用空格作为分隔符
console.log(arr.join(' ')); // "Hello World !"

// 使用空字符串作为分隔符
console.log(arr.join('')); // "HelloWorld!"
```

## 11. [slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

从数组中提取一部分元素，返回一个新数组。

```javascript
const arr = ['a', 'b', 'c', 'd', 'e'];

// 提取从索引 1 到 3 的元素（不包含索引 3）
console.log(arr.slice(1, 3)); // ['b', 'c']

// 从索引 2 开始提取到末尾
console.log(arr.slice(2)); // ['c', 'd', 'e']

// 使用负数索引
console.log(arr.slice(-3)); // ['c', 'd', 'e']
console.log(arr.slice(-3, -1)); // ['c', 'd']
```

## 12. [splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

修改数组，可以删除、添加或替换元素。

```javascript
const arr = ['a', 'b', 'c', 'd', 'e'];

// 删除元素
arr.splice(1, 2); // 从索引 1 开始删除 2 个元素
console.log(arr); // ['a', 'd', 'e']

// 添加元素
arr.splice(1, 0, 'b', 'c'); // 在索引 1 处添加元素
console.log(arr); // ['a', 'b', 'c', 'd', 'e']

// 替换元素
arr.splice(1, 2, 'x', 'y'); // 从索引 1 开始替换 2 个元素
console.log(arr); // ['a', 'x', 'y', 'd', 'e']
```

## 13. [reverse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

反转数组中的元素顺序。

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// 注意：reverse() 会修改原数组
// 如果需要保留原数组，可以先创建副本
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]
```

## 14. [sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

对数组元素进行排序。

```javascript
// 数字排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.sort((a, b) => a - b); // 升序
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 字符串排序
const fruits = ['banana', 'apple', 'orange', 'grape'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'grape', 'orange']

// 对象数组排序
const users = [
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
];

// 按年龄排序
users.sort((a, b) => a.age - b.age);
console.log(users);
// [
//   { name: 'Alice', age: 20 },
//   { name: 'Charlie', age: 25 },
//   { name: 'Bob', age: 30 }
// ]
```

## 15. [toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

将数组转换为字符串。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.toString()); // "1,2,3,4,5"

// 嵌套数组
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.toString()); // "1,2,3,4,5,6"
```

## 16. [valueOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/valueOf)

返回数组对象的原始值。

```javascript
const arr = [1, 2, 3];
console.log(arr.valueOf()); // [1, 2, 3]

// 通常不需要直接调用 valueOf
// 它会在需要原始值时自动调用
console.log(arr + ''); // "1,2,3"
```

## 实际应用场景

### 1. 数据处理和转换

```javascript
// 1. 数据分组统计
const orders = [
    { product: 'apple', quantity: 2, price: 5 },
    { product: 'banana', quantity: 3, price: 3 },
    { product: 'apple', quantity: 1, price: 5 },
    { product: 'orange', quantity: 4, price: 4 }
];

// 按产品分组并计算总价
const productSummary = orders.reduce((summary, order) => {
    const { product, quantity, price } = order;
    if (!summary[product]) {
        summary[product] = { quantity: 0, total: 0 };
    }
    summary[product].quantity += quantity;
    summary[product].total += quantity * price;
    return summary;
}, {});

console.log(productSummary);
// {
//     apple: { quantity: 3, total: 15 },
//     banana: { quantity: 3, total: 9 },
//     orange: { quantity: 4, total: 16 }
// }

// 2. 数据格式转换
const data = [
    { id: 1, name: 'Alice', scores: [80, 90, 85] },
    { id: 2, name: 'Bob', scores: [75, 85, 80] }
];

// 转换为扁平化格式
const flattened = data.reduce((acc, student) => {
    const { id, name, scores } = student;
    scores.forEach((score, index) => {
        acc.push({ id, name, subject: `subject${index + 1}`, score });
    });
    return acc;
}, []);

console.log(flattened);
// [
//     { id: 1, name: 'Alice', subject: 'subject1', score: 80 },
//     { id: 1, name: 'Alice', subject: 'subject2', score: 90 },
//     ...
// ]
```

### 2. 数组操作组合

```javascript
// 1. 链式操作处理数据
const users = [
    { name: 'Alice', age: 20, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Charlie', age: 25, active: true }
];

// 获取活跃用户的平均年龄
const averageAge = users
    .filter(user => user.active)
    .map(user => user.age)
    .reduce((sum, age, index, array) => {
        sum += age;
        return index === array.length - 1 ? sum / array.length : sum;
    }, 0);

// 2. 复杂数据转换
const products = [
    { id: 1, name: 'Laptop', tags: ['electronics', 'computer'] },
    { id: 2, name: 'Phone', tags: ['electronics', 'mobile'] },
    { id: 3, name: 'Book', tags: ['education', 'reading'] }
];

// 获取所有标签并统计出现次数
const tagStats = products
    .reduce((tags, product) => [...tags, ...product.tags], [])
    .reduce((stats, tag) => {
        stats[tag] = (stats[tag] || 0) + 1;
        return stats;
    }, {});
```

### 3. 实用工具函数

```javascript
// 1. 数组分页
function paginate(array, pageSize, pageNumber) {
    const start = (pageNumber - 1) * pageSize;
    return array.slice(start, start + pageSize);
}

// 2. 数组去重
function unique(array, key) {
    if (key) {
        return array.reduce((unique, item) => {
            if (!unique.some(u => u[key] === item[key])) {
                unique.push(item);
            }
            return unique;
        }, []);
    }
    return [...new Set(array)];
}

// 3. 数组分组
function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = groups[item[key]] || [];
        return { ...groups, [item[key]]: [...group, item] };
    }, {});
}

// 4. 数组排序工具
function sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        return order === 'asc' 
            ? aValue > bValue ? 1 : -1
            : aValue < bValue ? 1 : -1;
    });
}
```

### 4. 性能优化实践

```javascript
// 1. 使用 TypedArray 处理数值数组
const numbers = new Int32Array([1, 2, 3, 4, 5]);
const doubled = numbers.map(x => x * 2);

// 2. 避免在循环中修改数组
// 不推荐
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
    arr.push(arr[i] * 2);
}

// 推荐
const result = arr.map(x => x * 2);

// 3. 使用适当的数组方法
// 不推荐：使用 reduce 做简单的数组转换
const doubled = arr.reduce((acc, curr) => [...acc, curr * 2], []);

// 推荐：使用 map
const doubled = arr.map(x => x * 2);
```

### 5. 常见错误和解决方案

```javascript
// 1. 处理稀疏数组
const sparse = [1, , 3];
// 不推荐
sparse.forEach(item => console.log(item)); // 1, 3

// 推荐
sparse.filter(Boolean).forEach(item => console.log(item));

// 2. 处理 this 指向
const obj = {
    value: 2,
    multiply: function(array) {
        // 不推荐
        array.forEach(function(item) {
            console.log(item * this.value); // this 指向 window
        });

        // 推荐
        array.forEach(function(item) {
            console.log(item * this.value);
        }, this);
    }
};

// 3. 处理异步操作
// 不推荐
const results = [];
array.forEach(async item => {
    const result = await processItem(item);
    results.push(result);
});

// 推荐
const results = await Promise.all(
    array.map(item => processItem(item))
);
```

## 最佳实践总结

1. **选择合适的数组方法**
   - 需要返回新数组时使用 `map`
   - 需要过滤元素时使用 `filter`
   - 需要累加或归约时使用 `reduce`
   - 需要查找元素时使用 `find` 或 `some`

2. **性能考虑**
   - 对于大型数组，考虑使用 `TypedArray`
   - 避免在循环中修改数组
   - 使用 `for...of` 或 `for` 循环处理需要提前退出的情况
   - 考虑使用 Web Workers 处理计算密集型任务

3. **代码可维护性**
   - 使用链式操作提高代码可读性
   - 将复杂的数组操作封装成函数
   - 添加适当的注释说明数组操作的意图
   - 使用有意义的变量名描述数组内容

4. **错误处理**
   - 总是检查数组是否为空
   - 验证数组元素类型
   - 处理可能的异常情况
   - 提供合理的默认值
