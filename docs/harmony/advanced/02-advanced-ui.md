# 高级 UI 组件和自定义组件

## 目录

- [高级 UI 组件和自定义组件](#高级-ui-组件和自定义组件)
  - [目录](#目录)
  - [自定义组件进阶](#自定义组件进阶)
    - [组件封装](#组件封装)
    - [组件继承](#组件继承)
  - [组件生命周期](#组件生命周期)
    - [生命周期方法](#生命周期方法)
  - [组件间通信](#组件间通信)
    - [事件总线](#事件总线)
    - [状态管理](#状态管理)
  - [动画和过渡效果](#动画和过渡效果)
    - [自定义动画](#自定义动画)
    - [页面转场动画](#页面转场动画)
  - [手势和交互](#手势和交互)
    - [自定义手势](#自定义手势)
  - [性能优化](#性能优化)
    - [列表性能优化](#列表性能优化)
    - [组件缓存](#组件缓存)
  - [最佳实践](#最佳实践)
  - [总结](#总结)

## 自定义组件进阶

### 组件封装

```ts
@Component
struct CustomCard {
  @Prop title: string;
  @State content: string = '';
  @Link isExpanded: boolean;
  
  build() {
    Column() {
      Row() {
        Text(this.title)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
        Image($r('app.media.arrow'))
          .width(20)
          .height(20)
          .rotate(this.isExpanded ? 180 : 0)
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      
      if (this.isExpanded) {
        Text(this.content)
          .fontSize(14)
          .margin({ top: 8 })
      }
    }
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(8)
  }
}
```

### 组件继承

```ts
@Component
struct BaseButton {
  @Prop text: string;
  @State isPressed: boolean = false;
  
  build() {
    Button(this.text)
      .backgroundColor(this.isPressed ? '#CCCCCC' : '#007DFF')
      .onClick(() => {
        this.isPressed = true;
        setTimeout(() => {
          this.isPressed = false;
        }, 200);
      })
  }
}

@Component
struct PrimaryButton extends BaseButton {
  build() {
    super.build()
      .backgroundColor(this.isPressed ? '#0056B3' : '#007DFF')
  }
}
```

## 组件生命周期

### 生命周期方法

```ts
@Component
struct LifecycleExample {
  @State message: string = 'Hello';
  
  aboutToAppear() {
    console.info('Component is about to appear');
  }
  
  aboutToDisappear() {
    console.info('Component is about to disappear');
  }
  
  onPageShow() {
    console.info('Page is shown');
  }
  
  onPageHide() {
    console.info('Page is hidden');
  }
  
  build() {
    Column() {
      Text(this.message)
    }
  }
}
```

## 组件间通信

### 事件总线

```ts
class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Function[]> = new Map();
  
  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}
```

### 状态管理

```ts
class Store {
  @State private data: any = {};
  
  setData(key: string, value: any) {
    this.data[key] = value;
  }
  
  getData(key: string) {
    return this.data[key];
  }
}

const store = new Store();
```

## 动画和过渡效果

### 自定义动画

```ts
@Component
struct AnimatedComponent {
  @State scale: number = 1;
  
  build() {
    Column() {
      Text('Animated Text')
        .fontSize(20)
        .scale({ x: this.scale, y: this.scale })
        .animation({
          duration: 1000,
          curve: Curve.EaseInOut,
          iterations: -1,
          playMode: PlayMode.Alternate
        })
        .onClick(() => {
          this.scale = this.scale === 1 ? 1.5 : 1;
        })
    }
  }
}
```

### 页面转场动画

```ts
@Entry
@Component
struct PageTransition {
  @State currentPage: number = 1;
  
  build() {
    Stack() {
      if (this.currentPage === 1) {
        Page1()
          .transition(TransitionType.Push)
      } else {
        Page2()
          .transition(TransitionType.Pop)
      }
    }
    .animation({
      duration: 300,
      curve: Curve.EaseInOut
    })
  }
}
```

## 手势和交互

### 自定义手势

```ts
@Component
struct GestureExample {
  @State offset: number = 0;
  
  build() {
    Column() {
      Text('Swipe me')
        .fontSize(20)
        .translate({ x: this.offset })
        .gesture(
          PanGesture()
            .onActionStart(() => {
              console.info('Pan gesture started');
            })
            .onActionUpdate((event: GestureEvent) => {
              this.offset += event.offsetX;
            })
            .onActionEnd(() => {
              console.info('Pan gesture ended');
            })
        )
    }
  }
}
```

## 性能优化

### 列表性能优化

```ts
@Component
struct OptimizedList {
  @State items: Array<Item> = [];
  
  build() {
    List() {
      ForEach(this.items, (item: Item) => {
        ListItem() {
          ItemComponent({ item: item })
            .reuseId(item.id)
        }
      }, item => item.id)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 组件缓存

```ts
@Component
struct CachedComponent {
  @State data: any = null;
  
  build() {
    Column() {
      if (this.data) {
        Text(this.data)
          .fontSize(16)
      } else {
        LoadingComponent()
      }
    }
    .cached(true)
  }
}
```

## 最佳实践

1. 合理使用组件封装和继承
2. 注意组件生命周期管理
3. 选择合适的组件间通信方式
4. 优化动画性能
5. 实现流畅的手势交互
6. 注意列表和组件性能优化

## 总结

本章介绍了 HarmonyOS 高级 UI 开发的相关内容，包括自定义组件、生命周期管理、组件通信、动画效果、手势交互以及性能优化等方面。这些知识能够帮助我们开发出更加流畅、美观且性能优秀的应用界面。在实际开发中，我们应该根据具体需求选择合适的实现方式，并注意性能优化。
