# Python 网络编程

## 基础网络概念

### TCP/IP 协议栈
```python
# TCP/IP 协议栈层次
# 应用层: HTTP, FTP, SMTP
# 传输层: TCP, UDP
# 网络层: IP
# 链路层: Ethernet, WiFi
```

### 套接字（Socket）
```python
import socket

# 创建TCP套接字
tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 创建UDP套接字
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
```

## TCP 编程

### TCP 服务器
```python
import socket

def tcp_server():
    # 创建TCP套接字
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # 绑定地址和端口
    server_socket.bind(('localhost', 8888))
    
    # 开始监听
    server_socket.listen(5)
    print("服务器启动，等待连接...")
    
    while True:
        # 接受客户端连接
        client_socket, addr = server_socket.accept()
        print(f"收到来自 {addr} 的连接")
        
        try:
            # 接收数据
            data = client_socket.recv(1024)
            print(f"收到数据: {data.decode()}")
            
            # 发送响应
            response = "Hello, Client!"
            client_socket.send(response.encode())
            
        finally:
            # 关闭连接
            client_socket.close()

if __name__ == '__main__':
    tcp_server()
```

### TCP 客户端
```python
import socket

def tcp_client():
    # 创建TCP套接字
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        # 连接服务器
        client_socket.connect(('localhost', 8888))
        
        # 发送数据
        message = "Hello, Server!"
        client_socket.send(message.encode())
        
        # 接收响应
        response = client_socket.recv(1024)
        print(f"收到响应: {response.decode()}")
        
    finally:
        # 关闭连接
        client_socket.close()

if __name__ == '__main__':
    tcp_client()
```

## UDP 编程

### UDP 服务器
```python
import socket

def udp_server():
    # 创建UDP套接字
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    # 绑定地址和端口
    server_socket.bind(('localhost', 8888))
    print("UDP服务器启动，等待数据...")
    
    while True:
        # 接收数据
        data, addr = server_socket.recvfrom(1024)
        print(f"收到来自 {addr} 的数据: {data.decode()}")
        
        # 发送响应
        response = "Hello, Client!"
        server_socket.sendto(response.encode(), addr)

if __name__ == '__main__':
    udp_server()
```

### UDP 客户端
```python
import socket

def udp_client():
    # 创建UDP套接字
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    try:
        # 发送数据
        message = "Hello, Server!"
        client_socket.sendto(message.encode(), ('localhost', 8888))
        
        # 接收响应
        response, addr = client_socket.recvfrom(1024)
        print(f"收到来自 {addr} 的响应: {response.decode()}")
        
    finally:
        # 关闭套接字
        client_socket.close()

if __name__ == '__main__':
    udp_client()
```

## 异步网络编程

### asyncio 服务器
```python
import asyncio

async def handle_client(reader, writer):
    addr = writer.get_extra_info('peername')
    print(f"收到来自 {addr} 的连接")
    
    try:
        # 接收数据
        data = await reader.read(1024)
        print(f"收到数据: {data.decode()}")
        
        # 发送响应
        response = "Hello, Client!"
        writer.write(response.encode())
        await writer.drain()
        
    finally:
        # 关闭连接
        writer.close()
        await writer.wait_closed()

async def main():
    # 创建服务器
    server = await asyncio.start_server(
        handle_client, 'localhost', 8888)
    
    addr = server.sockets[0].getsockname()
    print(f"服务器启动在 {addr}")
    
    async with server:
        await server.serve_forever()

if __name__ == '__main__':
    asyncio.run(main())
```

### asyncio 客户端
```python
import asyncio

async def tcp_client():
    # 连接服务器
    reader, writer = await asyncio.open_connection(
        'localhost', 8888)
    
    try:
        # 发送数据
        message = "Hello, Server!"
        writer.write(message.encode())
        await writer.drain()
        
        # 接收响应
        data = await reader.read(1024)
        print(f"收到响应: {data.decode()}")
        
    finally:
        # 关闭连接
        writer.close()
        await writer.wait_closed()

if __name__ == '__main__':
    asyncio.run(tcp_client())
```

## HTTP 编程

### HTTP 服务器
```python
from http.server import HTTPServer, BaseHTTPRequestHandler

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        response = "Hello, World!"
        self.wfile.write(response.encode())

def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print("HTTP服务器启动在 http://localhost:8000")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
```

### HTTP 客户端
```python
import requests

def http_client():
    # 发送GET请求
    response = requests.get('http://localhost:8000')
    print(f"状态码: {response.status_code}")
    print(f"响应内容: {response.text}")
    
    # 发送POST请求
    data = {'key': 'value'}
    response = requests.post('http://localhost:8000', data=data)
    print(f"状态码: {response.status_code}")
    print(f"响应内容: {response.text}")

if __name__ == '__main__':
    http_client()
```

## WebSocket 编程

### WebSocket 服务器
```python
import asyncio
import websockets

async def handle_websocket(websocket, path):
    try:
        # 接收消息
        message = await websocket.recv()
        print(f"收到消息: {message}")
        
        # 发送响应
        response = "Hello, Client!"
        await websocket.send(response)
        
    except websockets.exceptions.ConnectionClosed:
        print("连接已关闭")

async def main():
    # 启动WebSocket服务器
    server = await websockets.serve(
        handle_websocket, 'localhost', 8765)
    print("WebSocket服务器启动在 ws://localhost:8765")
    
    await server.wait_closed()

if __name__ == '__main__':
    asyncio.run(main())
```

### WebSocket 客户端
```python
import asyncio
import websockets

async def websocket_client():
    # 连接WebSocket服务器
    async with websockets.connect('ws://localhost:8765') as websocket:
        # 发送消息
        message = "Hello, Server!"
        await websocket.send(message)
        
        # 接收响应
        response = await websocket.recv()
        print(f"收到响应: {response}")

if __name__ == '__main__':
    asyncio.run(websocket_client())
```

## 网络工具

### 端口扫描
```python
import socket
import concurrent.futures

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return port if result == 0 else None
    except:
        return None

def port_scanner(host, start_port, end_port):
    open_ports = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        future_to_port = {
            executor.submit(scan_port, host, port): port
            for port in range(start_port, end_port + 1)
        }
        
        for future in concurrent.futures.as_completed(future_to_port):
            port = future_to_port[future]
            try:
                result = future.result()
                if result:
                    open_ports.append(result)
            except Exception as e:
                print(f"端口 {port} 扫描出错: {e}")
    
    return open_ports

if __name__ == '__main__':
    host = 'localhost'
    start_port = 1
    end_port = 1024
    open_ports = port_scanner(host, start_port, end_port)
    print(f"开放端口: {open_ports}")
```

### DNS 查询
```python
import socket

def dns_lookup(hostname):
    try:
        # 获取IP地址
        ip_address = socket.gethostbyname(hostname)
        print(f"{hostname} 的IP地址: {ip_address}")
        
        # 获取主机信息
        host_info = socket.gethostbyaddr(ip_address)
        print(f"主机信息: {host_info}")
        
    except socket.gaierror as e:
        print(f"DNS查询错误: {e}")

if __name__ == '__main__':
    dns_lookup('www.example.com')
```

## 网络安全

### SSL/TLS 加密
```python
import ssl
import socket

def secure_server():
    # 创建SSL上下文
    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    context.load_cert_chain(certfile="server.crt", keyfile="server.key")
    
    # 创建TCP套接字
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 8888))
    server_socket.listen(5)
    
    # 包装SSL套接字
    secure_socket = context.wrap_socket(server_socket, server_side=True)
    
    print("安全服务器启动，等待连接...")
    client_socket, addr = secure_socket.accept()
    
    try:
        # 安全通信
        data = client_socket.recv(1024)
        print(f"收到加密数据: {data.decode()}")
        
        response = "Hello, Secure Client!"
        client_socket.send(response.encode())
        
    finally:
        client_socket.close()
        secure_socket.close()

if __name__ == '__main__':
    secure_server()
```

### 安全客户端
```python
import ssl
import socket

def secure_client():
    # 创建SSL上下文
    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE
    
    # 创建TCP套接字
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # 包装SSL套接字
    secure_socket = context.wrap_socket(client_socket, server_hostname='localhost')
    secure_socket.connect(('localhost', 8888))
    
    try:
        # 安全通信
        message = "Hello, Secure Server!"
        secure_socket.send(message.encode())
        
        response = secure_socket.recv(1024)
        print(f"收到加密响应: {response.decode()}")
        
    finally:
        secure_socket.close()

if __name__ == '__main__':
    secure_client()
``` 