# ES5 Date 方法

ES5 为 Date 对象提供了一系列方法，用于处理日期和时间。以下是常用的 Date 方法：

## 1. [创建日期对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

```javascript
// 当前时间
const now = new Date();

// 指定时间戳
const date1 = new Date(1234567890000);

// 指定日期字符串
const date2 = new Date('2024-03-20');

// 指定年月日时分秒
const date3 = new Date(2024, 2, 20, 12, 30, 0);
```

## 2. 获取日期和时间的方法

### [获取年、月、日](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)

```javascript
const date = new Date();
console.log(date.getFullYear());  // 获取年份
console.log(date.getMonth());     // 获取月份（0-11）
console.log(date.getDate());      // 获取日期（1-31）
console.log(date.getDay());       // 获取星期（0-6）
```

### [获取时、分、秒、毫秒](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)

```javascript
const date = new Date();
console.log(date.getHours());     // 获取小时（0-23）
console.log(date.getMinutes());   // 获取分钟（0-59）
console.log(date.getSeconds());   // 获取秒数（0-59）
console.log(date.getMilliseconds()); // 获取毫秒（0-999）
```

### [获取时间戳](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

```javascript
const date = new Date();
console.log(date.getTime());      // 获取时间戳（毫秒）
console.log(Date.now());          // 获取当前时间戳
```

## 3. [设置日期和时间的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)

```javascript
const date = new Date();

// 设置年、月、日
date.setFullYear(2024);
date.setMonth(2);    // 3月
date.setDate(20);

// 设置时、分、秒、毫秒
date.setHours(12);
date.setMinutes(30);
date.setSeconds(0);
date.setMilliseconds(0);

// 设置时间戳
date.setTime(1234567890000);
```

## 4. [日期格式化方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

```javascript
const date = new Date();

// 转换为字符串
console.log(date.toString());     // 完整日期时间字符串
console.log(date.toDateString()); // 日期部分字符串
console.log(date.toTimeString()); // 时间部分字符串
console.log(date.toLocaleString()); // 本地化的日期时间字符串
console.log(date.toISOString());  // ISO 格式的日期时间字符串
```

## 实际应用场景

1. **日期格式化**：

    ```javascript
    function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    ```

2. **计算日期差**：

    ```javascript
    function getDaysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.round(diffTime / oneDay);
    }
    ```

3. **日期加减**：

    ```javascript
    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    ```

## 注意事项

1. 月份从 0 开始计数（0-11）
2. 星期从 0 开始计数（0-6，0 表示星期日）
3. 时间戳是毫秒级的
4. 日期对象是可变的，修改方法会直接改变原对象
5. 时区问题：JavaScript 的 Date 对象使用本地时区

## 最佳实践

1. 使用 `Date.now()` 获取当前时间戳，性能更好
2. 处理时区时，建议使用 UTC 方法（getUTC*和 setUTC*）
3. 日期比较时，建议使用时间戳
4. 格式化日期时，考虑使用专门的日期处理库（如 moment.js）
5. 在存储日期时，使用 ISO 字符串格式
