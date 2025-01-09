# flutter_screenutil

## 简介

[flutter_screenutil](https://pub.dev/packages/flutter_screenutil) 是一个用于处理屏幕适配的库，它可以帮助我们在不同屏幕尺寸的设备上实现一致的布局效果。

## 安装

在 `pubspec.yaml` 文件中添加以下依赖：

```yaml
dependencies:
  flutter_screenutil: ^5.0.0+2
```

然后运行 `flutter pub get` 命令来安装依赖。

## 使用

### 初始化

在 `main.dart` 文件中，我们需要初始化 `ScreenUtil`：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 初始化 ScreenUtil
    ScreenUtil.init(
      context,
      designSize: Size(375, 667), // 设计稿的尺寸
      allowFontScaling: false, // 是否允许字体缩放
    );

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('ScreenUtil Demo'),
        ),
        body: Center(
          child: Text(
            'Hello, ScreenUtil!',
            style: TextStyle(fontSize: 20.sp), // 使用 sp 单位
          ),
        ),
      ),
    );
  }
}
```

### 使用

在 `build` 方法中，我们可以使用 `ScreenUtil` 提供的方法来获取屏幕尺寸、字体大小等：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('ScreenUtil Demo'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '屏幕宽度: ${ScreenUtil().screenWidth}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '屏幕高度: ${ScreenUtil().screenHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '状态栏高度: ${ScreenUtil().statusBarHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '底部安全区高度: $
{ScreenUtil().bottomBarHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '字体缩放比例: ${ScreenUtil().textScaleFactor}',
                style: TextStyle(fontSize: 16.sp),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 自定义适配

我们还可以使用 `ScreenUtil` 提供的方法来自定义适配：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('ScreenUtil Demo'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '屏幕宽度: ${ScreenUtil().screenWidth}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '屏幕高度: ${ScreenUtil().screenHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '状态栏高度: ${ScreenUtil().statusBarHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '底部安全区高度: ${ScreenUtil().bottomBarHeight}px',
                style: TextStyle(fontSize: 16.sp),
              ),
              Text(
                '字体缩放比例: ${ScreenUtil().textScaleFactor}',
                style: TextStyle(fontSize: 16.sp),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 总结

`flutter_screenutil` 是一个非常有用的库，可以帮助我们快速适配不同尺寸的屏幕。通过使用 `ScreenUtil` 提供的方法，我们可以轻松地获取屏幕尺寸、字体大小等，并且可以根据需要自定义适配。