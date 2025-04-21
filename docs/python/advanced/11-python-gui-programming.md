# Python GUI编程

## GUI框架概述

### 常用GUI框架
```python
# Tkinter: Python标准GUI库
# PyQt: 功能强大的跨平台GUI框架
# PySide: Qt的Python绑定
# wxPython: 基于wxWidgets的GUI框架
# Kivy: 跨平台GUI框架，支持多点触控
```

### 框架选择建议
```python
# 简单应用: Tkinter
# 企业级应用: PyQt/PySide
# 跨平台应用: wxPython
# 移动应用: Kivy
```

## Tkinter基础

### 基本窗口
```python
import tkinter as tk
from tkinter import ttk

class MainWindow:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("我的应用")
        self.root.geometry("400x300")
        
        # 创建标签
        self.label = ttk.Label(self.root, text="欢迎使用Tkinter!")
        self.label.pack(pady=20)
        
        # 创建按钮
        self.button = ttk.Button(self.root, text="点击我", command=self.on_click)
        self.button.pack()
        
    def on_click(self):
        self.label.config(text="按钮被点击了!")
        
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = MainWindow()
    app.run()
```

### 布局管理
```python
class LayoutExample:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("布局示例")
        
        # 使用pack布局
        frame1 = ttk.Frame(self.root)
        frame1.pack(fill=tk.X, padx=5, pady=5)
        ttk.Label(frame1, text="Pack布局").pack(side=tk.LEFT)
        ttk.Button(frame1, text="按钮1").pack(side=tk.LEFT)
        
        # 使用grid布局
        frame2 = ttk.Frame(self.root)
        frame2.pack(fill=tk.X, padx=5, pady=5)
        ttk.Label(frame2, text="Grid布局").grid(row=0, column=0)
        ttk.Button(frame2, text="按钮2").grid(row=0, column=1)
        
        # 使用place布局
        frame3 = ttk.Frame(self.root)
        frame3.pack(fill=tk.X, padx=5, pady=5)
        ttk.Label(frame3, text="Place布局").place(x=10, y=10)
        ttk.Button(frame3, text="按钮3").place(x=100, y=10)
```

### 常用控件
```python
class WidgetsExample:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("控件示例")
        
        # 输入框
        self.entry = ttk.Entry(self.root)
        self.entry.pack(pady=5)
        
        # 复选框
        self.check_var = tk.BooleanVar()
        self.checkbox = ttk.Checkbutton(self.root, text="选择我", 
                                      variable=self.check_var)
        self.checkbox.pack(pady=5)
        
        # 单选按钮
        self.radio_var = tk.StringVar(value="1")
        frame = ttk.Frame(self.root)
        frame.pack(pady=5)
        ttk.Radiobutton(frame, text="选项1", value="1", 
                       variable=self.radio_var).pack(side=tk.LEFT)
        ttk.Radiobutton(frame, text="选项2", value="2", 
                       variable=self.radio_var).pack(side=tk.LEFT)
        
        # 下拉列表
        self.combo = ttk.Combobox(self.root, values=["选项1", "选项2", "选项3"])
        self.combo.pack(pady=5)
        
        # 列表框
        self.listbox = tk.Listbox(self.root)
        self.listbox.pack(pady=5)
        for item in ["项目1", "项目2", "项目3"]:
            self.listbox.insert(tk.END, item)
```

## PyQt基础

### 基本窗口
```python
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel
from PyQt5.QtCore import Qt

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("我的应用")
        self.setGeometry(100, 100, 400, 300)
        
        # 创建标签
        self.label = QLabel("欢迎使用PyQt!", self)
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setGeometry(50, 50, 300, 30)
        
        # 创建按钮
        self.button = QPushButton("点击我", self)
        self.button.setGeometry(150, 100, 100, 30)
        self.button.clicked.connect(self.on_click)
        
    def on_click(self):
        self.label.setText("按钮被点击了!")

if __name__ == "__main__":
    app = QApplication([])
    window = MainWindow()
    window.show()
    app.exec_()
```

### 布局管理
```python
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, 
                           QVBoxLayout, QHBoxLayout, QPushButton, QLabel)

class LayoutExample(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("布局示例")
        
        # 创建中央部件
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # 创建垂直布局
        main_layout = QVBoxLayout(central_widget)
        
        # 水平布局1
        h_layout1 = QHBoxLayout()
        h_layout1.addWidget(QLabel("水平布局1"))
        h_layout1.addWidget(QPushButton("按钮1"))
        main_layout.addLayout(h_layout1)
        
        # 水平布局2
        h_layout2 = QHBoxLayout()
        h_layout2.addWidget(QLabel("水平布局2"))
        h_layout2.addWidget(QPushButton("按钮2"))
        main_layout.addLayout(h_layout2)
```

### 信号和槽
```python
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, 
                           QVBoxLayout, QPushButton, QLineEdit, QLabel)
from PyQt5.QtCore import pyqtSignal

class CustomSignal(QWidget):
    # 自定义信号
    custom_signal = pyqtSignal(str)
    
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        
        # 输入框
        self.input = QLineEdit()
        layout.addWidget(self.input)
        
        # 按钮
        self.button = QPushButton("发送信号")
        self.button.clicked.connect(self.emit_signal)
        layout.addWidget(self.button)
        
        # 标签
        self.label = QLabel("等待信号...")
        layout.addWidget(self.label)
        
        self.setLayout(layout)
        
        # 连接信号和槽
        self.custom_signal.connect(self.on_signal)
        
    def emit_signal(self):
        text = self.input.text()
        self.custom_signal.emit(text)
        
    def on_signal(self, text):
        self.label.setText(f"收到信号: {text}")
```

## 高级GUI特性

### 自定义控件
```python
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel
from PyQt5.QtGui import QPainter, QColor, QPen
from PyQt5.QtCore import Qt, QRect

class CustomWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.setMinimumSize(200, 200)
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        # 绘制背景
        painter.fillRect(self.rect(), QColor(240, 240, 240))
        
        # 绘制圆形
        painter.setPen(QPen(Qt.blue, 2))
        painter.setBrush(QColor(200, 200, 255))
        painter.drawEllipse(QRect(50, 50, 100, 100))
```

### 多线程GUI
```python
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel
from PyQt5.QtCore import QThread, pyqtSignal

class WorkerThread(QThread):
    finished = pyqtSignal(str)
    
    def run(self):
        # 模拟耗时操作
        import time
        time.sleep(2)
        self.finished.emit("任务完成!")

class ThreadExample(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("多线程示例")
        self.setGeometry(100, 100, 300, 200)
        
        # 创建按钮
        self.button = QPushButton("开始任务", self)
        self.button.setGeometry(100, 50, 100, 30)
        self.button.clicked.connect(self.start_task)
        
        # 创建标签
        self.label = QLabel("等待任务...", self)
        self.label.setGeometry(50, 100, 200, 30)
        
    def start_task(self):
        self.button.setEnabled(False)
        self.label.setText("任务进行中...")
        
        # 创建并启动工作线程
        self.thread = WorkerThread()
        self.thread.finished.connect(self.on_finished)
        self.thread.start()
        
    def on_finished(self, result):
        self.label.setText(result)
        self.button.setEnabled(True)
```

### 样式表
```python
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel
from PyQt5.QtGui import QFont

class StyledWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("样式表示例")
        self.setGeometry(100, 100, 300, 200)
        
        # 设置窗口样式
        self.setStyleSheet("""
            QMainWindow {
                background-color: #f0f0f0;
            }
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
            QLabel {
                color: #333;
                font-size: 14px;
            }
        """)
        
        # 创建按钮
        self.button = QPushButton("样式按钮", self)
        self.button.setGeometry(100, 50, 100, 30)
        
        # 创建标签
        self.label = QLabel("样式标签", self)
        self.label.setGeometry(50, 100, 200, 30)
        self.label.setFont(QFont("Arial", 12))
```

## 实践案例

### 文本编辑器
```python
from PyQt5.QtWidgets import (QApplication, QMainWindow, QTextEdit, 
                           QAction, QFileDialog, QMessageBox)
from PyQt5.QtGui import QIcon

class TextEditor(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("文本编辑器")
        self.setGeometry(100, 100, 800, 600)
        
        # 创建文本编辑区
        self.text_edit = QTextEdit()
        self.setCentralWidget(self.text_edit)
        
        # 创建菜单栏
        self.create_menubar()
        
    def create_menubar(self):
        menubar = self.menuBar()
        
        # 文件菜单
        file_menu = menubar.addMenu("文件")
        
        # 新建
        new_action = QAction("新建", self)
        new_action.triggered.connect(self.new_file)
        file_menu.addAction(new_action)
        
        # 打开
        open_action = QAction("打开", self)
        open_action.triggered.connect(self.open_file)
        file_menu.addAction(open_action)
        
        # 保存
        save_action = QAction("保存", self)
        save_action.triggered.connect(self.save_file)
        file_menu.addAction(save_action)
        
    def new_file(self):
        self.text_edit.clear()
        
    def open_file(self):
        filename, _ = QFileDialog.getOpenFileName(self, "打开文件")
        if filename:
            with open(filename, 'r') as f:
                self.text_edit.setText(f.read())
                
    def save_file(self):
        filename, _ = QFileDialog.getSaveFileName(self, "保存文件")
        if filename:
            with open(filename, 'w') as f:
                f.write(self.text_edit.toPlainText())
```

### 计算器
```python
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, 
                           QVBoxLayout, QGridLayout, QLineEdit, 
                           QPushButton)
from PyQt5.QtCore import Qt

class Calculator(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("计算器")
        self.setFixedSize(300, 400)
        
        # 创建中央部件
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # 创建主布局
        main_layout = QVBoxLayout(central_widget)
        
        # 创建显示框
        self.display = QLineEdit()
        self.display.setAlignment(Qt.AlignRight)
        self.display.setReadOnly(True)
        main_layout.addWidget(self.display)
        
        # 创建按钮网格
        grid_layout = QGridLayout()
        buttons = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', '.', '=', '+'
        ]
        
        positions = [(i, j) for i in range(4) for j in range(4)]
        for position, button in zip(positions, buttons):
            btn = QPushButton(button)
            btn.clicked.connect(lambda x=button: self.on_click(x))
            grid_layout.addWidget(btn, *position)
            
        main_layout.addLayout(grid_layout)
        
    def on_click(self, value):
        if value == '=':
            try:
                result = eval(self.display.text())
                self.display.setText(str(result))
            except:
                self.display.setText("错误")
        else:
            self.display.setText(self.display.text() + value)
```

### 图片查看器
```python
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, 
                           QVBoxLayout, QPushButton, QLabel, 
                           QFileDialog)
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt

class ImageViewer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("图片查看器")
        self.setGeometry(100, 100, 800, 600)
        
        # 创建中央部件
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # 创建主布局
        main_layout = QVBoxLayout(central_widget)
        
        # 创建图片标签
        self.image_label = QLabel()
        self.image_label.setAlignment(Qt.AlignCenter)
        main_layout.addWidget(self.image_label)
        
        # 创建按钮
        self.open_button = QPushButton("打开图片")
        self.open_button.clicked.connect(self.open_image)
        main_layout.addWidget(self.open_button)
        
    def open_image(self):
        filename, _ = QFileDialog.getOpenFileName(self, "打开图片", "", 
                                                "图片文件 (*.png *.jpg *.bmp)")
        if filename:
            pixmap = QPixmap(filename)
            self.image_label.setPixmap(pixmap.scaled(self.image_label.size(), 
                                                   Qt.KeepAspectRatio))
``` 