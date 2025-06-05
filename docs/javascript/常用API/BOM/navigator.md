# Navigator 对象

[Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 对象包含有关浏览器的信息，可以用来检测浏览器类型、版本、操作系统等信息。

## 常用属性

### navigator.userAgent

获取浏览器的用户代理字符串。

```javascript
console.log(navigator.userAgent);
// 输出类似：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
```

### navigator.platform

获取运行浏览器的操作系统平台。

```javascript
console.log(navigator.platform); // "MacIntel", "Win32", "Linux x86_64" 等
```

### navigator.language

获取浏览器的首选语言。

```javascript
console.log(navigator.language); // "zh-CN", "en-US" 等
```

### navigator.cookieEnabled

检查浏览器是否启用了cookie。

```javascript
console.log(navigator.cookieEnabled); // true 或 false
```

### navigator.onLine

检查浏览器是否在线。

```javascript
console.log(navigator.onLine); // true 或 false
```

## 常用方法

### navigator.geolocation

获取地理位置信息。

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        // 成功回调
        function(position) {
            console.log('纬度：', position.coords.latitude);
            console.log('经度：', position.coords.longitude);
        },
        // 错误回调
        function(error) {
            console.error('获取位置失败：', error.message);
        }
    );
}
```

### navigator.sendBeacon()

发送异步数据到服务器。

```javascript
navigator.sendBeacon('/api/log', JSON.stringify({
    event: 'page_view',
    timestamp: Date.now()
}));
```

## 实际应用示例

### 1. 浏览器检测

```javascript
class BrowserDetector {
    static getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        // 检测Chrome
        if (ua.indexOf('Chrome') > -1) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)[1];
        }
        // 检测Firefox
        else if (ua.indexOf('Firefox') > -1) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/(\d+\.\d+)/)[1];
        }
        // 检测Safari
        else if (ua.indexOf('Safari') > -1) {
            browser = 'Safari';
            version = ua.match(/Version\/(\d+\.\d+)/)[1];
        }
        // 检测IE
        else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
            browser = 'Internet Explorer';
            version = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/)[1];
        }

        return { browser, version };
    }
}

// 使用示例
const browserInfo = BrowserDetector.getBrowserInfo();
console.log(browserInfo);
```

### 2. 设备检测

```javascript
class DeviceDetector {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    static getDeviceType() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }
}

// 使用示例
console.log(DeviceDetector.getDeviceType());
```

### 3. 网络状态监控

```javascript
class NetworkMonitor {
    constructor() {
        this.onlineCallback = null;
        this.offlineCallback = null;
        this.init();
    }

    init() {
        window.addEventListener('online', () => {
            console.log('网络已连接');
            this.onlineCallback && this.onlineCallback();
        });

        window.addEventListener('offline', () => {
            console.log('网络已断开');
            this.offlineCallback && this.offlineCallback();
        });
    }

    onOnline(callback) {
        this.onlineCallback = callback;
    }

    onOffline(callback) {
        this.offlineCallback = callback;
    }

    isOnline() {
        return navigator.onLine;
    }
}

// 使用示例
const networkMonitor = new NetworkMonitor();
networkMonitor.onOnline(() => {
    console.log('执行在线操作');
});
networkMonitor.onOffline(() => {
    console.log('执行离线操作');
});
```

### 4. 地理位置应用

```javascript
class GeolocationService {
    constructor() {
        this.watchId = null;
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('浏览器不支持地理位置'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    watchPosition(callback) {
        if (!navigator.geolocation) {
            throw new Error('浏览器不支持地理位置');
        }

        this.watchId = navigator.geolocation.watchPosition(
            position => callback(position),
            error => console.error('位置跟踪错误：', error),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    clearWatch() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
}

// 使用示例
const geoService = new GeolocationService();

// 获取当前位置
geoService.getCurrentPosition()
    .then(position => {
        console.log('当前位置：', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    })
    .catch(error => {
        console.error('获取位置失败：', error);
    });

// 持续跟踪位置
geoService.watchPosition(position => {
    console.log('位置更新：', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
});
```
