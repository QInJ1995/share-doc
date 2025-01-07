# Windows 安装和环境配置

详细可查阅[官网安装和环境配置教程](https://docs.flutter.cn/get-started/install)

## 安装 Flutter SDK

- [使用 VS Code 安装 Flutter](https://docs.flutter.cn/get-started/install/windows/mobile#install-the-flutter-sdk)
- [自行下载安装](https://docs.flutter.cn/get-started/install/windows/mobile#install-the-flutter-sdk)

## 配置 Android 开发

### 在 Android Studio 中配置 Android toolchain

要使用 Flutter 创建 Android 应用程序，请确认已安装以下 Android 组件。

- Android SDK Platform, API 35.0.1
- Android SDK Command-line Tools
- Android SDK Build-Tools
- Android SDK Platform-Tools
- Android Emulator

如果您尚未安装这些 API，或者您不知道这些 API，请继续执行以下过程。

否则，您可以跳到[下一部分](https://docs.flutter.cn/get-started/install/windows/mobile#check-your-development-setup)。

首次使用Android Studio

1. 启动 Android Studio
   显示 Welcome to Android Studio 的对话框。
2. 按照 Android Studio Setup Wizard 操作
3. 安装以下组件：
    - Android SDK Platform, API 35.0.1
    - Android SDK Command-line Tools
    - Android SDK Build-Tools
    - Android SDK Platform-Tools
    - Android Emulator

正在使用Android Studio

1. 启动 Android Studio。

2. 打开 Settings 对话框，查看 SDK Manager。

    1. 如果你已经打开了一个项目，请打开 Tools > SDK Manager。

    2. 如果显示 Welcome to Android Studio 的对话框，请单击 Open 按钮后面的 More Options 图标，然后从下拉菜单中单击 SDK Manager。

3. 单击 SDK Platforms。

4. 检查 Android API 35.0.1 是否已经选中。

    如果 Status 栏显示 Update available 或 Not installed：

    1. 选择 Android API 35.0.1

    2. 单击 Apply。

    3. 当显示 Confirm Change 对话框时，单击 OK。

        显示 SDK Quickfix Installation 完成进度的对话框。

    4. 安装完成后，单击 Finish。

        安装最新的 SDK 后， Status 栏可能会显示 Update available。这意味着某些额外的系统镜像可能尚未安装。你可以忽略它然后继续。

5. 单击 SDK Tools。

6. 检查以下 SDK 工具是否已经选择：

    - Android SDK Command-line Tools
    - Android SDK Build-Tools
    - Android SDK Platform-Tools
    - Android Emulator
7. 如果上述任何工具的 Status 栏显示 Update available 或 Not installed：

    1. 选择所需的工具。

    2. 单击 Apply。

    3. 当显示 Confirm Change 的对话框时，单击 OK。

       显示 SDK Quickfix Installation 完成进度的对话框。

    4. 安装完成后，单击 Finish。

### 配置目标 Android 设备

#### 虚拟设备

要配置 Flutter 应用在 Android 模拟器中运行，请按照以下步骤创建并选择模拟器：

1. 在你的开发电脑上启用 VM acceleration。

2. 启动 Android Studio。

3. 打开 Settings 对话框，查看 SDK Manager。

    1. 如果你已经打开了一个项目，请打开 Tools > Device Manager。

    2. 如果显示 Welcome to Android Studio 的对话框，请单击 Open 按钮后面的 More Options 图标，然后在下拉菜单中单击 Device Manager。

4. 单击 Virtual。

5. 单击 Create Device。

    显示 Virtual Device Configuration 的对话框。

6. 在 Category 下选择 Phone 或 Tablet。

7. 选择设备，你可以浏览或搜索设备。

8. 单击 Next。

9. 单击 x86 Images。

10. 单击需要模拟的 Android 版本系统镜像。

    1. 如果所需镜像的 Release Name 右侧有一个 Download 图标，请单击该图标。

        显示 SDK Quickfix Installation 完成进度的对话框

    2. 下载完成后，单击 Finish。

11. 单击 Next。

    Virtual Device Configuration 会显示它的 Verify Configuation 步骤。

12. 如果要重命名 Android 虚拟设备 (AVD)，请更改 AVD Name 框中的值。

13. 单击 Show Advanced Settings 并滚动至 Emulated Performance。

14. 从 Graphics 下拉菜单中，选择 Hardware - GLES 2.0。

    这样就会开启 硬件加速 (hardware acceleration) 并提高渲染性能。

15. 检查你的 AVD 配置。如果已经完备，请单击 Finish。

    想要了解更多有关 AVD 的信息，请查阅 Managing AVDs。

16. 在 Device Manager 对话框中，单击所需 AVD 右侧的 Run 图标。模拟器启动并显示所选 Android 操作系统的版本和设备默认的画布。

#### 真机设备

你需要一台运行 Android API level 21 或更高版本的安卓设备，来配置 Flutter 应用在真机 Android 设备上运行。

1. 按照 [Android 文档](https://developer.android.google.cn/studio/debug/dev-options) 中的说明，在设备上启用 `开发者选项` 和 `USB` 调试。

2. [可选] 如果要利用无线调试，请按照 [Android](https://developer.android.google.cn/studio/run/device#wireless) 文档 中的说明在设备上启用 无线调试。

3. 安装 [Google USB Driver](https://developer.android.google.cn/studio/run/win-usb)。

4. 将设备插入你的 Windows 电脑。如果设备发出提示，请授权电脑访问你的设备。

5. 检查 Flutter 是否能识别连接的 Android 设备。

在 PowerShell 中运行：

```bash
c:\> flutter devices
```

默认情况下，Flutter 使用 `adb` 工具所在的 Android SDK 版本。如果要在 Flutter 中使用不同的 Android SDK 安装路径，请设置环境变量 `ANDROID_SDK_ROOT` 为该安装目录。

### 同意 Android 许可证

在使用 Flutter 之前，按照指南安装所有必要的条件之后，再同意 Android SDK 平台的许可证。

1. 打开一个高权限（管理员）的控制台窗口。
2. 运行以下指令启用签名许可证。

    ```bash
    C:> flutter doctor --android-licenses
    ```

    如果你在其他时候已经同意了 Android Studio 许可证，该指令将会返回：

    ```bash
    [========================================] 100% Computing updates...
    All SDK package licenses accepted.
    ```

    你可以跳过下一个步骤。

3. 请仔细阅读每项许可条款后，再同意。

### 许可证问题故障排除

你可以遇到了 Android SDK 定位 Java SDK 的问题。

```bash
flutter doctor --android-licenses

ERROR: JAVA_HOME is set to an invalid directory: /Applications/Android\ Studio.app/Contents/jre/Contents/Home

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.

Android sdkmanager tool was found, but failed to run
(/Users/atsansone/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager): "exited code 1".
Try re-installing or updating your Android SDK,
visit https://flutter.dev/to/macos-android-setup for detailed instructions.
```

这是由于环境变量 `JAVA_HOME` 设置方式导致的， `flutter doctor` 指令就会返回此错误。当你在向 `JAVA_HOME` 添加路径时，可以在 `Android` 和 `Studio` 之间的空格处添加反斜杠，或者用引号将整个路径包含进来。切记，不能 `同时` 这样做。

在合适的 shell 资源文件中查找 `JAVA_HOME` 路径。

将下面这样：

```bash
export JAVA_HOME="/Applications/Android\ Studio.app/Contents/jre/Contents/Home"
```

改成：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

不要在 Android 和 Studio 之间加入反斜杠。
要加载当前更新后的环境变量，请重新加载 shell。本例使用 zsh 资源文件。

```bash
source ~/.zshrc
```

## 检查你的开发配置

### 运行 Flutter doctor

`flutter doctor` 指令将检查 Windows 完整的 Flutter 开发环境的所有组件。

1. 打开 PowerShell。

2. 要检查所有组件的安装情况，请运行以下指令。

```bash
PS C:> flutter doctor
```

由于你选择为 Android 进行开发，因此不需要 所有 组件。如果你遵循本指南，指令结果应该类似于：

```bash
Running flutter doctor...
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.27.0, on Microsoft Windows 11 [Version 10.0.22621.3155], locale en)
[✓] Windows version (Installed version of Windows is version 10 or higher)
[✓] Android toolchain - develop for Android devices (Android SDK version 35.0.1)
[!] Chrome - develop for the web
[!] Visual Studio - develop Windows apps
[✓] Android Studio (version 2024.2)
[✓] VS Code (version 1.95)
[✓] Connected device (1 available)
[✓] Network resources


! Doctor found issues in 2 categories.
```

### 解决 Flutter doctor 的问题

当 `flutter doctor` 指令返回错误时，可能是 Flutter、VS Code、Android Studio、连接的设备或者网络资源出错。

如果 `flutter doctor` 指令返回这些组件中的任何一个错误，请使用 verbose 标志再次运行。

```bash
PS C:> flutter doctor -v
```

查看输出结果，了解可能需要安装的其他软件或者需要执行的其他任务。

如果你更改了 Flutter SDK 或其他相关组件的配置，请 再次运行 `flutter doctor` 来检查安装。
