# localStorage

[localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 是浏览器提供的本地存储机制，可以永久保存数据在浏览器中，除非手动删除。

## 基本用法

### 存储数据

```javascript
// 存储字符串
localStorage.setItem('name', 'John');

// 存储对象
localStorage.setItem('user', JSON.stringify({
    name: 'John',
    age: 30
}));
```

### 读取数据

```javascript
// 读取字符串
const name = localStorage.getItem('name');

// 读取对象
const user = JSON.parse(localStorage.getItem('user'));
```

### 删除数据

```javascript
// 删除特定项
localStorage.removeItem('name');

// 清空所有数据
localStorage.clear();
```

### 获取数据长度

```javascript
const length = localStorage.length;
```

### 获取所有键

```javascript
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}
```

## 实际应用示例

### 1. 本地存储管理器

```javascript
class StorageManager {
    constructor(prefix = 'app_') {
        this.prefix = prefix;
    }

    // 设置数据
    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serializedValue);
            return true;
        } catch (error) {
            console.error('存储数据失败：', error);
            return false;
        }
    }

    // 获取数据
    get(key, defaultValue = null) {
        try {
            const serializedValue = localStorage.getItem(this.prefix + key);
            return serializedValue ? JSON.parse(serializedValue) : defaultValue;
        } catch (error) {
            console.error('读取数据失败：', error);
            return defaultValue;
        }
    }

    // 删除数据
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // 清空所有数据
    clear() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => localStorage.removeItem(key));
    }

    // 获取所有数据
    getAll() {
        const result = {};
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => {
                const shortKey = key.slice(this.prefix.length);
                result[shortKey] = this.get(shortKey);
            });
        return result;
    }
}

// 使用示例
const storage = new StorageManager('myapp_');

// 存储数据
storage.set('user', { name: 'John', age: 30 });
storage.set('settings', { theme: 'dark', language: 'zh' });

// 读取数据
const user = storage.get('user');
const settings = storage.get('settings');

// 获取所有数据
const allData = storage.getAll();
```

### 2. 自动保存表单数据

```javascript
class FormAutoSave {
    constructor(formId, storageKey) {
        this.form = document.getElementById(formId);
        this.storageKey = storageKey;
        this.init();
    }

    init() {
        // 加载保存的数据
        this.loadSavedData();

        // 监听表单变化
        this.form.addEventListener('input', this.handleInput.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleInput() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        // 保存数据
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    handleSubmit() {
        // 提交表单后清除保存的数据
        localStorage.removeItem(this.storageKey);
    }

    loadSavedData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // 填充表单
            Object.entries(data).forEach(([key, value]) => {
                const input = this.form.elements[key];
                if (input) {
                    input.value = value;
                }
            });
        }
    }
}

// 使用示例
const formAutoSave = new FormAutoSave('myForm', 'form_autosave');
```

### 3. 缓存管理器

```javascript
class CacheManager {
    constructor(options = {}) {
        this.prefix = options.prefix || 'cache_';
        this.defaultTTL = options.defaultTTL || 3600000; // 默认1小时
    }

    // 设置缓存
    set(key, value, ttl = this.defaultTTL) {
        const item = {
            value,
            expiry: Date.now() + ttl
        };
        localStorage.setItem(this.prefix + key, JSON.stringify(item));
    }

    // 获取缓存
    get(key, defaultValue = null) {
        const item = localStorage.getItem(this.prefix + key);
        if (!item) return defaultValue;

        const { value, expiry } = JSON.parse(item);
        
        // 检查是否过期
        if (Date.now() > expiry) {
            this.remove(key);
            return defaultValue;
        }

        return value;
    }

    // 删除缓存
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // 清理过期缓存
    cleanup() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => {
                const item = JSON.parse(localStorage.getItem(key));
                if (Date.now() > item.expiry) {
                    localStorage.removeItem(key);
                }
            });
    }
}

// 使用示例
const cache = new CacheManager();

// 缓存数据
cache.set('user', { name: 'John', age: 30 }, 3600000); // 1小时过期

// 读取缓存
const user = cache.get('user');

// 清理过期缓存
cache.cleanup();
```

### 4. 主题切换器

```javascript
class ThemeManager {
    constructor() {
        this.themeKey = 'app_theme';
        this.themes = ['light', 'dark'];
        this.currentTheme = this.getTheme();
        this.applyTheme();
    }

    getTheme() {
        return localStorage.getItem(this.themeKey) || 'light';
    }

    setTheme(theme) {
        if (this.themes.includes(theme)) {
            localStorage.setItem(this.themeKey, theme);
            this.currentTheme = theme;
            this.applyTheme();
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// 使用示例
const themeManager = new ThemeManager();

// 切换主题
document.getElementById('themeToggle').addEventListener('click', () => {
    themeManager.toggleTheme();
});
```
