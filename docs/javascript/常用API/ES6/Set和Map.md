# Set和Map

ES6引入了两个新的数据结构：Set和Map，用于存储唯一值和键值对。

## [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

Set是一种集合数据结构，其中的值是唯一的。

### 基本用法

```javascript
// 创建Set
const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set(4) { 1, 2, 3, 4 }

// 添加值
set.add(5);

// 删除值
set.delete(1);

// 检查值是否存在
console.log(set.has(2)); // true

// 获取Set的大小
console.log(set.size); // 4

// 清空Set
set.clear();
```

### 迭代Set

```javascript
const set = new Set([1, 2, 3]);

// 使用for...of
for (const value of set) {
    console.log(value);
}

// 使用forEach
set.forEach(value => {
    console.log(value);
});

// 转换为数组
const array = Array.from(set);
```

### 实际应用

```javascript
// 数组去重
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = [...new Set(array)];

// 求并集
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);
const union = new Set([...set1, ...set2]);

// 求交集
const intersection = new Set(
    [...set1].filter(x => set2.has(x))
);

// 求差集
const difference = new Set(
    [...set1].filter(x => !set2.has(x))
);
```

## [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

Map是一种键值对集合，其中的键可以是任何类型。

### 基本用法

```javascript
// 创建Map
const map = new Map();

// 添加键值对
map.set('key1', 'value1');
map.set(42, 'value2');
map.set({}, 'value3');

// 获取值
console.log(map.get('key1')); // "value1"

// 检查键是否存在
console.log(map.has(42)); // true

// 删除键值对
map.delete('key1');

// 获取Map的大小
console.log(map.size); // 2

// 清空Map
map.clear();
```

### 迭代Map

```javascript
const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
]);

// 使用for...of
for (const [key, value] of map) {
    console.log(key, value);
}

// 使用forEach
map.forEach((value, key) => {
    console.log(key, value);
});

// 获取所有键
const keys = map.keys();

// 获取所有值
const values = map.values();

// 获取所有键值对
const entries = map.entries();
```

### 实际应用

```javascript
// 缓存计算结果
const cache = new Map();

function fibonacci(n) {
    if (cache.has(n)) {
        return cache.get(n);
    }
    
    const result = n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
    cache.set(n, result);
    return result;
}

// 对象属性计数
function countProperties(obj) {
    const map = new Map();
    
    for (const key in obj) {
        const value = obj[key];
        map.set(value, (map.get(value) || 0) + 1);
    }
    
    return map;
}
```

## WeakSet和WeakMap

### WeakSet

WeakSet是Set的变体，只能存储对象引用，且这些引用是弱引用。

```javascript
const weakSet = new WeakSet();
const obj = {};

weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// 当obj被垃圾回收时，weakSet中的引用也会被自动清除
```

### WeakMap

WeakMap是Map的变体，键必须是对象，且这些键是弱引用。

```javascript
const weakMap = new WeakMap();
const obj = {};

weakMap.set(obj, 'value');
console.log(weakMap.get(obj)); // "value"

// 当obj被垃圾回收时，weakMap中的键值对也会被自动清除
```

## 最佳实践

### 1. 使用Set进行数组操作

```javascript
// 数组去重
const uniqueArray = [...new Set(array)];

// 检查数组是否包含重复值
function hasDuplicates(array) {
    return new Set(array).size !== array.length;
}
```

### 2. 使用Map存储对象元数据

```javascript
const metadata = new Map();

function addMetadata(obj, data) {
    metadata.set(obj, data);
}

function getMetadata(obj) {
    return metadata.get(obj);
}
```

### 3. 使用WeakMap实现私有属性

```javascript
const privateData = new WeakMap();

class Person {
    constructor(name) {
        privateData.set(this, { name });
    }

    getName() {
        return privateData.get(this).name;
    }
}
```

## 注意事项

1. Set和Map的键/值比较使用严格相等（===）

    ```javascript
    const set = new Set();
    set.add(NaN);
    set.add(NaN);
    console.log(set.size); // 1
    ```

2. Map的键可以是任何类型

    ```javascript
    const map = new Map();
    map.set({}, 'value1');
    map.set({}, 'value2');
    console.log(map.size); // 2
    ```

3. WeakSet和WeakMap的键必须是对象

    ```javascript
    const weakMap = new WeakMap();
    weakMap.set('key', 'value'); // TypeError
    ```

4. WeakSet和WeakMap不可迭代

    ```javascript
    const weakSet = new WeakSet();
    for (const item of weakSet) {} // TypeError
    ```

5. Map的键值对顺序与插入顺序一致

    ```javascript
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('a', 3);
    console.log([...map]); // [['a', 3], ['b', 2]]
    ```
