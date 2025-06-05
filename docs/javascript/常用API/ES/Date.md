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

// 使用 UTC 时间创建
const date4 = new Date(Date.UTC(2024, 2, 20, 12, 30, 0));
```

## 2. 获取日期和时间的方法

### [获取年、月、日](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)

```javascript
const date = new Date();
console.log(date.getFullYear());  // 获取年份
console.log(date.getMonth());     // 获取月份（0-11）
console.log(date.getDate());      // 获取日期（1-31）
console.log(date.getDay());       // 获取星期（0-6）

// UTC 相关方法
console.log(date.getUTCFullYear()); // 获取 UTC 年份
console.log(date.getUTCMonth());    // 获取 UTC 月份
console.log(date.getUTCDate());     // 获取 UTC 日期
console.log(date.getUTCDay());      // 获取 UTC 星期
```

### [获取时、分、秒、毫秒](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)

```javascript
const date = new Date();
console.log(date.getHours());     // 获取小时（0-23）
console.log(date.getMinutes());   // 获取分钟（0-59）
console.log(date.getSeconds());   // 获取秒数（0-59）
console.log(date.getMilliseconds()); // 获取毫秒（0-999）

// UTC 相关方法
console.log(date.getUTCHours());      // 获取 UTC 小时
console.log(date.getUTCMinutes());    // 获取 UTC 分钟
console.log(date.getUTCSeconds());    // 获取 UTC 秒数
console.log(date.getUTCMilliseconds()); // 获取 UTC 毫秒
```

### [获取时间戳](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

```javascript
const date = new Date();
console.log(date.getTime());      // 获取时间戳（毫秒）
console.log(Date.now());          // 获取当前时间戳
console.log(date.valueOf());      // 获取时间戳（与 getTime() 相同）
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

// UTC 相关设置方法
date.setUTCFullYear(2024);
date.setUTCMonth(2);
date.setUTCDate(20);
date.setUTCHours(12);
date.setUTCMinutes(30);
date.setUTCSeconds(0);
date.setUTCMilliseconds(0);
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
console.log(date.toUTCString());  // UTC 格式的日期时间字符串
console.log(date.toGMTString());  // GMT 格式的日期时间字符串（已废弃，建议使用 toUTCString）
```

## 5. 日期比较和计算

```javascript
// 日期比较
function compareDates(date1, date2) {
    return date1.getTime() - date2.getTime();
}

// 检查日期是否相等
function areDatesEqual(date1, date2) {
    return date1.getTime() === date2.getTime();
}

// 获取两个日期之间的天数
function getDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(diffTime / oneDay);
}

// 检查日期是否在范围内
function isDateInRange(date, startDate, endDate) {
    return date.getTime() >= startDate.getTime() && 
           date.getTime() <= endDate.getTime();
}
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

    function addYears(date, years) {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }
    ```

4. **获取月份天数**：

    ```javascript
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    ```

5. **获取季度**：

    ```javascript
    function getQuarter(date) {
        return Math.floor(date.getMonth() / 3) + 1;
    }
    ```

## 注意事项

1. 月份从 0 开始计数（0-11）
2. 星期从 0 开始计数（0-6，0 表示星期日）
3. 时间戳是毫秒级的
4. 日期对象是可变的，修改方法会直接改变原对象
5. 时区问题：JavaScript 的 Date 对象使用本地时区
6. UTC 方法在处理跨时区应用时特别有用
7. 日期比较时要注意时区问题

## 最佳实践

1. 使用 `Date.now()` 获取当前时间戳，性能更好
2. 处理时区时，建议使用 UTC 方法（getUTC*和 setUTC*）
3. 日期比较时，建议使用时间戳
4. 格式化日期时，考虑使用专门的日期处理库（如 moment.js）
5. 在存储日期时，使用 ISO 字符串格式
6. 处理跨时区应用时，统一使用 UTC 时间
7. 避免直接修改日期对象，而是创建新的日期对象
8. 使用 `toISOString()` 进行日期序列化

## 更多实用场景

### 1. 日期范围选择器

```javascript
// 获取最近7天的日期范围
function getLast7Days() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
    }
    return dates;
}

// 获取本月所有日期
function getCurrentMonthDays() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }
    return days;
}
```

### 2. 日期验证

```javascript
// 验证日期字符串格式
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// 验证日期范围
function isValidDateRange(startDate, endDate) {
    return startDate instanceof Date && 
           endDate instanceof Date && 
           !isNaN(startDate) && 
           !isNaN(endDate) && 
           startDate <= endDate;
}
```

### 3. 日期格式化增强

```javascript
// 相对时间显示
function getRelativeTime(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    if (minutes > 0) return `${minutes}分钟前`;
    return '刚刚';
}

// 自定义格式化
function formatDateCustom(date, format) {
    const map = {
        'YYYY': date.getFullYear(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'DD': String(date.getDate()).padStart(2, '0'),
        'HH': String(date.getHours()).padStart(2, '0'),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0'),
        'A': date.getHours() >= 12 ? '下午' : '上午',
        'a': date.getHours() >= 12 ? 'pm' : 'am'
    };
    
    return format.replace(/YYYY|MM|DD|HH|mm|ss|A|a/g, match => map[match]);
}
```

### 4. 工作日计算

```javascript
// 计算两个日期之间的工作日数量
function getWorkingDays(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

// 获取下一个工作日
function getNextWorkingDay(date) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
        nextDay.setDate(nextDay.getDate() + 1);
    }
    return nextDay;
}
```

### 5. 日期统计

```javascript
// 获取日期所在月份的第一天和最后一天
function getMonthRange(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
        firstDay: new Date(year, month, 1),
        lastDay: new Date(year, month + 1, 0)
    };
}

// 获取日期所在季度的范围
function getQuarterRange(date) {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3);
    return {
        startDate: new Date(year, quarter * 3, 1),
        endDate: new Date(year, (quarter + 1) * 3, 0)
    };
}
```

### 6. 时区处理

```javascript
// 转换时区
function convertTimeZone(date, targetTimeZone) {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetDate = new Date(utc + (3600000 * targetTimeZone));
    return targetDate;
}

// 获取当前时区偏移
function getTimezoneOffset() {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset > 0 ? '-' : '+';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
```

## 性能优化建议

1. 避免频繁创建 Date 对象，可以缓存时间戳
2. 使用 `Date.now()` 代替 `new Date().getTime()`
3. 批量处理日期时，先转换为时间戳进行计算
4. 使用 `setTimeout` 和 `setInterval` 时，注意清理定时器
5. 处理大量日期数据时，考虑使用 Web Workers

## 常见问题解决方案

1. **日期计算精度问题**

   ```javascript
   // 使用时间戳进行精确计算
   function preciseDateDiff(date1, date2) {
       return Math.abs(date1.getTime() - date2.getTime());
   }
   ```

2. **夏令时问题**

   ```javascript
   // 检查是否处于夏令时
   function isDST(date) {
       const jan = new Date(date.getFullYear(), 0, 1);
       const jul = new Date(date.getFullYear(), 6, 1);
       return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) === date.getTimezoneOffset();
   }
   ```

3. **日期解析问题**

   ```javascript
   // 安全的日期解析
   function parseDate(dateString) {
       const parts = dateString.split(/[- :]/);
       return new Date(parts[0], parts[1] - 1, parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0);
   }
   ```
