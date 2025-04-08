# TypeScript 待办事项应用

本教程将带领你使用 TypeScript 构建一个完整的待办事项应用。我们将使用 React 作为前端框架，并实现完整的状态管理和数据持久化。

## 项目结构

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── AddTodo.tsx
│   ├── types/
│   │   └── todo.ts
│   ├── services/
│   │   └── storage.ts
│   ├── hooks/
│   │   └── useTodos.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

## 类型定义

首先，让我们定义待办事项的类型：

```typescript
// src/types/todo.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';
```

## 组件实现

### TodoList 组件

```typescript
// src/components/TodoList.tsx
import React from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
```

### TodoItem 组件

```typescript
// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </li>
  );
};
```

### AddTodo 组件

```typescript
// src/components/AddTodo.tsx
import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="添加新的待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
};
```

## 自定义 Hook

```typescript
// src/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { StorageService } from '../services/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    const storedTodos = StorageService.getTodos();
    setTodos(storedTodos);
  }, []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    StorageService.saveTodos(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    StorageService.saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    StorageService.saveTodos(updatedTodos);
  };

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
```

## 存储服务

```typescript
// src/services/storage.ts
import { Todo } from '../types/todo';

export class StorageService {
  private static readonly STORAGE_KEY = 'todos';

  static getTodos(): Todo[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }
}
```

## 主应用组件

```typescript
// src/App.tsx
import React from 'react';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { useTodos } from './hooks/useTodos';
import './App.css';

export const App: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="app">
      <h1>待办事项</h1>
      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          未完成
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          已完成
        </button>
      </div>
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};
```

## 样式文件

```css
/* src/App.css */
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}

.filters {
  margin: 20px 0;
}

.filters button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.filters button.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
```

## 项目配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 运行项目

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

## 功能特点

1. 添加新的待办事项
2. 标记待办事项为完成/未完成
3. 删除待办事项
4. 按状态筛选待办事项
5. 数据持久化存储

## 下一步

- [天气查询应用](./02-weather-app.md)
- [聊天应用](./03-chat-app.md)
- [电商网站](./04-ecommerce.md) 