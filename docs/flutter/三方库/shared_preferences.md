# shared_preferences

## 简介

shared_preferences 是一个用于保存简单数据的插件，可以保存布尔值、整数、双精度浮点数和字符串。数据保存在设备的本地存储中，因此即使应用程序被卸载，数据也不会丢失。

## 安装

```dart
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^2.0.6
```

## 使用

### 保存数据

```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
prefs.setString('key', 'value');
```

### 读取数据

```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
String value = prefs.getString('key');
```

### 删除数据

```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
prefs.remove('key');
```

### 清除所有数据

```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
prefs.clear();
```

## 注意事项

- shared_preferences 只能保存简单的数据类型，不能保存复杂数据类型，如列表、字典等。
- shared_preferences 保存的数据是异步的，因此需要使用 await 关键字等待数据保存完成。
- shared_preferences 保存的数据是持久化的，即使应用程序被卸载，数据也不会丢失。
- shared_preferences 保存的数据是跨平台的，可以在 Android 和 iOS 上使用。
- shared_preferences 保存的数据是线程安全的，可以在多个线程中同时使用。

## 参考

- [shared_preferences 官方文档](https://pub.dev/packages/shared_preferences)
- [shared_preferences GitHub](https://github.com/flutter/plugins/tree/master/packages/shared_preferences)
