# Python Web开发

## Web框架概述

### 主流Web框架
```python
# Flask - 轻量级框架
# Django - 全栈框架
# FastAPI - 现代高性能框架
# Tornado - 异步框架
# Pyramid - 灵活框架
```

### 框架选择建议
```python
# 小型项目: Flask
# 大型项目: Django
# API开发: FastAPI
# 实时应用: Tornado
# 灵活需求: Pyramid
```

## Flask框架

### 基础应用
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'POST':
        data = request.json
        return jsonify({'status': 'success', 'data': data})
    return jsonify({'status': 'success', 'message': 'GET request'})

if __name__ == '__main__':
    app.run(debug=True)
```

### 路由和视图
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post: {post_id}'

@app.route('/template')
def show_template():
    return render_template('index.html', title='Home')
```

### 请求处理
```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/form', methods=['GET', 'POST'])
def handle_form():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return f'Username: {username}, Password: {password}'
    return '''
        <form method="post">
            <input type="text" name="username">
            <input type="password" name="password">
            <input type="submit">
        </form>
    '''
```

### 数据库集成
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __repr__(self):
        return f'<User {self.username}>'

# 创建数据库
with app.app_context():
    db.create_all()
```

## Django框架

### 项目创建
```python
# 创建项目
# django-admin startproject myproject

# 创建应用
# python manage.py startapp myapp
```

### 模型定义
```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publication_date = models.DateField()

    def __str__(self):
        return self.title
```

### 视图和URL
```python
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Book

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/list.html', {'books': books})

def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    return render(request, 'books/detail.html', {'book': book})
```

### 模板系统
```html
<!-- books/list.html -->
{% extends "base.html" %}

{% block content %}
<h1>Book List</h1>
<ul>
    {% for book in books %}
    <li>
        <a href="{% url 'book_detail' book.pk %}">
            {{ book.title }}
        </a>
    </li>
    {% endfor %}
</ul>
{% endblock %}
```

## FastAPI框架

### 基础应用
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/items/")
async def create_item(item: Item):
    return item

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

### 依赖注入
```python
from fastapi import Depends, FastAPI
from typing import List

app = FastAPI()

async def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

### 中间件
```python
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 自定义中间件
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## 模板引擎

### Jinja2模板
```html
<!-- base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- index.html -->
{% extends "base.html" %}

{% block title %}Home{% endblock %}

{% block content %}
<h1>Welcome</h1>
<p>Hello, {{ name }}!</p>
{% endblock %}
```

### 模板继承
```html
<!-- layout.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Default Title{% endblock %}</title>
    {% block head %}{% endblock %}
</head>
<body>
    <header>{% block header %}{% endblock %}</header>
    <main>{% block main %}{% endblock %}</main>
    <footer>{% block footer %}{% endblock %}</footer>
</body>
</html>

<!-- page.html -->
{% extends "layout.html" %}

{% block title %}Page Title{% endblock %}

{% block head %}
<link rel="stylesheet" href="style.css">
{% endblock %}

{% block main %}
<h1>Page Content</h1>
{% endblock %}
```

## 数据库集成

### SQLAlchemy
```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

# 创建引擎
engine = create_engine('sqlite:///database.db')
Base.metadata.create_all(engine)

# 创建会话
Session = sessionmaker(bind=engine)
session = Session()

# 使用会话
new_user = User(name='John', email='john@example.com')
session.add(new_user)
session.commit()
```

### Django ORM
```python
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    authors = models.ManyToManyField(Author)
    pub_date = models.DateField()

    def __str__(self):
        return self.headline
```

## 认证和授权

### JWT认证
```python
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username
```

### Django认证
```python
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')
```

## RESTful API

### 资源定义
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    description: str = None

items = []

@app.get("/items/", response_model=List[Item])
async def read_items():
    return items

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    items.append(item)
    return item

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")
```

### API版本控制
```python
from fastapi import FastAPI, APIRouter

app = FastAPI()

v1 = APIRouter(prefix="/v1")
v2 = APIRouter(prefix="/v2")

@v1.get("/items/")
async def read_items_v1():
    return {"version": "v1"}

@v2.get("/items/")
async def read_items_v2():
    return {"version": "v2"}

app.include_router(v1)
app.include_router(v2)
```

## WebSocket应用

### 实时聊天
```python
from fastapi import FastAPI, WebSocket
from typing import List

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client #{client_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")
```

## 部署

### Docker部署
```dockerfile
# Dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Nginx配置
```nginx
# nginx.conf
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/static/files/;
    }
}
```

### 环境配置
```python
# config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
``` 