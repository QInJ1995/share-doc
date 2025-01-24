# NavigationService

## 实现

```dart
import 'package:flutter/material.dart';

class NavigationService {
  // 1. 获取Navigator的上下文
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  // 2. 普通页面跳转（无参数）
  Future<void> navigateTo(BuildContext context, Widget page) async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
  }

  // 3. 带参数的页面跳转
  Future<void> navigateToWithParams(BuildContext context, Widget page, Object arguments) async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => page(arguments: arguments)),
    );
  }

  // 4. 使用命名路由跳转
  Future<void> navigateToNamed(BuildContext context, String routeName) async {
    await Navigator.pushNamed(context, routeName);
  }

  // 5. 使用命名路由传递参数
  Future<void> navigateToNamedWithParams(BuildContext context, String routeName, Object arguments) async {
    await Navigator.pushNamed(context, routeName, arguments: arguments);
  }

  // 6. 页面返回数据（异步获取返回结果）
  Future<T?> navigateToAndReceiveData<T>(BuildContext context, Widget page) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
    return result;
  }

  // 7. 替换当前页面跳转
  Future<void> replaceWithPage(BuildContext context, Widget page) async {
    await Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
  }

  // 8. 返回上一页
  void goBack(BuildContext context) {
    Navigator.pop(context);
  }
}
```

## 使用

为了让应用中的任何地方都可以调用 NavigationService，我们通常将它作为一个单例来使用，并在 MaterialApp 中提供 navigatorKey。

```dart
import 'package:flutter/material.dart';
import 'navigation_service.dart'; // 引入上面的 NavigationService 类

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // 创建 NavigationService 实例
  final NavigationService _navigationService = NavigationService();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: _navigationService.navigatorKey,  // 设置 navigatorKey
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/second': (context) => SecondPage(),
      },
      onGenerateRoute: (settings) {
        // 可以在这里处理更多的动态路由
        return MaterialPageRoute(builder: (context) => HomePage());
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final NavigationService navigationService = NavigationService();

    return Scaffold(
      appBar: AppBar(title: Text("Home Page")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            navigationService.navigateToNamedWithParams(context, '/second', 'Hello from Home Page');
          },
          child: Text("Go to Second Page"),
        ),
      ),
    );
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final NavigationService navigationService = NavigationService();

    return Scaffold(
      appBar: AppBar(title: Text("Second Page")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            navigationService.goBack(context);  // 返回上一页
          },
          child: Text("Go Back"),
        ),
      ),
    );
  }
}
```
