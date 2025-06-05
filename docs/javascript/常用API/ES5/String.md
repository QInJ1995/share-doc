# ES5 String 方法

ES5 为字符串提供了许多实用的方法，这些方法可以帮助我们更方便地处理字符串。以下是常用的字符串方法：

## 1. [trim](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

删除字符串两端的空白字符。

```javascript
const str = "  Hello World  ";
console.log(str.trim()); // "Hello World"
```

## 2. [charAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)

返回指定位置的字符。

```javascript
const str = "Hello";
console.log(str.charAt(0)); // "H"
console.log(str.charAt(4)); // "o"
```

## 3. [indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

返回指定字符串在字符串中首次出现的位置，如果没找到则返回 -1。

```javascript
const str = "Hello World";
console.log(str.indexOf("World")); // 6
console.log(str.indexOf("JavaScript")); // -1
```

## 4. [lastIndexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)

返回指定字符串在字符串中最后一次出现的位置，如果没找到则返回 -1。

```javascript
const str = "Hello World World";
console.log(str.lastIndexOf("World")); // 12
```

## 5. [slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

提取字符串的一部分，并返回一个新的字符串。

```javascript
const str = "Hello World";
console.log(str.slice(0, 5)); // "Hello"
console.log(str.slice(-5)); // "World"
```

## 6. [substring](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

提取字符串中介于两个指定下标之间的字符。

```javascript
const str = "Hello World";
console.log(str.substring(0, 5)); // "Hello"
```

## 7. [substr](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substr)

从起始索引号提取字符串中指定数目的字符。

```javascript
const str = "Hello World";
console.log(str.substr(0, 5)); // "Hello"
```

## 8. [split](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

把字符串分割成字符串数组。

```javascript
const str = "Hello,World,JavaScript";
console.log(str.split(",")); // ["Hello", "World", "JavaScript"]
```

## 9. [replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

替换字符串中的指定内容。

```javascript
const str = "Hello World";
console.log(str.replace("World", "JavaScript")); // "Hello JavaScript"
```

## 10. [toLowerCase/toUpperCase](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

将字符串转换为小写/大写。

```javascript
const str = "Hello World";
console.log(str.toLowerCase()); // "hello world"
console.log(str.toUpperCase()); // "HELLO WORLD"
```

## 实际应用场景

1. **字符串格式化**：

    ```javascript
    function formatName(name) {
        return name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }
    console.log(formatName("  john doe  ")); // "John Doe"
    ```

2. **URL 参数解析**：

    ```javascript
    function parseQueryString(url) {
        const query = url.split('?')[1];
        if (!query) return {};
        
        return query.split('&').reduce((params, param) => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
            return params;
        }, {});
    }
    ```

3. **文本截断**：

    ```javascript
    function truncate(str, length) {
        if (str.length <= length) return str;
        return str.slice(0, length) + '...';
    }
    ```

## 注意事项

1. 字符串是不可变的，所有方法都返回新的字符串，不会修改原字符串
2. 字符串的索引从 0 开始
3. 在处理中文等多字节字符时，某些方法可能需要特别注意
4. 正则表达式相关的字符串方法（如 replace）支持更复杂的替换操作
