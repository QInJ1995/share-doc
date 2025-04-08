# TypeScript 实战项目

让我们通过一些实际项目来学习 TypeScript。

## 项目 1：待办事项应用

### 项目结构

```txt
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── AddTodo.tsx
│   ├── types/
│   │   └── todo.ts
│   ├── utils/
│   │   └── storage.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

### 类型定义

```typescript
// src/types/todo.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoList = Todo[];
```

### 组件实现

```typescript
// src/components/TodoList.tsx
import React from 'react';
import { Todo } from '../types/todo';

interface Props {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                    <span>{todo.text}</span>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};
```

## 项目 2：天气应用

### 项目结构

```txt
weather-app/
├── src/
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── WeatherDetails.tsx
│   ├── services/
│   │   └── weather.ts
│   ├── types/
│   │   └── weather.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

### 类型定义

```typescript
// src/types/weather.ts
export interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
}

export interface Location {
    city: string;
    country: string;
}
```

### API 服务

```typescript
// src/services/weather.ts
import { WeatherData, Location } from '../types/weather';

export class WeatherService {
    private readonly API_KEY = 'your-api-key';
    private readonly BASE_URL = 'https://api.weatherapi.com/v1';

    async getWeather(location: string): Promise<WeatherData> {
        const response = await fetch(
            `${this.BASE_URL}/current.json?key=${this.API_KEY}&q=${location}`
        );
        const data = await response.json();
        return this.transformWeatherData(data);
    }

    private transformWeatherData(data: any): WeatherData {
        return {
            temperature: data.current.temp_c,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            description: data.current.condition.text,
            icon: data.current.condition.icon
        };
    }
}
```

## 项目 3：购物车应用

### 项目结构

```txt
shopping-cart/
├── src/
│   ├── components/
│   │   ├── ProductList.tsx
│   │   ├── Cart.tsx
│   │   └── Product.tsx
│   ├── store/
│   │   ├── index.ts
│   │   └── cart.ts
│   ├── types/
│   │   └── product.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

### 类型定义

```typescript
// src/types/product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type Cart = CartItem[];
```

### Redux Store

```typescript
// src/store/cart.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types/product';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                item => item.product.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({
                    product: action.payload,
                    quantity: 1
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.product.id !== action.payload
            );
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
```

## 项目 4：聊天应用

### 项目结构

```txt
chat-app/
├── src/
│   ├── components/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── UserList.tsx
│   ├── services/
│   │   └── socket.ts
│   ├── types/
│   │   └── chat.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

### 类型定义

```typescript
// src/types/chat.ts
export interface Message {
    id: string;
    text: string;
    sender: User;
    timestamp: Date;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface ChatRoom {
    id: string;
    name: string;
    users: User[];
    messages: Message[];
}
```

### WebSocket 服务

```typescript
// src/services/socket.ts
import { Message, User } from '../types/chat';

export class ChatService {
    private socket: WebSocket;
    private messageHandlers: ((message: Message) => void)[] = [];

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.onmessage = this.handleMessage.bind(this);
    }

    sendMessage(message: string, user: User) {
        this.socket.send(JSON.stringify({
            type: 'message',
            data: {
                text: message,
                sender: user
            }
        }));
    }

    onMessage(handler: (message: Message) => void) {
        this.messageHandlers.push(handler);
    }

    private handleMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            this.messageHandlers.forEach(handler => handler(data.data));
        }
    }
}
```

## 下一步

- [高级主题](./14-advanced-topics.md)
- [资源推荐](./15-resources.md)
- [社区贡献](./16-community-contribution.md)
