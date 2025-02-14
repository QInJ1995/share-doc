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

## 安装 CocoaPods 并配置

CocoaPods 是一个用于管理 iOS 和 macOS 项目的依赖库的工具。在终端中运行以下命令来安装 CocoaPods：

### 安装 Ruby

CocoaPods 是用 Ruby 编写的，因此需要先安装 Ruby。macOS 通常自带 Ruby，但建议使用 Ruby 版本管理器（如 rbenv 或 rvm）来管理 Ruby 版本。

```bash
# 安装 rbenv
brew install rbenv

# 初始化 rbenv
rbenv init

# 安装指定版本的 Ruby
rbenv install 3.0.0

# 设置全局 Ruby 版本
rbenv global 3.0.0
```

### 安装 CocoaPods

使用 Ruby 的包管理器 gem 来安装 CocoaPods。

```bash
sudo gem install cocoapods
```

### 验证安装

安装完成后，可以通过以下命令验证 CocoaPods 是否安装成功：

```bash
pod --version
```

如果输出了版本号，说明安装成功。

## 安装 iOS 模拟器

1. 打开 Xcode，点击顶部菜单栏的 `Xcode` -> `Setting`，在弹出的窗口中点击 `Components` 标签，然后安装 `Simulator`。
2. 命令安装

    ```bash
    xcodebuild -downloadPlatform iOS ## 安装模拟器
    open -a Simulator ## 启动模拟器
    ```
