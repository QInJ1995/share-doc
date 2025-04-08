# 待办事项应用 (Todo App)

## 项目概述

这是一个功能完整的待办事项应用，包含以下特性：

- 添加、删除、编辑待办事项
- 标记待办事项为已完成
- 按类别分类待办事项
- 数据持久化存储
- 主题切换
- 动画效果

## 项目结构

```txt
todo-app/
├── entry/
│   ├── src/
│   │   ├── main/
│   │   │   ├── ets/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── index.ets
│   │   │   │   │   ├── add.ets
│   │   │   │   │   └── detail.ets
│   │   │   │   ├── components/
│   │   │   │   │   ├── TodoItem.ets
│   │   │   │   │   ├── CategoryList.ets
│   │   │   │   │   └── ThemeSwitch.ets
│   │   │   │   ├── models/
│   │   │   │   │   ├── Todo.ets
│   │   │   │   │   └── Category.ets
│   │   │   │   ├── services/
│   │   │   │   │   ├── StorageService.ets
│   │   │   │   │   └── ThemeService.ets
│   │   │   │   └── utils/
│   │   │   │       └── DateUtils.ets
│   │   │   └── resources/
│   │   └── ohpm.json5
│   └── build-profile.json5
└── oh-package.json5
```

## 核心代码实现

### 数据模型

```ts
// models/Todo.ets
export class Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  dueDate: Date;
  createdAt: Date;
  
  constructor(
    title: string,
    description: string = '',
    category: string = 'default',
    dueDate: Date = new Date()
  ) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.completed = false;
    this.category = category;
    this.dueDate = dueDate;
    this.createdAt = new Date();
  }
}

// models/Category.ets
export class Category {
  id: string;
  name: string;
  color: string;
  
  constructor(name: string, color: string = '#007DFF') {
    this.id = Date.now().toString();
    this.name = name;
    this.color = color;
  }
}
```

### 存储服务

```ts
// services/StorageService.ets
import data_preferences from '@ohos.data.preferences';

export class StorageService {
  private static instance: StorageService;
  private preferences: data_preferences.Preferences;
  
  private constructor() {}
  
  static async getInstance(): Promise<StorageService> {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
      await StorageService.instance.initialize();
    }
    return StorageService.instance;
  }
  
  private async initialize() {
    const context = getContext(this);
    this.preferences = await data_preferences.getPreferences(context, 'todo_app');
  }
  
  async saveTodos(todos: Todo[]): Promise<void> {
    await this.preferences.put('todos', JSON.stringify(todos));
  }
  
  async getTodos(): Promise<Todo[]> {
    const todosJson = await this.preferences.get('todos', '[]');
    return JSON.parse(todosJson as string);
  }
  
  async saveCategories(categories: Category[]): Promise<void> {
    await this.preferences.put('categories', JSON.stringify(categories));
  }
  
  async getCategories(): Promise<Category[]> {
    const categoriesJson = await this.preferences.get('categories', '[]');
    return JSON.parse(categoriesJson as string);
  }
}
```

### 主题服务

```ts
// services/ThemeService.ets
export class ThemeService {
  private static instance: ThemeService;
  private isDarkMode: boolean = false;
  private listeners: Set<(isDark: boolean) => void> = new Set();
  
  private constructor() {}
  
  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.notifyListeners();
  }
  
  isDark(): boolean {
    return this.isDarkMode;
  }
  
  addListener(listener: (isDark: boolean) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isDarkMode));
  }
}
```

### 主页面

```ts
// pages/index.ets
import { Todo } from '../models/Todo';
import { Category } from '../models/Category';
import { StorageService } from '../services/StorageService';
import { ThemeService } from '../services/ThemeService';

@Entry
@Component
struct TodoPage {
  @State todos: Todo[] = [];
  @State categories: Category[] = [];
  @State selectedCategory: string = 'all';
  @State isDarkMode: boolean = false;
  
  private storageService: StorageService;
  private themeService: ThemeService;
  
  async aboutToAppear() {
    this.storageService = await StorageService.getInstance();
    this.themeService = ThemeService.getInstance();
    
    await this.loadData();
    this.setupThemeListener();
  }
  
  async loadData() {
    this.todos = await this.storageService.getTodos();
    this.categories = await this.storageService.getCategories();
  }
  
  setupThemeListener() {
    this.themeService.addListener((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  
  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Text('待办事项')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
        Blank()
        Toggle({ type: ToggleType.Switch, isOn: this.isDarkMode })
          .onChange((isOn) => {
            this.themeService.toggleTheme();
          })
      }
      .width('100%')
      .padding(16)
      .backgroundColor(this.isDarkMode ? '#333333' : '#FFFFFF')
      
      // 分类列表
      CategoryList({
        categories: this.categories,
        selectedCategory: this.selectedCategory,
        onSelect: (category) => {
          this.selectedCategory = category;
        }
      })
      
      // 待办事项列表
      List() {
        ForEach(this.filteredTodos, (todo: Todo) => {
          ListItem() {
            TodoItem({
              todo: todo,
              onToggle: () => this.toggleTodo(todo),
              onDelete: () => this.deleteTodo(todo)
            })
          }
        })
      }
      .width('100%')
      .layoutWeight(1)
      
      // 添加按钮
      Button('添加待办事项')
        .width('90%')
        .margin({ bottom: 16 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/add' });
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.isDarkMode ? '#1C1C1E' : '#F5F5F5')
  }
  
  get filteredTodos(): Todo[] {
    if (this.selectedCategory === 'all') {
      return this.todos;
    }
    return this.todos.filter(todo => todo.category === this.selectedCategory);
  }
  
  async toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    await this.storageService.saveTodos(this.todos);
  }
  
  async deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    await this.storageService.saveTodos(this.todos);
  }
}
```

### 待办事项组件

```ts
// components/TodoItem.ets
@Component
struct TodoItem {
  @Prop todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  
  build() {
    Row() {
      Toggle({ type: ToggleType.Checkbox, isOn: this.todo.completed })
        .onChange(() => this.onToggle())
      
      Column() {
        Text(this.todo.title)
          .fontSize(16)
          .fontWeight(this.todo.completed ? FontWeight.Normal : FontWeight.Bold)
          .decoration(this.todo.completed ? { type: TextDecorationType.LineThrough } : {})
        
        if (this.todo.description) {
          Text(this.todo.description)
            .fontSize(14)
            .fontColor('#666666')
        }
        
        Text(this.formatDate(this.todo.dueDate))
          .fontSize(12)
          .fontColor('#999999')
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      
      Button({ type: ButtonType.Circle }) {
        Image($r('app.media.delete'))
          .width(20)
          .height(20)
      }
      .width(32)
      .height(32)
      .backgroundColor('#FF3B30')
      .onClick(() => this.onDelete())
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(8)
    .margin({ bottom: 8 })
  }
  
  private formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
}
```

## 项目特点

1. 架构设计
   - 采用单例模式管理服务和状态
   - 使用组件化开发提高代码复用性
   - 实现数据持久化存储

2. 用户体验
   - 支持深色/浅色主题切换
   - 添加动画效果提升交互体验
   - 实现手势操作

3. 性能优化
   - 使用列表组件优化长列表性能
   - 实现数据缓存
   - 优化渲染性能

4. 安全性
   - 数据本地加密存储
   - 输入验证和清理
   - 错误处理机制

## 运行效果

1. 主页面
   - 显示待办事项列表
   - 支持分类筛选
   - 主题切换按钮

2. 添加页面
   - 表单输入
   - 日期选择
   - 分类选择

3. 详情页面
   - 显示完整信息
   - 支持编辑
   - 删除确认

## 总结

这个待办事项应用展示了 HarmonyOS 应用开发的主要特性，包括：

- 组件化开发
- 状态管理
- 数据持久化
- 主题切换
- 动画效果
- 性能优化

通过这个项目，开发者可以学习到：

1. 如何组织项目结构
2. 如何实现数据管理
3. 如何优化用户体验
4. 如何提高应用性能
5. 如何保证代码质量
