# sessionStorage

[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 是浏览器提供的会话存储机制，数据在页面会话期间有效，关闭页面后数据会被清除。

## 基本用法

### 存储数据

```javascript
// 存储字符串
sessionStorage.setItem('name', 'John');

// 存储对象
sessionStorage.setItem('user', JSON.stringify({
    name: 'John',
    age: 30
}));
```

### 读取数据

```javascript
// 读取字符串
const name = sessionStorage.getItem('name');

// 读取对象
const user = JSON.parse(sessionStorage.getItem('user'));
```

### 删除数据

```javascript
// 删除特定项
sessionStorage.removeItem('name');

// 清空所有数据
sessionStorage.clear();
```

### 获取数据长度

```javascript
const length = sessionStorage.length;
```

### 获取所有键

```javascript
for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    console.log(key, sessionStorage.getItem(key));
}
```

## 实际应用示例

### 1. 会话状态管理器

```javascript
class SessionManager {
    constructor() {
        this.state = this.loadState();
    }

    // 加载状态
    loadState() {
        const savedState = sessionStorage.getItem('app_state');
        return savedState ? JSON.parse(savedState) : {};
    }

    // 保存状态
    saveState() {
        sessionStorage.setItem('app_state', JSON.stringify(this.state));
    }

    // 设置状态
    setState(key, value) {
        this.state[key] = value;
        this.saveState();
    }

    // 获取状态
    getState(key, defaultValue = null) {
        return this.state[key] ?? defaultValue;
    }

    // 清除状态
    clearState() {
        this.state = {};
        this.saveState();
    }
}

// 使用示例
const session = new SessionManager();

// 保存状态
session.setState('currentPage', 'home');
session.setState('userPreferences', { theme: 'dark' });

// 读取状态
const currentPage = session.getState('currentPage');
const preferences = session.getState('userPreferences');
```

### 2. 表单会话存储

```javascript
class SessionFormStorage {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.storageKey = `form_${formId}`;
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
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    handleSubmit() {
        // 提交表单后清除保存的数据
        sessionStorage.removeItem(this.storageKey);
    }

    loadSavedData() {
        const savedData = sessionStorage.getItem(this.storageKey);
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
const formStorage = new SessionFormStorage('myForm');
```

### 3. 多标签页通信

```javascript
class TabCommunication {
    constructor(channel) {
        this.channel = channel;
        this.listeners = new Set();
        this.init();
    }

    init() {
        // 监听storage事件
        window.addEventListener('storage', this.handleStorageEvent.bind(this));
    }

    // 发送消息
    send(message) {
        const data = {
            channel: this.channel,
            message,
            timestamp: Date.now()
        };
        sessionStorage.setItem('tab_message', JSON.stringify(data));
        // 触发storage事件
        sessionStorage.removeItem('tab_message');
    }

    // 处理storage事件
    handleStorageEvent(event) {
        if (event.key === 'tab_message') {
            const data = JSON.parse(event.newValue);
            if (data && data.channel === this.channel) {
                this.notifyListeners(data.message);
            }
        }
    }

    // 添加监听器
    addListener(callback) {
        this.listeners.add(callback);
    }

    // 移除监听器
    removeListener(callback) {
        this.listeners.delete(callback);
    }

    // 通知所有监听器
    notifyListeners(message) {
        this.listeners.forEach(callback => callback(message));
    }
}

// 使用示例
const tabComm = new TabCommunication('chat');

// 发送消息
tabComm.send({ type: 'message', content: 'Hello from Tab 1' });

// 接收消息
tabComm.addListener(message => {
    console.log('收到消息：', message);
});
```

### 4. 会话购物车

```javascript
class SessionCart {
    constructor() {
        this.items = this.loadItems();
    }

    // 加载购物车数据
    loadItems() {
        const savedItems = sessionStorage.getItem('cart_items');
        return savedItems ? JSON.parse(savedItems) : [];
    }

    // 保存购物车数据
    saveItems() {
        sessionStorage.setItem('cart_items', JSON.stringify(this.items));
    }

    // 添加商品
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveItems();
    }

    // 移除商品
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveItems();
    }

    // 更新商品数量
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveItems();
        }
    }

    // 清空购物车
    clear() {
        this.items = [];
        this.saveItems();
    }

    // 获取购物车总价
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // 获取商品总数
    getItemCount() {
        return this.items.reduce((count, item) => {
            return count + item.quantity;
        }, 0);
    }
}

// 使用示例
const cart = new SessionCart();

// 添加商品
cart.addItem({
    id: 1,
    name: '商品1',
    price: 100
});

// 更新数量
cart.updateQuantity(1, 2);

// 获取总价
console.log('总价：', cart.getTotal());

// 获取商品数量
console.log('商品数量：', cart.getItemCount());
```
