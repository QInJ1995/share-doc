# webview_flutter

## 简介

[`webview_flutter`](https://pub.dev/packages/webview_flutter) 是一个 Flutter 插件，用于在 Flutter 应用中嵌入网页内容。它允许你将一个网页加载到 Flutter 小部件中，并与之交互。

## 安装

在 `pubspec.yaml` 文件中添加 `webview_flutter` 依赖：

```yaml
dependencies:
  flutter:
    sdk: flutter
  webview_flutter: ^2.0.13
```

## 使用

### 基本用法

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'https://flutter.dev',
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    );
  }
}
```

### 进阶用法

#### 加载本地 HTML 文件

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'assets/index.html',
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    );
  }
}
```

#### 与 JavaScript 交互

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'https://flutter.dev',
          javascriptMode: JavascriptMode.unrestricted,
          onWebViewCreated: (controller) {
            controller.evaluateJavascript('console.log("Hello from Flutter!");');
          },
        ),
      ),
    );
  }
}
```

#### 监听网页加载状态

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'https://flutter.dev',
          javascriptMode: JavascriptMode.unrestricted,
          onPageFinished: (url) {
            print('Page finished loading: $url');
          },
        ),
      ),
    );
  }
}
```

#### 自定义 WebView

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'https://flutter.dev',
          javascriptMode: JavascriptMode.unrestricted,
          gestureNavigationEnabled: true,
          backgroundColor: Colors.white,
        ),
      ),
    );
  }
}
```

#### WebView 与 Flutter 通信

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('WebView Example'),
        ),
        body: WebView(
          initialUrl: 'https://flutter.dev',
          javascriptMode: JavascriptMode.unrestricted, // 允许 JavaScript 执行
          javascriptChannels: <JavascriptChannel>[
            JavascriptChannel(
              name: 'Flutter',
              onMessageReceived: (JavascriptMessage message) {
                print('Received message from JavaScript: ${message.message}');
              },
            ),
          ].toSet(),
        ),
      ),
    );
  }
}
```
