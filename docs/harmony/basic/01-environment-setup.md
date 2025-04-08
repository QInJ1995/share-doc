# Harmony 开发环境搭建

## 系统要求

### 硬件要求

- CPU：Intel i5 或更高
- 内存：8GB 或更高
- 硬盘空间：至少 10GB 可用空间
- 显示器：1920 x 1080 或更高分辨率

### 软件要求

- 操作系统：Windows 10/11、macOS 10.15 或更高版本
- JDK：1.8 或更高版本
- Node.js：14.0 或更高版本

## 安装步骤

### 1. 安装 JDK

1. 下载 JDK
   - 访问 [Oracle JDK 下载页面](https://www.oracle.com/java/technologies/downloads/)
   - 选择适合你操作系统的版本
   - 下载并安装

2. 配置环境变量

   ```bash
   # Windows
   JAVA_HOME=C:\Program Files\Java\jdk1.8.0_xxx
   Path=%JAVA_HOME%\bin

   # macOS/Linux
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_xxx.jdk/Contents/Home
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. 验证安装

   ```bash
   java -version
   ```

### 2. 安装 DevEco Studio

1. 下载 DevEco Studio
   - 访问 [DevEco Studio 下载页面](https://developer.harmonyos.com/cn/develop/deveco-studio/)
   - 选择适合你操作系统的版本
   - 下载安装包

2. 安装步骤
   - 运行安装程序
   - 选择安装路径
   - 选择组件（建议全选）
   - 等待安装完成

3. 首次启动配置
   - 选择主题（深色/浅色）
   - 安装必要的插件
   - 配置 SDK 路径

### 3. 配置开发环境

1. 安装 SDK
   - 打开 DevEco Studio
   - 进入 SDK Manager
   - 下载必要的 SDK 版本
   - 配置 SDK 路径

2. 配置模拟器
   - 进入 Device Manager
   - 创建新的模拟器
   - 选择系统镜像
   - 配置模拟器参数

## 创建第一个项目

### 1. 新建项目

1. 打开 DevEco Studio
2. 点击 "File" -> "New" -> "Create Project"
3. 选择项目模板
   - Empty Ability
   - Stage Model
   - FA Model

### 2. 项目配置

```json5
{
  "name": "MyFirstApp",
  "type": "app",
  "description": "我的第一个 Harmony 应用",
  "main": "entry",
  "versionName": "1.0.0",
  "versionCode": 1,
  "minSdkVersion": 9,
  "targetSdkVersion": 9
}
```

### 3. 运行项目

1. 连接设备或启动模拟器
2. 点击运行按钮
3. 选择目标设备
4. 等待应用安装和启动

## 开发工具使用

### 1. 编辑器功能

- 代码补全
- 语法检查
- 重构工具
- 调试功能

### 2. 调试技巧

1. 断点设置
2. 变量查看
3. 调用栈分析
4. 日志输出

### 3. 性能分析

- CPU 使用率
- 内存占用
- 网络请求
- 渲染性能

## 常见问题

### 1. 环境配置问题

- JDK 版本不兼容
- SDK 路径错误
- 环境变量未设置

### 2. 运行问题

- 设备连接失败
- 编译错误
- 运行时异常

## 下一步

- [ArkTS 语言基础](./arkts-basics.md)
- [UI 开发基础](./ui-basics.md)
- [状态管理](./state-management.md)
