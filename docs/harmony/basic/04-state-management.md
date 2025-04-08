# 状态管理

## 状态装饰器

### 1. @State 装饰器

```ts
@Entry
@Component
struct StateExample {
  @State count: number = 0
  
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

### 2. @Prop 装饰器

```ts
@Component
struct ChildComponent {
  @Prop message: string
  
  build() {
    Text(this.message)
      .fontSize(20)
  }
}

@Entry
@Component
struct ParentComponent {
  @State message: string = 'Hello'
  
  build() {
    Column() {
      ChildComponent({ message: this.message })
      
      Button('更新消息')
        .onClick(() => {
          this.message = 'World'
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 3. @Link 装饰器

```ts
@Component
struct ChildComponent {
  @Link count: number
  
  build() {
    Column() {
      Text(`子组件计数: ${this.count}`)
        .fontSize(20)
      
      Button('增加')
        .onClick(() => {
          this.count++
        })
    }
  }
}

@Entry
@Component
struct ParentComponent {
  @State count: number = 0
  
  build() {
    Column() {
      Text(`父组件计数: ${this.count}`)
        .fontSize(20)
      
      ChildComponent({ count: $count })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 4. @Watch 装饰器

```ts
@Entry
@Component
struct WatchExample {
  @State count: number = 0
  @State doubleCount: number = 0
  
  @Watch('count')
  onCountChange(newValue: number, oldValue: number) {
    this.doubleCount = newValue * 2
  }
  
  build() {
    Column() {
      Text(`计数: ${this.count}`)
        .fontSize(20)
      
      Text(`双倍计数: ${this.doubleCount}`)
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

## 状态管理最佳实践

### 1. 状态提升

```ts
// 子组件
@Component
struct TodoItem {
  @Prop title: string
  @Prop completed: boolean
  onToggle: () => void
  
  build() {
    Row() {
      Text(this.title)
        .fontSize(16)
        .decoration(this.completed ? TextDecorationType.LineThrough : TextDecorationType.None)
      
      Toggle({ type: ToggleType.Switch, isOn: this.completed })
        .onChange(() => {
          this.onToggle()
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
  }
}

// 父组件
@Entry
@Component
struct TodoList {
  @State todos: Array<{ id: number, title: string, completed: boolean }> = [
    { id: 1, title: '学习 Harmony', completed: false },
    { id: 2, title: '开发应用', completed: false }
  ]
  
  toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }
  
  build() {
    Column() {
      ForEach(this.todos, (todo) => {
        TodoItem({
          title: todo.title,
          completed: todo.completed,
          onToggle: () => this.toggleTodo(todo.id)
        })
      })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 状态持久化

```ts
import preferences from '@ohos.data.preferences'

@Entry
@Component
struct PersistentState {
  @State count: number = 0
  private preferences: preferences.Preferences
  
  async aboutToAppear() {
    // 初始化 preferences
    this.preferences = await preferences.getPreferences(getContext(this), 'myStore')
    
    // 读取保存的状态
    const savedCount = await this.preferences.get('count', 0)
    this.count = savedCount as number
  }
  
  async aboutToDisappear() {
    // 保存状态
    await this.preferences.put('count', this.count)
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

### 3. 状态共享

```ts
// 状态管理类
class CounterStore {
  private static instance: CounterStore
  private count: number = 0
  private listeners: Array<(count: number) => void> = []
  
  static getInstance(): CounterStore {
    if (!CounterStore.instance) {
      CounterStore.instance = new CounterStore()
    }
    return CounterStore.instance
  }
  
  getCount(): number {
    return this.count
  }
  
  increment() {
    this.count++
    this.notifyListeners()
  }
  
  addListener(listener: (count: number) => void) {
    this.listeners.push(listener)
  }
  
  removeListener(listener: (count: number) => void) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }
  
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.count))
  }
}

// 使用状态管理
@Entry
@Component
struct CounterApp {
  @State count: number = 0
  private store: CounterStore = CounterStore.getInstance()
  
  aboutToAppear() {
    this.count = this.store.getCount()
    this.store.addListener((count) => {
      this.count = count
    })
  }
  
  aboutToDisappear() {
    this.store.removeListener((count) => {
      this.count = count
    })
  }
  
  build() {
    Column() {
      Text(`计数: ${this.count}`)
        .fontSize(20)
      
      Button('增加')
        .onClick(() => {
          this.store.increment()
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

## 状态管理模式

### 1. 单向数据流

```ts
// 状态
class AppState {
  @State user: User = null
  @State theme: string = 'light'
  @State settings: Settings = new Settings()
}

// 动作
enum ActionType {
  UPDATE_USER,
  CHANGE_THEME,
  UPDATE_SETTINGS
}

// 动作创建器
function updateUser(user: User) {
  return { type: ActionType.UPDATE_USER, payload: user }
}

// 状态更新器
function reducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case ActionType.UPDATE_USER:
      return { ...state, user: action.payload }
    case ActionType.CHANGE_THEME:
      return { ...state, theme: action.payload }
    case ActionType.UPDATE_SETTINGS:
      return { ...state, settings: action.payload }
    default:
      return state
  }
}
```

### 2. 响应式编程

```ts
@Entry
@Component
struct ReactiveExample {
  @State count: number = 0
  @State doubled: number = 0
  @State squared: number = 0
  
  @Watch('count')
  onCountChange(newValue: number) {
    this.doubled = newValue * 2
    this.squared = newValue * newValue
  }
  
  build() {
    Column() {
      Text(`原始值: ${this.count}`)
        .fontSize(20)
      
      Text(`双倍值: ${this.doubled}`)
        .fontSize(20)
      
      Text(`平方值: ${this.squared}`)
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
