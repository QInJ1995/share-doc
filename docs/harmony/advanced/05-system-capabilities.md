# 系统能力集成

## 目录

- [系统服务](#系统服务)
- [硬件能力](#硬件能力)
- [系统权限](#系统权限)
- [系统通知](#系统通知)
- [系统设置](#系统设置)

## 系统服务

### 系统服务调用

```ts
class SystemService {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async getSystemInfo(): Promise<SystemInfo> {
    try {
      const systemInfo = await system.getSystemInfo();
      return {
        language: systemInfo.language,
        region: systemInfo.region,
        screenWidth: systemInfo.screenWidth,
        screenHeight: systemInfo.screenHeight,
        deviceType: systemInfo.deviceType
      };
    } catch (error) {
      console.error('Failed to get system info:', error);
      throw error;
    }
  }
  
  async getBatteryInfo(): Promise<BatteryInfo> {
    try {
      const batteryInfo = await system.getBatteryInfo();
      return {
        level: batteryInfo.level,
        isCharging: batteryInfo.isCharging,
        temperature: batteryInfo.temperature
      };
    } catch (error) {
      console.error('Failed to get battery info:', error);
      throw error;
    }
  }
}
```

### 系统事件监听

```ts
class SystemEventListener {
  private listeners: Map<string, Set<Function>> = new Map();
  
  constructor() {
    this.setupSystemListeners();
  }
  
  private setupSystemListeners() {
    system.on('batteryChange', (info: BatteryInfo) => {
      this.notifyListeners('batteryChange', info);
    });
    
    system.on('networkChange', (info: NetworkInfo) => {
      this.notifyListeners('networkChange', info);
    });
    
    system.on('screenOn', () => {
      this.notifyListeners('screenOn');
    });
    
    system.on('screenOff', () => {
      this.notifyListeners('screenOff');
    });
  }
  
  addListener(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    
    return () => {
      this.listeners.get(event).delete(callback);
    };
  }
  
  private notifyListeners(event: string, data?: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}
```

## 硬件能力

### 相机使用

```ts
class CameraManager {
  private camera: camera.Camera;
  
  async initialize() {
    try {
      this.camera = await camera.createCamera();
      await this.camera.initialize();
    } catch (error) {
      console.error('Failed to initialize camera:', error);
      throw error;
    }
  }
  
  async startPreview(surfaceId: string) {
    try {
      await this.camera.startPreview({
        surfaceId,
        width: 1920,
        height: 1080,
        format: camera.ImageFormat.JPEG,
        quality: 90
      });
    } catch (error) {
      console.error('Failed to start preview:', error);
      throw error;
    }
  }
  
  async takePicture(): Promise<string> {
    try {
      const result = await this.camera.takePicture({
        quality: 90,
        format: camera.ImageFormat.JPEG
      });
      return result.uri;
    } catch (error) {
      console.error('Failed to take picture:', error);
      throw error;
    }
  }
  
  async release() {
    try {
      await this.camera.release();
    } catch (error) {
      console.error('Failed to release camera:', error);
      throw error;
    }
  }
}
```

### 传感器使用

```ts
class SensorManager {
  private accelerometer: sensor.Accelerometer;
  private gyroscope: sensor.Gyroscope;
  
  async initialize() {
    try {
      this.accelerometer = await sensor.createAccelerometer();
      this.gyroscope = await sensor.createGyroscope();
      
      await this.accelerometer.initialize();
      await this.gyroscope.initialize();
    } catch (error) {
      console.error('Failed to initialize sensors:', error);
      throw error;
    }
  }
  
  startAccelerometer(callback: (data: AccelerometerData) => void) {
    this.accelerometer.on('data', callback);
    this.accelerometer.start();
  }
  
  startGyroscope(callback: (data: GyroscopeData) => void) {
    this.gyroscope.on('data', callback);
    this.gyroscope.start();
  }
  
  stopAccelerometer() {
    this.accelerometer.stop();
  }
  
  stopGyroscope() {
    this.gyroscope.stop();
  }
  
  async release() {
    try {
      await this.accelerometer.release();
      await this.gyroscope.release();
    } catch (error) {
      console.error('Failed to release sensors:', error);
      throw error;
    }
  }
}
```

## 系统权限

### 权限管理

```ts
class PermissionManager {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async checkPermission(permission: string): Promise<boolean> {
    try {
      const result = await this.context.requestPermission(permission);
      return result === 0;
    } catch (error) {
      console.error('Failed to check permission:', error);
      return false;
    }
  }
  
  async requestPermission(permission: string): Promise<boolean> {
    try {
      const result = await this.context.requestPermission(permission);
      return result === 0;
    } catch (error) {
      console.error('Failed to request permission:', error);
      return false;
    }
  }
  
  async requestMultiplePermissions(permissions: string[]): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();
    
    for (const permission of permissions) {
      const granted = await this.requestPermission(permission);
      results.set(permission, granted);
    }
    
    return results;
  }
}
```

### 权限检查装饰器

```ts
function RequirePermission(permission: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const permissionManager = new PermissionManager(this.context);
      const hasPermission = await permissionManager.checkPermission(permission);
      
      if (!hasPermission) {
        const granted = await permissionManager.requestPermission(permission);
        if (!granted) {
          throw new Error(`Permission ${permission} is required`);
        }
      }
      
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}
```

## 系统通知

### 通知管理

```ts
class NotificationManager {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async createNotification(channel: NotificationChannel, content: NotificationContent): Promise<string> {
    try {
      const notification = await notification.createNotification({
        channel,
        content,
        wantAgent: content.wantAgent,
        color: content.color,
        badgeNumber: content.badgeNumber,
        bundleName: content.bundleName,
        slotLevel: content.slotLevel
      });
      
      return notification.id;
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  }
  
  async cancelNotification(id: string) {
    try {
      await notification.cancelNotification(id);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      throw error;
    }
  }
  
  async cancelAllNotifications() {
    try {
      await notification.cancelAllNotifications();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      throw error;
    }
  }
}
```

### 通知渠道管理

```ts
class NotificationChannelManager {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async createChannel(channel: NotificationChannel): Promise<void> {
    try {
      await notification.createChannel(channel);
    } catch (error) {
      console.error('Failed to create notification channel:', error);
      throw error;
    }
  }
  
  async deleteChannel(channelId: string): Promise<void> {
    try {
      await notification.deleteChannel(channelId);
    } catch (error) {
      console.error('Failed to delete notification channel:', error);
      throw error;
    }
  }
  
  async getChannels(): Promise<NotificationChannel[]> {
    try {
      return await notification.getChannels();
    } catch (error) {
      console.error('Failed to get notification channels:', error);
      throw error;
    }
  }
}
```

## 系统设置

### 系统设置管理

```ts
class SystemSettingsManager {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async getBrightness(): Promise<number> {
    try {
      return await system.getBrightness();
    } catch (error) {
      console.error('Failed to get brightness:', error);
      throw error;
    }
  }
  
  async setBrightness(brightness: number): Promise<void> {
    try {
      await system.setBrightness(brightness);
    } catch (error) {
      console.error('Failed to set brightness:', error);
      throw error;
    }
  }
  
  async getVolume(type: VolumeType): Promise<number> {
    try {
      return await system.getVolume(type);
    } catch (error) {
      console.error('Failed to get volume:', error);
      throw error;
    }
  }
  
  async setVolume(type: VolumeType, volume: number): Promise<void> {
    try {
      await system.setVolume(type, volume);
    } catch (error) {
      console.error('Failed to set volume:', error);
      throw error;
    }
  }
}
```

### 系统主题管理

```ts
class ThemeManager {
  private context: common.UIAbilityContext;
  
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  
  async getTheme(): Promise<Theme> {
    try {
      return await system.getTheme();
    } catch (error) {
      console.error('Failed to get theme:', error);
      throw error;
    }
  }
  
  async setTheme(theme: Theme): Promise<void> {
    try {
      await system.setTheme(theme);
    } catch (error) {
      console.error('Failed to set theme:', error);
      throw error;
    }
  }
  
  async isDarkMode(): Promise<boolean> {
    try {
      const theme = await this.getTheme();
      return theme === Theme.DARK;
    } catch (error) {
      console.error('Failed to check dark mode:', error);
      throw error;
    }
  }
}
```

## 最佳实践

1. 合理使用系统服务
2. 正确处理硬件能力
3. 及时请求和检查权限
4. 优化通知管理
5. 合理管理系统设置

## 总结

本章介绍了 HarmonyOS 系统能力集成的相关内容，包括系统服务、硬件能力、系统权限、系统通知和系统设置等方面。这些知识能够帮助我们更好地利用系统提供的各种能力，开发出功能丰富的应用。在实际开发中，我们应该根据应用需求选择合适的系统能力，并注意权限管理和性能优化。
