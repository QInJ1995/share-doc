# TypeScript 聊天应用

本教程将带领你使用 TypeScript 构建一个实时聊天应用。我们将使用 React 作为前端框架，Node.js 作为后端，并使用 WebSocket 实现实时通信。

## 项目结构

```
chat-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatRoom.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── UserList.tsx
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   └── chatService.ts
│   │   ├── hooks/
│   │   │   └── useChat.ts
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── server/
│   ├── src/
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   └── chatService.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
```

## 类型定义

### 客户端类型

```typescript
// client/src/types/chat.ts
export interface User {
  id: string;
  username: string;
  online: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
}

export interface ChatState {
  users: User[];
  messages: Message[];
  currentUser: User | null;
  error: string | null;
}

export type ChatEvent =
  | { type: 'USER_JOINED'; user: User }
  | { type: 'USER_LEFT'; userId: string }
  | { type: 'NEW_MESSAGE'; message: Message }
  | { type: 'ERROR'; error: string };
```

### 服务器端类型

```typescript
// server/src/types/chat.ts
export interface ClientMessage {
  type: 'SEND_MESSAGE' | 'JOIN_CHAT' | 'LEAVE_CHAT';
  payload: any;
}

export interface ServerMessage {
  type: 'USER_JOINED' | 'USER_LEFT' | 'NEW_MESSAGE' | 'ERROR';
  payload: any;
}
```

## 客户端实现

### ChatService

```typescript
// client/src/services/chatService.ts
import { User, Message, ChatEvent } from '../types/chat';

export class ChatService {
  private socket: WebSocket;
  private eventHandlers: Map<string, (event: ChatEvent) => void>;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.eventHandlers = new Map();

    this.socket.onmessage = (event) => {
      const chatEvent: ChatEvent = JSON.parse(event.data);
      const handler = this.eventHandlers.get(chatEvent.type);
      if (handler) {
        handler(chatEvent);
      }
    };
  }

  joinChat(username: string) {
    this.socket.send(JSON.stringify({
      type: 'JOIN_CHAT',
      payload: { username }
    }));
  }

  sendMessage(content: string) {
    this.socket.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      payload: { content }
    }));
  }

  leaveChat() {
    this.socket.send(JSON.stringify({
      type: 'LEAVE_CHAT'
    }));
  }

  onEvent(type: string, handler: (event: ChatEvent) => void) {
    this.eventHandlers.set(type, handler);
  }

  disconnect() {
    this.socket.close();
  }
}
```

### 自定义 Hook

```typescript
// client/src/hooks/useChat.ts
import { useState, useEffect } from 'react';
import { User, Message, ChatState } from '../types/chat';
import { ChatService } from '../services/chatService';

export const useChat = (username: string) => {
  const [state, setState] = useState<ChatState>({
    users: [],
    messages: [],
    currentUser: null,
    error: null
  });

  useEffect(() => {
    const chatService = new ChatService('ws://localhost:8080');

    chatService.onEvent('USER_JOINED', (event) => {
      setState(prev => ({
        ...prev,
        users: [...prev.users, event.user]
      }));
    });

    chatService.onEvent('USER_LEFT', (event) => {
      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== event.userId)
      }));
    });

    chatService.onEvent('NEW_MESSAGE', (event) => {
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, event.message]
      }));
    });

    chatService.onEvent('ERROR', (event) => {
      setState(prev => ({
        ...prev,
        error: event.error
      }));
    });

    chatService.joinChat(username);

    return () => {
      chatService.leaveChat();
      chatService.disconnect();
    };
  }, [username]);

  return state;
};
```

## 组件实现

### ChatRoom 组件

```typescript
// client/src/components/ChatRoom.tsx
import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { UserList } from './UserList';
import { ChatState } from '../types/chat';

interface ChatRoomProps {
  state: ChatState;
  onSendMessage: (content: string) => void;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ state, onSendMessage }) => {
  return (
    <div className="chat-room">
      <div className="chat-sidebar">
        <UserList users={state.users} />
      </div>
      <div className="chat-main">
        <MessageList messages={state.messages} />
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
};
```

### MessageList 组件

```typescript
// client/src/components/MessageList.tsx
import React from 'react';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message">
          <div className="message-header">
            <span className="sender">{message.sender.username}</span>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div className="message-content">{message.content}</div>
        </div>
      ))}
    </div>
  );
};
```

### MessageInput 组件

```typescript
// client/src/components/MessageInput.tsx
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSend(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
```

### UserList 组件

```typescript
// client/src/components/UserList.tsx
import React from 'react';
import { User } from '../types/chat';

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      <h3>Online Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id} className={user.online ? 'online' : 'offline'}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## 服务器端实现

```typescript
// server/src/index.ts
import { WebSocketServer } from 'ws';
import { ChatService } from './services/chatService';

const wss = new WebSocketServer({ port: 8080 });
const chatService = new ChatService();

wss.on('connection', (ws) => {
  chatService.handleConnection(ws);

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    chatService.handleMessage(ws, message);
  });

  ws.on('close', () => {
    chatService.handleDisconnection(ws);
  });
});
```

```typescript
// server/src/services/chatService.ts
import { WebSocket } from 'ws';
import { ClientMessage, ServerMessage } from '../types/chat';

export class ChatService {
  private clients: Map<WebSocket, string>;

  constructor() {
    this.clients = new Map();
  }

  handleConnection(ws: WebSocket) {
    // 处理新连接
  }

  handleMessage(ws: WebSocket, message: ClientMessage) {
    switch (message.type) {
      case 'JOIN_CHAT':
        this.handleJoin(ws, message.payload);
        break;
      case 'SEND_MESSAGE':
        this.handleMessageSend(ws, message.payload);
        break;
      case 'LEAVE_CHAT':
        this.handleLeave(ws);
        break;
    }
  }

  handleDisconnection(ws: WebSocket) {
    this.handleLeave(ws);
  }

  private handleJoin(ws: WebSocket, payload: { username: string }) {
    this.clients.set(ws, payload.username);
    this.broadcast({
      type: 'USER_JOINED',
      payload: { username: payload.username }
    });
  }

  private handleMessageSend(ws: WebSocket, payload: { content: string }) {
    const username = this.clients.get(ws);
    if (username) {
      this.broadcast({
        type: 'NEW_MESSAGE',
        payload: {
          content: payload.content,
          sender: username,
          timestamp: new Date()
        }
      });
    }
  }

  private handleLeave(ws: WebSocket) {
    const username = this.clients.get(ws);
    if (username) {
      this.clients.delete(ws);
      this.broadcast({
        type: 'USER_LEFT',
        payload: { username }
      });
    }
  }

  private broadcast(message: ServerMessage) {
    this.clients.forEach((_, client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}
```

## 样式文件

```css
/* client/src/App.css */
.chat-room {
  display: flex;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-sidebar {
  width: 250px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: 20px;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 20px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #666;
}

.message-content {
  line-height: 1.5;
}

.message-input {
  padding: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 10px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-input button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-list h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.user-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-list li {
  padding: 5px 0;
  color: #666;
}

.user-list li.online {
  color: #28a745;
}

.user-list li.offline {
  color: #dc3545;
}
```

## 运行项目

1. 启动服务器：
```bash
cd server
npm install
npm start
```

2. 启动客户端：
```bash
cd client
npm install
npm start
```

## 功能特点

1. 实时消息发送和接收
2. 用户在线状态显示
3. 消息历史记录
4. 错误处理
5. 响应式设计

## 下一步

- [电商网站](./04-ecommerce.md)
- [博客系统](./05-blog-system.md)
- [待办事项应用](./01-todo-app.md) 