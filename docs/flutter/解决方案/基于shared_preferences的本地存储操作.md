# 基于shared_preferences的本地存储操作

数据存储是开发APP必不可少的一部分，比如页面缓存，从网络上获取数据的本地持久化等，那么在Flutter中如何进行数据存储呢？

Flutter官方推荐我们用sharedpreferences进行数据存储，类似于RN中的AsyncStorage。

## 什么是shared_preferences

[shared_preferences](https://pub.dev/packages/shared_preferences)是Flutter社区开发的一个本地数据存取插件：

- 简单的，异步的，持久化的key-value存储系统；
- 在Android上它是基于SharedPreferences的；
- 在iOS上它是基于NSUserDefaults的；

## 如何使用shared_preferences

1. 首先在pubspec.yaml文件中添加：

    ```yaml
    dependencies:
        shared_preferences: ^xxx
    ```

    记得运行安装哦：flutter packages get

2. 在需要用到的文件中导入：

    ```dart
    import 'package:shared_preferences/shared_preferences.dart';
    ```

3. 存储数据

    ```dart
    final prefs = await SharedPreferences.getInstance();

    // set value
    prefs.setInt('counter', counter);
    ```

4. 读取数据

    ```dart
    final prefs = await SharedPreferences.getInstance();

    // Try reading data from the counter key. If it does not exist, return 0.
    final counter = prefs.getInt('counter') ?? 0;
    ```

5. 删除数据

    ```dart
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('counter');
    ```

## shared_preferences有那些常用的API

### 存储相关

### 读取相关
