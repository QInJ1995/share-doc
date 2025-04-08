# 生命周期

## 应用生命周期

### 1. 应用生命周期回调

```ts
import appManager from '@ohos.app.appManager'

@Entry
@Component
struct AppLifecycle {
  aboutToAppear() {
    console.log('应用创建')
  }
  
  onDestroy() {
    console.log('应用销毁')
  }
  
  build() {
    Column() {
      Text('应用生命周期示例')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 应用状态管理

```ts
@Entry
@Component
struct AppState {
  @State isActive: boolean = true
  
  aboutToAppear() {
    // 监听应用状态变化
    appManager.on('appStateChange', (state) => {
      this.isActive = state === 'active'
    })
  }
  
  onDestroy() {
    // 移除监听
    appManager.off('appStateChange')
  }
  
  build() {
    Column() {
      Text(this.isActive ? '应用在前台' : '应用在后台')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

## 页面生命周期

### 1. 页面生命周期回调

```ts
@Entry
@Component
struct PageLifecycle {
  aboutToAppear() {
    console.log('页面创建')
  }
  
  aboutToDisappear() {
    console.log('页面销毁')
  }
  
  onPageShow() {
    console.log('页面显示')
  }
  
  onPageHide() {
    console.log('页面隐藏')
  }
  
  build() {
    Column() {
      Text('页面生命周期示例')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 页面状态保存和恢复

```ts
@Entry
@Component
struct PageState {
  @State count: number = 0
  private savedState: any = null
  
  aboutToAppear() {
    // 恢复保存的状态
    if (this.savedState) {
      this.count = this.savedState.count
    }
  }
  
  aboutToDisappear() {
    // 保存状态
    this.savedState = {
      count: this.count
    }
  }
  
  build() {
    Column() {
      Text(`计数: ${this.count}`)
        .fontSize(20)
      
      Button('增加')
        .onClick(() => {
          this.count++
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

## 组件生命周期

### 1. 组件生命周期回调

```ts
@Component
struct ComponentLifecycle {
  aboutToAppear() {
    console.log('组件创建')
  }
  
  aboutToDisappear() {
    console.log('组件销毁')
  }
  
  build() {
    Column() {
      Text('组件生命周期示例')
        .fontSize(20)
    }
  }
}

@Entry
@Component
struct ParentComponent {
  @State showChild: boolean = true
  
  build() {
    Column() {
      if (this.showChild) {
        ComponentLifecycle()
      }
      
      Button('切换组件')
        .onClick(() => {
          this.showChild = !this.showChild
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 组件状态管理

```ts
@Component
struct StatefulComponent {
  @State private count: number = 0
  private timer: number = -1
  
  aboutToAppear() {
    // 启动定时器
    this.timer = setInterval(() => {
      this.count++
    }, 1000)
  }
  
  aboutToDisappear() {
    // 清理定时器
    if (this.timer !== -1) {
      clearInterval(this.timer)
      this.timer = -1
    }
  }
  
  build() {
    Column() {
      Text(`计数: ${this.count}`)
        .fontSize(20)
    }
  }
}
```

## 生命周期最佳实践

### 1. 资源管理

```ts
@Entry
@Component
struct ResourceManagement {
  private resources: Map<string, any> = new Map()
  
  aboutToAppear() {
    // 初始化资源
    this.initResources()
  }
  
  onDestroy() {
    // 释放资源
    this.releaseResources()
  }
  
  private initResources() {
    // 加载资源
    this.resources.set('image1', $r('app.media.image1'))
    this.resources.set('image2', $r('app.media.image2'))
  }
  
  private releaseResources() {
    // 清理资源
    this.resources.clear()
  }
  
  build() {
    Column() {
      Text('资源管理示例')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 事件监听管理

```ts
@Entry
@Component
struct EventManagement {
  private listeners: Array<() => void> = []
  
  aboutToAppear() {
    // 注册事件监听
    this.registerListeners()
  }
  
  aboutToDisappear() {
    // 移除事件监听
    this.removeListeners()
  }
  
  private registerListeners() {
    // 添加事件监听
    const listener1 = () => console.log('事件1')
    const listener2 = () => console.log('事件2')
    
    this.listeners.push(listener1, listener2)
    
    // 注册到事件系统
    eventManager.on('event1', listener1)
    eventManager.on('event2', listener2)
  }
  
  private removeListeners() {
    // 移除事件监听
    this.listeners.forEach(listener => {
      eventManager.off('event1', listener)
      eventManager.off('event2', listener)
    })
    this.listeners = []
  }
  
  build() {
    Column() {
      Text('事件管理示例')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 3. 数据订阅管理

```ts
@Entry
@Component
struct DataSubscription {
  private subscriptions: Array<() => void> = []
  
  aboutToAppear() {
    // 订阅数据变化
    this.subscribeToData()
  }
  
  aboutToDisappear() {
    // 取消订阅
    this.unsubscribeFromData()
  }
  
  private subscribeToData() {
    // 订阅数据
    const unsubscribe1 = dataStore.subscribe('user', this.onUserChange)
    const unsubscribe2 = dataStore.subscribe('settings', this.onSettingsChange)
    
    this.subscriptions.push(unsubscribe1, unsubscribe2)
  }
  
  private unsubscribeFromData() {
    // 取消订阅
    this.subscriptions.forEach(unsubscribe => unsubscribe())
    this.subscriptions = []
  }
  
  private onUserChange(user: User) {
    console.log('用户数据变化:', user)
  }
  
  private onSettingsChange(settings: Settings) {
    console.log('设置数据变化:', settings)
  }
  
  build() {
    Column() {
      Text('数据订阅示例')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

## 生命周期注意事项

1. **资源释放**
   - 在 `aboutToDisappear` 或 `onDestroy` 中释放资源
   - 清理定时器和事件监听
   - 取消数据订阅

2. **状态保存**
   - 在 `aboutToDisappear` 中保存重要状态
   - 在 `aboutToAppear` 中恢复状态
   - 使用持久化存储保存关键数据

3. **性能优化**
   - 避免在生命周期回调中执行耗时操作
   - 使用异步操作处理数据加载
   - 合理管理内存使用

## 下一步

- [系统能力](./system-capabilities.md)
- [网络请求](./network-requests.md)
- [数据持久化](./data-persistence.md)
