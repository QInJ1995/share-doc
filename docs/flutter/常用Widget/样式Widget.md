# 样式Widget

## 1. [Padding](https://api.flutter.dev/flutter/widgets/Padding-class.html)

为子组件添加内边距。

```dart
Padding(
  padding: EdgeInsets.all(10),
  child: Text("Hello World"),
)
```

## 2. [Margin](https://api.flutter.dev/flutter/widgets/Margin-class.html)

为子组件添加外边距。

```dart
Margin(
  margin: EdgeInsets.all(10),
  child: Text("Hello World"),
)
```

## 3. [Theme](https://api.flutter.dev/flutter/widgets/Theme-class.html)

为子组件设置主题。

```dart
Theme(
  data: ThemeData(
    primaryColor: Colors.red,
  ),
  child: Text("Hello World"),
)
```

## 4. [MediaQuery](https://api.flutter.dev/flutter/widgets/MediaQuery-class.html)

获取设备信息。

```dart
MediaQuery(
  data: MediaQueryData.fromWindow(WidgetsBinding.instance.window),
  child: Text("Hello World"),
)
```
