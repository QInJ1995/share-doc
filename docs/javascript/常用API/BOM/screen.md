# Screen 对象

[Screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen) 对象包含有关用户屏幕的信息，可以用来获取屏幕的尺寸、颜色深度等信息。

## 常用属性

### screen.width 和 screen.height

获取屏幕的宽度和高度（以像素为单位）。

```javascript
console.log('屏幕宽度：', screen.width);
console.log('屏幕高度：', screen.height);
```

### screen.availWidth 和 screen.availHeight

获取可用屏幕的宽度和高度（不包括任务栏等系统界面）。

```javascript
console.log('可用屏幕宽度：', screen.availWidth);
console.log('可用屏幕高度：', screen.availHeight);
```

### screen.colorDepth

获取屏幕的颜色深度（以位为单位）。

```javascript
console.log('屏幕颜色深度：', screen.colorDepth);
```

### screen.pixelDepth

获取屏幕的像素深度（以位为单位）。

```javascript
console.log('屏幕像素深度：', screen.pixelDepth);
```

### screen.orientation

获取屏幕的方向信息。

```javascript
console.log('屏幕方向：', screen.orientation.type);
```

## 实际应用示例

### 1. 响应式布局检测

```javascript
class ScreenDetector {
    static getScreenInfo() {
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            orientation: screen.orientation.type
        };
    }

    static isHighDensity() {
        return window.devicePixelRatio > 1;
    }

    static getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
}

// 使用示例
const screenInfo = ScreenDetector.getScreenInfo();
console.log('屏幕信息：', screenInfo);
console.log('是否高密度屏幕：', ScreenDetector.isHighDensity());
console.log('设备像素比：', ScreenDetector.getDevicePixelRatio());
```

### 2. 屏幕适配工具

```javascript
class ScreenAdapter {
    constructor() {
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1440
        };
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width < this.breakpoints.mobile) {
            return 'mobile';
        } else if (width < this.breakpoints.tablet) {
            return 'tablet';
        } else if (width < this.breakpoints.desktop) {
            return 'desktop';
        } else {
            return 'large-desktop';
        }
    }

    isMobile() {
        return this.getCurrentBreakpoint() === 'mobile';
    }

    isTablet() {
        return this.getCurrentBreakpoint() === 'tablet';
    }

    isDesktop() {
        return this.getCurrentBreakpoint() === 'desktop';
    }

    isLargeDesktop() {
        return this.getCurrentBreakpoint() === 'large-desktop';
    }
}

// 使用示例
const screenAdapter = new ScreenAdapter();
console.log('当前设备类型：', screenAdapter.getCurrentBreakpoint());
```

### 3. 屏幕方向监控

```javascript
class OrientationMonitor {
    constructor() {
        this.orientationChangeCallback = null;
        this.init();
    }

    init() {
        window.addEventListener('orientationchange', () => {
            this.handleOrientationChange();
        });

        screen.orientation.addEventListener('change', () => {
            this.handleOrientationChange();
        });
    }

    handleOrientationChange() {
        const orientation = this.getOrientation();
        console.log('屏幕方向改变：', orientation);
        
        if (this.orientationChangeCallback) {
            this.orientationChangeCallback(orientation);
        }
    }

    getOrientation() {
        if (screen.orientation) {
            return screen.orientation.type;
        }
        
        // 兼容性处理
        return window.orientation === 90 || window.orientation === -90
            ? 'landscape'
            : 'portrait';
    }

    onOrientationChange(callback) {
        this.orientationChangeCallback = callback;
    }
}

// 使用示例
const orientationMonitor = new OrientationMonitor();
orientationMonitor.onOrientationChange((orientation) => {
    console.log('屏幕方向已改变为：', orientation);
});
```

### 4. 高DPI屏幕适配

```javascript
class HighDPIScreenAdapter {
    constructor() {
        this.pixelRatio = window.devicePixelRatio || 1;
    }

    // 将物理像素转换为CSS像素
    physicalToCSSPixels(physicalPixels) {
        return physicalPixels / this.pixelRatio;
    }

    // 将CSS像素转换为物理像素
    cssToPhysicalPixels(cssPixels) {
        return cssPixels * this.pixelRatio;
    }

    // 检查是否需要高DPI图片
    needsHighDPIImage() {
        return this.pixelRatio > 1;
    }

    // 获取适合当前屏幕的图片URL
    getImageUrl(baseUrl) {
        if (this.needsHighDPIImage()) {
            const extension = baseUrl.split('.').pop();
            const baseName = baseUrl.slice(0, -(extension.length + 1));
            return `${baseName}@${this.pixelRatio}x.${extension}`;
        }
        return baseUrl;
    }
}

// 使用示例
const screenAdapter = new HighDPIScreenAdapter();

// 转换像素
console.log('100物理像素 =', screenAdapter.physicalToCSSPixels(100), 'CSS像素');
console.log('100CSS像素 =', screenAdapter.cssToPhysicalPixels(100), '物理像素');

// 获取图片URL
const imageUrl = screenAdapter.getImageUrl('images/logo.png');
console.log('使用图片：', imageUrl);
```
