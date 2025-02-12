# Mac 安装和环境配置

详细可查阅[官网安装和环境配置教程](https://docs.flutter.cn/get-started/install)

## 安装 Flutter SDK

- [使用 VS Code 安装 Flutter](https://docs.flutter.cn/get-started/install/macos/mobile-ios#install-the-flutter-sdk)
- [自行下载安装](https://docs.flutter.cn/get-started/install/macos/mobile-ios#install-the-flutter-sdk)

## 配置环境变量

macOS 使用 `~/.bash_profile`、`~/.zshrc` 或 `~/.zprofile` 来管理环境变量。根据你使用的 `Shell` 类型，选择对应的配置文件：

- Bash：~/.bash_profile
- Zsh：~/.zshrc 或 ~/.zprofile（如果你使用的是 Oh My Zsh）

### 1.打开配置文件

```bash
# 如果是 Bash Shell
nano ~/.bash_profile

# 如果是 Zsh Shell
nano ~/.zshrc
```

### 2.添加 Flutter 到环境变量

在文件末尾添加以下内容：

```bash
export PATH="$PATH:/Users/你的用户名/development/flutter/bin"
```

将 /Users/你的用户名/development/flutter 替换为你实际的 Flutter SDK 路径。

### 3.保存并退出

在 nano 编辑器中，按 `Ctrl + X`，然后按 `Y` 确认保存，最后按 `Enter` 退出。

### 4.使环境变量生效

运行以下命令，使配置文件立即生效：

```bash
# 如果是 Bash Shell
source ~/.bash_profile

# 如果是 Zsh Shell
source ~/.zshrc
```

验证是否生效：

```bash
echo $PATH
```

## 配置 iOS 开发

### 安装 Xcode

打开 App Store，搜索 Xcode 并安装。

### 安装 iOS 模拟器

1. 打开 Xcode，点击顶部菜单栏的 `Xcode` -> `Setting`，在弹出的窗口中点击 `Components` 标签，然后安装 `Simulator`。
2. 命令安装

    ```bash
    xcodebuild -downloadPlatform iOS ## 安装模拟器
    open -a Simulator ## 启动模拟器
    ```
