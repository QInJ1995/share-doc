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

## 11. [concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/concat)

连接两个或多个字符串。

```javascript
const str1 = "Hello";
const str2 = "World";
console.log(str1.concat(" ", str2)); // "Hello World"
```

## 12. [match](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)

在字符串中查找匹配正则表达式的字符串。

```javascript
const str = "Hello World";
console.log(str.match(/o/g)); // ["o", "o"]
```

## 13. [search](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search)

返回与正则表达式匹配的字符串的起始位置。

```javascript
const str = "Hello World";
console.log(str.search(/World/)); // 6
```

## 14. [localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

用本地特定的顺序来比较两个字符串。

```javascript
const str1 = "apple";
const str2 = "banana";
console.log(str1.localeCompare(str2)); // -1
```

## 15. [charCodeAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

返回指定位置的字符的 Unicode 编码。

```javascript
const str = "Hello";
console.log(str.charCodeAt(0)); // 72 (H 的 Unicode 编码)
```

## 16. [fromCharCode](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

将 Unicode 编码转换为字符。

```javascript
console.log(String.fromCharCode(72)); // "H"
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

4. **字符串比较**：

    ```javascript
    function compareStrings(str1, str2) {
        return str1.localeCompare(str2, 'zh-CN');
    }
    console.log(compareStrings('张三', '李四')); // 根据中文排序规则比较
    ```

5. **Unicode 字符处理**：

    ```javascript
    function getUnicodeString(str) {
        return Array.from(str).map(char => 
            `U+${char.charCodeAt(0).toString(16).toUpperCase()}`
        ).join(' ');
    }
    console.log(getUnicodeString('你好')); // "U+4F60 U+597D"
    ```

6. **字符串验证和清理**：

    ```javascript
    function sanitizeInput(input) {
        return input
            .trim()                    // 去除首尾空格
            .replace(/\s+/g, ' ')      // 将多个空格替换为单个空格
            .replace(/[^\w\s]/g, '');  // 只保留字母、数字、下划线和空格
    }
    
    console.log(sanitizeInput("  Hello   World!  ")); // "Hello World"
    ```

7. **模板字符串处理**：

    ```javascript
    function processTemplate(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || '';
        });
    }
    
    const template = "Hello {{name}}, welcome to {{place}}!";
    const data = { name: "张三", place: "北京" };
    console.log(processTemplate(template, data)); // "Hello 张三, welcome to 北京!"
    ```

8. **文件扩展名处理**：

    ```javascript
    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }
    
    console.log(getFileExtension("document.pdf")); // "pdf"
    console.log(getFileExtension("image")); // ""
    ```

9. **URL 处理工具**：

    ```javascript
    const urlUtils = {
        // 解析 URL 参数
        parseParams(url) {
            const params = {};
            const search = url.split('?')[1];
            if (!search) return params;
            
            search.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            });
            return params;
        },
        
        // 构建 URL 参数
        buildParams(params) {
            return Object.entries(params)
                .map(([key, value]) => 
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                )
                .join('&');
        }
    };
    
    // 使用示例
    const url = "https://example.com?name=张三&age=25";
    console.log(urlUtils.parseParams(url)); // { name: "张三", age: "25" }
    ```

10. **文本格式化工具**：

    ```javascript
    const textFormatter = {
        // 首字母大写
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        
        // 驼峰命名转换
        toCamelCase(str) {
            return str
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        },
        
        // 下划线命名转换
        toSnakeCase(str) {
            return str
                .replace(/([A-Z])/g, '_$1')
                .toLowerCase()
                .replace(/^_/, '');
        }
    };
    
    console.log(textFormatter.capitalize("hello")); // "Hello"
    console.log(textFormatter.toCamelCase("hello_world")); // "helloWorld"
    console.log(textFormatter.toSnakeCase("helloWorld")); // "hello_world"
    ```

## 最佳实践

1. **性能优化**：
   - 对于大量字符串拼接操作，使用 `Array.join()` 而不是 `+` 或 `concat()`
   - 使用 `indexOf` 进行简单字符串查找，使用正则表达式进行复杂模式匹配
   - 缓存正则表达式对象，避免重复创建

2. **安全性考虑**：
   - 在处理用户输入时，始终进行适当的清理和转义
   - 使用 `encodeURIComponent` 处理 URL 参数
   - 注意 XSS 攻击风险，对输出到 HTML 的内容进行转义

3. **国际化处理**：
   - 使用 `localeCompare` 进行本地化字符串比较
   - 考虑不同语言的字符编码问题
   - 注意字符串长度计算可能因编码方式不同而异

4. **代码可维护性**：
   - 将常用的字符串处理逻辑封装成工具函数
   - 使用有意义的变量名和函数名
   - 添加适当的注释说明复杂的字符串处理逻辑

## 常见陷阱

1. **字符串不可变性**：

   ```javascript
   let str = "Hello";
   str[0] = "h"; // 无效，字符串不可变
   str = "hello"; // 正确的方式
   ```

2. **Unicode 字符处理**：

   ```javascript
   const str = "你好";
   console.log(str.length); // 2
   console.log(str.charAt(0)); // "你"
   console.log(str.charCodeAt(0)); // 20320
   ```

3. **正则表达式全局标志**：

   ```javascript
   const str = "Hello World";
   console.log(str.replace(/o/g, "0")); // "Hell0 W0rld"
   console.log(str.replace(/o/, "0")); // "Hell0 World"
   ```

4. **空字符串判断**：

   ```javascript
   const str = "   ";
   console.log(str.length); // 3
   console.log(str.trim().length); // 0
   ```
